SET foreign_key_checks = 0;

--
-- Add column meta for table `features`
--
ALTER TABLE `features`
  ADD column `meta` varchar(4000); 

SET foreign_key_checks = 1;