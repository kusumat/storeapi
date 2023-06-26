SET foreign_key_checks = 0;

--
-- Add column languageid for table `accounts_users`
--
ALTER TABLE `accounts_users`
  ADD column `language` varchar(255) DEFAULT NULL;
ALTER TABLE `accounts_users`
  ADD column `languageid` varchar(10); 

SET foreign_key_checks = 1;
