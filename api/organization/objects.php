<?php

require __DIR__ . '/../bootstrap.php';

$user = require_user();
$organization = require_organization($user);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $statement = db()->prepare(
        'SELECT objects.id, objects.name, objects.address,
          COUNT(extinguishers.id) AS extinguishers_total,
          SUM(extinguishers.status = "ok") AS ok_total,
          SUM(extinguishers.status = "needs_check") AS needs_check_total,
          SUM(extinguishers.status IN ("broken", "decommissioned")) AS broken_total
         FROM objects
         LEFT JOIN extinguishers ON extinguishers.object_id = objects.id
         WHERE objects.organization_id = :organization_id
         GROUP BY objects.id
         ORDER BY objects.created_at DESC'
    );
    $statement->execute(['organization_id' => $organization['id']]);
    $objects = $statement->fetchAll();

    foreach ($objects as $index => $object) {
        $issues = db()->prepare(
            'SELECT title FROM issues
             WHERE organization_id = :organization_id AND object_id = :object_id AND status = "open"
             ORDER BY created_at DESC
             LIMIT 3'
        );
        $issues->execute([
            'organization_id' => $organization['id'],
            'object_id' => $object['id'],
        ]);
        $objects[$index]['issues'] = $issues->fetchAll();

        $checks = db()->prepare(
            'SELECT id, title, planned_at, completed_at FROM inspections
             WHERE organization_id = :organization_id AND object_id = :object_id
             ORDER BY COALESCE(completed_at, planned_at, created_at) DESC
             LIMIT 3'
        );
        $checks->execute([
            'organization_id' => $organization['id'],
            'object_id' => $object['id'],
        ]);
        $objects[$index]['checks'] = $checks->fetchAll();
    }

    respond(200, ['objects' => $objects]);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = input_json();
    $name = trim((string)(isset($input['name']) ? $input['name'] : ''));
    $address = trim((string)(isset($input['address']) ? $input['address'] : ''));
    $rooms = isset($input['rooms']) && is_array($input['rooms']) ? $input['rooms'] : [];

    if ($name === '') {
        respond(422, ['error' => 'Object name is required.']);
    }

    $pdo = db();
    $pdo->beginTransaction();

    try {
        $objectStatement = $pdo->prepare(
            'INSERT INTO objects (organization_id, name, address)
             VALUES (:organization_id, :name, :address)'
        );
        $objectStatement->execute([
            'organization_id' => $organization['id'],
            'name' => $name,
            'address' => $address ?: null,
        ]);
        $objectId = (int)$pdo->lastInsertId();

        $roomStatement = $pdo->prepare(
            'INSERT INTO rooms (object_id, building_name, floor_name, name, fire_zone)
             VALUES (:object_id, :building_name, :floor_name, :name, :fire_zone)'
        );
        $extinguisherStatement = $pdo->prepare(
            'INSERT INTO extinguishers (organization_id, object_id, room_id, number, name, status)
             VALUES (:organization_id, :object_id, :room_id, :number, NULL, "ok")'
        );
        $extinguisherIndex = 1;

        foreach ($rooms as $room) {
            $roomName = trim((string)(isset($room['name']) ? $room['name'] : ''));

            if ($roomName === '') {
                continue;
            }

            $roomStatement->execute([
                'object_id' => $objectId,
                'building_name' => trim((string)(isset($room['buildingName']) ? $room['buildingName'] : '')) ?: null,
                'floor_name' => trim((string)(isset($room['floorName']) ? $room['floorName'] : '')) ?: null,
                'name' => $roomName,
                'fire_zone' => trim((string)(isset($room['fireZone']) ? $room['fireZone'] : '')) ?: null,
            ]);
            $roomId = (int)$pdo->lastInsertId();
            $extinguisherCount = (int)(isset($room['extinguisherCount']) ? $room['extinguisherCount'] : 0);
            $extinguisherCount = max(0, min($extinguisherCount, 500));

            for ($index = 0; $index < $extinguisherCount; $index += 1) {
                $extinguisherStatement->execute([
                    'organization_id' => $organization['id'],
                    'object_id' => $objectId,
                    'room_id' => $roomId,
                    'number' => 'ПБ-' . str_pad((string)$extinguisherIndex, 3, '0', STR_PAD_LEFT),
                ]);
                $extinguisherIndex += 1;
            }
        }

        $pdo->commit();
    } catch (Exception $error) {
        $pdo->rollBack();
        respond(500, ['error' => 'Could not create object.']);
    }

    respond(201, ['id' => $objectId]);
}

respond(405, ['error' => 'Method not allowed.']);
