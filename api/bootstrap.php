<?php

header('Content-Type: application/json; charset=utf-8');

$configPath = __DIR__ . '/config.php';

if (!file_exists($configPath)) {
    respond(500, ['error' => 'API config is missing. Copy config.example.php to config.php.']);
}

$config = require $configPath;

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
    static $pdo = null;
    global $config;

    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $db = $config['db'];
    $dsn = sprintf(
        'mysql:host=%s;dbname=%s;charset=%s',
        $db['host'],
        $db['name'],
        isset($db['charset']) ? $db['charset'] : 'utf8mb4'
    );

    try {
        $pdo = new PDO($dsn, $db['user'], $db['password'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
    } catch (Exception $error) {
        respond(500, ['error' => 'Database connection failed.']);
    }

    return $pdo;
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
