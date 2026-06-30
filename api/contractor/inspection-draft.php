<?php

require __DIR__ . '/../bootstrap.php';

$user = require_user();
require_contractor($user);

function require_contractor_object($user, $objectId)
{
    if ($objectId <= 0) {
        respond(422, ['error' => 'Object is required.']);
    }

    $statement = db()->prepare(
        'SELECT objects.*, contractor_links.contractor_name
         FROM objects
         INNER JOIN contractor_links ON contractor_links.organization_id = objects.organization_id
         WHERE objects.id = :object_id
           AND contractor_links.contractor_user_id = :contractor_user_id
           AND contractor_links.status = "active"
         LIMIT 1'
    );
    $statement->execute([
        'object_id' => $objectId,
        'contractor_user_id' => $user['id'],
    ]);
    $object = $statement->fetch();

    if (!$object) {
        respond(404, ['error' => 'Object not found.']);
    }

    return $object;
}

function normalize_draft_items($items)
{
    if (!is_array($items)) {
        return [];
    }

    $normalized = [];

    foreach ($items as $item) {
        if (!is_array($item)) {
            continue;
        }

        $number = trim((string)(isset($item['number']) ? $item['number'] : ''));
        $assignedNumber = trim((string)(isset($item['assignedNumber']) ? $item['assignedNumber'] : ''));

        if ($number === '' && $assignedNumber === '') {
            continue;
        }

        $workTypes = isset($item['workTypes']) && is_array($item['workTypes']) ? $item['workTypes'] : [];
        $workTypes = array_values(array_filter(array_map(function ($workType) {
            return trim((string)$workType);
        }, $workTypes)));

        $normalized[] = [
            'id' => (int)(isset($item['id']) ? $item['id'] : 0),
            'roomId' => (int)(isset($item['roomId']) ? $item['roomId'] : 0),
            'number' => $number !== '' ? $number : $assignedNumber,
            'place' => trim((string)(isset($item['place']) ? $item['place'] : '')),
            'exactPlace' => trim((string)(isset($item['exactPlace']) ? $item['exactPlace'] : '')),
            'name' => trim((string)(isset($item['name']) ? $item['name'] : '')),
            'typeMark' => trim((string)(isset($item['typeMark']) ? $item['typeMark'] : (isset($item['name']) ? $item['name'] : ''))),
            'placementDate' => trim((string)(isset($item['placementDate']) ? $item['placementDate'] : '')),
            'manufacturer' => trim((string)(isset($item['manufacturer']) ? $item['manufacturer'] : '')),
            'releaseDate' => trim((string)(isset($item['releaseDate']) ? $item['releaseDate'] : (isset($item['manufactureDate']) ? $item['manufactureDate'] : ''))),
            'manufactureDate' => trim((string)(isset($item['manufactureDate']) ? $item['manufactureDate'] : (isset($item['releaseDate']) ? $item['releaseDate'] : ''))),
            'factoryNumber' => trim((string)(isset($item['factoryNumber']) ? $item['factoryNumber'] : '')),
            'assignedNumber' => $assignedNumber,
            'nextRechargeDate' => trim((string)(isset($item['nextRechargeDate']) ? $item['nextRechargeDate'] : '')),
            'serviceLife' => trim((string)(isset($item['serviceLife']) ? $item['serviceLife'] : '')),
            'responsiblePerson' => trim((string)(isset($item['responsiblePerson']) ? $item['responsiblePerson'] : '')),
            'nextTestDate' => trim((string)(isset($item['nextTestDate']) ? $item['nextTestDate'] : '')),
            'rechargeDate' => trim((string)(isset($item['rechargeDate']) ? $item['rechargeDate'] : '')),
            'otvMark' => trim((string)(isset($item['otvMark']) ? $item['otvMark'] : '')),
            'postRechargeResult' => trim((string)(isset($item['postRechargeResult']) ? $item['postRechargeResult'] : '')),
            'mass' => trim((string)(isset($item['mass']) ? $item['mass'] : '')),
            'checkType' => trim((string)(isset($item['checkType']) ? $item['checkType'] : '')) ?: 'Ежеквартальная',
            'workTypes' => $workTypes,
            'result' => trim((string)(isset($item['result']) ? $item['result'] : '')),
            'comment' => trim((string)(isset($item['comment']) ? $item['comment'] : '')),
            'photoFileId' => (int)(isset($item['photoFileId']) ? $item['photoFileId'] : 0),
            'checked' => !empty($item['checked']),
            'decommissioned' => !empty($item['decommissioned']),
        ];
    }

    return $normalized;
}

function draft_response($row)
{
    if (!$row) {
        return null;
    }

    $payload = json_decode(isset($row['payload']) ? $row['payload'] : '{}', true);

    if (!is_array($payload)) {
        $payload = [];
    }

    return [
        'employeeName' => isset($row['employee_name']) ? $row['employee_name'] : '',
        'inspectionType' => isset($payload['inspectionType']) ? $payload['inspectionType'] : 'Ежеквартальная',
        'items' => isset($payload['items']) && is_array($payload['items']) ? $payload['items'] : [],
        'updatedAt' => isset($row['updated_at']) ? $row['updated_at'] : null,
    ];
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $objectId = (int)(isset($_GET['objectId']) ? $_GET['objectId'] : 0);
    require_contractor_object($user, $objectId);

    $statement = db()->prepare(
        'SELECT employee_name, payload, updated_at
         FROM contractor_inspection_drafts
         WHERE contractor_user_id = :contractor_user_id AND object_id = :object_id
         LIMIT 1'
    );
    $statement->execute([
        'contractor_user_id' => $user['id'],
        'object_id' => $objectId,
    ]);

    respond(200, ['draft' => draft_response($statement->fetch())]);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = input_json();
    $objectId = (int)(isset($input['objectId']) ? $input['objectId'] : 0);
    $object = require_contractor_object($user, $objectId);
    $employeeName = trim((string)(isset($input['employeeName']) ? $input['employeeName'] : ''));
    $inspectionType = trim((string)(isset($input['inspectionType']) ? $input['inspectionType'] : 'Ежеквартальная'));
    $items = normalize_draft_items(isset($input['items']) ? $input['items'] : []);

    if (!in_array($inspectionType, ['Ежеквартальная', 'Ежегодная'], true)) {
        $inspectionType = 'Ежеквартальная';
    }

    if (!count($items)) {
        respond(422, ['error' => 'Inspection items are required.']);
    }

    foreach ($items as $item) {
        require_scoped_file(isset($item['photoFileId']) ? $item['photoFileId'] : 0, $object['organization_id'], $objectId, true);
    }

    $payload = json_encode([
        'inspectionType' => $inspectionType,
        'items' => $items,
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    $statement = db()->prepare(
        'INSERT INTO contractor_inspection_drafts (contractor_user_id, organization_id, object_id, employee_name, payload)
         VALUES (:contractor_user_id, :organization_id, :object_id, :employee_name, :payload)
         ON DUPLICATE KEY UPDATE
           organization_id = VALUES(organization_id),
           employee_name = VALUES(employee_name),
           payload = VALUES(payload),
           updated_at = NOW()'
    );
    $statement->execute([
        'contractor_user_id' => $user['id'],
        'organization_id' => $object['organization_id'],
        'object_id' => $objectId,
        'employee_name' => $employeeName !== '' ? $employeeName : null,
        'payload' => $payload,
    ]);

    respond(200, [
        'ok' => true,
        'draft' => [
            'employeeName' => $employeeName,
            'inspectionType' => $inspectionType,
            'items' => $items,
            'updatedAt' => date('Y-m-d H:i:s'),
        ],
    ]);
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $objectId = (int)(isset($_GET['objectId']) ? $_GET['objectId'] : 0);
    require_contractor_object($user, $objectId);

    $statement = db()->prepare(
        'DELETE FROM contractor_inspection_drafts
         WHERE contractor_user_id = :contractor_user_id AND object_id = :object_id'
    );
    $statement->execute([
        'contractor_user_id' => $user['id'],
        'object_id' => $objectId,
    ]);

    respond(200, ['ok' => true]);
}

respond(405, ['error' => 'Method not allowed.']);
