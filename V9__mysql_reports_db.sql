-- Drop existing table `application_log`
DROP TABLE IF EXISTS application_log;

-- Table structure for table `application_log`

CREATE TABLE application_log (
  service_name varchar(255),
  log_level varchar(255),
  event_date varchar(255),
  request_id  varchar(255),
  thread_name varchar(255),
  additonal_info varchar(255),
  log_message  varchar(4000), 
  exception_trace  mediumtext
)  ENGINE=InnoDB ;


alter table application_log add index application_log_idx(request_id);