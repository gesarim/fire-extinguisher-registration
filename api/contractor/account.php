<?php

require __DIR__ . '/../bootstrap.php';

$user = require_user();
require_contractor($user);

$profile = db()->prepare('SELECT name FROM contractor_profiles WHERE user_id = :user_id LIMIT 1');
$profile->execute(['user_id' => $user['id']]);
$profileRow = $profile->fetch();

$clients = db()->prepare(
    'SELECT organizations.id, organizations.name, contractor_links.status
     FROM contractor_links
     INNER JOIN organizations ON organizations.id = contractor_links.organization_id
     WHERE contractor_links.contractor_user_id = :contractor_user_id
     ORDER BY organizations.created_at DESC'
);
$clients->execute(['contractor_user_id' => $user['id']]);

respond(200, [
    'contractor' => [
        'name' => $profileRow ? $profileRow['name'] : ($user['full_name'] ?: 'Подрядчик'),
        'email' => $user['email'],
    ],
    'clients' => $clients->fetchAll(),
]);
