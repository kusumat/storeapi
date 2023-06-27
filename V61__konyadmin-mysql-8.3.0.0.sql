INSERT INTO server_configuration(prop_name, prop_value, display_name, group_id, created_date, updated_date) VALUES('KONY_SERVER_APPS_WEB_RESPONSE_HEADERS', '', 'Custom Response Headers ', 11, NOW(), NOW());
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 4, 'both', '', '', '' FROM server_configuration WHERE prop_name='KONY_SERVER_APPS_WEB_RESPONSE_HEADERS';
COMMIT;