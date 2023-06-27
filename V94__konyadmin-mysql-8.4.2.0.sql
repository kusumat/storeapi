DELETE FROM server_config_ui_metadata WHERE id IN (
SELECT id FROM server_configuration WHERE prop_name IN 
	( 'metrics.initialContextFactoryName',
	'metrics.password',
	'metrics.providerURL',
	'metrics.securityCredentials',
	'metrics.securityPrincipalName',
	'metrics.TopicConnectionFactoryName',
	'metrics.TopicName',
	'metrics.URLPkgPrefixes',
	'metrics.userName' ) );
	
DELETE FROM server_configuration WHERE prop_name IN 
	( 'metrics.initialContextFactoryName',
	'metrics.password',
	'metrics.providerURL',
	'metrics.securityCredentials',
	'metrics.securityPrincipalName',
	'metrics.TopicConnectionFactoryName',
	'metrics.TopicName',
	'metrics.URLPkgPrefixes',
	'metrics.userName' );	
COMMIT;