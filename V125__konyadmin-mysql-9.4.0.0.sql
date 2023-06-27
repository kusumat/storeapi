ALTER TABLE `workflow_instance_info` ADD `parallel_execution_counter` int NOT NULL DEFAULT 0;

CREATE TABLE `workflow_gateway_join_info` (
  `id` BIGINT(20) AUTO_INCREMENT,
  `instance_id` BIGINT(20),
  `gateway_join_element_id` VARCHAR(255),
  `completed_sequences_count` INT DEFAULT 0,
  `workflow_context` LONGTEXT DEFAULT NULL,
  `created_by` VARCHAR(255),
  `created_date` DATETIME,
  `updated_by` VARCHAR(255),
  `updated_date` DATETIME,
  PRIMARY KEY (`id`),
  CONSTRAINT `uk_instance_join_element_id` UNIQUE (`instance_id`, `gateway_join_element_id`),
  FOREIGN KEY (`instance_id`) REFERENCES `workflow_instance_info`(`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;