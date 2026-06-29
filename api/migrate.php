<?php

require __DIR__ . '/bootstrap.php';

if (!isset($_GET['token']) || $_GET['token'] !== 'migrate-fire-2026') {
    respond(403, ['error' => 'Forbidden.']);
}

if (method_exists(db(), 'isSqlite') && db()->isSqlite()) {
    respond(200, ['ok' => true, 'driver' => 'sqlite']);
}

$queries = [
    'CREATE TABLE IF NOT EXISTS contractor_invites (
      id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      organization_id BIGINT UNSIGNED NOT NULL,
      name VARCHAR(255) NOT NULL,
      status ENUM("sent", "accepted", "cancelled") NOT NULL DEFAULT "sent",
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci',
    'CREATE TABLE IF NOT EXISTS contractor_profiles (
      id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      user_id BIGINT UNSIGNED NOT NULL UNIQUE,
      name VARCHAR(255) NOT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci',
    'CREATE TABLE IF NOT EXISTS contractor_links (
      id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      contractor_user_id BIGINT UNSIGNED NOT NULL,
      organization_id BIGINT UNSIGNED NOT NULL,
      invite_id BIGINT UNSIGNED NULL,
      contractor_name VARCHAR(255) NOT NULL,
      status ENUM("active", "paused") NOT NULL DEFAULT "active",
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      UNIQUE KEY contractor_links_user_organization (contractor_user_id, organization_id),
      FOREIGN KEY (contractor_user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
      FOREIGN KEY (invite_id) REFERENCES contractor_invites(id) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci',
    'CREATE TABLE IF NOT EXISTS inspection_items (
      id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      inspection_id BIGINT UNSIGNED NOT NULL,
      extinguisher_id BIGINT UNSIGNED NULL,
      number VARCHAR(120) NOT NULL,
      place VARCHAR(500) NULL,
      name VARCHAR(255) NULL,
      manufacturer VARCHAR(255) NULL,
      release_date VARCHAR(120) NULL,
      factory_number VARCHAR(120) NULL,
      assigned_number VARCHAR(120) NULL,
      placement_date VARCHAR(120) NULL,
      manufacture_date VARCHAR(120) NULL,
      next_recharge_date VARCHAR(120) NULL,
      service_life VARCHAR(120) NULL,
      responsible_person VARCHAR(255) NULL,
      next_planned_test_date VARCHAR(120) NULL,
      recharge_date VARCHAR(120) NULL,
      otv_mark VARCHAR(255) NULL,
      post_recharge_result VARCHAR(255) NULL,
      mass VARCHAR(120) NULL,
      check_type VARCHAR(120) NULL,
      work_types TEXT NULL,
      result VARCHAR(255) NULL,
      comment TEXT NULL,
      photo_file_id BIGINT UNSIGNED NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (inspection_id) REFERENCES inspections(id) ON DELETE CASCADE,
      FOREIGN KEY (extinguisher_id) REFERENCES extinguishers(id) ON DELETE SET NULL,
      FOREIGN KEY (photo_file_id) REFERENCES files(id) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci',
    'CREATE TABLE IF NOT EXISTS contractor_inspection_drafts (
      id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      contractor_user_id BIGINT UNSIGNED NOT NULL,
      organization_id BIGINT UNSIGNED NOT NULL,
      object_id BIGINT UNSIGNED NOT NULL,
      employee_name VARCHAR(255) NULL,
      payload MEDIUMTEXT NOT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY contractor_inspection_drafts_user_object (contractor_user_id, object_id),
      FOREIGN KEY (contractor_user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
      FOREIGN KEY (object_id) REFERENCES objects(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci',
    'CREATE TABLE IF NOT EXISTS extinguisher_events (
      id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      organization_id BIGINT UNSIGNED NOT NULL,
      object_id BIGINT UNSIGNED NOT NULL,
      extinguisher_id BIGINT UNSIGNED NULL,
      event_type VARCHAR(80) NOT NULL,
      title VARCHAR(255) NOT NULL,
      actor_name VARCHAR(255) NULL,
      actor_role VARCHAR(80) NULL,
      event_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      details MEDIUMTEXT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      INDEX extinguisher_events_extinguisher (organization_id, object_id, extinguisher_id, event_at),
      FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
      FOREIGN KEY (object_id) REFERENCES objects(id) ON DELETE CASCADE,
      FOREIGN KEY (extinguisher_id) REFERENCES extinguishers(id) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci',
];

foreach ($queries as $query) {
    db()->exec($query);
}

function add_column_if_missing($table, $column, $definition)
{
    $statement = db()->prepare(
        'SELECT COUNT(*) AS total
         FROM INFORMATION_SCHEMA.COLUMNS
         WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :table_name AND COLUMN_NAME = :column_name'
    );
    $statement->execute([
        'table_name' => $table,
        'column_name' => $column,
    ]);
    $row = $statement->fetch();

    if ((int)$row['total'] === 0) {
        db()->exec('ALTER TABLE ' . $table . ' ADD COLUMN ' . $column . ' ' . $definition);
    }
}

add_column_if_missing('inspections', 'contractor_user_id', 'BIGINT UNSIGNED NULL');
add_column_if_missing('inspections', 'contractor_name', 'VARCHAR(255) NULL');
add_column_if_missing('inspections', 'employee_name', 'VARCHAR(255) NULL');
add_column_if_missing('inspections', 'inspection_type', 'VARCHAR(80) NULL');
add_column_if_missing('files', 'uploaded_by_user_id', 'BIGINT UNSIGNED NULL');
add_column_if_missing('extinguishers', 'type_mark', 'VARCHAR(255) NULL');
add_column_if_missing('extinguishers', 'manufacturer', 'VARCHAR(255) NULL');
add_column_if_missing('extinguishers', 'factory_number', 'VARCHAR(120) NULL');
add_column_if_missing('extinguishers', 'placement_date', 'VARCHAR(120) NULL');
add_column_if_missing('extinguishers', 'manufacture_date', 'VARCHAR(120) NULL');
add_column_if_missing('extinguishers', 'next_recharge_date', 'VARCHAR(120) NULL');
add_column_if_missing('extinguishers', 'service_life', 'VARCHAR(120) NULL');
add_column_if_missing('extinguishers', 'responsible_person', 'VARCHAR(255) NULL');
add_column_if_missing('extinguishers', 'photo_file_id', 'BIGINT UNSIGNED NULL');
add_column_if_missing('inspection_items', 'placement_date', 'VARCHAR(120) NULL');
add_column_if_missing('inspection_items', 'manufacture_date', 'VARCHAR(120) NULL');
add_column_if_missing('inspection_items', 'next_recharge_date', 'VARCHAR(120) NULL');
add_column_if_missing('inspection_items', 'service_life', 'VARCHAR(120) NULL');
add_column_if_missing('inspection_items', 'responsible_person', 'VARCHAR(255) NULL');
add_column_if_missing('inspection_items', 'next_planned_test_date', 'VARCHAR(120) NULL');
add_column_if_missing('inspection_items', 'recharge_date', 'VARCHAR(120) NULL');
add_column_if_missing('inspection_items', 'otv_mark', 'VARCHAR(255) NULL');
add_column_if_missing('inspection_items', 'post_recharge_result', 'VARCHAR(255) NULL');
add_column_if_missing('inspection_items', 'comment', 'TEXT NULL');
add_column_if_missing('inspection_items', 'work_types', 'TEXT NULL');
add_column_if_missing('inspection_items', 'photo_file_id', 'BIGINT UNSIGNED NULL');
add_column_if_missing('issues', 'comment', 'TEXT NULL');
add_column_if_missing('issues', 'photo_file_id', 'BIGINT UNSIGNED NULL');

db()->exec('ALTER TABLE extinguishers MODIFY status ENUM("ok", "needs_check", "broken", "decommissioned") NOT NULL DEFAULT "ok"');

respond(200, ['ok' => true]);
