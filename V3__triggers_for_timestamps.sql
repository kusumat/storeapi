
-- Triggers for tables
--

-- Turn off notes as warnings
SET sql_notes = 0;

-- START ACCOUNTS
DROP TRIGGER IF EXISTS accounts_create_date;
CREATE TRIGGER accounts_create_date
BEFORE INSERT ON accounts
FOR EACH ROW SET NEW.create_date = UTC_TIMESTAMP(), NEW.modified_date = NULL;

DROP TRIGGER IF EXISTS accounts_update_date;
CREATE TRIGGER accounts_update_date
BEFORE UPDATE ON accounts
FOR EACH ROW SET NEW.modified_date = UTC_TIMESTAMP(), NEW.create_date = OLD.create_date;
-- END ACCOUNTS

-- START APPLICATIONS
DROP TRIGGER IF EXISTS applications_create_date;
CREATE TRIGGER applications_create_date
BEFORE INSERT ON applications
FOR EACH ROW SET NEW.create_date = UTC_TIMESTAMP(), NEW.modified_date = NULL;

DROP TRIGGER IF EXISTS applications_update_date;
CREATE TRIGGER applications_update_date
BEFORE UPDATE ON applications
FOR EACH ROW SET NEW.modified_date = UTC_TIMESTAMP(), NEW.create_date = OLD.create_date;
-- END APPLICATIONS END

-- START ENVIRONMENTS
DROP TRIGGER IF EXISTS environments_create_date;
CREATE TRIGGER environments_create_date
BEFORE INSERT ON environments
FOR EACH ROW SET NEW.create_date = UTC_TIMESTAMP(), NEW.modified_date = NULL;

DROP TRIGGER IF EXISTS environments_update_date;
CREATE TRIGGER environments_update_date
BEFORE UPDATE ON environments
FOR EACH ROW SET NEW.modified_date = UTC_TIMESTAMP(), NEW.create_date = OLD.create_date;
-- END ENVIRONMENTS END

-- START PROXIES
DROP TRIGGER IF EXISTS proxies_create_date;
CREATE TRIGGER proxies_create_date
BEFORE INSERT ON proxies
FOR EACH ROW SET NEW.create_date = UTC_TIMESTAMP(), NEW.modified_date = NULL;

DROP TRIGGER IF EXISTS proxies_update_date;
CREATE TRIGGER proxies_update_date
BEFORE UPDATE ON proxies
FOR EACH ROW SET NEW.modified_date = UTC_TIMESTAMP(), NEW.create_date = OLD.create_date;
-- END PROXIES END

-- START FEATURES
DROP TRIGGER IF EXISTS features_create_date;
CREATE TRIGGER features_create_date
BEFORE INSERT ON features
FOR EACH ROW SET NEW.create_date = UTC_TIMESTAMP(), NEW.modified_date = NULL;

DROP TRIGGER IF EXISTS features_update_date;
CREATE TRIGGER features_update_date
BEFORE UPDATE ON features
FOR EACH ROW SET NEW.modified_date = UTC_TIMESTAMP(), NEW.create_date = OLD.create_date;
-- END FEATURES

-- Turn on notes as warnings
SET sql_notes = 1;
