<?php

require __DIR__ . '/../bootstrap.php';

$user = require_user();
$organization = require_organization($user);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = input_json();
    $objectId = (int)(isset($input['objectId']) ? $input['objectId'] : 0);
    $name = trim((string)(isset($input['name']) ? $input['name'] : ''));

    if ($name === '') {
        respond(422, ['error' => 'Document name is required.']);
    }

    $statement = db()->prepare(
        'INSERT INTO files (organization_id, object_id, name, path, mime_type, size_bytes)
         VALUES (:organization_id, :object_id, :name, :path, "application/pdf", 0)'
    );
    $statement->execute([
        'organization_id' => $organization['id'],
        'object_id' => $objectId > 0 ? $objectId : null,
        'name' => $name,
        'path' => '',
    ]);

    respond(201, ['id' => (int)db()->lastInsertId()]);
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id = (int)(isset($_GET['id']) ? $_GET['id'] : 0);
    $statement = db()->prepare('DELETE FROM files WHERE id = :id AND organization_id = :organization_id');
    $statement->execute(['id' => $id, 'organization_id' => $organization['id']]);
    respond(200, ['ok' => true]);
}

respond(405, ['error' => 'Method not allowed.']);
