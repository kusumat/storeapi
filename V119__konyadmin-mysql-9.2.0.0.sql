  CREATE TABLE `server_lock` (
  `lock_type` varchar(25) NOT NULL,
  `lock_identifier` varchar(45) DEFAULT NULL,
  `lock_status` varchar(15) DEFAULT 'unlocked',
  `lock_count` BIGINT DEFAULT '0',
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`lock_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `server_lock` (lock_type, lock_status) VALUES('publish', 'unlocked');

COMMIT;