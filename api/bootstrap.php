<?php

header('Content-Type: application/json; charset=utf-8');

$configPath = __DIR__ . '/config.php';

if (!file_exists($configPath)) {
    respond(500, ['error' => 'API config is missing. Copy config.example.php to config.php.']);
}

$config = require $configPath;

class FireDb
{
    private $pdo;
    private $driver;

    public function __construct(PDO $pdo, $driver)
    {
        $this->pdo = $pdo;
        $this->driver = $driver;
    }

    public function prepare($query, $options = [])
    {
        return $this->pdo->prepare($this->translate($query), $options);
    }

    public function query($query)
    {
        return $this->pdo->query($this->translate($query));
    }

    public function exec($query)
    {
        return $this->pdo->exec($this->translate($query));
    }

    public function beginTransaction()
    {
        return $this->pdo->beginTransaction();
    }

    public function commit()
    {
        return $this->pdo->commit();
    }

    public function rollBack()
    {
        return $this->pdo->rollBack();
    }

    public function lastInsertId()
    {
        return $this->pdo->lastInsertId();
    }

    public function getPdo()
    {
        return $this->pdo;
    }

    public function isSqlite()
    {
        return $this->driver === 'sqlite';
    }

    private function translate($query)
    {
        if ($this->driver !== 'sqlite') {
            return $query;
        }

        $query = preg_replace('/SELECT\s+GET_LOCK\([^)]+\)\s+AS\s+lock_status/i', 'SELECT 1 AS lock_status WHERE :lock_name IS NULL OR :lock_name IS NOT NULL', $query);
        $query = preg_replace('/SELECT\s+RELEASE_LOCK\([^)]+\)/i', 'SELECT 1 WHERE :lock_name IS NULL OR :lock_name IS NOT NULL', $query);
        $query = preg_replace_callback('/DATE_ADD\s*\(\s*NOW\s*\(\s*\)\s*,\s*INTERVAL\s+(\d+)\s+(DAY|MINUTE)\s*\)/i', function ($matches) {
            $unit = strtoupper($matches[2]) === 'DAY' ? 'days' : 'minutes';
            return 'datetime("now", "+' . (int)$matches[1] . ' ' . $unit . '")';
        }, $query);
        $query = preg_replace('/\bNOW\s*\(\s*\)/i', 'datetime("now")', $query);

        $query = str_replace(
            'ON DUPLICATE KEY UPDATE invite_id = VALUES(invite_id), contractor_name = VALUES(contractor_name), status = "active"',
            'ON CONFLICT(contractor_user_id, organization_id) DO UPDATE SET invite_id = excluded.invite_id, contractor_name = excluded.contractor_name, status = "active"',
            $query
        );
        $query = str_replace(
            'ON DUPLICATE KEY UPDATE contractor_name = VALUES(contractor_name), status = "active"',
            'ON CONFLICT(contractor_user_id, organization_id) DO UPDATE SET contractor_name = excluded.contractor_name, status = "active"',
            $query
        );
        $query = str_replace(
            'ON DUPLICATE KEY UPDATE
           organization_id = VALUES(organization_id),
           employee_name = VALUES(employee_name),
           payload = VALUES(payload),
           updated_at = datetime("now")',
            'ON CONFLICT(contractor_user_id, object_id) DO UPDATE SET
           organization_id = excluded.organization_id,
           employee_name = excluded.employee_name,
           payload = excluded.payload,
           updated_at = datetime("now")',
            $query
        );
        $query = str_replace(
            'ON DUPLICATE KEY UPDATE
           employee_name = VALUES(employee_name),
           payload = VALUES(payload),
           updated_at = datetime("now")',
            'ON CONFLICT(contractor_user_id, object_id) DO UPDATE SET
           employee_name = excluded.employee_name,
           payload = excluded.payload,
           updated_at = datetime("now")',
            $query
        );
        $query = str_replace(
            'DELETE rooms FROM rooms
             LEFT JOIN extinguishers ON extinguishers.room_id = rooms.id
             WHERE rooms.id = :id AND rooms.object_id = :object_id AND extinguishers.id IS NULL',
            'DELETE FROM rooms
             WHERE id = :id AND object_id = :object_id
               AND NOT EXISTS (SELECT 1 FROM extinguishers WHERE extinguishers.room_id = rooms.id)',
            $query
        );

        return $query;
    }
}

function respond($status, array $payload)
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function input_json()
{
    $raw = file_get_contents('php://input');

    if ($raw === false || trim($raw) === '') {
        return [];
    }

    $data = json_decode($raw, true);

    if (!is_array($data)) {
        respond(400, ['error' => 'Invalid JSON body.']);
    }

    return $data;
}

function db()
{
    static $database = null;
    global $config;

    if ($database instanceof FireDb) {
        return $database;
    }

    $db = $config['db'];
    $driver = isset($db['driver']) ? $db['driver'] : 'mysql';

    if ($driver === 'sqlite') {
        $path = $db['path'];
        $directory = dirname($path);

        if (!is_dir($directory)) {
            mkdir($directory, 0700, true);
        }

        $dsn = 'sqlite:' . $path;
    } else {
        $dsn = sprintf(
            'mysql:host=%s;dbname=%s;charset=%s',
            $db['host'],
            $db['name'],
            isset($db['charset']) ? $db['charset'] : 'utf8mb4'
        );
    }

    try {
        $pdo = new PDO($dsn, $db['user'], $db['password'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);

        if ($driver === 'sqlite') {
            $pdo->exec('PRAGMA foreign_keys = ON');
            ensure_sqlite_schema($pdo);
        }

        $database = new FireDb($pdo, $driver);
    } catch (Exception $error) {
        respond(500, ['error' => 'Database connection failed.']);
    }

    return $database;
}

function ensure_sqlite_schema(PDO $pdo)
{
    static $ensured = false;

    if ($ensured) {
        return;
    }

    $queries = [
        'CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT NOT NULL UNIQUE,
          full_name TEXT NULL,
          role TEXT NOT NULL,
          email_verified_at TEXT NULL,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )',
        'CREATE TABLE IF NOT EXISTS email_codes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT NOT NULL,
          code_hash TEXT NOT NULL,
          purpose TEXT NOT NULL,
          payload TEXT NULL,
          expires_at TEXT NOT NULL,
          used_at TEXT NULL,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )',
        'CREATE INDEX IF NOT EXISTS email_codes_email_created_at ON email_codes (email, created_at)',
        'CREATE TABLE IF NOT EXISTS sessions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          token_hash TEXT NOT NULL UNIQUE,
          expires_at TEXT NOT NULL,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )',
        'CREATE TABLE IF NOT EXISTS organizations (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          owner_user_id INTEGER NOT NULL,
          name TEXT NOT NULL,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (owner_user_id) REFERENCES users(id) ON DELETE CASCADE
        )',
        'CREATE TABLE IF NOT EXISTS organization_members (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          organization_id INTEGER NOT NULL,
          full_name TEXT NOT NULL,
          email TEXT NOT NULL,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE
        )',
        'CREATE TABLE IF NOT EXISTS contractor_invites (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          organization_id INTEGER NOT NULL,
          name TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT "sent",
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE
        )',
        'CREATE TABLE IF NOT EXISTS contractor_profiles (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL UNIQUE,
          name TEXT NOT NULL,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )',
        'CREATE TABLE IF NOT EXISTS contractor_links (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          contractor_user_id INTEGER NOT NULL,
          organization_id INTEGER NOT NULL,
          invite_id INTEGER NULL,
          contractor_name TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT "active",
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          UNIQUE (contractor_user_id, organization_id),
          FOREIGN KEY (contractor_user_id) REFERENCES users(id) ON DELETE CASCADE,
          FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
          FOREIGN KEY (invite_id) REFERENCES contractor_invites(id) ON DELETE SET NULL
        )',
        'CREATE TABLE IF NOT EXISTS objects (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          organization_id INTEGER NOT NULL,
          name TEXT NOT NULL,
          address TEXT NULL,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE
        )',
        'CREATE TABLE IF NOT EXISTS rooms (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          object_id INTEGER NOT NULL,
          building_name TEXT NULL,
          floor_name TEXT NULL,
          name TEXT NOT NULL,
          fire_zone TEXT NULL,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (object_id) REFERENCES objects(id) ON DELETE CASCADE
        )',
        'CREATE TABLE IF NOT EXISTS files (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          organization_id INTEGER NOT NULL,
          object_id INTEGER NULL,
          name TEXT NOT NULL,
          path TEXT NOT NULL,
          mime_type TEXT NULL,
          size_bytes INTEGER NULL,
          uploaded_by_user_id INTEGER NULL,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
          FOREIGN KEY (object_id) REFERENCES objects(id) ON DELETE SET NULL,
          FOREIGN KEY (uploaded_by_user_id) REFERENCES users(id) ON DELETE SET NULL
        )',
        'CREATE TABLE IF NOT EXISTS extinguishers (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          organization_id INTEGER NOT NULL,
          object_id INTEGER NOT NULL,
          room_id INTEGER NULL,
          number TEXT NOT NULL,
          name TEXT NULL,
          type_mark TEXT NULL,
          manufacturer TEXT NULL,
          factory_number TEXT NULL,
          placement_date TEXT NULL,
          manufacture_date TEXT NULL,
          next_recharge_date TEXT NULL,
          service_life TEXT NULL,
          responsible_person TEXT NULL,
          status TEXT NOT NULL DEFAULT "ok",
          photo_file_id INTEGER NULL,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
          FOREIGN KEY (object_id) REFERENCES objects(id) ON DELETE CASCADE,
          FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE SET NULL,
          FOREIGN KEY (photo_file_id) REFERENCES files(id) ON DELETE SET NULL
        )',
        'CREATE TABLE IF NOT EXISTS issues (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          organization_id INTEGER NOT NULL,
          object_id INTEGER NOT NULL,
          extinguisher_id INTEGER NULL,
          title TEXT NOT NULL,
          comment TEXT NULL,
          status TEXT NOT NULL DEFAULT "open",
          photo_file_id INTEGER NULL,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
          FOREIGN KEY (object_id) REFERENCES objects(id) ON DELETE CASCADE,
          FOREIGN KEY (extinguisher_id) REFERENCES extinguishers(id) ON DELETE SET NULL,
          FOREIGN KEY (photo_file_id) REFERENCES files(id) ON DELETE SET NULL
        )',
        'CREATE TABLE IF NOT EXISTS extinguisher_events (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          organization_id INTEGER NOT NULL,
          object_id INTEGER NOT NULL,
          extinguisher_id INTEGER NULL,
          event_type TEXT NOT NULL,
          title TEXT NOT NULL,
          actor_name TEXT NULL,
          actor_role TEXT NULL,
          event_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          details TEXT NULL,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
          FOREIGN KEY (object_id) REFERENCES objects(id) ON DELETE CASCADE,
          FOREIGN KEY (extinguisher_id) REFERENCES extinguishers(id) ON DELETE SET NULL
        )',
        'CREATE INDEX IF NOT EXISTS extinguisher_events_extinguisher ON extinguisher_events (organization_id, object_id, extinguisher_id, event_at)',
        'CREATE TABLE IF NOT EXISTS inspection_requests (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          organization_id INTEGER NOT NULL,
          object_id INTEGER NOT NULL,
          status TEXT NOT NULL DEFAULT "new",
          preferred_date TEXT NULL,
          comment TEXT NULL,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
          FOREIGN KEY (object_id) REFERENCES objects(id) ON DELETE CASCADE
        )',
        'CREATE TABLE IF NOT EXISTS inspections (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          organization_id INTEGER NOT NULL,
          object_id INTEGER NOT NULL,
          contractor_user_id INTEGER NULL,
          contractor_name TEXT NULL,
          employee_name TEXT NULL,
          inspection_type TEXT NULL,
          title TEXT NOT NULL,
          planned_at TEXT NULL,
          completed_at TEXT NULL,
          report_file_id INTEGER NULL,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
          FOREIGN KEY (object_id) REFERENCES objects(id) ON DELETE CASCADE,
          FOREIGN KEY (contractor_user_id) REFERENCES users(id) ON DELETE SET NULL,
          FOREIGN KEY (report_file_id) REFERENCES files(id) ON DELETE SET NULL
        )',
        'CREATE TABLE IF NOT EXISTS inspection_items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          inspection_id INTEGER NOT NULL,
          extinguisher_id INTEGER NULL,
          number TEXT NOT NULL,
          place TEXT NULL,
          name TEXT NULL,
          manufacturer TEXT NULL,
          release_date TEXT NULL,
          factory_number TEXT NULL,
          assigned_number TEXT NULL,
          placement_date TEXT NULL,
          manufacture_date TEXT NULL,
          next_recharge_date TEXT NULL,
          service_life TEXT NULL,
          responsible_person TEXT NULL,
          next_planned_test_date TEXT NULL,
          recharge_date TEXT NULL,
          otv_mark TEXT NULL,
          post_recharge_result TEXT NULL,
          mass TEXT NULL,
          check_type TEXT NULL,
          work_types TEXT NULL,
          result TEXT NULL,
          comment TEXT NULL,
          photo_file_id INTEGER NULL,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (inspection_id) REFERENCES inspections(id) ON DELETE CASCADE,
          FOREIGN KEY (extinguisher_id) REFERENCES extinguishers(id) ON DELETE SET NULL,
          FOREIGN KEY (photo_file_id) REFERENCES files(id) ON DELETE SET NULL
        )',
        'CREATE TABLE IF NOT EXISTS contractor_inspection_drafts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          contractor_user_id INTEGER NOT NULL,
          organization_id INTEGER NOT NULL,
          object_id INTEGER NOT NULL,
          employee_name TEXT NULL,
          payload TEXT NOT NULL,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          UNIQUE (contractor_user_id, object_id),
          FOREIGN KEY (contractor_user_id) REFERENCES users(id) ON DELETE CASCADE,
          FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
          FOREIGN KEY (object_id) REFERENCES objects(id) ON DELETE CASCADE
        )',
    ];

    foreach ($queries as $query) {
        $pdo->exec($query);
    }

    $inspectionItemColumns = $pdo->query('PRAGMA table_info(inspection_items)')->fetchAll(PDO::FETCH_ASSOC);
    $inspectionItemColumnNames = array_map(function ($column) {
        return $column['name'];
    }, $inspectionItemColumns);

    if (!in_array('photo_file_id', $inspectionItemColumnNames, true)) {
        $pdo->exec('ALTER TABLE inspection_items ADD COLUMN photo_file_id INTEGER NULL REFERENCES files(id) ON DELETE SET NULL');
    }

    $fileColumns = $pdo->query('PRAGMA table_info(files)')->fetchAll(PDO::FETCH_ASSOC);
    $fileColumnNames = array_map(function ($column) {
        return $column['name'];
    }, $fileColumns);

    if (!in_array('uploaded_by_user_id', $fileColumnNames, true)) {
        $pdo->exec('ALTER TABLE files ADD COLUMN uploaded_by_user_id INTEGER NULL REFERENCES users(id) ON DELETE SET NULL');
    }

    $ensured = true;
}

function require_user()
{
    $token = isset($_COOKIE['session_token']) ? $_COOKIE['session_token'] : '';

    if ($token === '') {
        respond(401, ['error' => 'Unauthorized.']);
    }

    $statement = db()->prepare(
        'SELECT users.*
         FROM sessions
         INNER JOIN users ON users.id = sessions.user_id
         WHERE sessions.token_hash = :token_hash AND sessions.expires_at > NOW()
         LIMIT 1'
    );
    $statement->execute(['token_hash' => hash('sha256', $token)]);
    $user = $statement->fetch();

    if (!$user) {
        respond(401, ['error' => 'Unauthorized.']);
    }

    return $user;
}

function require_organization(array $user)
{
    $statement = db()->prepare('SELECT * FROM organizations WHERE owner_user_id = :user_id LIMIT 1');
    $statement->execute(['user_id' => $user['id']]);
    $organization = $statement->fetch();

    if (!$organization) {
        respond(404, ['error' => 'Organization not found.']);
    }

    return $organization;
}

function require_contractor(array $user)
{
    if (!isset($user['role']) || $user['role'] !== 'contractor') {
        respond(403, ['error' => 'Contractor access required.']);
    }

    ensure_contractor_profile($user);

    return $user;
}

function require_scoped_file($fileId, $organizationId, $objectId = 0, $imageOnly = false)
{
    $fileId = (int)$fileId;

    if ($fileId <= 0) {
        return null;
    }

    $query = 'SELECT * FROM files WHERE id = :id AND organization_id = :organization_id';
    $params = ['id' => $fileId, 'organization_id' => $organizationId];

    if ((int)$objectId > 0) {
        $query .= ' AND object_id = :object_id';
        $params['object_id'] = $objectId;
    }

    $query .= ' LIMIT 1';
    $statement = db()->prepare($query);
    $statement->execute($params);
    $file = $statement->fetch();

    if (!$file || ($imageOnly && strpos((string)$file['mime_type'], 'image/') !== 0)) {
        respond(422, ['error' => 'Uploaded file is invalid.']);
    }

    return $file;
}

function ensure_contractor_profile(array $user, $preferredName = '')
{
    $preferredName = trim((string)$preferredName);

    $profile = db()->prepare('SELECT id, name FROM contractor_profiles WHERE user_id = :user_id LIMIT 1');
    $profile->execute(['user_id' => $user['id']]);
    $existing = $profile->fetch();

    if ($existing) {
        $name = $preferredName !== '' ? $preferredName : $existing['name'];

        if ($existing['name'] !== $name) {
            $update = db()->prepare('UPDATE contractor_profiles SET name = :name WHERE user_id = :user_id');
            $update->execute([
                'user_id' => $user['id'],
                'name' => $name,
            ]);
        }

        sync_contractor_links($user['id'], $name);
        return;
    }

    $name = $preferredName;

    if ($name === '') {
        $name = trim((string)(isset($user['full_name']) ? $user['full_name'] : ''));
    }

    if ($name === '') {
        $name = 'Новый подрядчик';
    }

    if (!$existing) {
        $insert = db()->prepare(
            'INSERT INTO contractor_profiles (user_id, name)
             VALUES (:user_id, :name)'
        );
        $insert->execute([
            'user_id' => $user['id'],
            'name' => $name,
        ]);
    }

    sync_contractor_links($user['id'], $name);
}

function sync_contractor_links($userId, $contractorName)
{
    $name = trim((string)$contractorName);

    if ($name === '') {
        return;
    }

    $invites = db()->prepare(
        'SELECT id, organization_id, name
         FROM contractor_invites
         WHERE status IN ("sent", "accepted") AND LOWER(name) = LOWER(:name)'
    );
    $invites->execute(['name' => $name]);

    $link = db()->prepare(
        'INSERT INTO contractor_links (contractor_user_id, organization_id, invite_id, contractor_name, status)
         VALUES (:contractor_user_id, :organization_id, :invite_id, :contractor_name, "active")
         ON DUPLICATE KEY UPDATE contractor_name = VALUES(contractor_name), status = "active"'
    );
    $accept = db()->prepare('UPDATE contractor_invites SET status = "accepted" WHERE id = :id');

    foreach ($invites->fetchAll() as $invite) {
        $link->execute([
            'contractor_user_id' => $userId,
            'organization_id' => $invite['organization_id'],
            'invite_id' => $invite['id'],
            'contractor_name' => $invite['name'],
        ]);
        $accept->execute(['id' => $invite['id']]);
    }
}

function send_mail_code($email, $code)
{
    global $config;

    $ttl = isset($config['app']['code_ttl_minutes']) ? (int)$config['app']['code_ttl_minutes'] : 10;
    $brandName = $config['mail']['from_name'];
    $fromEmail = $config['mail']['from'];
    $safeCode = htmlspecialchars($code, ENT_QUOTES, 'UTF-8');
    $safeBrandName = htmlspecialchars($brandName, ENT_QUOTES, 'UTF-8');
    $encodedSubject = '=?UTF-8?B?' . base64_encode('Код подтверждения') . '?=';
    $encodedFromName = '=?UTF-8?B?' . base64_encode($brandName) . '?=';
    $boundary = 'mail_boundary_' . md5(uniqid('', true));

    $textBody = "Ваш код подтверждения: {$code}\n\n"
        . "Введите его в приложении «{$brandName}».\n"
        . "Код действует {$ttl} минут.\n\n"
        . "Если вы не запрашивали код, просто проигнорируйте это письмо.";

    $htmlBody = '<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Код подтверждения</title>
  </head>
  <body style="margin:0; padding:0; background:#343434; font-family:Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Arial,sans-serif; color:#1d1d1f;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%; background:#343434; padding:32px 14px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:440px; width:100%; background:#ffffff; border-radius:12px; overflow:hidden;">
            <tr>
              <td style="padding:28px 24px 10px;">
                <table role="presentation" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="width:44px; height:44px; border-radius:12px; background:#f5f5f7; text-align:center; vertical-align:middle; font-size:22px; font-weight:700; color:#1d1d1f;">О</td>
                    <td style="padding-left:12px;">
                      <div style="font-size:15px; line-height:1.35; font-weight:700; color:#1d1d1f;">' . $safeBrandName . '</div>
                      <div style="font-size:12px; line-height:1.45; font-weight:500; color:#747474;">Учет огнетушителей и проверок</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 24px 0;">
                <h1 style="margin:0; font-size:24px; line-height:1.25; font-weight:700; color:#1d1d1f;">Код подтверждения</h1>
                <p style="margin:10px 0 0; font-size:14px; line-height:1.65; font-weight:500; color:#747474;">Введите этот код в приложении, чтобы подтвердить email и продолжить работу в кабинете.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 24px 8px;">
                <div style="background:#f5f5f7; border-radius:12px; padding:20px 18px; text-align:center;">
                  <div style="font-size:12px; line-height:1.4; font-weight:700; color:#747474; text-transform:uppercase; letter-spacing:0.08em;">Ваш код</div>
                  <div style="margin-top:8px; font-size:38px; line-height:1; font-weight:800; color:#1d1d1f; letter-spacing:0.14em;">' . $safeCode . '</div>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 24px 28px;">
                <p style="margin:0; font-size:13px; line-height:1.65; font-weight:500; color:#747474;">Код действует ' . $ttl . ' минут. Если вы не запрашивали код, письмо можно проигнорировать.</p>
              </td>
            </tr>
          </table>
          <div style="max-width:440px; width:100%; padding-top:14px; font-size:12px; line-height:1.5; color:#d4d4d4; text-align:center;">Это автоматическое письмо, отвечать на него не нужно.</div>
        </td>
      </tr>
    </table>
  </body>
</html>';

    $headers = sprintf(
        "From: %s <%s>\r\nReply-To: %s\r\nMIME-Version: 1.0\r\nContent-Type: multipart/alternative; boundary=\"%s\"",
        $encodedFromName,
        $fromEmail,
        $fromEmail,
        $boundary
    );

    $message = "--{$boundary}\r\n"
        . "Content-Type: text/plain; charset=UTF-8\r\n"
        . "Content-Transfer-Encoding: 8bit\r\n\r\n"
        . $textBody . "\r\n\r\n"
        . "--{$boundary}\r\n"
        . "Content-Type: text/html; charset=UTF-8\r\n"
        . "Content-Transfer-Encoding: 8bit\r\n\r\n"
        . $htmlBody . "\r\n\r\n"
        . "--{$boundary}--";

    return mail($email, $encodedSubject, $message, $headers);
}

function random_token($bytes = 32)
{
    if (function_exists('random_bytes')) {
        return bin2hex(random_bytes($bytes));
    }

    if (function_exists('openssl_random_pseudo_bytes')) {
        return bin2hex(openssl_random_pseudo_bytes($bytes));
    }

    $token = '';

    for ($index = 0; $index < $bytes; $index += 1) {
        $token .= chr(mt_rand(0, 255));
    }

    return bin2hex($token);
}
