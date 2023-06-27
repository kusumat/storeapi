INSERT INTO server_configuration (prop_name, prop_value, display_name, group_id, created_date, updated_date) SELECT 'KONY_SERVER_FILESERVICE_DOMAIN', '', 'File Service Domain', id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM server_configuration_group WHERE name= 'File Service Configuration';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 2, 'both', '', '', '' FROM server_configuration WHERE prop_name='KONY_SERVER_FILESERVICE_DOMAIN';
UPDATE server_config_ui_metadata SET prop_order = 3 where id = (select id from server_configuration WHERE prop_name='KONY_SERVER_FILESERVICE_USERID');
UPDATE server_config_ui_metadata SET prop_order = 4 where id = (select id from server_configuration WHERE prop_name='KONY_SERVER_FILESERVICE_PASSWORD');
COMMIT;