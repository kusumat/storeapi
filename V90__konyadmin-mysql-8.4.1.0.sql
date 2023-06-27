INSERT INTO server_configuration(prop_name, prop_value, created_date , updated_date) VALUES('METRICS_QUEUE_MAX_CAPACITY','1000000', CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT INTO server_configuration(prop_name, prop_value, created_date , updated_date) VALUES('METRICS_MEMORY_QUEUE_CONSUMERS_COUNT','10', CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
commit;