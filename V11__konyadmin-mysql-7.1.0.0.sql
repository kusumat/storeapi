INSERT INTO `mobilefabric_configuration`(prop_name, prop_value, created_date , updated_date) 
VALUE 	('storage_database_type','${KONY_SERVER_STORAGE_DATABASE_TYPE}', NOW() , NOW()),
	   	('storage_database_hostname','${KONY_SERVER_STORAGE_DATABASE_HOSTNAME}', NOW() , NOW()),
		('storage_database_port','${KONY_SERVER_STORAGE_DATABASE_PORT}', NOW() , NOW()),
		('storage_database_username','${KONY_SERVER_STORAGE_DATABASE_USERNAME}', NOW() , NOW()),
		('storage_database_password','${KONY_SERVER_STORAGE_DATABASE_PASSWORD}', NOW() , NOW()),
		('storage_database_instance','${KONY_SERVER_STORAGE_DATABASE_INSTANCE}', NOW() , NOW());