<?php

require __DIR__ . '/../bootstrap.php';

$user = require_user();
$organization = require_organization($user);

$metrics = db()->prepare(
    'SELECT
       (SELECT COUNT(*) FROM objects WHERE organization_id = :organization_id) AS objects,
       (SELECT COUNT(*)
        FROM rooms
        INNER JOIN objects ON objects.id = rooms.object_id
        WHERE objects.organization_id = :organization_id) AS rooms,
       (SELECT COUNT(*) FROM extinguishers WHERE organization_id = :organization_id) AS total,
       (SELECT COUNT(*) FROM extinguishers WHERE organization_id = :organization_id AND status = "ok") AS ok,
       (SELECT COUNT(*) FROM extinguishers WHERE organization_id = :organization_id AND status = "needs_check") AS needs_check,
       (SELECT COUNT(*) FROM extinguishers WHERE organization_id = :organization_id AND status IN ("broken", "decommissioned")) AS broken,
       (SELECT COUNT(*) FROM issues WHERE organization_id = :organization_id AND status = "open") AS open_issues'
);
$metrics->execute(['organization_id' => $organization['id']]);

$objects = db()->prepare(
    'SELECT
       objects.id,
       objects.name,
       objects.address,
       objects.created_at,
       (SELECT COUNT(*) FROM rooms WHERE rooms.object_id = objects.id) AS rooms_total,
       (SELECT COUNT(*) FROM extinguishers
        WHERE extinguishers.organization_id = :organization_id AND extinguishers.object_id = objects.id) AS extinguishers_total,
       (SELECT COUNT(*) FROM extinguishers
        WHERE extinguishers.organization_id = :organization_id AND extinguishers.object_id = objects.id AND extinguishers.status IN ("broken", "decommissioned")) AS broken_total,
       (SELECT COUNT(*) FROM issues
        WHERE issues.organization_id = :organization_id AND issues.object_id = objects.id AND issues.status = "open") AS open_issues_total
     FROM objects
     WHERE objects.organization_id = :organization_id
     ORDER BY objects.created_at DESC'
);
$objects->execute(['organization_id' => $organization['id']]);

$issues = db()->prepare(
    'SELECT issues.id, issues.title, objects.name AS object_name, issues.created_at
     FROM issues
     INNER JOIN objects ON objects.id = issues.object_id
     WHERE issues.organization_id = :organization_id AND issues.status = "open"
     ORDER BY issues.created_at DESC
     LIMIT 10'
);
$issues->execute(['organization_id' => $organization['id']]);

respond(200, [
    'metrics' => $metrics->fetch(),
    'objects' => $objects->fetchAll(),
    'issues' => $issues->fetchAll(),
]);
