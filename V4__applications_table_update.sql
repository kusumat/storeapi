SET foreign_key_checks = 0;

--
-- Table structure for table `applications`
--
ALTER TABLE `applications`
  DROP FOREIGN KEY `FK_application_user`;
ALTER TABLE `applications`
  DROP COLUMN `user_id`;
ALTER TABLE `applications`
  ADD `user_guid` BIGINT;

SET foreign_key_checks = 1;
