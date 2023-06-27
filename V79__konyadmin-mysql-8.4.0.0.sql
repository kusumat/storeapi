DROP TABLE `server_log_events`;

CREATE TABLE `server_log_devicerequestdata1`(
    `request_id` VARCHAR(50) NOT NULL,
    `app_id` VARCHAR(50) ,
    `device_id` VARCHAR(255),
    `user_id` VARCHAR(128),
    `created_by` VARCHAR(255),
    `created_date` DATETIME,
    `updated_by` VARCHAR(255),
    `updated_date` DATETIME,
    `request_method` VARCHAR(50),
    `payload` MEDIUMBLOB,
    `request_size` INT,
    `session_id` VARCHAR(100),
    CONSTRAINT `pk_server_log_device_req1` PRIMARY KEY (request_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into `server_log_devicerequestdata1` (select * from `server_log_devicerequestdata`);

commit;

drop table `server_log_devicerequestdata`;

CREATE TABLE `server_log_deviceresponsedata1`(
    `request_id` VARCHAR(50) NOT NULL,
    `created_by` VARCHAR(255),
    `created_date` DATETIME,
    `updated_by` VARCHAR(255),
    `updated_date` DATETIME,
    `opstatus` INT(7),
    `payload` MEDIUMBLOB,
    `response_size` INT,
    `session_id` VARCHAR(100),
    CONSTRAINT `pk_server_log_device_res1` PRIMARY KEY (request_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into `server_log_deviceresponsedata1` (select * from `server_log_deviceresponsedata`);

commit;

drop table `server_log_deviceresponsedata`;

CREATE TABLE `server_log_devicerequestdata2`(
    `request_id` VARCHAR(50) NOT NULL,
    `app_id` VARCHAR(50) ,
    `device_id` VARCHAR(255),
    `user_id` VARCHAR(128),
    `created_by` VARCHAR(255),
    `created_date` DATETIME,
    `updated_by` VARCHAR(255),
    `updated_date` DATETIME,
    `request_method` VARCHAR(50),
    `payload` MEDIUMBLOB,
    `request_size` INT,
    `session_id` VARCHAR(100),
    CONSTRAINT `pk_server_log_device_req2` PRIMARY KEY (request_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `server_log_devicerequestdata3` (
    `request_id` VARCHAR(50) NOT NULL,
    `app_id` VARCHAR(50),
    `device_id` VARCHAR(255),
    `user_id` VARCHAR(128),
    `created_by` VARCHAR(255),
    `created_date` DATETIME,
    `updated_by` VARCHAR(255),
    `updated_date` DATETIME,
    `request_method` VARCHAR(50),
    `payload` MEDIUMBLOB,
    `request_size` INT,
    `session_id` VARCHAR(100),
    CONSTRAINT `pk_server_log_device_req3` PRIMARY KEY (request_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `server_log_devicerequestdata4`(
    `request_id` VARCHAR(50) NOT NULL,
    `app_id` VARCHAR(50) NULL,
    `device_id` VARCHAR(255),
    `user_id` VARCHAR(128),
    `created_by` VARCHAR(255),
    `created_date` DATETIME,
    `updated_by` VARCHAR(255),
    `updated_date` DATETIME,
    `request_method` VARCHAR(50),
    `payload` MEDIUMBLOB,
    `request_size` INT,
    `session_id` VARCHAR(100),
    CONSTRAINT `pk_server_log_device_req4` PRIMARY KEY (request_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `server_log_devicerequestdata5`(
    `request_id` VARCHAR(50) NOT NULL,
    `app_id` VARCHAR(50),
    `device_id` VARCHAR(255),
    `user_id` VARCHAR(128),
    `created_by` VARCHAR(255),
    `created_date` DATETIME,
    `updated_by` VARCHAR(255),
    `updated_date` DATETIME,
    `request_method` VARCHAR(50),
    `payload` MEDIUMBLOB,
    `request_size` INT,
    `session_id` VARCHAR(100),
    CONSTRAINT `pk_server_log_device_req5` PRIMARY KEY (request_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `server_log_devicerequestdata6`(
    `request_id` VARCHAR(50) NOT NULL,
    `app_id` VARCHAR(50),
    `device_id` VARCHAR(255),
    `user_id` VARCHAR(128),
    `created_by` VARCHAR(255),
    `created_date` DATETIME,
    `updated_by` VARCHAR(255),
    `updated_date` DATETIME,
    `request_method` VARCHAR(50),
    `payload` MEDIUMBLOB,
    `request_size` INT,
    `session_id` VARCHAR(100),
    CONSTRAINT `pk_server_log_device_req6` PRIMARY KEY (request_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `server_log_devicerequestdata7`(
    `request_id` VARCHAR(50) NOT NULL,
    `app_id` VARCHAR(50),
    `device_id` VARCHAR(255),
    `user_id` VARCHAR(128),
    `created_by` VARCHAR(255),
    `created_date` DATETIME,
    `updated_by` VARCHAR(255),
    `updated_date` DATETIME,
    `request_method` VARCHAR(50),
    `payload` MEDIUMBLOB,
    `request_size` INT,
    `session_id` VARCHAR(100),
    CONSTRAINT `pk_server_log_device_req7` PRIMARY KEY (request_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `server_log_devicerequestdata8`(
    `request_id` VARCHAR(50) NOT NULL,
    `app_id` VARCHAR(50),
    `device_id` VARCHAR(255),
    `user_id` VARCHAR(128),
    `created_by` VARCHAR(255),
    `created_date` DATETIME,
    `updated_by` VARCHAR(255),
    `updated_date` DATETIME,
    `request_method` VARCHAR(50),
    `payload` MEDIUMBLOB,
    `request_size` INT,
    `session_id` VARCHAR(100),
    CONSTRAINT `pk_server_log_device_req8` PRIMARY KEY (request_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `server_log_devicerequestdata9`(
    `request_id` VARCHAR(50) NOT NULL,
    `app_id` VARCHAR(50),
    `device_id` VARCHAR(255),
    `user_id` VARCHAR(128),
    `created_by` VARCHAR(255),
    `created_date` DATETIME,
    `updated_by` VARCHAR(255),
    `updated_date` DATETIME,
    `request_method` VARCHAR(50),
    `payload` MEDIUMBLOB,
    `request_size` INT,
    `session_id` VARCHAR(100),
    CONSTRAINT `pk_server_log_device_req9` PRIMARY KEY (request_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `server_log_deviceresponsedata2`(
    `request_id` VARCHAR(50) NOT NULL,
     `created_by` VARCHAR(255),
    `created_date` DATETIME,
    `updated_by` VARCHAR(255),
    `updated_date` DATETIME,
    `opstatus` INT(7),
    `payload` MEDIUMBLOB,
    `response_size` INT,
    `session_id` VARCHAR(100),
     CONSTRAINT `pk_server_log_device_res2` PRIMARY KEY (request_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `server_log_deviceresponsedata3`(
    `request_id` VARCHAR(50) NOT NULL,
    `created_by` VARCHAR(255),
    `created_date` DATETIME,
    `updated_by` VARCHAR(255),
    `updated_date` DATETIME,
    `opstatus` INT(7),
    `payload` MEDIUMBLOB,
    `response_size` INT,
    `session_id` VARCHAR(100),
    CONSTRAINT `pk_server_log_device_res3` PRIMARY KEY (request_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `server_log_deviceresponsedata4`(
    `request_id` VARCHAR(50) NOT NULL,
    `created_by` VARCHAR(255),
    `created_date` DATETIME,
    `updated_by` VARCHAR(255),
    `updated_date` DATETIME,
    `opstatus` INT(7),
    `payload` MEDIUMBLOB,
    `response_size` INT,
    `session_id` VARCHAR(100),
    CONSTRAINT `pk_server_log_device_res4` PRIMARY KEY (request_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `server_log_deviceresponsedata5`(
    `request_id` VARCHAR(50) NOT NULL,
    `created_by` VARCHAR(255),
    `created_date` DATETIME,
    `updated_by` VARCHAR(255),
    `updated_date` DATETIME,
    `opstatus` INT(7),
    `payload` MEDIUMBLOB,
    `response_size` INT,
    `session_id` VARCHAR(100),
    CONSTRAINT `pk_server_log_device_res5` PRIMARY KEY (request_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `server_log_deviceresponsedata6`(
    `request_id` VARCHAR(50) NOT NULL,
     `created_by` VARCHAR(255),
    `created_date` DATETIME,
    `updated_by` VARCHAR(255),
    `updated_date` DATETIME,
    `opstatus` INT(7),
    `payload` MEDIUMBLOB,
    `response_size` INT,
    `session_id` VARCHAR(100),
    CONSTRAINT `pk_server_log_device_res6` PRIMARY KEY (request_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `server_log_deviceresponsedata7`(
    `request_id` VARCHAR(50) NOT NULL,
    `created_by` VARCHAR(255),
    `created_date` DATETIME,
    `updated_by` VARCHAR(255),
    `updated_date` DATETIME,
    `opstatus` INT(7),
    `payload` MEDIUMBLOB,
    `response_size` INT,
    `session_id` VARCHAR(100),
    CONSTRAINT `pk_server_log_device_res7` PRIMARY KEY (request_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `server_log_deviceresponsedata8`(
    `request_id` VARCHAR(50) NOT NULL,
    `created_by` VARCHAR(255),
    `created_date` DATETIME,
    `updated_by` VARCHAR(255),
    `updated_date` DATETIME,
    `opstatus` INT(7),
    `payload` MEDIUMBLOB,
    `response_size` INT,
    `session_id` VARCHAR(100),
    CONSTRAINT `pk_server_log_device_res8` PRIMARY KEY (request_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `server_log_deviceresponsedata9`(
    `request_id` VARCHAR(50) NOT NULL,
    `created_by` VARCHAR(255),
    `created_date` DATETIME,
    `updated_by` VARCHAR(255),
    `updated_date` DATETIME,
    `opstatus` INT(7),
    `payload` MEDIUMBLOB,
    `response_size` INT,
    `session_id` VARCHAR(100),
    CONSTRAINT `pk_server_log_device_res9` PRIMARY KEY (request_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
