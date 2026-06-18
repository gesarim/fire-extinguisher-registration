<?php

require __DIR__ . '/../bootstrap.php';

$user = require_user();
$organization = require_organization($user);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['error' => 'Method not allowed.']);
}

$input = input_json();
$name = trim((string)(isset($input['name']) ? $input['name'] : ''));
$checks = isset($input['checks']) && is_array($input['checks']) ? $input['checks'] : [];

if ($name === '') {
    respond(422, ['error' => 'Contractor name is required.']);
}

$pdo = db();
$pdo->beginTransaction();

try {
    $statement = $pdo->prepare(
        'INSERT INTO contractor_invites (organization_id, name, status)
         VALUES (:organization_id, :name, "sent")'
    );
    $statement->execute([
        'organization_id' => $organization['id'],
        'name' => $name,
    ]);
    $inviteId = (int)$pdo->lastInsertId();

    $objectCheck = $pdo->prepare(
        'SELECT id FROM objects WHERE id = :id AND organization_id = :organization_id LIMIT 1'
    );
    $insertRequest = $pdo->prepare(
        'INSERT INTO inspection_requests (organization_id, object_id, status, preferred_date, comment)
         VALUES (:organization_id, :object_id, "scheduled", :preferred_date, :comment)'
    );

    foreach ($checks as $check) {
        $objectId = (int)(isset($check['objectId']) ? $check['objectId'] : 0);
        $preferredDate = trim((string)(isset($check['date']) ? $check['date'] : ''));

        if ($objectId <= 0 || !preg_match('/^\d{4}-\d{2}-\d{2}$/', $preferredDate)) {
            continue;
        }

        $objectCheck->execute([
            'id' => $objectId,
            'organization_id' => $organization['id'],
        ]);

        if (!$objectCheck->fetch()) {
            continue;
        }

        $insertRequest->execute([
            'organization_id' => $organization['id'],
            'object_id' => $objectId,
            'preferred_date' => $preferredDate,
            'comment' => 'Плановая проверка. Подрядчик: ' . $name,
        ]);
    }

    $pdo->commit();
} catch (Exception $error) {
    $pdo->rollBack();
    respond(500, ['error' => 'Could not invite contractor.']);
}

respond(201, ['id' => $inviteId]);
