SET foreign_key_checks = 0;

--
-- Table structure for table `reports_config`
--
CREATE TABLE `reports_config` (
  `account_id` int(11) NOT NULL,
  `jasper_url` varchar(255),
  `jasper_username` varchar(255),
  `jasper_password` varchar(255),
  PRIMARY KEY (`account_id`),
  KEY `FK_reports_config_account` (`account_id`),
  CONSTRAINT `FK_reports_config_account` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE
)  ENGINE=InnoDB ;

SET foreign_key_checks = 1;