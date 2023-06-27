CREATE TABLE `server_tenant_storage_details` (
  `tenant_identifier` varchar(40) ,
  `current_storage_size` double,
  `max_storage_size` double,
  `updated_date` timestamp,
  `notification_flag_status` tinyint(1) DEFAULT '0',
  `notification_flag_type` varchar(15),
  PRIMARY KEY (`tenant_identifier`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;