-- Setting config prop through placeholder
UPDATE metrics_configuration SET value = '${KONY_METRICS_LOG_OPTION}' WHERE name = 'KONY_METRICS_LOG_OPTION';
UPDATE metrics_configuration SET value = '${KONY_METRICS_LOG_LEVEL}' WHERE name = 'KONY_METRICS_LOG_LEVEL';

COMMIT;