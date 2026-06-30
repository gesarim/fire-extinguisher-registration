<?php

require __DIR__ . '/../bootstrap.php';

$user = require_user();
require_contractor($user);

$objectId = (int)(isset($_GET['id']) ? $_GET['id'] : 0);

if ($objectId <= 0) {
    respond(422, ['error' => 'Object id is required.']);
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

$rooms = db()->prepare('SELECT * FROM rooms WHERE object_id = :object_id ORDER BY created_at ASC');
$rooms->execute(['object_id' => $objectId]);

$extinguishers = db()->prepare(
    'SELECT extinguishers.*, rooms.name AS room_name, rooms.floor_name, rooms.fire_zone,
       (SELECT issues.title FROM issues
        WHERE issues.extinguisher_id = extinguishers.id AND issues.status = "open"
        ORDER BY issues.created_at DESC LIMIT 1) AS latest_issue_title
     FROM extinguishers
     LEFT JOIN rooms ON rooms.id = extinguishers.room_id
     WHERE extinguishers.object_id = :object_id
     ORDER BY extinguishers.created_at ASC'
);
$extinguishers->execute(['object_id' => $objectId]);
$extinguisherRows = $extinguishers->fetchAll();

$issues = db()->prepare(
    'SELECT issues.*, extinguishers.number AS extinguisher_number
     FROM issues
     LEFT JOIN extinguishers ON extinguishers.id = issues.extinguisher_id
     WHERE issues.organization_id = :organization_id AND issues.object_id = :object_id
     ORDER BY issues.created_at DESC'
);
$issues->execute([
    'organization_id' => $object['organization_id'],
    'object_id' => $objectId,
]);

$extinguisherEvents = db()->prepare(
    'SELECT * FROM extinguisher_events
     WHERE organization_id = :organization_id AND object_id = :object_id
     ORDER BY event_at DESC, created_at DESC'
);
$extinguisherEvents->execute([
    'organization_id' => $object['organization_id'],
    'object_id' => $objectId,
]);

$inspections = db()->prepare(
    'SELECT * FROM inspections
     WHERE organization_id = :organization_id AND object_id = :object_id
     ORDER BY COALESCE(completed_at, planned_at, created_at) DESC'
);
$inspections->execute([
    'organization_id' => $object['organization_id'],
    'object_id' => $objectId,
]);
$inspectionRows = $inspections->fetchAll();

if (count($inspectionRows)) {
    $inspectionIds = array_map(function ($inspection) {
        return (int)$inspection['id'];
    }, $inspectionRows);
    $placeholders = implode(',', array_fill(0, count($inspectionIds), '?'));
    $items = db()->prepare(
        'SELECT * FROM inspection_items WHERE inspection_id IN (' . $placeholders . ') ORDER BY created_at ASC'
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
    'organization_id' => $object['organization_id'],
    'object_id' => $objectId,
]);

$request = db()->prepare(
    'SELECT *
     FROM inspection_requests
     WHERE object_id = :object_id AND status IN ("new", "scheduled")
     ORDER BY preferred_date IS NULL, preferred_date ASC, created_at DESC
     LIMIT 1'
);
$request->execute(['object_id' => $objectId]);

$draft = db()->prepare(
    'SELECT employee_name, payload, updated_at
     FROM contractor_inspection_drafts
     WHERE contractor_user_id = :contractor_user_id AND object_id = :object_id
     LIMIT 1'
);
$draft->execute([
    'contractor_user_id' => $user['id'],
    'object_id' => $objectId,
]);
$draftRow = $draft->fetch();
$draftPayload = $draftRow ? json_decode(isset($draftRow['payload']) ? $draftRow['payload'] : '{}', true) : [];

if (!is_array($draftPayload)) {
    $draftPayload = [];
}

respond(200, [
    'object' => $object,
    'rooms' => $rooms->fetchAll(),
    'extinguishers' => $extinguisherRows,
    'extinguisherEvents' => $extinguisherEvents->fetchAll(),
    'issues' => $issues->fetchAll(),
    'inspections' => $inspectionRows,
    'metrics' => $metrics->fetch(),
    'request' => $request->fetch(),
    'draft' => $draftRow ? [
        'employeeName' => isset($draftRow['employee_name']) ? $draftRow['employee_name'] : '',
        'inspectionType' => isset($draftPayload['inspectionType']) ? $draftPayload['inspectionType'] : 'Ежеквартальная',
        'items' => isset($draftPayload['items']) && is_array($draftPayload['items']) ? $draftPayload['items'] : [],
        'updatedAt' => isset($draftRow['updated_at']) ? $draftRow['updated_at'] : null,
    ] : null,
]);
