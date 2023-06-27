CREATE TABLE `upload_cache` (
  `id` bigint(20) AUTO_INCREMENT,
  `req_hash` varchar(50)  NOT NULL,
  `response` LONGTEXT,
  `iserror` TINYINT default 0 NOT NULL,
  `firsthittime` bigint(20) NOT NULL,
  `created_date` datetime,
  `updated_date` datetime,
  `updated_by` varchar(50),
  `created_by` varchar(50),
  constraint `pk_upload_cache_id` PRIMARY KEY (`id`),
  UNIQUE KEY `uk_upload_cache_req_hash` (`req_hash`)
);

INSERT INTO `server_configuration`(prop_name, prop_value, created_date, updated_date) VALUES('upload.requestResubmitTime', '1800000', NOW(), NOW());
INSERT INTO `server_configuration`(prop_name, prop_value, created_date, updated_date) VALUES('upload.responseWaitTime', '30000', NOW(), NOW());
	
	