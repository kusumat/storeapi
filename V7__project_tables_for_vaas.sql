SET foreign_key_checks = 0;
CREATE TABLE `projects` (
  `project_id` int(11) NOT NULL AUTO_INCREMENT,
  `project_guid` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `account_id` int(11) NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `description` text COLLATE utf8_unicode_ci,
  `metadata` text COLLATE utf8_unicode_ci,
  `create_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`project_id`),
  UNIQUE KEY `project_guid_UNIQUE` (`project_guid`),
  KEY `FK_projects_accounts` (`account_id`),
  CONSTRAINT `FK_projects_accounts` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;




CREATE TABLE `project_parts` (
  `project_part_id` int(11) NOT NULL AUTO_INCREMENT,
  `project_part_guid` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `project_id` int(11) NOT NULL,
  `type` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `subtype` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `share_id` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  `folder_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `notes` text COLLATE utf8_unicode_ci,
  `image` blob,
  `status` enum('ACTIVE','PENDING','PROCESSING','FAIL','FAIL_CREATE','PENDING_DELETE','DELETED') COLLATE utf8_unicode_ci DEFAULT 'PENDING',
  `repo_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `repo_size` int(10) unsigned DEFAULT NULL,
  `tmp_file` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `metadata` text COLLATE utf8_unicode_ci,
  `create_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`project_part_id`),
  KEY `type` (`type`),
  UNIQUE KEY `project_part_guid_UNIQUE` (`project_part_guid`),
  KEY `FK_part_project_id` (`project_id`),
  CONSTRAINT `FK_part_project_id` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

SET foreign_key_checks = 1;

SET sql_notes = 0;
-- START PROJECTS
DROP TRIGGER IF EXISTS projects_create_date;
CREATE TRIGGER projects_create_date
BEFORE INSERT ON projects
FOR EACH ROW SET NEW.create_date = UTC_TIMESTAMP(), NEW.modified_date = NULL;

DROP TRIGGER IF EXISTS projects_update_date;
CREATE TRIGGER projects_update_date
BEFORE UPDATE ON projects
FOR EACH ROW SET NEW.modified_date = UTC_TIMESTAMP(), NEW.create_date = OLD.create_date;
-- END PROJECTS
-- START PROJECT_PARTS
DROP TRIGGER IF EXISTS project_parts_create_date;
CREATE TRIGGER project_parts_create_date
BEFORE INSERT ON project_parts
FOR EACH ROW SET NEW.create_date = UTC_TIMESTAMP(), NEW.modified_date = NULL;

DROP TRIGGER IF EXISTS project_parts_update_date;
CREATE TRIGGER project_parts_update_date
BEFORE UPDATE ON project_parts
FOR EACH ROW SET NEW.modified_date = UTC_TIMESTAMP(), NEW.create_date = OLD.create_date;
-- END PROJECT_PARTS
SET sql_notes = 1;
