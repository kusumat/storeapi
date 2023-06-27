DELETE from server_config_ui_metadata WHERE id IN (SELECT id from server_configuration WHERE prop_name IN ('KONY_SERVER_FILESERVICE_USERID','KONY_SERVER_FILESERVICE_PASSWORD','KONY_SERVER_FILESERVICE_DOMAIN'));
DELETE from server_configuration where prop_name IN ('KONY_SERVER_FILESERVICE_USERID','KONY_SERVER_FILESERVICE_PASSWORD','KONY_SERVER_FILESERVICE_DOMAIN');

UPDATE server_configuration_group SET display_mode='onprem',name='File Storage Configuration' where name='File Service Configuration';

UPDATE server_configuration SET display_name='File Storage Root Directory' where prop_name='KONY_SERVER_FILESERVICE_ROOT_DIRECTORY';

commit;