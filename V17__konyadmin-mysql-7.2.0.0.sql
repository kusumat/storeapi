UPDATE `server_configuration` set prop_value='true', updated_date=NOW() where prop_name='KONY_SERVER_CLIENT_LOG_LEVEL_OVERRIDE';
INSERT INTO `server_configuration`(prop_name, prop_value, created_date, updated_date) values('KONY_SERVER_NUMBER_OF_NODES', '1', NOW(), NOW());
INSERT INTO `server_configuration`(prop_name, prop_value, created_date, updated_date) values('KONY_SERVER_ACCESS_CONTROL_ALLOW_ORIGIN', 'ALL', NOW(), NOW());
INSERT INTO `server_configuration`(prop_name, prop_value, created_date, updated_date) values('KONY_SERVER_ALLOW_ORIGIN_ECHO_WHITELIST', '', NOW(), NOW());
INSERT INTO `server_configuration`(prop_name, prop_value, created_date, updated_date) values('storage_database_max_connections', '10', NOW(), NOW());
INSERT INTO `server_configuration`(prop_name, prop_value, created_date, updated_date) values('storage_database_connection_timeout_sec', '30', NOW(), NOW());
