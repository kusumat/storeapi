SET foreign_key_checks = 0;

--
-- Add column service_url for table `features`
--
ALTER TABLE `features`
  ADD column `service_url` varchar(255); 

SET foreign_key_checks = 1;