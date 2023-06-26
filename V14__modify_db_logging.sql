ALTER TABLE `application_log` drop column `id`; 

ALTER TABLE `application_log` drop column `exception`; 
ALTER TABLE `application_log` ADD column `exception` mediumtext; 

ALTER TABLE `application_log` drop column `message`; 
ALTER TABLE `application_log` ADD column `message` varchar(4000); 
alter table `application_log` add index `idx_request_id` (request_id);