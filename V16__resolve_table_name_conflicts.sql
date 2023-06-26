rename table configurations to accounts_configurations;
rename table application_log to accounts_application_log;
rename table users to accounts_users;

-- Turn off notes as warnings
SET sql_notes = 0;
-- recreated trigger with renamed table
DROP TRIGGER IF EXISTS users_create_date;
CREATE TRIGGER accounts_users_create_date
BEFORE INSERT ON accounts_users
FOR EACH ROW SET NEW.create_date = UTC_TIMESTAMP(), NEW.modified_date = NULL;

DROP TRIGGER IF EXISTS users_update_date;
CREATE TRIGGER accounts_users_update_date
BEFORE UPDATE ON accounts_users
FOR EACH ROW SET NEW.modified_date = UTC_TIMESTAMP(), NEW.create_date = OLD.create_date;

-- Turn on notes as warnings
SET sql_notes = 1;

-- dropping additional unique constraint on primary key constraint columns
ALTER TABLE accounts_configurations DROP INDEX configuration_id_UNIQUE;
ALTER TABLE features DROP INDEX feature_id_UNIQUE;