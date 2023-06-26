DROP TABLE IF EXISTS `application_log`;
SET foreign_key_checks = 0;

CREATE TABLE `application_log` (
  `service_name` varchar(255),
  `log_level` varchar(255),
  `event_date` varchar(255),
  `request_id`  varchar(255),
  `thread_name` varchar(255),
  `additonal_info` varchar(255),
  `log_message` varchar(4000), 
  `exception_trace` mediumtext
)ENGINE=InnoDB;

SET foreign_key_checks = 1;

ALTER TABLE `application_log` ADD INDEX `idx_request_id` (request_id);
