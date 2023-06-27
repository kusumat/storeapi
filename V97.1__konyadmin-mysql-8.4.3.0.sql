INSERT INTO server_configuration_group (id, name, display_mode, group_order, config_save)
SELECT 13, 'Global Throttling Configuration', 'both', 13 , 'Save' FROM dual
WHERE NOT EXISTS (SELECT * FROM server_configuration_group WHERE name = 'Global Throttling Configuration');


INSERT INTO server_configuration (prop_name, prop_value, display_name, group_id, created_date, updated_date)  
SELECT 'KONY_SERVER_GLOBAL_OPERATION_THROTTLING_INFO', '', 'Operation Throttling Configuration', id , NOW(), NOW()
FROM server_configuration_group where name = 'Global Throttling Configuration' AND
NOT EXISTS (SELECT * FROM server_configuration WHERE prop_name = 'KONY_SERVER_GLOBAL_OPERATION_THROTTLING_INFO');

INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression) 
SELECT id, 'textbox', '', 1, 'both', '', '', '' FROM server_configuration WHERE prop_name='KONY_SERVER_GLOBAL_OPERATION_THROTTLING_INFO' AND
NOT EXISTS (SELECT id FROM server_config_ui_metadata WHERE id in (select id FROM server_configuration WHERE prop_name='KONY_SERVER_GLOBAL_OPERATION_THROTTLING_INFO'));

commit;
