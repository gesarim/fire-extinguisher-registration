<?php

require __DIR__ . '/../bootstrap.php';

$user = require_user();
$organization = require_organization($user);

$objects = db()->prepare(
    'SELECT objects.id, objects.name,
      COUNT(extinguishers.id) AS extinguishers_total,
      SUM(extinguishers.status = "needs_check") AS needs_check_total,
      SUM(extinguishers.status IN ("broken", "decommissioned")) AS broken_total
     FROM objects
     LEFT JOIN extinguishers ON extinguishers.object_id = objects.id
     WHERE objects.organization_id = :organization_id
     GROUP BY objects.id
     ORDER BY objects.created_at DESC'
);
$objects->execute(['organization_id' => $organization['id']]);

$checks = db()->prepare(
    'SELECT inspections.id, inspections.title, inspections.planned_at, inspections.completed_at, objects.name AS object_name
     FROM inspections
     INNER JOIN objects ON objects.id = inspections.object_id
     WHERE inspections.organization_id = :organization_id
     ORDER BY COALESCE(inspections.completed_at, inspections.planned_at, inspections.created_at) DESC
     LIMIT 5'
);
$checks->execute(['organization_id' => $organization['id']]);
$checkRows = $checks->fetchAll();

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

$checkRows = completed_inspection_rows($checkRows);
$drafts = db()->prepare(
    'SELECT contractor_inspection_drafts.*, contractor_links.contractor_name, objects.name AS object_name
     FROM contractor_inspection_drafts
     INNER JOIN objects ON objects.id = contractor_inspection_drafts.object_id
     LEFT JOIN contractor_links
       ON contractor_links.contractor_user_id = contractor_inspection_drafts.contractor_user_id
      AND contractor_links.organization_id = contractor_inspection_drafts.organization_id
     WHERE contractor_inspection_drafts.organization_id = :organization_id
     ORDER BY contractor_inspection_drafts.updated_at DESC
     LIMIT 10'
);
$drafts->execute(['organization_id' => $organization['id']]);

foreach ($drafts->fetchAll() as $draftRow) {
    $checkRows[] = inspection_draft_summary($draftRow);
}

sort_inspection_rows($checkRows);
$checkRows = array_slice($checkRows, 0, 5);

$upcoming = db()->prepare(
    'SELECT
       inspection_requests.id,
       inspection_requests.object_id,
       inspection_requests.preferred_date,
       inspection_requests.status,
       objects.name AS object_name,
       COALESCE(
         (
           SELECT contractor_invites.name
           FROM contractor_invites
           WHERE contractor_invites.organization_id = inspection_requests.organization_id
             AND contractor_invites.status IN ("sent", "accepted")
           ORDER BY contractor_invites.created_at DESC
           LIMIT 1
         ),
         "Подрядчик не назначен"
       ) AS contractor_name
     FROM inspection_requests
     INNER JOIN objects ON objects.id = inspection_requests.object_id
     WHERE inspection_requests.organization_id = :organization_id
       AND inspection_requests.status IN ("new", "scheduled")
     ORDER BY inspection_requests.preferred_date IS NULL, inspection_requests.preferred_date ASC, inspection_requests.created_at DESC
     LIMIT 20'
);
$upcoming->execute(['organization_id' => $organization['id']]);

respond(200, [
    'objects' => $objects->fetchAll(),
    'checks' => $checkRows,
    'upcoming' => $upcoming->fetchAll(),
]);
