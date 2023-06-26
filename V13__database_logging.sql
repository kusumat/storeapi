SET foreign_key_checks = 0;

--
-- Table structure for table `application_log`
--
CREATE TABLE `application_log` (
  `id` INT UNSIGNED AUTO_INCREMENT NOT NULL,
  `service` varchar(255),
  `level` varchar(255),
  `event_date` varchar(255),
  `request_id`  varchar(255),
  `thread` varchar(255),
  `additonal_info` varchar(255),
  `message`  mediumtext, 
  `exception`  BLOB,
  PRIMARY KEY (`id`)
)  ENGINE=InnoDB ;

SET foreign_key_checks = 1;


INSERT INTO `configurations` (name, value) VALUES ('KONY_ACCOUNTS_LOGGER_JNDI', '${KONY_ACCOUNTS_LOGGER_JNDI}');