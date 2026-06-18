<?php

require __DIR__ . '/../bootstrap.php';

$user = require_user();
require_contractor($user);

$statement = db()->prepare(
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
$statement->execute(['contractor_user_id' => $user['id']]);

respond(200, ['objects' => $statement->fetchAll()]);
