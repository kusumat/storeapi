INSERT INTO server_configuration(prop_name, prop_value, display_name, group_id, created_date, updated_date) VALUES('KONY_SERVER_ACCESS_CONTROL_ALLOW_CREDENTIALS', 'true', 'Control-Allow-Credentials', 4, NOW(), NOW());
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 4, 'both', '', '', '' FROM server_configuration WHERE prop_name='KONY_SERVER_ACCESS_CONTROL_ALLOW_CREDENTIALS';
INSERT INTO server_configuration(prop_name, prop_value, display_name, group_id, created_date, updated_date) VALUES('KONY_SERVER_ACCESS_CONTROL_VARY_HEADER', 'Origin', 'Control-Vary-Header', 4, NOW(), NOW());
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 5, 'both', '', '', '' FROM server_configuration WHERE prop_name='KONY_SERVER_ACCESS_CONTROL_VARY_HEADER';
COMMIT;