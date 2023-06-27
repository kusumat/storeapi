CREATE TABLE `asset_info` (
  `asset_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `asset_content` longblob NULL,
  `asset_name` VARCHAR(255) NULL,
  `asset_type` VARCHAR(255) NULL,
  `asset_description` VARCHAR(255) NULL DEFAULT NULL,
  `col1` VARCHAR(255) NULL DEFAULT NULL,
  `col2` VARCHAR(255) NULL DEFAULT NULL,
  `col3` VARCHAR(255) NULL DEFAULT NULL,
  `col4` VARCHAR(255) NULL DEFAULT NULL,
  `col5` VARCHAR(255) NULL DEFAULT NULL,
  `created_by` VARCHAR(255) NULL DEFAULT NULL,
  `created_date` DATETIME NULL DEFAULT NULL,
  `updated_by` VARCHAR(255) NULL DEFAULT NULL,
  `updated_date` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`asset_id`));
  
  CREATE TABLE `app_asset_info` (
  `app_id` bigint(20) NOT NULL,
  `asset_id` bigint(20) NOT NULL,
  KEY `fk_app_info_app_id` (`app_id`),
  KEY `fk_asset_info_id` (`asset_id`),
  CONSTRAINT `fk_asset_info_id` FOREIGN KEY (`asset_id`) REFERENCES `asset_info` (`asset_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_app_info_app_id` FOREIGN KEY (`app_id`) REFERENCES `app_info` (`app_id`) ON DELETE CASCADE
);

CREATE TABLE `process_info` (
  `process_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `process_guid` VARCHAR(255) NULL,
  `process_status` VARCHAR(255) NULL,
  `current_status` VARCHAR(255) NULL,
  `col1` VARCHAR(255) NULL DEFAULT NULL,
  `col2` VARCHAR(255) NULL DEFAULT NULL,
  `col3` VARCHAR(255) NULL DEFAULT NULL,
  `col4` VARCHAR(255) NULL DEFAULT NULL,
  `col5` VARCHAR(255) NULL DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`process_id`));
  
ALTER TABLE `app_info` DROP COLUMN `application_guid`;
ALTER TABLE `app_info` DROP FOREIGN KEY `fk_app_war_id`; 
ALTER TABLE `app_info` DROP COLUMN `app_war_id`;

ALTER TABLE `app_info` ADD COLUMN `process_id` bigint(20) DEFAULT NULL AFTER `col5`;
ALTER TABLE `app_info` ADD CONSTRAINT `fk_app_info_process_id` FOREIGN KEY (`process_id`) REFERENCES `process_info` (`process_id`) ON DELETE CASCADE;

ALTER TABLE `app_war_info` ADD COLUMN `process_id` bigint(20) DEFAULT NULL AFTER `col5`;
ALTER TABLE `app_war_info` ADD CONSTRAINT `fk_app_war_proces_id` FOREIGN KEY (`process_id`) REFERENCES `process_info` (`process_id`) ON DELETE CASCADE;

ALTER TABLE `app_war_info` ADD COLUMN `app_id` bigint(20) DEFAULT NULL AFTER `col5`;
ALTER TABLE `app_war_info` ADD CONSTRAINT `fk_app_war_app_id` FOREIGN KEY (`app_id`) REFERENCES `app_info` (`app_id`) ON DELETE CASCADE;