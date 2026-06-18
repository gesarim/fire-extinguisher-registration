<?php

require __DIR__ . '/../bootstrap.php';

$user = require_user();
$organization = require_organization($user);
$objectId = (int)(isset($_GET['id']) ? $_GET['id'] : 0);

if ($objectId <= 0) {
    respond(422, ['error' => 'Object id is required.']);
}

$statement = db()->prepare(
    'SELECT * FROM objects WHERE id = :id AND organization_id = :organization_id LIMIT 1'
);
$statement->execute([
    'id' => $objectId,
    'organization_id' => $organization['id'],
]);
$object = $statement->fetch();

if (!$object) {
    respond(404, ['error' => 'Object not found.']);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
$rooms = db()->prepare(
    'SELECT rooms.*,
       (SELECT COUNT(*) FROM extinguishers WHERE extinguishers.room_id = rooms.id) AS extinguishers_count
     FROM rooms
     WHERE object_id = :object_id
     ORDER BY created_at ASC'
);
$rooms->execute(['object_id' => $objectId]);

$extinguishers = db()->prepare(
    'SELECT extinguishers.*, rooms.name AS room_name, rooms.building_name, rooms.floor_name, rooms.fire_zone
     FROM extinguishers
     LEFT JOIN rooms ON rooms.id = extinguishers.room_id
     WHERE extinguishers.organization_id = :organization_id AND extinguishers.object_id = :object_id
     ORDER BY extinguishers.created_at DESC'
);
$extinguishers->execute([
    'organization_id' => $organization['id'],
    'object_id' => $objectId,
]);

$issues = db()->prepare(
    'SELECT issues.*, extinguishers.number AS extinguisher_number
     FROM issues
     LEFT JOIN extinguishers ON extinguishers.id = issues.extinguisher_id
     WHERE issues.organization_id = :organization_id AND issues.object_id = :object_id
     ORDER BY issues.created_at DESC'
);
$issues->execute([
    'organization_id' => $organization['id'],
    'object_id' => $objectId,
]);

$extinguisherEvents = db()->prepare(
    'SELECT *
     FROM extinguisher_events
     WHERE organization_id = :organization_id AND object_id = :object_id
     ORDER BY event_at DESC, created_at DESC'
);
$extinguisherEvents->execute([
    'organization_id' => $organization['id'],
    'object_id' => $objectId,
]);

$inspections = db()->prepare(
    'SELECT * FROM inspections
     WHERE organization_id = :organization_id AND object_id = :object_id
     ORDER BY COALESCE(completed_at, planned_at, created_at) DESC'
);
$inspections->execute([
    'organization_id' => $organization['id'],
    'object_id' => $objectId,
]);
$inspectionRows = $inspections->fetchAll();

if (count($inspectionRows)) {
    $inspectionIds = array_map(function ($inspection) {
        return (int)$inspection['id'];
    }, $inspectionRows);
    $placeholders = implode(',', array_fill(0, count($inspectionIds), '?'));
    $items = db()->prepare(
        'SELECT *
         FROM inspection_items
         WHERE inspection_id IN (' . $placeholders . ')
         ORDER BY created_at ASC'
    );
    $items->execute($inspectionIds);
    $itemsByInspection = [];

    foreach ($items->fetchAll() as $item) {
        $itemsByInspection[(int)$item['inspection_id']][] = $item;
    }

    foreach ($inspectionRows as &$inspectionRow) {
        $inspectionRow['items'] = isset($itemsByInspection[(int)$inspectionRow['id']])
            ? $itemsByInspection[(int)$inspectionRow['id']]
            : [];
    }
    unset($inspectionRow);
}

    $metrics = db()->prepare(
        'SELECT
           COUNT(*) AS total,
           SUM(status = "ok") AS ok,
           SUM(status = "needs_check") AS needs_check,
           SUM(status IN ("broken", "decommissioned")) AS broken
         FROM extinguishers
         WHERE organization_id = :organization_id AND object_id = :object_id'
    );
    $metrics->execute([
        'organization_id' => $organization['id'],
        'object_id' => $objectId,
    ]);

    respond(200, [
        'object' => $object,
        'rooms' => $rooms->fetchAll(),
        'extinguishers' => $extinguishers->fetchAll(),
        'extinguisherEvents' => $extinguisherEvents->fetchAll(),
        'issues' => $issues->fetchAll(),
        'inspections' => $inspectionRows,
        'metrics' => $metrics->fetch(),
    ]);
}

if ($_SERVER['REQUEST_METHOD'] === 'PATCH') {
    $input = input_json();
    $name = trim((string)(isset($input['name']) ? $input['name'] : ''));
    $address = trim((string)(isset($input['address']) ? $input['address'] : ''));
    $inputRooms = isset($input['rooms']) && is_array($input['rooms']) ? $input['rooms'] : [];
    $inputExtinguishers = isset($input['extinguishers']) && is_array($input['extinguishers']) ? $input['extinguishers'] : [];

    if ($name === '') {
        respond(422, ['error' => 'Object name is required.']);
    }

    $pdo = db();
    $pdo->beginTransaction();

    try {
        $updateObject = $pdo->prepare(
            'UPDATE objects
             SET name = :name, address = :address
             WHERE id = :id AND organization_id = :organization_id'
        );
        $updateObject->execute([
            'name' => $name,
            'address' => $address !== '' ? $address : null,
            'id' => $objectId,
            'organization_id' => $organization['id'],
        ]);

        $roomIdByClientKey = [];
        $keptRoomIds = [];

        $roomCheck = $pdo->prepare('SELECT id FROM rooms WHERE id = :id AND object_id = :object_id LIMIT 1');
        $updateRoom = $pdo->prepare(
            'UPDATE rooms
             SET building_name = :building_name, floor_name = :floor_name, name = :name, fire_zone = :fire_zone
             WHERE id = :id AND object_id = :object_id'
        );
        $insertRoom = $pdo->prepare(
            'INSERT INTO rooms (object_id, building_name, floor_name, name, fire_zone)
             VALUES (:object_id, :building_name, :floor_name, :name, :fire_zone)'
        );

        foreach ($inputRooms as $room) {
            $roomName = trim((string)(isset($room['name']) ? $room['name'] : ''));

            if ($roomName === '') {
                continue;
            }

            $roomId = (int)(isset($room['id']) ? $room['id'] : 0);
            $clientKey = trim((string)(isset($room['clientKey']) ? $room['clientKey'] : ''));
            $roomPayload = [
                'building_name' => trim((string)(isset($room['buildingName']) ? $room['buildingName'] : '')) ?: null,
                'floor_name' => trim((string)(isset($room['floorName']) ? $room['floorName'] : '')) ?: null,
                'name' => $roomName,
                'fire_zone' => trim((string)(isset($room['fireZone']) ? $room['fireZone'] : '')) ?: null,
            ];

            if ($roomId > 0) {
                $roomCheck->execute(['id' => $roomId, 'object_id' => $objectId]);

                if ($roomCheck->fetch()) {
                    $updateRoom->execute([
                        'building_name' => $roomPayload['building_name'],
                        'floor_name' => $roomPayload['floor_name'],
                        'name' => $roomPayload['name'],
                        'fire_zone' => $roomPayload['fire_zone'],
                        'id' => $roomId,
                        'object_id' => $objectId,
                    ]);
                    $resolvedRoomId = $roomId;
                } else {
                    $resolvedRoomId = 0;
                }
            } else {
                $insertRoom->execute([
                    'object_id' => $objectId,
                    'building_name' => $roomPayload['building_name'],
                    'floor_name' => $roomPayload['floor_name'],
                    'name' => $roomPayload['name'],
                    'fire_zone' => $roomPayload['fire_zone'],
                ]);
                $resolvedRoomId = (int)$pdo->lastInsertId();
            }

            if ($resolvedRoomId > 0) {
                $keptRoomIds[] = $resolvedRoomId;

                if ($clientKey !== '') {
                    $roomIdByClientKey[$clientKey] = $resolvedRoomId;
                }
            }
        }

        $existingRooms = $pdo->prepare(
            'SELECT rooms.id, COUNT(extinguishers.id) AS extinguishers_count
             FROM rooms
             LEFT JOIN extinguishers ON extinguishers.room_id = rooms.id
             WHERE rooms.object_id = :object_id
             GROUP BY rooms.id'
        );
        $existingRooms->execute(['object_id' => $objectId]);
        $deleteRoom = $pdo->prepare('DELETE FROM rooms WHERE id = :id AND object_id = :object_id');

        foreach ($existingRooms->fetchAll() as $existingRoom) {
            $existingRoomId = (int)$existingRoom['id'];

            if (!in_array($existingRoomId, $keptRoomIds, true) && (int)$existingRoom['extinguishers_count'] === 0) {
                $deleteRoom->execute(['id' => $existingRoomId, 'object_id' => $objectId]);
            }
        }

        $extinguisherCheck = $pdo->prepare(
            'SELECT id, room_id, number, name FROM extinguishers
             WHERE id = :id AND organization_id = :organization_id AND object_id = :object_id
             LIMIT 1'
        );
        $updateExtinguisher = $pdo->prepare(
            'UPDATE extinguishers
             SET room_id = :room_id, number = :number, name = :name
             WHERE id = :id AND organization_id = :organization_id AND object_id = :object_id'
        );
        $insertExtinguisherEvent = $pdo->prepare(
            'INSERT INTO extinguisher_events (
                organization_id, object_id, extinguisher_id, event_type, title, actor_name, actor_role, event_at, details
             )
             VALUES (
                :organization_id, :object_id, :extinguisher_id, "changed", "Изменения в карточке",
                :actor_name, "organization", NOW(), :details
             )'
        );

        foreach ($inputExtinguishers as $extinguisher) {
            $extinguisherId = (int)(isset($extinguisher['id']) ? $extinguisher['id'] : 0);
            $number = trim((string)(isset($extinguisher['number']) ? $extinguisher['number'] : ''));

            if ($extinguisherId <= 0 || $number === '') {
                continue;
            }

            $extinguisherCheck->execute([
                'id' => $extinguisherId,
                'organization_id' => $organization['id'],
                'object_id' => $objectId,
            ]);

            $existingExtinguisher = $extinguisherCheck->fetch();

            if (!$existingExtinguisher) {
                continue;
            }

            $roomClientKey = trim((string)(isset($extinguisher['roomClientKey']) ? $extinguisher['roomClientKey'] : ''));
            $roomId = isset($roomIdByClientKey[$roomClientKey]) ? (int)$roomIdByClientKey[$roomClientKey] : null;
            $extinguisherName = trim((string)(isset($extinguisher['name']) ? $extinguisher['name'] : ''));
            $savedName = $extinguisherName !== '' ? $extinguisherName : null;
            $hasCardChanges = (string)$existingExtinguisher['number'] !== $number
                || (string)(isset($existingExtinguisher['name']) ? $existingExtinguisher['name'] : '') !== (string)$savedName
                || (int)(isset($existingExtinguisher['room_id']) ? $existingExtinguisher['room_id'] : 0) !== (int)$roomId;

            $updateExtinguisher->execute([
                'room_id' => $roomId,
                'number' => $number,
                'name' => $savedName,
                'id' => $extinguisherId,
                'organization_id' => $organization['id'],
                'object_id' => $objectId,
            ]);

            if ($hasCardChanges) {
                $insertExtinguisherEvent->execute([
                    'organization_id' => $organization['id'],
                    'object_id' => $objectId,
                    'extinguisher_id' => $extinguisherId,
                    'actor_name' => $user['full_name'] ? $user['full_name'] : $organization['name'],
                    'details' => json_encode([
                        'before' => [
                            'roomId' => isset($existingExtinguisher['room_id']) ? $existingExtinguisher['room_id'] : null,
                            'number' => isset($existingExtinguisher['number']) ? $existingExtinguisher['number'] : '',
                            'name' => isset($existingExtinguisher['name']) ? $existingExtinguisher['name'] : '',
                        ],
                        'after' => [
                            'roomId' => $roomId,
                            'number' => $number,
                            'name' => $savedName,
                        ],
                    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
                ]);
            }
        }

        $pdo->commit();
    } catch (Exception $error) {
        $pdo->rollBack();
        respond(500, ['error' => 'Could not update object.']);
    }

    respond(200, ['ok' => true]);
}

respond(405, ['error' => 'Method not allowed.']);
