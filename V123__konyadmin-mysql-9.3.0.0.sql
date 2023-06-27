ALTER TABLE `workflow_info` ADD COLUMN `workflow_mode` VARCHAR(20) DEFAULT NULL;

ALTER TABLE `workflow_instance_info` ADD `linked_service` varchar(255) DEFAULT NULL;
ALTER TABLE `workflow_instance_info` ADD `linked_operation` varchar(255) DEFAULT NULL;
ALTER TABLE `workflow_instance_info` ADD `linked_service_version` varchar(255) DEFAULT NULL;

CREATE TABLE `workflow_linked_services` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `workflow_id` bigint(20),
  `linked_service` varchar(255),
  `linked_operation` varchar(255),
  `linked_service_version` varchar(255),
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `unique_linked_service` UNIQUE (`linked_service`, `linked_operation`, `linked_service_version`),
  KEY `fk_workflow_id` (`workflow_id`),
  CONSTRAINT `fk_workflow_id` FOREIGN KEY (`workflow_id`) REFERENCES `workflow_info` (`id`) ON DELETE CASCADE
);