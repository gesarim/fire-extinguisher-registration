<?php

require __DIR__ . '/../bootstrap.php';

$user = require_user();
$organization = require_organization($user);

$members = db()->prepare('SELECT id, full_name, email FROM organization_members WHERE organization_id = :organization_id ORDER BY created_at DESC');
$members->execute(['organization_id' => $organization['id']]);

$documents = db()->prepare('SELECT id, name, path, mime_type, size_bytes FROM files WHERE organization_id = :organization_id AND object_id IS NULL ORDER BY created_at DESC');
$documents->execute(['organization_id' => $organization['id']]);

$objects = db()->prepare('SELECT id, name, address FROM objects WHERE organization_id = :organization_id ORDER BY name ASC');
$objects->execute(['organization_id' => $organization['id']]);

respond(200, [
    'organization' => [
        'id' => (int)$organization['id'],
        'name' => $organization['name'],
        'email' => $user['email'],
    ],
    'members' => $members->fetchAll(),
    'documents' => $documents->fetchAll(),
    'objects' => $objects->fetchAll(),
]);
