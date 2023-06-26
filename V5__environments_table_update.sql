SET foreign_key_checks = 0;

--
-- Table structure for table `environments`
--
ALTER TABLE `environments`
  ADD `manual_publish_enabled` TINYINT(1) NOT NULL DEFAULT '0';

SET foreign_key_checks = 1;
