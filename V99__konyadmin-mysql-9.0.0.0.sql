CREATE TABLE `workflows`( 
	`id` BIGINT(20) AUTO_INCREMENT,
	`name`  VARCHAR(255) NOT NULL,
	`content` BLOB ,
	`version` VARCHAR(20),
	`created_by` VARCHAR(255),
	`created_date` DATETIME,
	`updated_by` VARCHAR(255),
	`updated_date` DATETIME,
	PRIMARY KEY(`id`),
	UNIQUE KEY (`name`) 
) ENGINE=INNODB DEFAULT CHARSET=utf8;

CREATE TABLE `workflow_services`( 
	`workflow_service_id` BIGINT(20) AUTO_INCREMENT,
	`workflow_id` BIGINT(20) NOT NULL,
	`linked_entity_name` VARCHAR(255),
	`linked_child_entity1`  VARCHAR(255),
	`created_by` VARCHAR(255),
	`created_date` DATETIME,
	`updated_by` VARCHAR(255),
	`updated_date` DATETIME,
	PRIMARY KEY(`workflow_service_id`),
	FOREIGN KEY (`workflow_id`) REFERENCES `workflows`(`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;


CREATE TABLE `workflow_instance_mappings`( 
	`instance_mapping_id` BIGINT(20) AUTO_INCREMENT,
	`workflow_id`  BIGINT(20),
	`instance_id` VARCHAR(255),
	`paused_task_id` BIGINT(20),
	`STATUS` VARCHAR(255), 
	`linked_entity_name` VARCHAR(255),
	`linked_child_entity1`  VARCHAR(255),
	`reference1`  VARCHAR(255),
	`reference2`  VARCHAR(255),
	`reference3`  VARCHAR(255),
	`initiated_date` DATETIME,
	`completed_date` DATETIME,
	`created_by` VARCHAR(255),
	`created_date` DATETIME,
	`updated_by` VARCHAR(255),
	`updated_date` DATETIME,
	PRIMARY KEY(`instance_mapping_id`),
	FOREIGN KEY (`workflow_id`) REFERENCES `workflows`(`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;


CREATE TABLE `workflow_instance_history`( 
	`history_id` BIGINT(20) AUTO_INCREMENT,
	`instance_id`  BIGINT(20),
	`task_id` VARCHAR(255),
	`task_description` VARCHAR(255),
	`task_type` VARCHAR(255),
	`current_status` VARCHAR(255),
	`initiated_date` DATETIME,
	`completed_date` DATETIME,
	`created_by` VARCHAR(255),
	`created_date` DATETIME,
	`updated_by` VARCHAR(255),
	`updated_date` DATETIME,
	PRIMARY KEY(`history_id`),
	FOREIGN KEY (`instance_id`) REFERENCES  `workflow_instance_mappings`(`instance_mapping_id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;