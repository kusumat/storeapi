ALTER TABLE app_info ADD COLUMN jar_module VARCHAR(255) DEFAULT 'default';
ALTER TABLE server_jar_info ADD COLUMN jar_module VARCHAR(255) DEFAULT 'default';

ALTER TABLE server_jar_info DROP INDEX jar_name;
ALTER TABLE server_jar_info ADD CONSTRAINT uk_jarname_module UNIQUE (jar_name, jar_module);