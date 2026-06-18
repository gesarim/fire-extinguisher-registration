<?php

require __DIR__ . '/../bootstrap.php';

$token = isset($_COOKIE['session_token']) ? $_COOKIE['session_token'] : '';

if ($token !== '') {
    $statement = db()->prepare('DELETE FROM sessions WHERE token_hash = :token_hash');
    $statement->execute(['token_hash' => hash('sha256', $token)]);
}

setcookie('session_token', '', time() - 3600, '/', '', false, true);

respond(200, ['ok' => true]);
