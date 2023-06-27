UPDATE `server_configuration` SET `prop_value`='${KONY_SERVER_LOGGER_JNDI_NAME}', updated_date=NOW() WHERE `prop_name`='SERVER_LOGGER_JNDI_NAME';
COMMIT;