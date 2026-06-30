<?php

require __DIR__ . '/../bootstrap.php';

$user = require_user();
$organization = require_organization($user);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['error' => 'Method not allowed.']);
}

$input = input_json();
$objectId = (int)(isset($input['objectId']) ? $input['objectId'] : 0);
$roomId = (int)(isset($input['roomId']) ? $input['roomId'] : 0);
$floorName = trim((string)(isset($input['floorName']) ? $input['floorName'] : ''));
$fireZone = trim((string)(isset($input['fireZone']) ? $input['fireZone'] : ''));
$buildingName = trim((string)(isset($input['buildingName']) ? $input['buildingName'] : ''));
$manualPlace = trim((string)(isset($input['manualPlace']) ? $input['manualPlace'] : ''));
$exactPlace = trim((string)(isset($input['exactPlace']) ? $input['exactPlace'] : ''));
$number = trim((string)(isset($input['number']) ? $input['number'] : ''));
$name = trim((string)(isset($input['name']) ? $input['name'] : ''));
$typeMark = trim((string)(isset($input['typeMark']) ? $input['typeMark'] : $name));
$manufacturer = trim((string)(isset($input['manufacturer']) ? $input['manufacturer'] : ''));
$factoryNumber = trim((string)(isset($input['factoryNumber']) ? $input['factoryNumber'] : ''));
$placementDate = trim((string)(isset($input['placementDate']) ? $input['placementDate'] : ''));
$manufactureDate = trim((string)(isset($input['manufactureDate']) ? $input['manufactureDate'] : (isset($input['releaseDate']) ? $input['releaseDate'] : '')));
$nextRechargeDate = trim((string)(isset($input['nextRechargeDate']) ? $input['nextRechargeDate'] : ''));
$serviceLife = trim((string)(isset($input['serviceLife']) ? $input['serviceLife'] : ''));
$responsiblePerson = trim((string)(isset($input['responsiblePerson']) ? $input['responsiblePerson'] : ''));
$photoFileId = (int)(isset($input['photoFileId']) ? $input['photoFileId'] : 0);

if ($objectId <= 0 || $number === '') {
    respond(422, ['error' => 'Object and extinguisher number are required.']);
}

$objectCheck = db()->prepare('SELECT id FROM objects WHERE id = :id AND organization_id = :organization_id LIMIT 1');
$objectCheck->execute(['id' => $objectId, 'organization_id' => $organization['id']]);

if (!$objectCheck->fetch()) {
    respond(404, ['error' => 'Object not found.']);
}

require_scoped_file($photoFileId, $organization['id'], $objectId, true);

$resolvedRoomId = $roomId > 0 ? $roomId : null;

if ($roomId > 0) {
    $roomCheck = db()->prepare(
        'SELECT rooms.*
         FROM rooms
         INNER JOIN objects ON objects.id = rooms.object_id
         WHERE rooms.id = :room_id
           AND rooms.object_id = :object_id
           AND objects.organization_id = :organization_id
         LIMIT 1'
    );
    $roomCheck->execute([
        'room_id' => $roomId,
        'object_id' => $objectId,
        'organization_id' => $organization['id'],
    ]);
    $room = $roomCheck->fetch();

    if (!$room) {
        respond(404, ['error' => 'Room not found.']);
    }

    $selectedFloor = $floorName !== '' ? $floorName : (isset($room['floor_name']) ? $room['floor_name'] : '');
    $selectedZone = $fireZone !== '' ? $fireZone : (isset($room['fire_zone']) ? $room['fire_zone'] : '');
    $selectedBuilding = $buildingName !== '' ? $buildingName : (isset($room['building_name']) ? $room['building_name'] : '');

    if ($selectedFloor !== '' && $selectedFloor !== (isset($room['floor_name']) ? $room['floor_name'] : '')) {
        $existingRoom = db()->prepare(
            'SELECT id FROM rooms
             WHERE object_id = :object_id
               AND name = :name
               AND COALESCE(building_name, "") = :building_name
               AND COALESCE(floor_name, "") = :floor_name
               AND COALESCE(fire_zone, "") = :fire_zone
             LIMIT 1'
        );
        $existingRoom->execute([
            'object_id' => $objectId,
            'name' => $room['name'],
            'building_name' => $selectedBuilding,
            'floor_name' => $selectedFloor,
            'fire_zone' => $selectedZone,
        ]);
        $existing = $existingRoom->fetch();

        if ($existing) {
            $resolvedRoomId = (int)$existing['id'];
        } else {
            $insertRoom = db()->prepare(
                'INSERT INTO rooms (object_id, building_name, floor_name, name, fire_zone)
                 VALUES (:object_id, :building_name, :floor_name, :name, :fire_zone)'
            );
            $insertRoom->execute([
                'object_id' => $objectId,
                'building_name' => $selectedBuilding !== '' ? $selectedBuilding : null,
                'floor_name' => $selectedFloor,
                'name' => $room['name'],
                'fire_zone' => $selectedZone !== '' ? $selectedZone : null,
            ]);
            $resolvedRoomId = (int)db()->lastInsertId();
        }
    }
}

if ($resolvedRoomId === null && $manualPlace !== '') {
    $existingManualRoom = db()->prepare(
        'SELECT id FROM rooms
         WHERE object_id = :object_id
           AND name = :name
           AND COALESCE(building_name, "") = ""
           AND COALESCE(floor_name, "") = ""
           AND COALESCE(fire_zone, "") = ""
         LIMIT 1'
    );
    $existingManualRoom->execute([
        'object_id' => $objectId,
        'name' => $manualPlace,
    ]);
    $manualRoom = $existingManualRoom->fetch();

    if ($manualRoom) {
        $resolvedRoomId = (int)$manualRoom['id'];
    } else {
        $insertManualRoom = db()->prepare(
            'INSERT INTO rooms (object_id, building_name, floor_name, name, fire_zone)
             VALUES (:object_id, NULL, NULL, :name, NULL)'
        );
        $insertManualRoom->execute([
            'object_id' => $objectId,
            'name' => $manualPlace,
        ]);
        $resolvedRoomId = (int)db()->lastInsertId();
    }
}

$statement = db()->prepare(
    'INSERT INTO extinguishers (
        organization_id, object_id, room_id, exact_place, number, name, type_mark, manufacturer, factory_number,
        placement_date, manufacture_date, next_recharge_date, service_life, responsible_person, status, photo_file_id
     )
     VALUES (
        :organization_id, :object_id, :room_id, :exact_place, :number, :name, :type_mark, :manufacturer, :factory_number,
        :placement_date, :manufacture_date, :next_recharge_date, :service_life, :responsible_person, "ok", :photo_file_id
     )'
);
$statement->execute([
    'organization_id' => $organization['id'],
    'object_id' => $objectId,
    'room_id' => $resolvedRoomId,
    'exact_place' => $exactPlace !== '' ? $exactPlace : null,
    'number' => $number,
    'name' => $name !== '' ? $name : null,
    'type_mark' => $typeMark !== '' ? $typeMark : null,
    'manufacturer' => $manufacturer !== '' ? $manufacturer : null,
    'factory_number' => $factoryNumber !== '' ? $factoryNumber : null,
    'placement_date' => $placementDate !== '' ? $placementDate : null,
    'manufacture_date' => $manufactureDate !== '' ? $manufactureDate : null,
    'next_recharge_date' => $nextRechargeDate !== '' ? $nextRechargeDate : null,
    'service_life' => $serviceLife !== '' ? $serviceLife : null,
    'responsible_person' => $responsiblePerson !== '' ? $responsiblePerson : null,
    'photo_file_id' => $photoFileId > 0 ? $photoFileId : null,
]);
$extinguisherId = (int)db()->lastInsertId();

$event = db()->prepare(
    'INSERT INTO extinguisher_events (
        organization_id, object_id, extinguisher_id, event_type, title, actor_name, actor_role, event_at, details
     )
     VALUES (
        :organization_id, :object_id, :extinguisher_id, "commissioned", "Введен в эксплуатацию",
        :actor_name, "organization", NOW(), :details
     )'
);
$event->execute([
    'organization_id' => $organization['id'],
    'object_id' => $objectId,
    'extinguisher_id' => $extinguisherId,
    'actor_name' => $user['full_name'] ? $user['full_name'] : $organization['name'],
    'details' => json_encode([
        'number' => $number,
        'place' => $manualPlace,
        'exactPlace' => $exactPlace,
        'typeMark' => $typeMark,
        'placementDate' => $placementDate,
        'manufacturer' => $manufacturer,
        'factoryNumber' => $factoryNumber,
        'manufactureDate' => $manufactureDate,
        'nextRechargeDate' => $nextRechargeDate,
        'serviceLife' => $serviceLife,
        'responsiblePerson' => $responsiblePerson,
        'photoFileId' => $photoFileId > 0 ? $photoFileId : null,
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
]);

respond(201, ['id' => $extinguisherId]);
