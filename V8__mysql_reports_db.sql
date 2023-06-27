-- Table structure for table `application_log`

CREATE TABLE application_log (
  service varchar(255),
  level varchar(255),
  event_date varchar(255),
  request_id  varchar(255),
  thread varchar(255),
  additonal_info varchar(255),
  message  varchar(4000), 
  exception  mediumtext
)  ENGINE=InnoDB ;


alter table application_log add index application_log_idx(request_id);

CREATE TABLE configurations (
  configuration_id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  value varchar(255) NOT NULL,
  created_date date, 
  updated_date date,
  PRIMARY KEY (configuration_id)
) ENGINE=InnoDB ;




INSERT INTO configurations (name, value, created_date, updated_date) VALUES ('KONY_METRICS_LOGGER_JNDI', '${KONY_METRICS_LOGGER_JNDI}',CURDATE(), CURDATE());
INSERT INTO configurations (name, value, created_date, updated_date) VALUES ('KONY_METRICS_LOG_LEVEL', 'INFO',CURDATE() , CURDATE());
INSERT INTO configurations (name, value, created_date, updated_date) VALUES ('KONY_METRICS_LOG_OPTION', 'logfile',CURDATE(), CURDATE());
INSERT INTO configurations (name, VALUE, created_date, updated_date) VALUES ('KONY_METRICS_LOG_LOCATION', REPLACE('${KONY_METRICS_LOG_LOCATION}','#{',CONCAT('$','{')),CURDATE(), CURDATE() );

COMMIT;