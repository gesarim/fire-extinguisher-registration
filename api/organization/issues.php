<?php

require __DIR__ . '/../bootstrap.php';

$user = require_user();
$organization = require_organization($user);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['error' => 'Method not allowed.']);
}

$input = input_json();
$objectId = (int)(isset($input['objectId']) ? $input['objectId'] : 0);
$extinguisherId = (int)(isset($input['extinguisherId']) ? $input['extinguisherId'] : 0);
$title = trim((string)(isset($input['title']) ? $input['title'] : ''));
$comment = trim((string)(isset($input['comment']) ? $input['comment'] : ''));

if ($objectId <= 0 || $title === '') {
    respond(422, ['error' => 'Object and issue title are required.']);
}

$statement = db()->prepare(
    'INSERT INTO issues (organization_id, object_id, extinguisher_id, title, comment)
     VALUES (:organization_id, :object_id, :extinguisher_id, :title, :comment)'
);
$statement->execute([
    'organization_id' => $organization['id'],
    'object_id' => $objectId,
    'extinguisher_id' => $extinguisherId > 0 ? $extinguisherId : null,
    'title' => $title,
    'comment' => $comment !== '' ? $comment : null,
]);
$issueId = (int)db()->lastInsertId();

if ($extinguisherId > 0) {
    $update = db()->prepare(
        'UPDATE extinguishers
         SET status = "broken"
         WHERE id = :id AND organization_id = :organization_id AND object_id = :object_id'
    );
    $update->execute([
        'id' => $extinguisherId,
        'organization_id' => $organization['id'],
        'object_id' => $objectId,
    ]);

    $event = db()->prepare(
        'INSERT INTO extinguisher_events (
            organization_id, object_id, extinguisher_id, event_type, title, actor_name, actor_role, event_at, details
         )
         VALUES (
            :organization_id, :object_id, :extinguisher_id, "issue", "Зафиксирована неисправность",
            :actor_name, "organization", NOW(), :details
         )'
    );
    $event->execute([
        'organization_id' => $organization['id'],
        'object_id' => $objectId,
        'extinguisher_id' => $extinguisherId,
        'actor_name' => $user['full_name'] ? $user['full_name'] : $organization['name'],
        'details' => json_encode(['title' => $title, 'comment' => $comment], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
    ]);
}

respond(201, ['id' => $issueId]);
