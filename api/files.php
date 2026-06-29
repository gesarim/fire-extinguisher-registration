<?php

require __DIR__ . '/bootstrap.php';

$user = require_user();
$method = $_SERVER['REQUEST_METHOD'];
$maxFileSize = 10 * 1024 * 1024;

function file_scope_for_user(array $user, $objectId = 0, $organizationId = 0)
{
    if (isset($user['role']) && $user['role'] === 'organization') {
        $organization = require_organization($user);

        if ($organizationId > 0 && (int)$organization['id'] !== (int)$organizationId) {
            respond(403, ['error' => 'File access denied.']);
        }

        if ($objectId > 0) {
            $object = db()->prepare('SELECT id FROM objects WHERE id = :id AND organization_id = :organization_id LIMIT 1');
            $object->execute(['id' => $objectId, 'organization_id' => $organization['id']]);

            if (!$object->fetch()) {
                respond(404, ['error' => 'Object not found.']);
            }
        }

        return (int)$organization['id'];
    }

    require_contractor($user);

    if ($objectId > 0) {
        $scope = db()->prepare(
            'SELECT objects.organization_id
             FROM objects
             INNER JOIN contractor_links ON contractor_links.organization_id = objects.organization_id
             WHERE objects.id = :object_id
               AND contractor_links.contractor_user_id = :contractor_user_id
               AND contractor_links.status = "active"
             LIMIT 1'
        );
        $scope->execute(['object_id' => $objectId, 'contractor_user_id' => $user['id']]);
    } else {
        $scope = db()->prepare(
            'SELECT organization_id
             FROM contractor_links
             WHERE organization_id = :organization_id
               AND contractor_user_id = :contractor_user_id
               AND status = "active"
             LIMIT 1'
        );
        $scope->execute(['organization_id' => $organizationId, 'contractor_user_id' => $user['id']]);
    }

    $row = $scope->fetch();

    if (!$row) {
        respond(403, ['error' => 'File access denied.']);
    }

    return (int)$row['organization_id'];
}

function uploaded_file_path(array $fileRow)
{
    $relativePath = ltrim((string)$fileRow['path'], '/');
    $fullPath = realpath(__DIR__ . '/' . $relativePath);
    $uploadsRoot = realpath(__DIR__ . '/uploads');

    if (!$fullPath || !$uploadsRoot || strpos($fullPath, $uploadsRoot . DIRECTORY_SEPARATOR) !== 0) {
        return null;
    }

    return $fullPath;
}

if ($method === 'POST') {
    $objectId = (int)(isset($_POST['objectId']) ? $_POST['objectId'] : 0);
    $kind = isset($_POST['kind']) ? trim((string)$_POST['kind']) : 'document';
    $organizationId = file_scope_for_user($user, $objectId);

    if (!isset($_FILES['file']) || !is_array($_FILES['file'])) {
        respond(422, ['error' => 'Выберите файл.']);
    }

    $file = $_FILES['file'];

    if ((int)$file['error'] !== UPLOAD_ERR_OK) {
        respond(422, ['error' => 'Не удалось загрузить файл.']);
    }

    $size = (int)$file['size'];

    if ($size <= 0 || $size > $maxFileSize) {
        respond(422, ['error' => 'Размер файла должен быть не больше 10 МБ.']);
    }

    $originalName = basename((string)$file['name']);
    $extension = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
    $photoExtensions = ['jpg', 'jpeg', 'png', 'webp'];
    $documentExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx'];
    $allowedExtensions = $kind === 'photo' ? $photoExtensions : $documentExtensions;

    if (!in_array($extension, $allowedExtensions, true)) {
        respond(422, ['error' => $kind === 'photo'
            ? 'Допустимы изображения JPG, PNG и WEBP.'
            : 'Допустимы документы PDF, DOC, DOCX, XLS и XLSX.']);
    }

    $mimeType = 'application/octet-stream';

    if (class_exists('finfo')) {
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $detectedMime = $finfo->file($file['tmp_name']);

        if (is_string($detectedMime) && $detectedMime !== '') {
            $mimeType = $detectedMime;
        }
    }

    if ($kind === 'photo' && @getimagesize($file['tmp_name']) === false) {
        respond(422, ['error' => 'Файл не является корректным изображением.']);
    }

    $directory = __DIR__ . '/uploads/' . $organizationId;

    if (!is_dir($directory) && !mkdir($directory, 0750, true)) {
        respond(500, ['error' => 'Не удалось подготовить хранилище файлов.']);
    }

    $storedName = bin2hex(random_bytes(18)) . '.' . $extension;
    $target = $directory . '/' . $storedName;

    if (!move_uploaded_file($file['tmp_name'], $target)) {
        respond(500, ['error' => 'Не удалось сохранить файл.']);
    }

    $displayName = trim((string)(isset($_POST['displayName']) ? $_POST['displayName'] : $originalName));
    $displayName = $displayName !== '' ? $displayName : $originalName;
    $displayName = function_exists('mb_substr') ? mb_substr($displayName, 0, 255) : substr($displayName, 0, 255);
    $relativePath = 'uploads/' . $organizationId . '/' . $storedName;
    $statement = db()->prepare(
        'INSERT INTO files (organization_id, object_id, name, path, mime_type, size_bytes, uploaded_by_user_id)
         VALUES (:organization_id, :object_id, :name, :path, :mime_type, :size_bytes, :uploaded_by_user_id)'
    );
    $statement->execute([
        'organization_id' => $organizationId,
        'object_id' => $objectId > 0 ? $objectId : null,
        'name' => $displayName,
        'path' => $relativePath,
        'mime_type' => $mimeType,
        'size_bytes' => $size,
        'uploaded_by_user_id' => $user['id'],
    ]);
    $id = (int)db()->lastInsertId();

    respond(201, [
        'id' => $id,
        'name' => $displayName,
        'mimeType' => $mimeType,
        'size' => $size,
        'url' => './api/files.php?id=' . $id,
    ]);
}

$id = (int)(isset($_GET['id']) ? $_GET['id'] : 0);

if ($id <= 0) {
    respond(422, ['error' => 'File id is required.']);
}

$statement = db()->prepare('SELECT * FROM files WHERE id = :id LIMIT 1');
$statement->execute(['id' => $id]);
$fileRow = $statement->fetch();

if (!$fileRow) {
    respond(404, ['error' => 'File not found.']);
}

file_scope_for_user($user, (int)$fileRow['object_id'], (int)$fileRow['organization_id']);

if ($method === 'GET') {
    $fullPath = uploaded_file_path($fileRow);

    if (!$fullPath || !is_file($fullPath)) {
        respond(404, ['error' => 'File not found.']);
    }

    $mimeType = $fileRow['mime_type'] ?: 'application/octet-stream';
    $inline = strpos($mimeType, 'image/') === 0 && empty($_GET['download']);
    header_remove('Content-Type');
    header('Content-Type: ' . $mimeType);
    header('Content-Length: ' . filesize($fullPath));
    header('X-Content-Type-Options: nosniff');
    header('Content-Disposition: ' . ($inline ? 'inline' : 'attachment') . '; filename*=UTF-8\'\'' . rawurlencode($fileRow['name']));
    readfile($fullPath);
    exit;
}

if ($method === 'DELETE') {
    if (isset($user['role']) && $user['role'] === 'contractor'
        && (int)(isset($fileRow['uploaded_by_user_id']) ? $fileRow['uploaded_by_user_id'] : 0) !== (int)$user['id']) {
        respond(403, ['error' => 'File access denied.']);
    }

    $attached = db()->prepare(
        'SELECT
          (SELECT COUNT(*) FROM extinguishers WHERE photo_file_id = :id) +
          (SELECT COUNT(*) FROM issues WHERE photo_file_id = :id) +
          (SELECT COUNT(*) FROM inspection_items WHERE photo_file_id = :id) AS total'
    );
    $attached->execute(['id' => $id]);

    if ((int)$attached->fetch()['total'] > 0) {
        respond(409, ['error' => 'Файл уже используется и не может быть удален.']);
    }

    $fullPath = uploaded_file_path($fileRow);

    if ($fullPath && is_file($fullPath)) {
        unlink($fullPath);
    }

    db()->prepare('DELETE FROM files WHERE id = :id')->execute(['id' => $id]);
    respond(200, ['ok' => true]);
}

respond(405, ['error' => 'Method not allowed.']);
