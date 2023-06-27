INSERT INTO server_configuration_group (id, NAME, display_mode, group_order, config_save) 
VALUES (9, 'GDPR Policy', 'both', 9, 'Save');
INSERT INTO server_configuration (prop_name, prop_value, display_name, group_id, created_date , updated_date) VALUES ('encode.pII', 'false', 'Enable PII Encode', 9, NOW(), NOW());
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression) select id, 'checkbox', '', 1, 'both', '', '', '' FROM server_configuration WHERE prop_name='encode.pII'; 
