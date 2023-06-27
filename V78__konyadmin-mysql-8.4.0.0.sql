UPDATE `server_configuration` SET `prop_value`='1200', updated_date=NOW() WHERE `prop_name`='cacheExpiry';
UPDATE `server_configuration` SET `display_name`='Enable Session Distribution', updated_date=NOW() WHERE `prop_name`='sessionDistribution';
COMMIT;