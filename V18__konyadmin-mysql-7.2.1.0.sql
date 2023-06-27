CREATE TABLE `server_app_diff_info` (
	`app_diff_id` bigint(20) NOT NULL AUTO_INCREMENT,
	`app_diff_object` longblob,
 	`app_id` bigint(20) NOT NULL,
	`created_by` 		VARCHAR(255) DEFAULT NULL,	
	`created_date` 		DATETIME DEFAULT NULL,	
	`updated_by` 		VARCHAR(255) DEFAULT NULL,
	`updated_date` 		DATETIME DEFAULT NULL,
	PRIMARY KEY (`app_diff_id`),  
	KEY `fk_app_diff_info_app_id` (`app_id`),
	CONSTRAINT `fk_app_diff_info_app_id` FOREIGN KEY (`app_id`) REFERENCES `app_info` (`app_id`) ON DELETE CASCADE
);
