CREATE TABLE users (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255) NULL,
  role ENUM('organization', 'contractor') NOT NULL,
  email_verified_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE email_codes (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  code_hash CHAR(64) NOT NULL,
  purpose ENUM('registration', 'login') NOT NULL,
  payload TEXT NULL,
  expires_at DATETIME NOT NULL,
  used_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX email_codes_email_created_at (email, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE sessions (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  token_hash CHAR(64) NOT NULL UNIQUE,
  expires_at DATETIME NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE organizations (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  owner_user_id BIGINT UNSIGNED NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE organization_members (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  organization_id BIGINT UNSIGNED NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE contractor_invites (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  organization_id BIGINT UNSIGNED NOT NULL,
  name VARCHAR(255) NOT NULL,
  status ENUM('sent', 'accepted', 'cancelled') NOT NULL DEFAULT 'sent',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE contractor_profiles (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE contractor_links (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  contractor_user_id BIGINT UNSIGNED NOT NULL,
  organization_id BIGINT UNSIGNED NOT NULL,
  invite_id BIGINT UNSIGNED NULL,
  contractor_name VARCHAR(255) NOT NULL,
  status ENUM('active', 'paused') NOT NULL DEFAULT 'active',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY contractor_links_user_organization (contractor_user_id, organization_id),
  FOREIGN KEY (contractor_user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  FOREIGN KEY (invite_id) REFERENCES contractor_invites(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE objects (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  organization_id BIGINT UNSIGNED NOT NULL,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(500) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE rooms (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  object_id BIGINT UNSIGNED NOT NULL,
  building_name VARCHAR(255) NULL,
  floor_name VARCHAR(255) NULL,
  name VARCHAR(255) NOT NULL,
  fire_zone VARCHAR(255) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (object_id) REFERENCES objects(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE files (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  organization_id BIGINT UNSIGNED NOT NULL,
  object_id BIGINT UNSIGNED NULL,
  name VARCHAR(255) NOT NULL,
  path VARCHAR(500) NOT NULL,
  mime_type VARCHAR(120) NULL,
  size_bytes BIGINT UNSIGNED NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  FOREIGN KEY (object_id) REFERENCES objects(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE extinguishers (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  organization_id BIGINT UNSIGNED NOT NULL,
  object_id BIGINT UNSIGNED NOT NULL,
  room_id BIGINT UNSIGNED NULL,
  number VARCHAR(120) NOT NULL,
  name VARCHAR(255) NULL,
  type_mark VARCHAR(255) NULL,
  manufacturer VARCHAR(255) NULL,
  factory_number VARCHAR(120) NULL,
  placement_date VARCHAR(120) NULL,
  manufacture_date VARCHAR(120) NULL,
  next_recharge_date VARCHAR(120) NULL,
  service_life VARCHAR(120) NULL,
  responsible_person VARCHAR(255) NULL,
  status ENUM('ok', 'needs_check', 'broken', 'decommissioned') NOT NULL DEFAULT 'ok',
  photo_file_id BIGINT UNSIGNED NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  FOREIGN KEY (object_id) REFERENCES objects(id) ON DELETE CASCADE,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE SET NULL,
  FOREIGN KEY (photo_file_id) REFERENCES files(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE issues (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  organization_id BIGINT UNSIGNED NOT NULL,
  object_id BIGINT UNSIGNED NOT NULL,
  extinguisher_id BIGINT UNSIGNED NULL,
  title VARCHAR(255) NOT NULL,
  comment TEXT NULL,
  status ENUM('open', 'resolved') NOT NULL DEFAULT 'open',
  photo_file_id BIGINT UNSIGNED NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  FOREIGN KEY (object_id) REFERENCES objects(id) ON DELETE CASCADE,
  FOREIGN KEY (extinguisher_id) REFERENCES extinguishers(id) ON DELETE SET NULL,
  FOREIGN KEY (photo_file_id) REFERENCES files(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE extinguisher_events (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE inspection_requests (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  organization_id BIGINT UNSIGNED NOT NULL,
  object_id BIGINT UNSIGNED NOT NULL,
  status ENUM('new', 'scheduled', 'done', 'cancelled') NOT NULL DEFAULT 'new',
  preferred_date DATE NULL,
  comment TEXT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  FOREIGN KEY (object_id) REFERENCES objects(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE inspections (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  organization_id BIGINT UNSIGNED NOT NULL,
  object_id BIGINT UNSIGNED NOT NULL,
  contractor_user_id BIGINT UNSIGNED NULL,
  contractor_name VARCHAR(255) NULL,
  employee_name VARCHAR(255) NULL,
  inspection_type VARCHAR(80) NULL,
  title VARCHAR(255) NOT NULL,
  planned_at DATETIME NULL,
  completed_at DATETIME NULL,
  report_file_id BIGINT UNSIGNED NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  FOREIGN KEY (object_id) REFERENCES objects(id) ON DELETE CASCADE,
  FOREIGN KEY (contractor_user_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (report_file_id) REFERENCES files(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE inspection_items (
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
  result VARCHAR(255) NULL,
  comment TEXT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (inspection_id) REFERENCES inspections(id) ON DELETE CASCADE,
  FOREIGN KEY (extinguisher_id) REFERENCES extinguishers(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE contractor_inspection_drafts (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
