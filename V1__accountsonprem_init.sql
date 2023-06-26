SET foreign_key_checks = 0;

--
-- Table structure for table `account_environments`
--
CREATE TABLE `account_environments` (
  `account_id` int(11) NOT NULL,
  `environment_id` int(11) NOT NULL,
  PRIMARY KEY (`environment_id`,`account_id`),
  KEY `FK_account_environments_environments_idx` (`environment_id`),
  KEY `FK_account_environments_accounts` (`account_id`),
  CONSTRAINT `FK_account_environments_accounts` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_account_environments_environments` FOREIGN KEY (`environment_id`) REFERENCES `environments` (`environment_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB ;

--
-- Table structure for table `accounts`
--
CREATE TABLE `accounts` (
  `account_id` int(11) NOT NULL AUTO_INCREMENT,
  `account_guid` varchar(45) ,
  `active` tinyint(1) DEFAULT '1',
  `deleted` tinyint(1) DEFAULT '0',
  `name` varchar(255),
  `company` varchar(255),
  `phone` varchar(25),
  `auth_url` varchar(255) ,
  `workspace_url` varchar(255),
  `is_auth_global` TINYINT(1) DEFAULT '0',
  `create_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`account_id`),
  UNIQUE KEY `account_guid_UNIQUE` (`account_guid`)
) ENGINE=InnoDB ;

--
-- Table structure for table `applications`
--
CREATE TABLE `applications` (
  `application_id` int(11) NOT NULL AUTO_INCREMENT,
  `application_guid` varchar(45),
  `environment_id` int(11) NOT NULL,
  `app_id` varchar(50),
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `user_id` int(11) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`application_id`),
  UNIQUE KEY `application_guid_UNIQUE` (`application_guid`),
  KEY `FK_application_environment` (`environment_id`),
  KEY `FK_application_user` (`user_id`),
  CONSTRAINT `FK_application_environment` FOREIGN KEY (`environment_id`) REFERENCES `environments` (`environment_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_application_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB ;

--
-- Table structure for table `environments`
--
CREATE TABLE `environments` (
  `environment_id` int(11) NOT NULL AUTO_INCREMENT,
  `environment_guid` varchar(45) ,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  `cloud_creation_date` datetime DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(255),
  `create_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`environment_id`),
  UNIQUE KEY `environment_guid_UNIQUE` (`environment_guid`),
  KEY `fk_environments_users` (`user_id`),
  CONSTRAINT `fk_environments_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB ;

--
-- Table structure for table `features`
--
CREATE TABLE `features` (
  `feature_id` int(11) NOT NULL AUTO_INCREMENT,
  `environment_id` int(11),
  `type` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `console_url` varchar(255) DEFAULT NULL,
  `username` varchar(255),
  `password` mediumtext,
  `status` int(11) NOT NULL DEFAULT '0',
  `version` VARCHAR (25) DEFAULT NULL,
  `consumer_key` VARCHAR(255),
  `consumer_secret` VARCHAR(255),
  `create_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`feature_id`),
  UNIQUE KEY `feature_id_UNIQUE` (`feature_id`),
  KEY `FK_env_feature` (`environment_id`),
  CONSTRAINT `FK_env_feature` FOREIGN KEY (`environment_id`) REFERENCES `environments` (`environment_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB ;

CREATE TABLE `configurations` (
  `configuration_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`configuration_id`),
  UNIQUE KEY `configuration_id_UNIQUE` (`configuration_id`)
) ENGINE=InnoDB ;



SET foreign_key_checks = 1;
