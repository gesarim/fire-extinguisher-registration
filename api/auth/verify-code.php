<?php

require __DIR__ . '/../bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['error' => 'Method not allowed.']);
}

$input = input_json();
$email = trim((string)(isset($input['email']) ? $input['email'] : ''));
$code = preg_replace('/\D/', '', (string)(isset($input['code']) ? $input['code'] : ''));

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($code) !== 6) {
    respond(422, ['error' => 'Email or code is invalid.']);
}

$statement = db()->prepare(
    'SELECT * FROM email_codes
     WHERE email = :email AND code_hash = :code_hash AND used_at IS NULL AND expires_at > NOW()
     ORDER BY created_at DESC
     LIMIT 1'
);
$statement->execute([
    'email' => $email,
    'code_hash' => hash('sha256', $code),
]);
$emailCode = $statement->fetch();

if (!$emailCode) {
    respond(401, ['error' => 'Code is invalid or expired.']);
}

$payload = json_decode(isset($emailCode['payload']) ? $emailCode['payload'] : '{}', true);
$role = isset($payload['role']) ? $payload['role'] : 'organization';
$fullName = isset($payload['fullName']) ? $payload['fullName'] : null;
$company = isset($payload['company']) ? $payload['company'] : null;

$pdo = db();
$pdo->beginTransaction();

try {
    $userStatement = $pdo->prepare('SELECT * FROM users WHERE email = :email LIMIT 1');
    $userStatement->execute(['email' => $email]);
    $user = $userStatement->fetch();

    if (!$user) {
        $insertUser = $pdo->prepare(
            'INSERT INTO users (email, full_name, role, email_verified_at)
             VALUES (:email, :full_name, :role, NOW())'
        );
        $insertUser->execute([
            'email' => $email,
            'full_name' => $fullName,
            'role' => $role,
        ]);
        $userId = (int)$pdo->lastInsertId();

        if ($role === 'organization') {
            $insertOrganization = $pdo->prepare(
                'INSERT INTO organizations (owner_user_id, name)
                 VALUES (:owner_user_id, :name)'
            );
            $insertOrganization->execute([
                'owner_user_id' => $userId,
                'name' => $company ?: 'Новая организация',
            ]);
        } elseif ($role === 'contractor') {
            ensure_contractor_profile([
                'id' => $userId,
                'role' => 'contractor',
                'full_name' => $fullName,
            ], $company ?: $fullName);
        }
    } else {
        $userId = (int)$user['id'];
        $pdo->prepare('UPDATE users SET email_verified_at = COALESCE(email_verified_at, NOW()) WHERE id = :id')
            ->execute(['id' => $userId]);

        if ($user['role'] === 'organization') {
            $organizationCheck = $pdo->prepare('SELECT id FROM organizations WHERE owner_user_id = :owner_user_id LIMIT 1');
            $organizationCheck->execute(['owner_user_id' => $userId]);

            if (!$organizationCheck->fetch()) {
                $insertOrganization = $pdo->prepare(
                    'INSERT INTO organizations (owner_user_id, name)
                     VALUES (:owner_user_id, :name)'
                );
                $insertOrganization->execute([
                    'owner_user_id' => $userId,
                    'name' => $company ?: 'Новая организация',
                ]);
            }
        } elseif ($user['role'] === 'contractor') {
            ensure_contractor_profile($user, $company ?: $fullName);
        }
    }

    $pdo->prepare('UPDATE email_codes SET used_at = NOW() WHERE id = :id')
        ->execute(['id' => $emailCode['id']]);

    $token = random_token();
    $sessionTtl = (int)(isset($config['app']['session_ttl_days']) ? $config['app']['session_ttl_days'] : 30);
    $sessionTtl = max(1, min($sessionTtl, 365));
    $session = $pdo->prepare(
        'INSERT INTO sessions (user_id, token_hash, expires_at)
         VALUES (:user_id, :token_hash, DATE_ADD(NOW(), INTERVAL ' . $sessionTtl . ' DAY))'
    );
    $session->bindValue(':user_id', $userId, PDO::PARAM_INT);
    $session->bindValue(':token_hash', hash('sha256', $token));
    $session->execute();

    $pdo->commit();
} catch (Exception $error) {
    $pdo->rollBack();
    respond(500, ['error' => 'Could not verify code.']);
}

setcookie('session_token', $token, time() + 60 * 60 * 24 * $sessionTtl, '/', '', false, true);

respond(200, ['ok' => true]);
