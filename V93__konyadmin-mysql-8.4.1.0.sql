UPDATE server_configuration SET prop_value='500000', updated_date=NOW() WHERE prop_name='METRICS_QUEUE_MAX_CAPACITY';
COMMIT;