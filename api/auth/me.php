<?php

require __DIR__ . '/../bootstrap.php';

$user = require_user();

respond(200, [
    'user' => [
        'id' => (int)$user['id'],
        'email' => $user['email'],
        'fullName' => $user['full_name'],
        'role' => $user['role'],
    ],
]);
