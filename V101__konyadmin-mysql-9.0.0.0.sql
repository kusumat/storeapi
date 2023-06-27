
DROP TABLE IF EXISTS workflow_instance_history;
DROP TABLE IF EXISTS workflow_instance_mappings;
DROP TABLE IF EXISTS workflow_services;
DROP TABLE IF EXISTS workflows;

CREATE TABLE `workflow_info`( 
	`id` BIGINT(20) AUTO_INCREMENT,
	`name`  VARCHAR(255) NOT NULL,
	`content` BLOB ,
	`content_type` VARCHAR(255),
	`managed_version` BIGINT(20) NOT NULL,
	`status` VARCHAR(100),
	`version` VARCHAR(20),
	`col1`  VARCHAR(255),
	`col2`  VARCHAR(255),
	`col3`  VARCHAR(255),
	`additional_info` TEXT,
	`linked_object_service_name` VARCHAR(255),
	`linked_object_service_version` VARCHAR(10),
	`linked_object_name` VARCHAR(255),
	`created_by` VARCHAR(255),
	`created_date` DATETIME,
	`updated_by` VARCHAR(255),
	`updated_date` DATETIME,
	PRIMARY KEY(`id`),
	CONSTRAINT unique_workflow_name UNIQUE (name,managed_version)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

CREATE TABLE `workflow_instance_info`( 
	`id` BIGINT(20) AUTO_INCREMENT,
	`workflow_id`  BIGINT(20),
	`instance_guid` VARCHAR(255),
	`status` VARCHAR(100), 	
	`col1`  VARCHAR(255),
	`col2`  VARCHAR(255),
	`col3`  VARCHAR(255),
	`additional_info` TEXT,
	`linked_object_primary_key`  VARCHAR(255),
	`initiated_date` DATETIME,
	`completed_date` DATETIME,
	`created_by` VARCHAR(255),
	`created_date` DATETIME,
	`updated_by` VARCHAR(255),
	`updated_date` DATETIME,
	PRIMARY KEY(`id`),
	INDEX `instance_workflow_idx` (`workflow_id`),
	FOREIGN KEY (`workflow_id`) REFERENCES `workflow_info`(`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;


CREATE TABLE `workflow_task_info`( 
	`id` BIGINT(20) AUTO_INCREMENT,
	`instance_id`  BIGINT(20),
	`task_id` VARCHAR(255),
	`task_description` VARCHAR(255),
	`task_type` VARCHAR(255),
	`current_status` VARCHAR(255),
	`col1`  VARCHAR(255),
	`col2`  VARCHAR(255),
	`col3`  VARCHAR(255),
	`additional_info` TEXT,
	`initiated_date` DATETIME,
	`completed_date` DATETIME,
	`created_by` VARCHAR(255),
	`created_date` DATETIME,
	`updated_by` VARCHAR(255),
	`updated_date` DATETIME,
	PRIMARY KEY(`id`),
	INDEX `task_instance_idx` (`instance_id`),
	FOREIGN KEY (`instance_id`) REFERENCES  `workflow_instance_info`(`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;