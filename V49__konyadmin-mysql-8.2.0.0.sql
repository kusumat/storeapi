alter table `upload_cache` modify column `created_date` datetime default now();

CREATE TABLE `upload_cache1` (
  `id` bigint(20) AUTO_INCREMENT,
  `req_hash` varchar(50)  NOT NULL,
  `response` LONGTEXT,
  `iserror` TINYINT default 0 NOT NULL,
  `firsthittime` bigint(20) NOT NULL,
  `created_date` datetime default now(),
  `updated_date` datetime,
  `updated_by` varchar(50),
  `created_by` varchar(50),
  constraint `pk_upload_cache1_id` PRIMARY KEY (`id`),
  UNIQUE KEY `uk_upload_cache1_req_hash` (`req_hash`)
);

CREATE TABLE `upload_cache2` (
  `id` bigint(20) AUTO_INCREMENT,
  `req_hash` varchar(50)  NOT NULL,
  `response` LONGTEXT,
  `iserror` TINYINT default 0 NOT NULL,
  `firsthittime` bigint(20) NOT NULL,
  `created_date` datetime default now(),
  `updated_date` datetime,
  `updated_by` varchar(50),
  `created_by` varchar(50),
  constraint `pk_upload_cache2_id` PRIMARY KEY (`id`),
  UNIQUE KEY `uk_upload_cache2_req_hash` (`req_hash`)
);

CREATE VIEW `upload_cache_view` AS
    SELECT
        `id`, `req_hash`, `response`, `iserror`, `firsthittime`
    FROM
        `upload_cache`
    UNION ALL SELECT
         `id`, `req_hash`, `response`, `iserror`, `firsthittime`
    FROM
        `upload_cache1`
    UNION ALL SELECT
         `id`, `req_hash`, `response`, `iserror`, `firsthittime`
    FROM
        `upload_cache2`;