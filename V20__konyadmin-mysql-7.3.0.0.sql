UPDATE `server_configuration` set prop_value='TLSv1.2', updated_date=NOW() where prop_name='ssl.algorithm';
INSERT INTO `server_configuration`(prop_name, prop_value, created_date, updated_date) values('KONY_SERVER_SERVICES_CONTEXT_PATH', 'services', NOW(), NOW());
