CREATE TABLE `webapp`
  (
     `webapp_id`      BIGINT NOT NULL auto_increment,
     `webapp_name`    VARCHAR(64) UNIQUE,
     `webapp_version` VARCHAR(16),
     `webapp_zip_name`    VARCHAR(64),
     `webapp_properties`  TEXT,
     `webapp_channel_config` TEXT,
     `created_by`     VARCHAR(64),
     `created_date`   DATETIME,
     `updated_by`     VARCHAR(64),
     `updated_date`   DATETIME,
     `col1` 		VARCHAR(64),
     `col2` 		VARCHAR(64),
     `col3` 		VARCHAR(64),
     `col4` 		VARCHAR(64),
     `col5` 		VARCHAR(64),
     PRIMARY KEY(`webapp_id`)
  ); 
 

  
CREATE TABLE `webapp_asset`
  (
     `webapp_asset_id`      BIGINT NOT NULL auto_increment,
     `webapp_asset_content` BLOB,
     `webapp_asset_name`    VARCHAR(64),
     `webapp_asset_type`    VARCHAR(16) DEFAULT 'JAR',
     `created_by`           VARCHAR(64),
     `created_date`         DATETIME,
     `updated_by`           VARCHAR(64),
     `updated_date`         DATETIME,
     `col1` 		VARCHAR(64),
     `col2` 		VARCHAR(64),
     `col3` 		VARCHAR(64),
     `col4` 		VARCHAR(64),
     `col5` 		VARCHAR(64),
     PRIMARY KEY (`webapp_asset_id`)
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
     FOREIGN KEY (webapp_id) REFERENCES webapp(webapp_id),
     PRIMARY KEY (`webapp_content_id`)
  );
  
  CREATE TABLE webapp_asset_info
  (
     `webapp_id`       BIGINT NOT NULL,
     `webapp_asset_id` BIGINT NOT NULL,
     FOREIGN KEY (webapp_id) REFERENCES webapp(webapp_id),
     FOREIGN KEY (webapp_asset_id) REFERENCES webapp_asset(webapp_asset_id)
  );