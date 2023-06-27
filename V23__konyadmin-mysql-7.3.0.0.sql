ALTER TABLE `SERVER_JOB` MODIFY COLUMN `JOB_INFO` LONGTEXT;
ALTER TABLE `SERVER_JOB_HISTORY` MODIFY COLUMN `JOB_RUN_REQUEST_HEADER` LONGTEXT;
ALTER TABLE `SERVER_JOB_HISTORY` MODIFY COLUMN `JOB_RUN_REQUEST` LONGTEXT;
ALTER TABLE `SERVER_JOB_HISTORY` MODIFY COLUMN `JOB_RUN_RESPONSE_HEADER` LONGTEXT;
ALTER TABLE `SERVER_JOB_HISTORY` MODIFY COLUMN `JOB_RUN_RESPONSE` LONGTEXT;

UPDATE server_configuration SET prop_value=',' WHERE prop_name='ndc.delimiter';
UPDATE server_configuration SET prop_value='UA,TS,referer,URL,REMOTEADDRESS,X-Forwarded-For' WHERE prop_name='do.not.log';
UPDATE server_config_ui_metadata SET on_change_expression='{\"sqlserver\":\"{\\\"storage_database_port\\\":\\\"1433\\\",\\\"storage_database_instance\\\":\\\"unblock\\\",\\\"storage_data_tablespace\\\":\\\"block\\\",\\\"storage_index_tablespace\\\":\\\"block\\\",\\\"storage_lob_tablespace\\\":\\\"block\\\",\\\"storage_sqlserver_default_schema\\\":\\\"unblock\\\"}\",\"mysql\":\"{\\\"storage_database_port\\\":\\\"3306\\\",\\\"storage_database_instance\\\":\\\"block\\\",\\\"storage_data_tablespace\\\":\\\"block\\\",\\\"storage_index_tablespace\\\":\\\"block\\\",\\\"storage_lob_tablespace\\\":\\\"block\\\",\\\"storage_sqlserver_default_schema\\\":\\\"block\\\"}\",\"oracle\":\"{\\\"storage_database_port\\\":\\\"1560\\\",\\\"storage_database_instance\\\":\\\"unblock\\\",\\\"storage_data_tablespace\\\":\\\"unblock\\\",\\\"storage_index_tablespace\\\":\\\"unblock\\\",\\\"storage_lob_tablespace\\\":\\\"unblock\\\",\\\"storage_sqlserver_default_schema\\\":\\\"block\\\"}\"}' WHERE id=100;