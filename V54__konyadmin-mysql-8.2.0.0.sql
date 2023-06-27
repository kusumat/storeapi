INSERT INTO `server_configuration`(prop_name, prop_value, created_date, updated_date) values('management_server_host_name', '${MANAGEMENT_SERVER_HOST_NAME}', NOW(), NOW())
ON DUPLICATE KEY UPDATE 
prop_name = 'management_server_host_name',
    prop_value = '${MANAGEMENT_SERVER_HOST_NAME}',
    created_date = NOW(),
    updated_date = NOW();
INSERT INTO `server_configuration`(prop_name, prop_value, created_date, updated_date) values('management_server_port', '${MANAGEMENT_SERVER_PORT}', NOW(), NOW())
ON DUPLICATE KEY UPDATE 
prop_name = 'management_server_port',
    prop_value = '${MANAGEMENT_SERVER_PORT}',
    created_date = NOW(),
    updated_date = NOW();
INSERT INTO `server_configuration`(prop_name, prop_value, created_date, updated_date) values('management_server_user', '${MANAGEMENT_SERVER_USER}', NOW(), NOW())
ON DUPLICATE KEY UPDATE 
prop_name = 'management_server_user',
    prop_value = '${MANAGEMENT_SERVER_USER}',
    created_date = NOW(),
    updated_date = NOW();
INSERT INTO `server_configuration`(prop_name, prop_value, created_date, updated_date) values('management_server_password', '${MANAGEMENT_SERVER_PASSWORD}', NOW(), NOW())
ON DUPLICATE KEY UPDATE 
prop_name = 'management_server_password',
    prop_value = '${MANAGEMENT_SERVER_PASSWORD}',
    created_date = NOW(),
    updated_date = NOW();
INSERT INTO `server_configuration`(prop_name, prop_value, created_date, updated_date) values('management_server_scheme', '${MANAGEMENT_SERVER_SCHEME}', NOW(), NOW())
ON DUPLICATE KEY UPDATE 
prop_name = 'management_server_scheme',
    prop_value = '${MANAGEMENT_SERVER_SCHEME}',
    created_date = NOW(),
    updated_date = NOW();
INSERT INTO `server_configuration`(prop_name, prop_value, created_date, updated_date) values('management_server_truststore_filename', '${MANAGEMENT_SERVER_TRUSTSTORE_FILENAME}', NOW(), NOW())
ON DUPLICATE KEY UPDATE 
prop_name = 'management_server_truststore_filename',
    prop_value = '${MANAGEMENT_SERVER_TRUSTSTORE_FILENAME}',
    created_date = NOW(),
    updated_date = NOW();
INSERT INTO `server_configuration`(prop_name, prop_value, created_date, updated_date) values('management_server_keystore_filename', '${MANAGEMENT_SERVER_KEYSTORE_FILENAME}', NOW(), NOW())
ON DUPLICATE KEY UPDATE 
prop_name = 'management_server_keystore_filename',
    prop_value = '${MANAGEMENT_SERVER_KEYSTORE_FILENAME}',
    created_date = NOW(),
    updated_date = NOW();
INSERT INTO `server_configuration`(prop_name, prop_value, created_date, updated_date) values('management_server_truststore_password', '${MANAGEMENT_SERVER_TRUSTSTORE_PASSWORD}', NOW(), NOW())
ON DUPLICATE KEY UPDATE 
prop_name = 'management_server_truststore_password',
    prop_value = '${MANAGEMENT_SERVER_TRUSTSTORE_PASSWORD}',
    created_date = NOW(),
    updated_date = NOW();
INSERT INTO `server_configuration`(prop_name, prop_value, created_date, updated_date) values('management_server_keystore_password', '${MANAGEMENT_SERVER_KEYSTORE_PASSWORD}', NOW(), NOW())
ON DUPLICATE KEY UPDATE 
prop_name = 'management_server_keystore_password',
    prop_value = '${MANAGEMENT_SERVER_KEYSTORE_PASSWORD}',
    created_date = NOW(),
    updated_date = NOW();
INSERT INTO `server_configuration`(prop_name, prop_value, created_date, updated_date) values('kony_server_shared_lib_name', '${KONY_SERVER_SHARED_LIB_NAME}', NOW(), NOW())
ON DUPLICATE KEY UPDATE 
prop_name = 'kony_server_shared_lib_name',
    prop_value = '${KONY_SERVER_SHARED_LIB_NAME}',
    created_date = NOW(),
    updated_date = NOW();
INSERT INTO `server_configuration`(prop_name, prop_value, created_date, updated_date) values('server_console_redirect_ip', '${SERVER_CONSOLE_REDIRECT_IP}', NOW(), NOW())
ON DUPLICATE KEY UPDATE 
prop_name = 'server_console_redirect_ip',
    prop_value = '${SERVER_CONSOLE_REDIRECT_IP}',
    created_date = NOW(),
    updated_date = NOW();
INSERT INTO `server_configuration`(prop_name, prop_value, created_date, updated_date) values('server_console_redirect_port', '${SERVER_CONSOLE_REDIRECT_PORT}', NOW(), NOW())
ON DUPLICATE KEY UPDATE 
prop_name = 'server_console_redirect_port',
    prop_value = '${SERVER_CONSOLE_REDIRECT_PORT}',
    created_date = NOW(),
    updated_date = NOW();
INSERT INTO `server_configuration`(prop_name, prop_value, created_date, updated_date) values('management_server_groups', '${MANAGEMENT_SERVER_GROUPS}', NOW(), NOW())
ON DUPLICATE KEY UPDATE 
prop_name = 'management_server_groups',
    prop_value = '${MANAGEMENT_SERVER_GROUPS}',
    created_date = NOW(),
    updated_date = NOW();
commit;