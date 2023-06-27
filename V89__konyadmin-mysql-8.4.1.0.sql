alter table attachment_metadata_info change size file_size varchar(32);
alter table attachment_metadata_info modify relative_path varchar(128);

insert into `server_configuration`(prop_name, prop_value, created_date , updated_date) values('ADMIN_DB_NAME','${ADMIN_DB_NAME}', NOW() , NOW()); 
commit;