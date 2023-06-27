ALTER table server_config_ui_metadata MODIFY COLUMN dropdown_options varchar(4000);
ALTER table server_config_ui_metadata MODIFY COLUMN validation_script varchar(4000);
ALTER table server_config_ui_metadata MODIFY COLUMN on_change_expression varchar(4000);

UPDATE server_configuration SET prop_value = 'BROWSER_COMPATIBLE_HOSTNAME_VERIFIER' WHERE prop_name='ssl.SocketFactory.hostname.verifier';
UPDATE server_config_ui_metadata SET ui_control_type='dropdown', dropdown_options='BROWSER_COMPATIBLE_HOSTNAME_VERIFIER,ALLOW_ALL_HOSTNAME_VERIFIER,STRICT_HOSTNAME_VERIFIER' where id=27;
UPDATE server_config_ui_metadata SET display_mode='onprem' where id IN (25,26);
UPDATE server_configuration_group SET display_mode='both' where name='Memcache Configuration';
COMMIT;