CREATE TABLE `server_client_asset_info` (
  `client_asset_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `client_asset_content` longblob,
  `client_asset_name` varchar(50),
  `client_asset_type` varchar(50),
  `client_asset_parent_type` varchar(50),
  `client_asset_description` varchar(50),
  `col1` varchar(50),
  `col2` varchar(50),
  `col3` varchar(50),
  `col4` varchar(50),
  `col5` varchar(50),
  `created_by` varchar(50),
  `created_date` datetime,
  `updated_by` varchar(50),
  `updated_date` datetime,
  PRIMARY KEY (`client_asset_id`)
);

CREATE TABLE `server_app_client_asset_info` (
  `app_id` bigint(20) NOT NULL,
  `client_asset_id` bigint(20) NOT NULL,
  KEY `fk_app_info_app_id_client_asset` (`app_id`),
  KEY `fk_client_asset_info_id` (`client_asset_id`),
  CONSTRAINT `fk_app_info_app_id_client_asset` FOREIGN KEY (`app_id`) REFERENCES `app_info` (`app_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_client_asset_info_id` FOREIGN KEY (`client_asset_id`) REFERENCES `server_client_asset_info` (`client_asset_id`) ON DELETE CASCADE
);

