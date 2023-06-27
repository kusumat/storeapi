INSERT INTO server_configuration (prop_name, prop_value, display_name, created_date, updated_date)
SELECT DISTINCT 'KONY_SERVER_HTTP_INTEGRITY_SKIP_INFO', '', 'Excluded Operations', NOW(), NOW() FROM server_configuration WHERE NOT EXISTS (SELECT * FROM server_configuration WHERE prop_name = 'KONY_SERVER_HTTP_INTEGRITY_SKIP_INFO');
COMMIT;