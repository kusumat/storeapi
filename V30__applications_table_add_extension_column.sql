SET foreign_key_checks = 0;

--
-- Add column extension for table `applications`
--
ALTER TABLE `applications`
  ADD column `extension` varchar(10);

SET foreign_key_checks = 1;