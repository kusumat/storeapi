DROP TABLE upload_cache;
CREATE TABLE `upload_cache` (
  `id` bigint(20) AUTO_INCREMENT,
  `req_hash` varchar(50)  NOT NULL,
  `response` LONGBLOB,
  `iserror` TINYINT default 0 NOT NULL,
  `firsthittime` bigint(20) NOT NULL,
  `created_date` datetime,
  `updated_date` datetime,
  `updated_by` varchar(50),
  `created_by` varchar(50),
  constraint `pk_upload_cache_id` PRIMARY KEY (`id`),
  UNIQUE KEY `uk_upload_cache_req_hash` (`req_hash`)
);