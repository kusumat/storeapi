SET foreign_key_checks = 0;

--
-- Add column publish_metadata for table `environments`
--
ALTER TABLE `environments`
  ADD column `publish_metadata` longtext; 

SET foreign_key_checks = 1;