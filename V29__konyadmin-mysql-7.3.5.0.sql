CREATE TABLE server_log_devicerequestdata (
    request_id VARCHAR(50) NOT NULL,
    app_id VARCHAR(50) NULL,
    device_id VARCHAR(255),
    user_id VARCHAR(128),
	created_by VARCHAR(255) NULL DEFAULT NULL,
	created_date DATETIME NULL DEFAULT NULL,
	updated_by VARCHAR(255) NULL DEFAULT NULL,
	updated_date DATETIME NULL DEFAULT NULL,
    request_method VARCHAR(50), 
    payload BLOB,
    request_size INT,
    CONSTRAINT pk_request_id PRIMARY KEY (request_id)
);
  
CREATE TABLE server_log_deviceresponsedata (
    request_id VARCHAR(50) NOT NULL,
	`created_by` VARCHAR(255) NULL DEFAULT NULL,
    `created_date` DATETIME NULL DEFAULT NULL,
   `updated_by` VARCHAR(255) NULL DEFAULT NULL,
   `updated_date` DATETIME NULL DEFAULT NULL,
    opstatus INT(7),
    payload BLOB,
    response_size INT,
    CONSTRAINT fk_log_responseData FOREIGN KEY (request_id)
        REFERENCES server_log_devicerequestdata (request_id)
        ON DELETE CASCADE
);
   
CREATE TABLE server_log_events (
    request_id VARCHAR(50) NOT NULL,
	`created_by` VARCHAR(255) NULL DEFAULT NULL,
    `created_date` DATETIME NULL DEFAULT NULL,
    `updated_by` VARCHAR(255) NULL DEFAULT NULL,
    `updated_date` DATETIME NULL DEFAULT NULL,
    event_type VARCHAR(45) ,
    payload BLOB,
    CONSTRAINT fk_log_datasource FOREIGN KEY (request_id)
        REFERENCES server_log_devicerequestdata (request_id)
        ON DELETE CASCADE
);

insert into `server_configuration`(prop_name, prop_value, created_date , updated_date) values('KONY_SERVER_TRACELOGS_LEVEL','OFF', NOW() , NOW()); 

COMMIT;
