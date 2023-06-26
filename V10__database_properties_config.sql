INSERT INTO `configurations` (name, value) VALUES ('WAAS_BASE_URL', '${WAAS_BASE_URL}');
INSERT INTO `configurations` (name, value) VALUES ('KONY_ACCOUNTS_LOG_LEVEL', 'INFO');
INSERT INTO `configurations` (name, value) VALUES ('KONY_ACCOUNTS_LOG_OPTION', 'logfile');
INSERT INTO `configurations` (name, VALUE) VALUES ('KONY_ACCOUNTS_LOG_LOCATION', REPLACE('${KONY_ACCOUNTS_LOG_LOCATION}','#{',CONCAT('$','{')) );