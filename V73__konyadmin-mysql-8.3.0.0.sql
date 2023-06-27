UPDATE `server_configuration` SET `prop_value`='COOKIE_ONLY', updated_date=NOW() WHERE `prop_name`='cacheid.transport';
COMMIT;