<?php

require __DIR__ . '/../bootstrap.php';

$user = require_user();
require_contractor($user);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['error' => 'Method not allowed.']);
}

function contractor_result_status($result, $decommissioned)
{
    if ($decommissioned) {
        return 'decommissioned';
    }

    if (preg_match('/замен|ремонт/ui', $result)) {
        return 'broken';
    }

    if (preg_match('/перезаряд|треб/ui', $result)) {
        return 'needs_check';
    }

    return 'ok';
}

$input = input_json();
$objectId = (int)(isset($input['objectId']) ? $input['objectId'] : 0);
$employeeName = trim((string)(isset($input['employeeName']) ? $input['employeeName'] : ''));
$inspectionType = trim((string)(isset($input['inspectionType']) ? $input['inspectionType'] : 'Ежеквартальная'));
$items = isset($input['items']) && is_array($input['items']) ? $input['items'] : [];

if (!in_array($inspectionType, ['Ежеквартальная', 'Ежегодная'], true)) {
    $inspectionType = 'Ежеквартальная';
}

if ($objectId <= 0) {
    respond(422, ['error' => 'Object is required.']);
}

if (!count($items)) {
    respond(422, ['error' => 'Inspection items are required.']);
}

$objectStatement = db()->prepare(
    'SELECT objects.*, organizations.name AS organization_name, contractor_links.contractor_name
     FROM objects
     INNER JOIN organizations ON organizations.id = objects.organization_id
     INNER JOIN contractor_links ON contractor_links.organization_id = objects.organization_id
     WHERE objects.id = :object_id
       AND contractor_links.contractor_user_id = :contractor_user_id
       AND contractor_links.status = "active"
     LIMIT 1'
);
$objectStatement->execute([
    'object_id' => $objectId,
    'contractor_user_id' => $user['id'],
]);
$object = $objectStatement->fetch();

if (!$object) {
    respond(404, ['error' => 'Object not found.']);
}

$request = db()->prepare(
    'SELECT id, preferred_date
     FROM inspection_requests
     WHERE organization_id = :organization_id AND object_id = :object_id AND status IN ("new", "scheduled")
     ORDER BY preferred_date IS NULL, preferred_date ASC, created_at DESC
     LIMIT 1'
);
$request->execute([
    'organization_id' => $object['organization_id'],
    'object_id' => $objectId,
]);
$requestRow = $request->fetch();
$plannedAt = $requestRow && $requestRow['preferred_date'] ? $requestRow['preferred_date'] . ' 00:00:00' : null;
$inspectionActorName = $employeeName !== '' ? $employeeName : ($user['full_name'] ?: $object['contractor_name']);

$pdo = db();
$pdo->beginTransaction();

try {
    $roomStatement = $pdo->prepare('SELECT id FROM rooms WHERE object_id = :object_id');
    $roomStatement->execute(['object_id' => $objectId]);
    $allowedRoomIds = [];

    foreach ($roomStatement->fetchAll() as $roomRow) {
        $allowedRoomIds[(int)$roomRow['id']] = true;
    }

    $inspection = $pdo->prepare(
        'INSERT INTO inspections (
            organization_id, object_id, contractor_user_id, contractor_name, employee_name,
            inspection_type, title, planned_at, completed_at
         )
         VALUES (
            :organization_id, :object_id, :contractor_user_id, :contractor_name, :employee_name,
            :inspection_type, :title, :planned_at, NOW()
         )'
    );
    $inspection->execute([
        'organization_id' => $object['organization_id'],
        'object_id' => $objectId,
        'contractor_user_id' => $user['id'],
        'contractor_name' => $object['contractor_name'],
        'employee_name' => $inspectionActorName,
        'inspection_type' => $inspectionType,
        'title' => $inspectionType . ' проверка',
        'planned_at' => $plannedAt,
    ]);
    $inspectionId = (int)$pdo->lastInsertId();

    $insertExtinguisher = $pdo->prepare(
        'INSERT INTO extinguishers (
            organization_id, object_id, room_id, number, name, type_mark, manufacturer, factory_number,
            placement_date, manufacture_date, next_recharge_date, service_life, responsible_person, status, photo_file_id
         )
         VALUES (
            :organization_id, :object_id, :room_id, :number, :name, :type_mark, :manufacturer, :factory_number,
            :placement_date, :manufacture_date, :next_recharge_date, :service_life, :responsible_person, :status, :photo_file_id
         )'
    );
    $updateExtinguisher = $pdo->prepare(
        'UPDATE extinguishers
         SET name = :name,
             type_mark = :type_mark,
             manufacturer = :manufacturer,
             factory_number = :factory_number,
             placement_date = :placement_date,
             manufacture_date = :manufacture_date,
             next_recharge_date = :next_recharge_date,
             service_life = :service_life,
             responsible_person = :responsible_person,
             status = :status,
             photo_file_id = COALESCE(:photo_file_id, photo_file_id)
         WHERE id = :id AND organization_id = :organization_id AND object_id = :object_id'
    );
    $insertItem = $pdo->prepare(
        'INSERT INTO inspection_items (
            inspection_id, extinguisher_id, number, place, name, manufacturer, release_date, factory_number,
            assigned_number, placement_date, manufacture_date, next_recharge_date, service_life, responsible_person,
            next_planned_test_date, recharge_date, otv_mark, post_recharge_result,
            mass, check_type, work_types, result, comment, photo_file_id
         )
         VALUES (
            :inspection_id, :extinguisher_id, :number, :place, :name, :manufacturer, :release_date, :factory_number,
            :assigned_number, :placement_date, :manufacture_date, :next_recharge_date, :service_life, :responsible_person,
            :next_planned_test_date, :recharge_date, :otv_mark, :post_recharge_result,
            :mass, :check_type, :work_types, :result, :comment, :photo_file_id
         )'
    );
    $insertIssue = $pdo->prepare(
        'INSERT INTO issues (organization_id, object_id, extinguisher_id, title, comment, photo_file_id)
         VALUES (:organization_id, :object_id, :extinguisher_id, :title, :comment, :photo_file_id)'
    );
    $insertEvent = $pdo->prepare(
        'INSERT INTO extinguisher_events (
            organization_id, object_id, extinguisher_id, event_type, title, actor_name, actor_role, event_at, details
         )
         VALUES (
            :organization_id, :object_id, :extinguisher_id, :event_type, :title,
            :actor_name, "contractor", NOW(), :details
         )'
    );

    foreach ($items as $item) {
        $extinguisherId = (int)(isset($item['id']) ? $item['id'] : 0);
        $isNewExtinguisher = $extinguisherId <= 0;
        $roomId = (int)(isset($item['roomId']) ? $item['roomId'] : 0);
        $number = trim((string)(isset($item['number']) ? $item['number'] : ''));
        $assignedNumber = trim((string)(isset($item['assignedNumber']) ? $item['assignedNumber'] : ''));
        $name = trim((string)(isset($item['name']) ? $item['name'] : ''));
        $typeMark = trim((string)(isset($item['typeMark']) ? $item['typeMark'] : $name));
        $manufacturer = trim((string)(isset($item['manufacturer']) ? $item['manufacturer'] : ''));
        $factoryNumber = trim((string)(isset($item['factoryNumber']) ? $item['factoryNumber'] : ''));
        $placementDate = trim((string)(isset($item['placementDate']) ? $item['placementDate'] : ''));
        $manufactureDate = trim((string)(isset($item['manufactureDate']) ? $item['manufactureDate'] : (isset($item['releaseDate']) ? $item['releaseDate'] : '')));
        $releaseDate = trim((string)(isset($item['releaseDate']) ? $item['releaseDate'] : $manufactureDate));
        $nextRechargeDate = trim((string)(isset($item['nextRechargeDate']) ? $item['nextRechargeDate'] : ''));
        $serviceLife = trim((string)(isset($item['serviceLife']) ? $item['serviceLife'] : ''));
        $responsiblePerson = trim((string)(isset($item['responsiblePerson']) ? $item['responsiblePerson'] : ''));
        $nextTestDate = trim((string)(isset($item['nextTestDate']) ? $item['nextTestDate'] : ''));
        $rechargeDate = trim((string)(isset($item['rechargeDate']) ? $item['rechargeDate'] : ''));
        $otvMark = trim((string)(isset($item['otvMark']) ? $item['otvMark'] : ''));
        $postRechargeResult = trim((string)(isset($item['postRechargeResult']) ? $item['postRechargeResult'] : ''));
        $result = trim((string)(isset($item['result']) ? $item['result'] : ''));
        $workTypes = isset($item['workTypes']) && is_array($item['workTypes']) ? $item['workTypes'] : [];
        $workTypes = array_values(array_filter(array_map(function ($workType) {
            return trim((string)$workType);
        }, $workTypes)));
        $comment = trim((string)(isset($item['comment']) ? $item['comment'] : ''));
        $decommissioned = !empty($item['decommissioned']);
        $photoFileId = (int)(isset($item['photoFileId']) ? $item['photoFileId'] : 0);
        $status = contractor_result_status($result, $decommissioned);

        require_scoped_file($photoFileId, $object['organization_id'], $objectId, true);

        if ($number === '') {
            $number = $assignedNumber !== '' ? $assignedNumber : 'Без номера';
        }

        if ($extinguisherId > 0) {
            $updateExtinguisher->execute([
                'id' => $extinguisherId,
                'organization_id' => $object['organization_id'],
                'object_id' => $objectId,
                'name' => $name !== '' ? $name : null,
                'type_mark' => $typeMark !== '' ? $typeMark : null,
                'manufacturer' => $manufacturer !== '' ? $manufacturer : null,
                'factory_number' => $factoryNumber !== '' ? $factoryNumber : null,
                'placement_date' => $placementDate !== '' ? $placementDate : null,
                'manufacture_date' => $manufactureDate !== '' ? $manufactureDate : null,
                'next_recharge_date' => $nextRechargeDate !== '' ? $nextRechargeDate : null,
                'service_life' => $serviceLife !== '' ? $serviceLife : null,
                'responsible_person' => $responsiblePerson !== '' ? $responsiblePerson : null,
                'status' => $status,
                'photo_file_id' => $photoFileId > 0 ? $photoFileId : null,
            ]);
        } else {
            $insertExtinguisher->execute([
                'organization_id' => $object['organization_id'],
                'object_id' => $objectId,
                'room_id' => $roomId > 0 && isset($allowedRoomIds[$roomId]) ? $roomId : null,
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
                'status' => $status,
                'photo_file_id' => $photoFileId > 0 ? $photoFileId : null,
            ]);
            $extinguisherId = (int)$pdo->lastInsertId();
        }

        $eventType = 'checked';
        $eventTitle = 'Проверка выполнена';

        if ($isNewExtinguisher) {
            $eventType = 'commissioned';
            $eventTitle = 'Введен в эксплуатацию';
        } elseif ($decommissioned) {
            $eventType = 'decommissioned';
            $eventTitle = 'Снят с эксплуатации';
        } elseif (preg_match('/замен/ui', $result)) {
            $eventType = 'replacement_required';
            $eventTitle = 'Отмечен к замене';
        } elseif ($status !== 'ok') {
            $eventType = 'issue';
            $eventTitle = $result !== '' ? $result : 'Зафиксировано отклонение';
        }

        $insertEvent->execute([
            'organization_id' => $object['organization_id'],
            'object_id' => $objectId,
            'extinguisher_id' => $extinguisherId > 0 ? $extinguisherId : null,
            'event_type' => $eventType,
            'title' => $eventTitle,
            'actor_name' => $inspectionActorName,
            'details' => json_encode([
                'number' => $number,
                'place' => trim((string)(isset($item['place']) ? $item['place'] : '')),
                'typeMark' => $typeMark,
                'manufacturer' => $manufacturer,
                'factoryNumber' => $factoryNumber,
                'placementDate' => $placementDate,
                'manufactureDate' => $manufactureDate,
                'nextRechargeDate' => $nextRechargeDate,
                'serviceLife' => $serviceLife,
                'responsiblePerson' => $responsiblePerson,
                'nextTestDate' => $nextTestDate,
                'rechargeDate' => $rechargeDate,
                'otvMark' => $otvMark,
                'postRechargeResult' => $postRechargeResult,
                'checkType' => trim((string)(isset($item['checkType']) ? $item['checkType'] : '')),
                'workTypes' => $workTypes,
                'inspectionType' => $inspectionType,
                'result' => $result,
                'comment' => $comment,
                'inspectionId' => $inspectionId,
                'photoFileId' => $photoFileId > 0 ? $photoFileId : null,
            ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
        ]);

        $insertItem->execute([
            'inspection_id' => $inspectionId,
            'extinguisher_id' => $extinguisherId > 0 ? $extinguisherId : null,
            'number' => $number,
            'place' => trim((string)(isset($item['place']) ? $item['place'] : '')) ?: null,
            'name' => $name !== '' ? $name : null,
            'manufacturer' => $manufacturer !== '' ? $manufacturer : null,
            'release_date' => $releaseDate !== '' ? $releaseDate : null,
            'factory_number' => $factoryNumber !== '' ? $factoryNumber : null,
            'assigned_number' => $assignedNumber !== '' ? $assignedNumber : null,
            'placement_date' => $placementDate !== '' ? $placementDate : null,
            'manufacture_date' => $manufactureDate !== '' ? $manufactureDate : null,
            'next_recharge_date' => $nextRechargeDate !== '' ? $nextRechargeDate : null,
            'service_life' => $serviceLife !== '' ? $serviceLife : null,
            'responsible_person' => $responsiblePerson !== '' ? $responsiblePerson : null,
            'next_planned_test_date' => $nextTestDate !== '' ? $nextTestDate : null,
            'recharge_date' => $rechargeDate !== '' ? $rechargeDate : null,
            'otv_mark' => $otvMark !== '' ? $otvMark : null,
            'post_recharge_result' => $postRechargeResult !== '' ? $postRechargeResult : null,
            'mass' => trim((string)(isset($item['mass']) ? $item['mass'] : '')) ?: null,
            'check_type' => trim((string)(isset($item['checkType']) ? $item['checkType'] : '')) ?: null,
            'work_types' => count($workTypes) ? json_encode($workTypes, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) : null,
            'result' => $result !== '' ? $result : null,
            'comment' => $comment !== '' ? $comment : null,
            'photo_file_id' => $photoFileId > 0 ? $photoFileId : null,
        ]);

        if ($status !== 'ok') {
            $issueTitle = $decommissioned
                ? 'Огнетушитель № ' . $number . ' снят с эксплуатации'
                : 'Огнетушитель № ' . $number . ': ' . ($result !== '' ? $result : 'требует внимания');
            $insertIssue->execute([
                'organization_id' => $object['organization_id'],
                'object_id' => $objectId,
                'extinguisher_id' => $extinguisherId > 0 ? $extinguisherId : null,
                'title' => $issueTitle,
                'comment' => $comment !== '' ? $comment : null,
                'photo_file_id' => $photoFileId > 0 ? $photoFileId : null,
            ]);
        }
    }

    if ($requestRow) {
        $finishRequest = $pdo->prepare('UPDATE inspection_requests SET status = "done" WHERE id = :id');
        $finishRequest->execute(['id' => $requestRow['id']]);
    }

    $deleteDraft = $pdo->prepare(
        'DELETE FROM contractor_inspection_drafts
         WHERE contractor_user_id = :contractor_user_id AND object_id = :object_id'
    );
    $deleteDraft->execute([
        'contractor_user_id' => $user['id'],
        'object_id' => $objectId,
    ]);

    $pdo->commit();
} catch (Exception $error) {
    $pdo->rollBack();
    respond(500, ['error' => 'Could not finish inspection.']);
}

respond(201, ['id' => $inspectionId]);
