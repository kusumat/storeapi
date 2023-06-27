alter table `server_log_events` drop foreign key `fk_log_datasource`;
alter table `server_log_events` drop index `fk_log_datasource`;
alter table `server_log_deviceresponsedata` drop foreign key `fk_log_responseData`;
alter table `server_log_deviceresponsedata` drop index `fk_log_responseData`;