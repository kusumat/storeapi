CREATE TABLE `server_app_config` (
  `app_config_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `app_id` bigint(20) NOT NULL,
  `config_type` varchar(50) DEFAULT NULL,
  `configuration` TEXT DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`app_config_id`),
  KEY `fk_server_app_config_app_id` (`app_id`),
  CONSTRAINT `fk_server_app_config_app_id` FOREIGN KEY (`app_id`) REFERENCES `app_info` (`app_id`) ON DELETE CASCADE
)