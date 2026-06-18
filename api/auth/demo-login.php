<?php

require __DIR__ . '/../bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['error' => 'Method not allowed.']);
}

$input = input_json();
$role = isset($input['role']) ? (string)$input['role'] : 'organization';
$visitorId = isset($input['visitorId']) ? (string)$input['visitorId'] : '';

if ($role !== 'organization' && $role !== 'contractor') {
    respond(422, ['error' => 'Role is invalid.']);
}

$visitorId = strtolower(preg_replace('/[^a-zA-Z0-9-]/', '', $visitorId));

if (strlen($visitorId) < 16) {
    $visitorId = random_token(16);
}

$visitorHash = substr(hash('sha256', $visitorId), 0, 24);
$demoOrganizationEmail = 'demo-organization-' . $visitorHash . '@demo.local';
$demoContractorEmail = 'demo-contractor-' . $visitorHash . '@demo.local';
$email = $role === 'organization' ? $demoOrganizationEmail : $demoContractorEmail;
$fullName = $role === 'organization' ? 'Демо владелец' : 'Демо проверяющий';
$demoOrganizationName = 'СКЛАД';
$demoContractorName = 'Демо подрядчик СКЛАД ' . substr($visitorHash, 0, 6);

function upsert_demo_user($pdo, $email, $fullName, $role)
{
    $userStatement = $pdo->prepare('SELECT * FROM users WHERE email = :email LIMIT 1');
    $userStatement->execute(['email' => $email]);
    $user = $userStatement->fetch();

    if (!$user) {
        $insertUser = $pdo->prepare(
            'INSERT INTO users (email, full_name, role, email_verified_at)
             VALUES (:email, :full_name, :role, NOW())'
        );
        $insertUser->execute([
            'email' => $email,
            'full_name' => $fullName,
            'role' => $role,
        ]);

        return [
            'id' => (int)$pdo->lastInsertId(),
            'email' => $email,
            'full_name' => $fullName,
            'role' => $role,
        ];
    }

    $updateUser = $pdo->prepare(
        'UPDATE users
         SET full_name = COALESCE(NULLIF(full_name, ""), :full_name),
             email_verified_at = COALESCE(email_verified_at, NOW())
         WHERE id = :id'
    );
    $updateUser->execute([
        'id' => (int)$user['id'],
        'full_name' => $fullName,
    ]);

    return $user;
}

function ensure_demo_organization($pdo, $ownerUserId, $organizationName)
{
    $organizationCheck = $pdo->prepare('SELECT id FROM organizations WHERE owner_user_id = :owner_user_id LIMIT 1');
    $organizationCheck->execute(['owner_user_id' => $ownerUserId]);
    $organization = $organizationCheck->fetch();

    if ($organization) {
        $updateOrganization = $pdo->prepare('UPDATE organizations SET name = :name WHERE id = :id');
        $updateOrganization->execute([
            'id' => (int)$organization['id'],
            'name' => $organizationName,
        ]);

        return [
            'id' => (int)$organization['id'],
            'created' => false,
        ];
    }

    $insertOrganization = $pdo->prepare(
        'INSERT INTO organizations (owner_user_id, name)
         VALUES (:owner_user_id, :name)'
    );
    $insertOrganization->execute([
        'owner_user_id' => $ownerUserId,
        'name' => $organizationName,
    ]);

    return [
        'id' => (int)$pdo->lastInsertId(),
        'created' => true,
    ];
}

function ensure_demo_contractor_profile($pdo, $contractorUserId, $contractorName)
{
    $profileCheck = $pdo->prepare('SELECT id FROM contractor_profiles WHERE user_id = :user_id LIMIT 1');
    $profileCheck->execute(['user_id' => $contractorUserId]);
    $profile = $profileCheck->fetch();

    if ($profile) {
        $updateProfile = $pdo->prepare('UPDATE contractor_profiles SET name = :name WHERE user_id = :user_id');
        $updateProfile->execute([
            'user_id' => $contractorUserId,
            'name' => $contractorName,
        ]);
        return;
    }

    $insertProfile = $pdo->prepare(
        'INSERT INTO contractor_profiles (user_id, name)
         VALUES (:user_id, :name)'
    );
    $insertProfile->execute([
        'user_id' => $contractorUserId,
        'name' => $contractorName,
    ]);
}

function ensure_demo_contractor_link($pdo, $contractorUserId, $organizationId, $contractorName)
{
    $inviteCheck = $pdo->prepare(
        'SELECT id FROM contractor_invites
         WHERE organization_id = :organization_id AND LOWER(name) = LOWER(:name)
         ORDER BY created_at DESC
         LIMIT 1'
    );
    $inviteCheck->execute([
        'organization_id' => $organizationId,
        'name' => $contractorName,
    ]);
    $invite = $inviteCheck->fetch();
    $inviteId = $invite ? (int)$invite['id'] : null;

    if (!$inviteId) {
        $insertInvite = $pdo->prepare(
            'INSERT INTO contractor_invites (organization_id, name, status)
             VALUES (:organization_id, :name, "accepted")'
        );
        $insertInvite->execute([
            'organization_id' => $organizationId,
            'name' => $contractorName,
        ]);
        $inviteId = (int)$pdo->lastInsertId();
    }

    $link = $pdo->prepare(
        'INSERT INTO contractor_links (contractor_user_id, organization_id, invite_id, contractor_name, status)
         VALUES (:contractor_user_id, :organization_id, :invite_id, :contractor_name, "active")
         ON DUPLICATE KEY UPDATE invite_id = VALUES(invite_id), contractor_name = VALUES(contractor_name), status = "active"'
    );
    $link->execute([
        'contractor_user_id' => $contractorUserId,
        'organization_id' => $organizationId,
        'invite_id' => $inviteId,
        'contractor_name' => $contractorName,
    ]);
}

function prune_demo_contractor_links($pdo, $contractorUserId, $organizationId)
{
    $deleteLinks = $pdo->prepare(
        'DELETE FROM contractor_links
         WHERE contractor_user_id = :contractor_user_id
           AND organization_id <> :organization_id
           AND contractor_name LIKE "Демо подрядчик СКЛАД%"'
    );
    $deleteLinks->execute([
        'contractor_user_id' => $contractorUserId,
        'organization_id' => $organizationId,
    ]);
}

function ensure_demo_stock_object($pdo, $organizationId)
{
    $objectCheck = $pdo->prepare(
        'SELECT id, address FROM objects
         WHERE organization_id = :organization_id AND name = "СКЛАД"
         ORDER BY id ASC'
    );
    $objectCheck->execute(['organization_id' => $organizationId]);
    $objects = $objectCheck->fetchAll();

    if (count($objects)) {
        $objectId = (int)$objects[0]['id'];
        $updateObject = $pdo->prepare('UPDATE objects SET address = "Демо-склад" WHERE id = :id');
        $updateObject->execute(['id' => $objectId]);

        $deleteObject = $pdo->prepare(
            'DELETE FROM objects
             WHERE id = :id AND organization_id = :organization_id AND name = "СКЛАД" AND COALESCE(address, "") = "Демо-склад"'
        );

        foreach (array_slice($objects, 1) as $duplicateObject) {
            $deleteObject->execute([
                'id' => (int)$duplicateObject['id'],
                'organization_id' => $organizationId,
            ]);
        }
    } else {
        $insertObject = $pdo->prepare(
            'INSERT INTO objects (organization_id, name, address)
             VALUES (:organization_id, "СКЛАД", "Демо-склад")'
        );
        $insertObject->execute(['organization_id' => $organizationId]);
        $objectId = (int)$pdo->lastInsertId();
    }

    $roomCheck = $pdo->prepare(
        'SELECT id FROM rooms
         WHERE object_id = :object_id
           AND name = "Основное помещение"
           AND COALESCE(floor_name, "") = "1"
           AND COALESCE(fire_zone, "") = "Зона хранения"
         ORDER BY id ASC'
    );
    $roomCheck->execute(['object_id' => $objectId]);
    $rooms = $roomCheck->fetchAll();

    if (count($rooms)) {
        $roomId = (int)$rooms[0]['id'];

        $moveExtinguishers = $pdo->prepare(
            'UPDATE extinguishers
             SET room_id = :room_id
             WHERE object_id = :object_id AND room_id = :duplicate_room_id AND number LIKE "СКЛАД-%"'
        );
        $deleteRoom = $pdo->prepare(
            'DELETE rooms FROM rooms
             LEFT JOIN extinguishers ON extinguishers.room_id = rooms.id
             WHERE rooms.id = :id AND rooms.object_id = :object_id AND extinguishers.id IS NULL'
        );

        foreach (array_slice($rooms, 1) as $duplicateRoom) {
            $moveExtinguishers->execute([
                'room_id' => $roomId,
                'object_id' => $objectId,
                'duplicate_room_id' => (int)$duplicateRoom['id'],
            ]);
            $deleteRoom->execute([
                'id' => (int)$duplicateRoom['id'],
                'object_id' => $objectId,
            ]);
        }
    } else {
        $insertRoom = $pdo->prepare(
            'INSERT INTO rooms (object_id, building_name, floor_name, name, fire_zone)
             VALUES (:object_id, NULL, "1", "Основное помещение", "Зона хранения")'
        );
        $insertRoom->execute(['object_id' => $objectId]);
        $roomId = (int)$pdo->lastInsertId();
    }

    $extinguisherCheck = $pdo->prepare(
        'SELECT id FROM extinguishers
         WHERE organization_id = :organization_id AND object_id = :object_id AND number = :number
         ORDER BY id ASC'
    );
    $insertExtinguisher = $pdo->prepare(
        'INSERT INTO extinguishers (organization_id, object_id, room_id, number, name, status)
         VALUES (:organization_id, :object_id, :room_id, :number, :name, "ok")'
    );
    $updateExtinguisherRoom = $pdo->prepare(
        'UPDATE extinguishers
         SET room_id = :room_id, name = COALESCE(NULLIF(name, ""), :name)
         WHERE id = :id'
    );
    $deleteDuplicateExtinguisher = $pdo->prepare(
        'DELETE FROM extinguishers
         WHERE id = :id AND organization_id = :organization_id AND object_id = :object_id'
    );

    for ($index = 1; $index <= 20; $index += 1) {
        $number = 'СКЛАД-' . str_pad((string)$index, 3, '0', STR_PAD_LEFT);
        $name = $index % 3 === 0 ? 'ОУ-5' : 'ОП-4';
        $extinguisherCheck->execute([
            'organization_id' => $organizationId,
            'object_id' => $objectId,
            'number' => $number,
        ]);
        $extinguishers = $extinguisherCheck->fetchAll();

        if (count($extinguishers)) {
            $updateExtinguisherRoom->execute([
                'room_id' => $roomId,
                'name' => $name,
                'id' => (int)$extinguishers[0]['id'],
            ]);

            foreach (array_slice($extinguishers, 1) as $duplicateExtinguisher) {
                $deleteDuplicateExtinguisher->execute([
                    'id' => (int)$duplicateExtinguisher['id'],
                    'organization_id' => $organizationId,
                    'object_id' => $objectId,
                ]);
            }
            continue;
        }

        $insertExtinguisher->execute([
            'organization_id' => $organizationId,
            'object_id' => $objectId,
            'room_id' => $roomId,
            'number' => $number,
            'name' => $name,
        ]);
    }

    return $objectId;
}

$pdo = db();
$pdo->beginTransaction();
$lockAcquired = false;

try {
    $lockStatement = $pdo->prepare('SELECT GET_LOCK(:lock_name, 10) AS lock_status');
    $lockStatement->execute(['lock_name' => 'fire-demo-' . $visitorHash]);
    $lockRow = $lockStatement->fetch();
    $lockAcquired = isset($lockRow['lock_status']) && (int)$lockRow['lock_status'] === 1;

    if (!$lockAcquired) {
        throw new Exception('Could not acquire demo lock.');
    }

    $organizationUser = upsert_demo_user($pdo, $demoOrganizationEmail, 'Демо владелец', 'organization');
    $contractorUser = upsert_demo_user($pdo, $demoContractorEmail, 'Демо проверяющий', 'contractor');
    $demoOrganization = ensure_demo_organization($pdo, (int)$organizationUser['id'], $demoOrganizationName);
    $organizationId = (int)$demoOrganization['id'];
    ensure_demo_contractor_profile($pdo, (int)$contractorUser['id'], $demoContractorName);
    ensure_demo_contractor_link($pdo, (int)$contractorUser['id'], $organizationId, $demoContractorName);
    prune_demo_contractor_links($pdo, (int)$contractorUser['id'], $organizationId);
    if (!empty($demoOrganization['created'])) {
        ensure_demo_stock_object($pdo, $organizationId);
    }

    $user = $role === 'organization' ? $organizationUser : $contractorUser;
    $userId = (int)$user['id'];

    $token = random_token();
    $sessionTtl = (int)(isset($config['app']['session_ttl_days']) ? $config['app']['session_ttl_days'] : 30);
    $sessionTtl = max(1, min($sessionTtl, 365));
    $session = $pdo->prepare(
        'INSERT INTO sessions (user_id, token_hash, expires_at)
         VALUES (:user_id, :token_hash, DATE_ADD(NOW(), INTERVAL ' . $sessionTtl . ' DAY))'
    );
    $session->bindValue(':user_id', $userId, PDO::PARAM_INT);
    $session->bindValue(':token_hash', hash('sha256', $token));
    $session->execute();

    $pdo->commit();

    $releaseLock = $pdo->prepare('SELECT RELEASE_LOCK(:lock_name)');
    $releaseLock->execute(['lock_name' => 'fire-demo-' . $visitorHash]);
    $lockAcquired = false;
} catch (Exception $error) {
    $pdo->rollBack();

    if ($lockAcquired) {
        $releaseLock = $pdo->prepare('SELECT RELEASE_LOCK(:lock_name)');
        $releaseLock->execute(['lock_name' => 'fire-demo-' . $visitorHash]);
    }

    respond(500, ['error' => 'Could not start demo session.']);
}

setcookie('session_token', $token, time() + 60 * 60 * 24 * $sessionTtl, '/', '', false, true);

respond(200, [
    'ok' => true,
    'user' => [
        'id' => $userId,
        'email' => $email,
        'fullName' => isset($user['full_name']) && $user['full_name'] ? $user['full_name'] : $fullName,
        'role' => $role,
        'demo' => true,
    ],
]);
