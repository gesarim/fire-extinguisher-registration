<?php

require __DIR__ . '/../bootstrap.php';

$user = require_user();
require_contractor($user);

$metrics = db()->prepare(
    'SELECT
       (SELECT COUNT(*)
        FROM objects
        INNER JOIN contractor_links ON contractor_links.organization_id = objects.organization_id
        WHERE contractor_links.contractor_user_id = :contractor_user_id AND contractor_links.status = "active") AS objects,
       (SELECT COUNT(*)
        FROM inspection_requests
        INNER JOIN contractor_links ON contractor_links.organization_id = inspection_requests.organization_id
        WHERE contractor_links.contractor_user_id = :contractor_user_id
          AND contractor_links.status = "active"
          AND inspection_requests.status IN ("new", "scheduled")) AS to_check,
       (SELECT COUNT(*)
        FROM issues
        INNER JOIN contractor_links ON contractor_links.organization_id = issues.organization_id
        WHERE contractor_links.contractor_user_id = :contractor_user_id
          AND contractor_links.status = "active"
          AND issues.status = "open") AS issues,
       (SELECT COUNT(*)
        FROM extinguishers
        INNER JOIN contractor_links ON contractor_links.organization_id = extinguishers.organization_id
        WHERE contractor_links.contractor_user_id = :contractor_user_id
          AND contractor_links.status = "active"
          AND extinguishers.status IN ("broken", "decommissioned")) AS replacements'
);
$metrics->execute(['contractor_user_id' => $user['id']]);

$objects = db()->prepare(
    'SELECT
       objects.id,
       objects.name,
       objects.address,
       organizations.name AS organization_name,
       COUNT(extinguishers.id) AS extinguishers_total,
       SUM(extinguishers.status = "needs_check") AS needs_check_total,
       SUM(extinguishers.status IN ("broken", "decommissioned")) AS replacement_total,
       (
         SELECT COUNT(*)
         FROM inspection_requests
         WHERE inspection_requests.object_id = objects.id
           AND inspection_requests.status IN ("new", "scheduled")
       ) AS pending_requests
     FROM objects
     INNER JOIN organizations ON organizations.id = objects.organization_id
     INNER JOIN contractor_links ON contractor_links.organization_id = objects.organization_id
     LEFT JOIN extinguishers ON extinguishers.object_id = objects.id
     WHERE contractor_links.contractor_user_id = :contractor_user_id
       AND contractor_links.status = "active"
     GROUP BY objects.id
     ORDER BY pending_requests DESC, objects.created_at DESC'
);
$objects->execute(['contractor_user_id' => $user['id']]);

$checks = db()->prepare(
    'SELECT inspections.*, objects.name AS object_name, organizations.name AS organization_name
     FROM inspections
     INNER JOIN objects ON objects.id = inspections.object_id
     INNER JOIN organizations ON organizations.id = inspections.organization_id
     WHERE inspections.contractor_user_id = :contractor_user_id
       AND inspections.completed_at IS NOT NULL
     ORDER BY inspections.completed_at DESC, inspections.created_at DESC
     LIMIT 10'
);
$checks->execute(['contractor_user_id' => $user['id']]);
$checkRows = $checks->fetchAll();

$upcoming = db()->prepare(
    'SELECT
       inspection_requests.id,
       inspection_requests.object_id,
       inspection_requests.preferred_date,
       inspection_requests.status,
       objects.name AS object_name,
       organizations.name AS organization_name
     FROM inspection_requests
     INNER JOIN objects ON objects.id = inspection_requests.object_id
     INNER JOIN organizations ON organizations.id = inspection_requests.organization_id
     INNER JOIN contractor_links ON contractor_links.organization_id = inspection_requests.organization_id
     WHERE contractor_links.contractor_user_id = :contractor_user_id
       AND contractor_links.status = "active"
       AND inspection_requests.status IN ("new", "scheduled")
     ORDER BY inspection_requests.preferred_date IS NULL, inspection_requests.preferred_date ASC, inspection_requests.created_at DESC
     LIMIT 20'
);
$upcoming->execute(['contractor_user_id' => $user['id']]);

if (count($checkRows)) {
    $inspectionIds = array_map(function ($inspection) {
        return (int)$inspection['id'];
    }, $checkRows);
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

    foreach ($checkRows as &$checkRow) {
        $checkRow['items'] = isset($itemsByInspection[(int)$checkRow['id']])
            ? $itemsByInspection[(int)$checkRow['id']]
            : [];
    }
    unset($checkRow);
}

respond(200, [
    'metrics' => $metrics->fetch(),
    'objects' => $objects->fetchAll(),
    'checks' => $checkRows,
    'upcoming' => $upcoming->fetchAll(),
]);
