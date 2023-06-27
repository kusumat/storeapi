INSERT INTO server_configuration_group (id, name, display_mode, group_order, config_save) 
SELECT MAX(id) + 1 , 'File Service Configuration', 'both', 10, 'Save' from server_configuration_group;
INSERT INTO server_configuration (prop_name, prop_value, display_name, group_id, created_date, updated_date) VALUES ('KONY_SERVER_FILESERVICE_ROOT_DIRECTORY', '', 'File Service Root Directory', 10, NOW(), NOW());
INSERT INTO server_configuration (prop_name, prop_value, display_name, group_id, created_date, updated_date) VALUES ('KONY_SERVER_FILESERVICE_USERID', '', 'File Service User', 10, NOW(), NOW());
INSERT INTO server_configuration (prop_name, prop_value, display_name, group_id, created_date, updated_date) VALUES ('KONY_SERVER_FILESERVICE_PASSWORD', '', 'File Service Password', 10, NOW(), NOW());
INSERT INTO server_configuration (prop_name, prop_value, display_name, group_id, created_date, updated_date) VALUES ('KONY_SERVER_FILESERVICE_DISABLE', 'false', 'File Service Disable', 10, NOW(), NOW());
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression) select id, 'textbox', '', 1, 'onprem', '', '', '' FROM server_configuration WHERE prop_name='KONY_SERVER_FILESERVICE_ROOT_DIRECTORY'; 
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression) select id, 'textbox', '', 2, 'both', '', '', '' FROM server_configuration WHERE prop_name='KONY_SERVER_FILESERVICE_USERID'; 
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression) select id, 'password', '', 3, 'both', '', '', '' FROM server_configuration WHERE prop_name='KONY_SERVER_FILESERVICE_PASSWORD'; 

ALTER TABLE `upload_cache2` CHANGE COLUMN `response` `response` LONGBLOB;
ALTER TABLE `upload_cache1` CHANGE COLUMN `response` `response` LONGBLOB;
