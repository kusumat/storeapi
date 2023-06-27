CREATE TABLE `server_config_ui_metadata` (
    `id` BIGINT(20) NOT NULL,
    `display_mode` VARCHAR(45) NULL,
    `ui_control_type` VARCHAR(45) NULL,
    `dropdown_options` VARCHAR(45) NULL,
    `prop_description` VARCHAR(500) NULL,
    `prop_order` INT NULL,
    `validation_script` VARCHAR(500) NULL,
    `on_change_expression` VARCHAR(1000) NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id`)
        REFERENCES `server_configuration` (`id`)
);

CREATE TABLE `server_configuration_group` (
    `id` INT NOT NULL,
    `name` VARCHAR(45) NULL,
    `display_mode` VARCHAR(45) NULL,
    `group_order` INT NULL,
    `config_test` VARCHAR(200) NULL,
    `config_save` VARCHAR(200) NULL,
    PRIMARY KEY (`id`)
);

ALTER TABLE `server_configuration` 
	ADD COLUMN `display_name` VARCHAR(150) NULL AFTER `updated_date`,
	ADD COLUMN `group_id` INT NULL ,
	ADD INDEX `group_id_idx` (`group_id` ASC),
	ADD CONSTRAINT `group_id`  FOREIGN KEY (`group_id`)
		REFERENCES `server_configuration_group` (`id`);

INSERT INTO `server_configuration_group`(`id`,`name`,`display_mode`, `group_order`,`config_save`) VALUES
(1,'Metrics Configuration','onprem',5,'Save'),
(2,'Publish Configuration','none',8,'Save'),
(3,'SSL Configuration','both',4,'Save'),
(4,'CORS Configuration','both',3,'Save'),
(5,'Storage Database Configuration','onprem',6,'Save'),
(6,'Memcache Configuration','onprem',7,'Save'),
(7,'Log Configuration','onprem',2,'Save'),
(8,'General Configuration','both',1,'Save');
	
UPDATE server_configuration SET display_name='Memcache Cluster Domains',  group_id=6 WHERE prop_name='memcache.cluster';
UPDATE server_configuration SET display_name='Memcache Expiry (seconds)',  group_id=6 WHERE prop_name='memcache.expiry';
UPDATE server_configuration SET display_name='Memcache Store Attempts',  group_id=6 WHERE prop_name='memcache.storeattempts';
UPDATE server_configuration SET display_name='Memcache Retrive Attempts',  group_id=6 WHERE prop_name='memcache.retriveattempts';
UPDATE server_configuration SET display_name='Memcache Number of Clients',  group_id=6 WHERE prop_name='memcache.no.of.clients';
UPDATE server_configuration SET display_name='Memcache Store Timeout (milliseconds)',  group_id=6 WHERE prop_name='memcache.store.time';
UPDATE server_configuration SET display_name='Memcache Id Transport',  group_id=6 WHERE prop_name='cacheid.transport';
UPDATE server_configuration SET display_name='Memcache Id Cookie Secured',  group_id=6 WHERE prop_name='is.cacheid.cookie.secure';
UPDATE server_configuration SET display_name='Memcache Id Cookie Path',  group_id=6 WHERE prop_name='cacheid.cookie.path';
UPDATE server_configuration SET display_name='SSL Trust Store',  group_id=3 WHERE prop_name='ssl.trustStore';
UPDATE server_configuration SET display_name='SSL Key Store',  group_id=3 WHERE prop_name='ssl.keyStore';
UPDATE server_configuration SET display_name='SSL Trust Store Password',  group_id=3 WHERE prop_name='ssl.trustStorePassword';
UPDATE server_configuration SET display_name='SSL Key Store Password',  group_id=3 WHERE prop_name='ssl.keyStorePassword';
UPDATE server_configuration SET display_name='SSL Key Store Type',  group_id=3 WHERE prop_name='ssl.keyStoreType';
UPDATE server_configuration SET display_name='SSL Trust Store type',  group_id=3 WHERE prop_name='ssl.trustStoreType';
UPDATE server_configuration SET display_name='SSL Algorithm',  group_id=3 WHERE prop_name='ssl.algorithm';
UPDATE server_configuration SET display_name='SSL Socket Factory Provider',  group_id=3 WHERE prop_name='ssl.SocketFactory.provider';
UPDATE server_configuration SET display_name='SSL Server Socket Factory Provider',  group_id=3 WHERE prop_name='ssl.ServerSocketFactory.provider';
UPDATE server_configuration SET display_name='SSL Socket Factory Host Name Verifier',  group_id=3 WHERE prop_name='ssl.SocketFactory.hostname.verifier';
UPDATE server_configuration SET display_name='Exclude Parameters in Request or Response',  group_id=8 WHERE prop_name='p.exclude';
UPDATE server_configuration SET display_name='Metrics URL Package Prefixes',  group_id=1 WHERE prop_name='metrics.URLPkgPrefixes';
UPDATE server_configuration SET display_name='Exclude Input Parameters from Log Context (NDC)',  group_id=8 WHERE prop_name='do.not.log';
UPDATE server_configuration SET display_name='Send Default User Agent',  group_id=8 WHERE prop_name='send.default.user.agent';
UPDATE server_configuration SET display_name='NDC Delimiter',  group_id=8 WHERE prop_name='ndc.delimiter';
UPDATE server_configuration SET display_name='Exclude Stacktrace From Logs',  group_id=8 WHERE prop_name='mask.trace';
UPDATE server_configuration SET display_name='Accept Only Gzip Compression for Endpoint Response',  group_id=8 WHERE prop_name='gzipCompressionEnabled';
UPDATE server_configuration SET display_name='Do Not Escape XML Special Characters',  group_id=8 WHERE prop_name='dontEscapeXMLSpecialChars';
UPDATE server_configuration SET display_name='Metrics Logging',  group_id=1 WHERE prop_name='metrics.logging';
UPDATE server_configuration SET display_name='Metrics Topic Name',  group_id=1 WHERE prop_name='metrics.TopicName';
UPDATE server_configuration SET display_name='Metrics Topic Connection Factory Name',  group_id=1 WHERE prop_name='metrics.TopicConnectionFactoryName';
UPDATE server_configuration SET display_name='Metrics Initial Context Factory Name',  group_id=1 WHERE prop_name='metrics.initialContextFactoryName';
UPDATE server_configuration SET display_name='Metrics Provider URL',  group_id=1 WHERE prop_name='metrics.providerURL';
UPDATE server_configuration SET display_name='Metrics Security Principal',  group_id=1 WHERE prop_name='metrics.securityPrincipalName';
UPDATE server_configuration SET display_name='Metrics Security Credentials',  group_id=1 WHERE prop_name='metrics.securityCredentials';
UPDATE server_configuration SET display_name='Metrics User Name',  group_id=1 WHERE prop_name='metrics.userName';
UPDATE server_configuration SET display_name='Metrics Password',  group_id=1 WHERE prop_name='metrics.password';
UPDATE server_configuration SET display_name='JSON Array Support',  group_id=8 WHERE prop_name='jsonArraySupport';
UPDATE server_configuration SET display_name='CORS Enabled',  group_id=4 WHERE prop_name='CORS_ENABLED';
UPDATE server_configuration SET display_name='Server Timer Frequency (milliseconds)',  group_id=8 WHERE prop_name='timer.period';
UPDATE server_configuration SET display_name='Server Timer Delay in Startup (milliseconds)',  group_id=8 WHERE prop_name='timer.delay';
UPDATE server_configuration SET display_name='Volt MX Reports Year Dropdown Offset',  group_id=8 WHERE prop_name='year.dropdown.offset';
UPDATE server_configuration SET display_name='Server Log Location',  group_id=7 WHERE prop_name='SERVER_LOG_LOCATION';
UPDATE server_configuration SET display_name='Server Log Option',  group_id=7 WHERE prop_name='SERVER_LOG_OPTION';
UPDATE server_configuration SET display_name='Server Logger JNDI Name',  group_id=7 WHERE prop_name='SERVER_LOGGER_JNDI_NAME';
UPDATE server_configuration SET display_name='Database Type',  group_id=5 WHERE prop_name='storage_database_type';
UPDATE server_configuration SET display_name='Database Host Name',  group_id=5 WHERE prop_name='storage_database_hostname';
UPDATE server_configuration SET display_name='Database Port',  group_id=5 WHERE prop_name='storage_database_port';
UPDATE server_configuration SET display_name='Database User Name',  group_id=5 WHERE prop_name='storage_database_username';
UPDATE server_configuration SET display_name='Database Password',  group_id=5 WHERE prop_name='storage_database_password';
UPDATE server_configuration SET display_name='Database Instance',  group_id=5 WHERE prop_name='storage_database_instance';
UPDATE server_configuration SET display_name='Data Tablespace Name',  group_id=5 WHERE prop_name='storage_data_tablespace';
UPDATE server_configuration SET display_name='Index Tablespace Name',  group_id=5 WHERE prop_name='storage_index_tablespace';
UPDATE server_configuration SET display_name='LOB Tablespace Name',  group_id=5 WHERE prop_name='storage_lob_tablespace';
UPDATE server_configuration SET display_name='SQL Server Default Schema',  group_id=5 WHERE prop_name='storage_sqlserver_default_schema';
UPDATE server_configuration SET display_name='Max Allowed Connections',  group_id=5 WHERE prop_name='storage_database_max_connections';
UPDATE server_configuration SET display_name='Connection Timeout in Seconds',  group_id=5 WHERE prop_name='storage_database_connection_timeout_sec';
UPDATE server_configuration SET display_name='Number of Server Nodes for Throttling',  group_id=8 WHERE prop_name='KONY_SERVER_NUMBER_OF_NODES';
UPDATE server_configuration SET display_name='Volt MX Server Access Control Allow Origin Value',  group_id=4 WHERE prop_name='KONY_SERVER_ACCESS_CONTROL_ALLOW_ORIGIN';
UPDATE server_configuration SET display_name='Volt MX Server Access Control Echo Whitelist Domains',  group_id=4 WHERE prop_name='KONY_SERVER_ALLOW_ORIGIN_ECHO_WHITELIST';
UPDATE server_configuration SET display_name='Volt MX Server Services Context Path',  group_id=8 WHERE prop_name='KONY_SERVER_SERVICES_CONTEXT_PATH';
UPDATE server_configuration SET display_name='Management Server Host Name',  group_id=2 WHERE prop_name='management_server_host_name';
UPDATE server_configuration SET display_name='Management Server Port',  group_id=2 WHERE prop_name='management_server_port';
UPDATE server_configuration SET display_name='Management Server User Name',  group_id=2 WHERE prop_name='management_server_user';
UPDATE server_configuration SET display_name='Management Server Password',  group_id=2 WHERE prop_name='management_server_password';
UPDATE server_configuration SET display_name='Management Server Scheme ',  group_id=2 WHERE prop_name='management_server_scheme';

UPDATE server_configuration SET prop_value='true' WHERE prop_name='CORS_ENABLED';

INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='richclient.deploy';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='konycentral.datasource';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='konycentral.capabilitylist';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='controller.deffile';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='middleware.xssconfigfile';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='appregistry.dir';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='fileupload.dir';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 1, 'onprem', '', '', '' FROM server_configuration WHERE prop_name='memcache.cluster';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 6, 'onprem', '', '', '' FROM server_configuration WHERE prop_name='memcache.expiry';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 4, 'onprem', '', '', '' FROM server_configuration WHERE prop_name='memcache.storeattempts';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 5, 'onprem', '', '', '' FROM server_configuration WHERE prop_name='memcache.retriveattempts';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 2, 'onprem', '', '', '' FROM server_configuration WHERE prop_name='memcache.no.of.clients';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 3, 'onprem', '', '', '' FROM server_configuration WHERE prop_name='memcache.store.time';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'dropdown', 'PARAM_ONLY,COOKIE_ONLY,EITHER', 7, 'both', '', '', '{\"PARAM_ONLY\":\"{\\\"is.cacheid.cookie.secure\\\":\\\"block\\\",\\\"cacheid.cookie.path\\\":\\\"block\\\"}\",\"COOKIE_ONLY\":\"{\\\"is.cacheid.cookie.secure\\\":\\\"unblock\\\",\\\"cacheid.cookie.path\\\":\\\"unblock\\\"}\",\"EITHER\":\"{\\\"is.cacheid.cookie.secure\\\":\\\"unblock\\\",\\\"cacheid.cookie.path\\\":\\\"block\\\"}\"}' FROM server_configuration WHERE prop_name='cacheid.transport';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 8, 'both', '', '', '' FROM server_configuration WHERE prop_name='cacheid.cookie.path';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'checkbox', '', 9, 'both', '', '', '' FROM server_configuration WHERE prop_name='is.cacheid.cookie.secure';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='use.encryption';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 1, 'onprem', '', '', '' FROM server_configuration WHERE prop_name='ssl.trustStore';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 2, 'onprem', '', '', '' FROM server_configuration WHERE prop_name='ssl.keyStore';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'password', '', 3, 'onprem', '', '', '' FROM server_configuration WHERE prop_name='ssl.trustStorePassword';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'password', '', 4, 'onprem', '', '', '' FROM server_configuration WHERE prop_name='ssl.keyStorePassword';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 5, 'onprem', '', '', '' FROM server_configuration WHERE prop_name='ssl.keyStoreType';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 6, 'onprem', '', '', '' FROM server_configuration WHERE prop_name='ssl.trustStoreType';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 7, 'both', '', '', '' FROM server_configuration WHERE prop_name='ssl.algorithm';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 8, 'both', '', '', '' FROM server_configuration WHERE prop_name='ssl.SocketFactory.provider';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 9, 'both', '', '', '' FROM server_configuration WHERE prop_name='ssl.ServerSocketFactory.provider';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 10, 'both', '', '', '' FROM server_configuration WHERE prop_name='ssl.SocketFactory.hostname.verifier';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 6, 'both', '', '', '' FROM server_configuration WHERE prop_name='p.exclude';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='log.description.error';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='pubkey.file.path';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='license.file.path';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='mail.Provider.Impl';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='mail.smtp.host';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='mail.smtp.auth';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='mail.debug';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='mail.smtp.port';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='mail.smtp.starttls.enable';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='license.mail.from';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='license.mail.fromDisplayName';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='license.mail.fromPwd';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='license.expiry.warning.mail.recipients';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='license.expiry.warning.mail.cc';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='license.expiry.warning.mail.bcc';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='license.expiry.warning.mail.replyto';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='license.expired.mail.recipients';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='license.expired.mail.cc';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='license.expired.mail.bcc';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='license.expired.mail.replyto';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='license.expiry.warning.mail.subject';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='license.expiry.warning.mail.content';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='license.expired.mail.subject';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='license.expired.mail.content';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='license.mail.session.alert.threshold';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='session.limit.warning.mail.recipients';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='session.limit.warning.mail.cc';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='session.limit.warning.mail.bcc';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='session.limit.warning.mail.replyto';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='session.limit.exceeded.mail.recipients';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='session.limit.exceeded.mail.cc';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='session.limit.exceeded.mail.bcc';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='session.limit.exceeded.mail.replyto';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='session.limit.warning.mail.subject';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='session.limit.warning.mail.content';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='session.limit.exceeded.mail.subject';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='session.limit.exceeded.mail.content';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 9, 'onprem', '', '', '' FROM server_configuration WHERE prop_name='metrics.URLPkgPrefixes';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 7, 'both', '', '', '' FROM server_configuration WHERE prop_name='do.not.log';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'checkbox', '', 2, 'both', '', '', '' FROM server_configuration WHERE prop_name='send.default.user.agent';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='log.specific.session.attribute';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='log.specific.response.header';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='log.specific.request.header.parameter';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 8, 'both', '', '', '' FROM server_configuration WHERE prop_name='ndc.delimiter';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'checkbox', '', 4, 'both', '', '', '' FROM server_configuration WHERE prop_name='mask.trace';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='mbeans.instantiation';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'checkbox', '', 3, 'both', '', '', '' FROM server_configuration WHERE prop_name='gzipCompressionEnabled';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='maxHttpConnectionsPerHost';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='maxTotalHttpConnections';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 5, 'both', '', '', '' FROM server_configuration WHERE prop_name='dontEscapeXMLSpecialChars';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'checkbox', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='metrics.logging';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 1, 'onprem', '', '', '' FROM server_configuration WHERE prop_name='metrics.TopicName';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 2, 'onprem', '', '', '' FROM server_configuration WHERE prop_name='metrics.TopicConnectionFactoryName';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 3, 'onprem', '', '', '' FROM server_configuration WHERE prop_name='metrics.initialContextFactoryName';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 4, 'onprem', '', '', '' FROM server_configuration WHERE prop_name='metrics.providerURL';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 5, 'onprem', '', '', '' FROM server_configuration WHERE prop_name='metrics.securityPrincipalName';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'password', '', 6, 'onprem', '', '', '' FROM server_configuration WHERE prop_name='metrics.securityCredentials';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 7, 'onprem', '', '', '' FROM server_configuration WHERE prop_name='metrics.userName';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'password', '', 8, 'onprem', '', '', '' FROM server_configuration WHERE prop_name='metrics.password';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'checkbox', '', 1, 'both', '', '', '' FROM server_configuration WHERE prop_name='jsonArraySupport';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'checkbox', '', 1, 'both', '', '', '' FROM server_configuration WHERE prop_name='CORS_ENABLED';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'dropdown', 'ALL,NONE,ECHO', 2, 'both', '', '', '' FROM server_configuration WHERE prop_name='KONY_SERVER_ACCESS_CONTROL_ALLOW_ORIGIN';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 3, 'both', '', '', '' FROM server_configuration WHERE prop_name='KONY_SERVER_ALLOW_ORIGIN_ECHO_WHITELIST';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='KONY_ACCOUNT_ID';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='ENVIRONMENT_ID';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='jms.logging';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 9, 'both', '', '', '' FROM server_configuration WHERE prop_name='timer.period';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 10, 'both', '', '', '' FROM server_configuration WHERE prop_name='timer.delay';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 12, 'onprem', '', '', '' FROM server_configuration WHERE prop_name='year.dropdown.offset';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='SERVER_LOG_LEVEL';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 2, 'onprem', '', '', '' FROM server_configuration WHERE prop_name='SERVER_LOG_LOCATION';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'dropdown', 'logfile,database,SYSLOG', 1, 'onprem', '', '', '{\"database\":\"{\\\"SERVER_LOGGER_JNDI_NAME\\\":\\\"unblock\\\",\\\"SERVER_LOG_LOCATION\\\":\\\"block\\\"}\",\"logfile\":\"{\\\"SERVER_LOGGER_JNDI_NAME\\\":\\\"block\\\",\\\"SERVER_LOG_LOCATION\\\":\\\"unblock\\\"}\",\"SYSLOG\":\"{\\\"SERVER_LOGGER_JNDI_NAME\\\":\\\"block\\\",\\\"SERVER_LOG_LOCATION\\\":\\\"block\\\"}\"}' FROM server_configuration WHERE prop_name='SERVER_LOG_OPTION';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 3, 'onprem', '', '', '' FROM server_configuration WHERE prop_name='SERVER_LOGGER_JNDI_NAME';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'dropdown', 'mysql,sqlserver,oracle', 1, 'onprem', '', '', '{\"sqlserver\":\"{\\\"storage_database_port\\\":\\\"1433\\\",\\\"storage_database_instance\\\":\\\"unblock\\\",\\\"storage_data_tablespace\\\":\\\"block\\\",\\\"storage_index_tablespace\\\":\\\"block\\\",\\\"storage_lob_tablespace\\\":\\\"block\\\"}\",\"mysql\":\"{\\\"storage_database_port\\\":\\\"3306\\\",\\\"storage_database_instance\\\":\\\"block\\\",\\\"storage_data_tablespace\\\":\\\"block\\\",\\\"storage_index_tablespace\\\":\\\"block\\\",\\\"storage_lob_tablespace\\\":\\\"block\\\"}\",\"oracle\":\"{\\\"storage_database_port\\\":\\\"1560\\\",\\\"storage_database_instance\\\":\\\"unblock\\\",\\\"storage_data_tablespace\\\":\\\"unblock\\\",\\\"storage_index_tablespace\\\":\\\"unblock\\\",\\\"storage_lob_tablespace\\\":\\\"unblock\\\"}\"}' FROM server_configuration WHERE prop_name='storage_database_type';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 2, 'onprem', '', '', '' FROM server_configuration WHERE prop_name='storage_database_hostname';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 3, 'onprem', '', '', '' FROM server_configuration WHERE prop_name='storage_database_port';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 4, 'onprem', '', '', '' FROM server_configuration WHERE prop_name='storage_database_username';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'password', '', 5, 'onprem', '', '', '' FROM server_configuration WHERE prop_name='storage_database_password';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 6, 'onprem', '', '', '' FROM server_configuration WHERE prop_name='storage_database_instance';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 7, 'onprem', '', '', '' FROM server_configuration WHERE prop_name='storage_data_tablespace';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 8, 'onprem', '', '', '' FROM server_configuration WHERE prop_name='storage_index_tablespace';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 9, 'onprem', '', '', '' FROM server_configuration WHERE prop_name='storage_lob_tablespace';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 10, 'onprem', '', '', '' FROM server_configuration WHERE prop_name='storage_sqlserver_default_schema';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 11, 'onprem', '', '', '' FROM server_configuration WHERE prop_name='storage_database_max_connections';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 12, 'onprem', '', '', '' FROM server_configuration WHERE prop_name='storage_database_connection_timeout_sec';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='KONY_SERVER_CLIENT_LOG_LEVEL_OVERRIDE';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='KONY_SERVER_LOGFILTER_CLIENT_IP';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='KONY_SERVER_LOGFILTER_USER_ID';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, '', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='KONY_SERVER_LOGFILTER_SERVICE_NAME';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 11, 'onprem', '', '', '' FROM server_configuration WHERE prop_name='KONY_SERVER_NUMBER_OF_NODES';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 13, 'onprem', '', '', '' FROM server_configuration WHERE prop_name='KONY_SERVER_SERVICES_CONTEXT_PATH';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 1, 'onprem', '', '', '' FROM server_configuration WHERE prop_name='management_server_host_name';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 2, 'onprem', '', '', '' FROM server_configuration WHERE prop_name='management_server_port';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 3, 'onprem', '', '', '' FROM server_configuration WHERE prop_name='management_server_user';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'password', '', 4, 'onprem', '', '', '' FROM server_configuration WHERE prop_name='management_server_password';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'dropdown', 'https,http', 5, 'onprem', '', '', '' FROM server_configuration WHERE prop_name='management_server_scheme';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'textbox', '', 0, 'none', '', '', '' FROM server_configuration WHERE prop_name='consumer_key';
INSERT INTO server_config_ui_metadata(id, ui_control_type, dropdown_options, prop_order, display_mode, prop_description, validation_script,on_change_expression)
select id, 'password', '', null, 'none', '', '', '' FROM server_configuration WHERE prop_name='consumer_secret';
