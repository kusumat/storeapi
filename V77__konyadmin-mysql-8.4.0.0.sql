INSERT INTO server_configuration (prop_name, prop_value, display_name, group_id, created_date, updated_date) VALUES ('KONY_SERVER_FORCE_ENABLE_PROXY', 'false', 'Enable Proxy', 8, NOW(), NOW());
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'checkbox', '', 14, 'onprem', '', '', '' FROM server_configuration WHERE prop_name='KONY_SERVER_FORCE_ENABLE_PROXY';
COMMIT;