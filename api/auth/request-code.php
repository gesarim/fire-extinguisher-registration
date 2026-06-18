<?php

require __DIR__ . '/../bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['error' => 'Method not allowed.']);
}

$input = input_json();
$email = trim((string)(isset($input['email']) ? $input['email'] : ''));
$role = (string)(isset($input['role']) ? $input['role'] : 'organization');
$purpose = (string)(isset($input['purpose']) ? $input['purpose'] : 'registration');

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, ['error' => 'Email is invalid.']);
}

if (!in_array($role, ['organization', 'contractor'], true)) {
    respond(422, ['error' => 'Role is invalid.']);
}

if (!in_array($purpose, ['registration', 'login'], true)) {
    respond(422, ['error' => 'Purpose is invalid.']);
}

$code = (string)mt_rand(100000, 999999);
$ttl = (int)(isset($config['app']['code_ttl_minutes']) ? $config['app']['code_ttl_minutes'] : 10);
$payload = [
    'role' => $role,
    'fullName' => trim((string)(isset($input['fullName']) ? $input['fullName'] : '')),
    'company' => trim((string)(isset($input['company']) ? $input['company'] : '')),
];

$statement = db()->prepare(
    'INSERT INTO email_codes (email, code_hash, purpose, payload, expires_at)
     VALUES (:email, :code_hash, :purpose, :payload, DATE_ADD(NOW(), INTERVAL ' . $ttl . ' MINUTE))'
);
$statement->bindValue(':email', $email);
$statement->bindValue(':code_hash', hash('sha256', $code));
$statement->bindValue(':purpose', $purpose);
$statement->bindValue(':payload', json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
$statement->execute();

if (!send_mail_code($email, $code)) {
    respond(500, ['error' => 'Could not send email code.']);
}

respond(200, ['ok' => true]);
