CREATE TABLE `app_operations_info` (
  `operation_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `app_id` bigint(20) NOT NULL,
  `operation_name` VARCHAR(255),
  `created_by` VARCHAR(50),
  `created_date` DATETIME,
  `updated_by` VARCHAR(50),
  `updated_date` DATETIME,
  CONSTRAINT `pk_app_op_info_opid` PRIMARY KEY (`operation_id`),
  CONSTRAINT `fk_app_op_info_app_id` FOREIGN KEY (`app_id`) REFERENCES `app_info` (`app_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;