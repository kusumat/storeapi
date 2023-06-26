SET foreign_key_checks = 0;

--
-- Table structure for table `environments`
--
CREATE TABLE `proxies` (
  `proxy_id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL,
  `proxy_guid` varchar(45) NOT NULL,
  `type` varchar(255) NOT NULL,
  `host` varchar(255),
  `port` int(11),
  `domain` varchar(255),
  `username` varchar(255),
  `password` varchar(255),
  `create_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`proxy_id`),
  UNIQUE KEY `proxy_guid_UNIQUE` (`proxy_guid`),
  KEY `FK_proxy_account` (`account_id`),
  CONSTRAINT `FK_proxy_account` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB ;


SET foreign_key_checks = 1;