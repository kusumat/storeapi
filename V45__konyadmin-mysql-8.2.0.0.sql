DROP TABLE `webapp_content`;
DROP TABLE `webapp_asset_info`;
DROP TABLE `webapp`;

 CREATE TABLE `webapp`
  (
     `webapp_id`      BIGINT NOT NULL auto_increment,
     `webapp_name`    VARCHAR(64) UNIQUE,
     `webapp_version` VARCHAR(16),
     `webapp_zip_name`    VARCHAR(64),
	 `webapp_channel`    VARCHAR(128),
     `webapp_properties`  TEXT,
     `process_id` 	BIGINT,
     `created_by`     VARCHAR(64),
     `created_date`   DATETIME,
     `updated_by`     VARCHAR(64),
     `updated_date`   DATETIME,
     `col1` 		VARCHAR(64),
     `col2` 		VARCHAR(64),
     `col3` 		VARCHAR(64),
     `col4` 		VARCHAR(64),
     `col5` 		VARCHAR(64),
     PRIMARY KEY(`webapp_id`),
	 KEY `fk_webapp_process_id` (`process_id`),
	 CONSTRAINT `fk_webapp_process_id` FOREIGN KEY (process_id) REFERENCES process_info(process_id)
  ); 

CREATE TABLE `webapp_content`
  (
     `webapp_content_id`   BIGINT NOT NULL auto_increment,
     `webapp_id`           BIGINT NOT NULL,
     `webapp_content_part` LONGBLOB,
     `webapp_resource_path`      VARCHAR(255) NOT NULL,
     `created_by`     VARCHAR(64),
     `created_date`   DATETIME,
     `updated_by`     VARCHAR(64),
     `updated_date`   DATETIME,
     `col1` 		VARCHAR(64),
     `col2` 		VARCHAR(64),
     `col3` 		VARCHAR(64),
     `col4` 		VARCHAR(64),
     `col5` 		VARCHAR(64),
     PRIMARY KEY (`webapp_content_id`),
     KEY `fk_webapp_content_id` (`webapp_id`),
     CONSTRAINT `fk_webapp_content_id` FOREIGN KEY (webapp_id) REFERENCES webapp(webapp_id) ON DELETE CASCADE
  );
  
  CREATE TABLE webapp_asset_info
  (
     `webapp_id`       BIGINT NOT NULL,
     `webapp_asset_id` BIGINT NOT NULL,
	 KEY `fk_webapp_asset_info_webapp_id` (`webapp_id`),
     CONSTRAINT `fk_webapp_asset_info_webapp_id` FOREIGN KEY (webapp_id) REFERENCES webapp(webapp_id),
	 KEY `fk_webapp_asset_info_webapp_asset_id` (`webapp_asset_id`),
     CONSTRAINT `fk_webapp_asset_info_webapp_asset_id` FOREIGN KEY (webapp_asset_id) REFERENCES webapp_asset(webapp_asset_id)
  );