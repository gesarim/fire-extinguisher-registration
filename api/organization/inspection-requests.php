<?php

require __DIR__ . '/../bootstrap.php';

$user = require_user();
$organization = require_organization($user);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['error' => 'Method not allowed.']);
}

$input = input_json();
$objectId = (int)(isset($input['objectId']) ? $input['objectId'] : 0);
$preferredDate = trim((string)(isset($input['preferredDate']) ? $input['preferredDate'] : ''));
$comment = trim((string)(isset($input['comment']) ? $input['comment'] : ''));

if ($objectId <= 0) {
    respond(422, ['error' => 'Object is required.']);
}

if ($preferredDate === '') {
    $preferredDate = date('Y-m-d', strtotime('+7 days'));
}

$statement = db()->prepare(
    'INSERT INTO inspection_requests (organization_id, object_id, preferred_date, comment)
     VALUES (:organization_id, :object_id, :preferred_date, :comment)'
);
$statement->execute([
    'organization_id' => $organization['id'],
    'object_id' => $objectId,
    'preferred_date' => $preferredDate !== '' ? $preferredDate : null,
    'comment' => $comment !== '' ? $comment : null,
]);

respond(201, ['id' => (int)db()->lastInsertId()]);
