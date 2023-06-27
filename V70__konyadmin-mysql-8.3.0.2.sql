UPDATE server_configuration_group SET display_mode='onprem' where name='Cache Configuration';
DELETE from server_config_ui_metadata WHERE id IN (SELECT id from server_configuration WHERE prop_name IN ('memcache.cluster','memcache.expiry','memcache.storeattempts','memcache.retriveattempts','memcache.no.of.clients','memcache.store.time'));
DELETE from server_configuration where prop_name IN ('memcache.cluster','memcache.expiry','memcache.storeattempts','memcache.retriveattempts','memcache.no.of.clients','memcache.store.time');
UPDATE server_configuration_group set display_mode='none' WHERE name='Memcache Configuration';
UPDATE server_configuration SET prop_value='${KONY_SERVER_CACHE_TYPE}' WHERE prop_name='cacheType';
UPDATE server_configuration SET prop_value='${KONY_SERVER_SESSION_DISTRIBUTED}' WHERE prop_name='sessionDistribution'; 
UPDATE server_configuration SET prop_value='${KONY_SERVER_CACHE_URL}' WHERE prop_name='servers'; 
UPDATE server_configuration SET prop_value='{"environment_properties":{},"jcache_configuration_properties":{},"additional_properties":{}}' WHERE prop_name='advancedProps'; 
COMMIT;