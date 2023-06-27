ALTER TABLE `server_certificate` ADD COLUMN `expires_on` DATETIME;
ALTER TABLE `server_certificate` ADD COLUMN `subject_domains` LONGTEXT; 
ALTER TABLE `server_certificate` ADD COLUMN `subject_organization` VARCHAR(128); 
ALTER TABLE `server_certificate` ADD COLUMN `issuer_cn` VARCHAR(128); 