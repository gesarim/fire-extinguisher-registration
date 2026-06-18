<?php

require __DIR__ . '/../bootstrap.php';

$user = require_user();
$organization = require_organization($user);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $statement = db()->prepare('SELECT id, full_name, email FROM organization_members WHERE organization_id = :organization_id ORDER BY created_at DESC');
    $statement->execute(['organization_id' => $organization['id']]);
    respond(200, ['employees' => $statement->fetchAll()]);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = input_json();
    $fullName = trim((string)(isset($input['fullName']) ? $input['fullName'] : ''));
    $email = trim((string)(isset($input['email']) ? $input['email'] : ''));

    if ($fullName === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        respond(422, ['error' => 'Employee data is invalid.']);
    }

    $statement = db()->prepare(
        'INSERT INTO organization_members (organization_id, full_name, email)
         VALUES (:organization_id, :full_name, :email)'
    );
    $statement->execute([
        'organization_id' => $organization['id'],
        'full_name' => $fullName,
        'email' => $email,
    ]);

    respond(201, ['id' => (int)db()->lastInsertId()]);
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id = (int)(isset($_GET['id']) ? $_GET['id'] : 0);
    $statement = db()->prepare('DELETE FROM organization_members WHERE id = :id AND organization_id = :organization_id');
    $statement->execute(['id' => $id, 'organization_id' => $organization['id']]);
    respond(200, ['ok' => true]);
}

respond(405, ['error' => 'Method not allowed.']);
