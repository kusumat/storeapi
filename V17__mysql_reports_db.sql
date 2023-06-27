-- Adding Scheduler Properties to metrics_configuration table

INSERT INTO metrics_configuration (name, value, created_date, updated_date) VALUES ('LICENSING_JOB_FREQUENCY', '0 0 2 5 1/1 ? *', CURDATE(), CURDATE());
INSERT INTO metrics_configuration (name, value, created_date, updated_date) VALUES ('RUN_LICENSING_JOB', 'true', CURDATE(), CURDATE());
INSERT INTO metrics_configuration (name, value, created_date, updated_date) VALUES ('SCHEDULER_DELAY_TIME', '300', CURDATE(), CURDATE());

COMMIT;