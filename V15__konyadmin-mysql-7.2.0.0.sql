ALTER TABLE `process_info` ADD COLUMN `error_message` varchar(4000) NULL;
ALTER TABLE `server_configuration` MODIFY COLUMN `prop_value` varchar(4000) NULL;
ALTER TABLE `server_configuration` MODIFY COLUMN `prop_type` varchar(100) NULL;
insert into `server_configuration`(prop_name, prop_value, prop_type, created_date, updated_date) values('KONY_SERVER_CLIENT_LOG_LEVEL_OVERRIDE', 'false', 'LogLevel', NOW() , NOW());
insert into `server_configuration`(prop_name, prop_value, prop_type, created_date, updated_date) values('KONY_SERVER_LOGFILTER_CLIENT_IP', '{}', 'LogFilter', NOW() , NOW());
insert into `server_configuration`(prop_name, prop_value, prop_type, created_date, updated_date) values('KONY_SERVER_LOGFILTER_USER_ID', '{}', 'LogFilter', NOW() , NOW());
insert into `server_configuration`(prop_name, prop_value, prop_type, created_date, updated_date) values('KONY_SERVER_LOGFILTER_SERVICE_NAME', '{}', 'LogFilter', NOW() , NOW());