SET foreign_key_checks = 0;

--
-- Table structure for table `accounts_diagnostics`
--
CREATE TABLE `accounts_diagnostics` (
  `diagnostics_id` int(11) NOT NULL AUTO_INCREMENT,
  `diagnostics_run_id` VARCHAR(45) NOT NULL,
  `diagnostics_data` longtext NOT NULL,
  `create_date` datetime DEFAULT NULL,
  `server_url` VARCHAR(255),
  PRIMARY KEY (`diagnostics_id`)
) ENGINE=InnoDB ;

SET foreign_key_checks = 1;

--
-- Triggers for accounts_diagnostics table
--

-- Turn off notes as warnings
SET sql_notes = 0;

-- START ACCOUNTS_DIAGNOSTICS
CREATE TRIGGER accounts_diagnostics_create_dt
BEFORE INSERT ON accounts_diagnostics
FOR EACH ROW SET NEW.create_date = UTC_TIMESTAMP();
-- END ACCOUNTS_DIAGNOSTICS

-- Turn on notes as warnings
SET sql_notes = 1;
