SET foreign_key_checks = 0;

--
-- Table structure for table `users`
--
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_puid` bigint(20) ,
  `user_email` varchar(128) NOT NULL,
  `timezone` varchar(255) DEFAULT NULL,
  `last_selected_account_id` int(11) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_puid_UNIQUE` (`user_puid`)
) ENGINE=InnoDB ;


SET foreign_key_checks = 1;

-- Turn off notes as warnings
SET sql_notes = 0;
-- Trigger: START USERS
DROP TRIGGER IF EXISTS users_create_date;
CREATE TRIGGER users_create_date
BEFORE INSERT ON users
FOR EACH ROW SET NEW.create_date = UTC_TIMESTAMP(), NEW.modified_date = NULL;

DROP TRIGGER IF EXISTS users_update_date;
CREATE TRIGGER users_update_date
BEFORE UPDATE ON users
FOR EACH ROW SET NEW.modified_date = UTC_TIMESTAMP(), NEW.create_date = OLD.create_date;
-- Trigger: END USERS

-- Turn on notes as warnings
SET sql_notes = 1;
