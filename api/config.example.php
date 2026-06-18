<?php

return [
    'db' => [
        'host' => 'localhost',
        'name' => 'database_name',
        'user' => 'database_user',
        'password' => 'database_password',
        'charset' => 'utf8mb4',
    ],
    'mail' => [
        'from' => 'no-reply@example.com',
        'from_name' => 'Учет огнетушителей',
    ],
    'app' => [
        'code_ttl_minutes' => 10,
        'session_ttl_days' => 30,
    ],
];
