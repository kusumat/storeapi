insert into `mobilefabric_configuration`(prop_name, prop_value, created_date , updated_date) values('SERVER_LOGGER_JNDI_NAME','${KONY_SERVER_LOGGER_JNDI_NAME}', NOW() , NOW());

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
);

SET foreign_key_checks = 1;