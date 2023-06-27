UPDATE `server_configuration` SET `prop_value`='600', `display_name`='Cache Expiry (in secs)' , updated_date=NOW() WHERE `prop_name`='cacheExpiry';
COMMIT;