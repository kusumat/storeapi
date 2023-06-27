INSERT INTO `server_configuration`(prop_name, prop_value, prop_type, created_date, updated_date) VALUES('KONY_SERVER_LOGFILTER_DEVICE_ID', '{}', 'LogFilter', NOW(), NOW());
INSERT INTO `server_configuration`(prop_name, prop_value, prop_type, created_date, updated_date) VALUES('KONY_SERVER_LOGFILTER_APP_NAME', '{}', 'LogFilter', NOW(), NOW());
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script, on_change_expression)
	SELECT id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='KONY_SERVER_LOGFILTER_DEVICE_ID';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script, on_change_expression)
	SELECT id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='KONY_SERVER_LOGFILTER_APP_NAME';

COMMIT;