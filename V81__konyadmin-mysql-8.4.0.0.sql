CREATE TABLE server_monitor_alerts_config (
  id bigint(11) NOT NULL AUTO_INCREMENT,
  alerts_config longtext,
  created_by varchar(255),
  created_date datetime,
  updated_by varchar(255),
  updated_date datetime,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;