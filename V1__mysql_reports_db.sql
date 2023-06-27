
SET FOREIGN_KEY_CHECKS=0;

CREATE TABLE `middleware_requests` (
	`id`	bigint(20) 		NOT NULL AUTO_INCREMENT,
   	`bid`  	varchar(255)   	NOT NULL,
   	`mid`   varchar(255)	DEFAULT NULL,
   	`kaid` 	varchar(255)    NOT NULL,
   	`eid`   varchar(255)    NOT NULL,
   	`awsid` varchar(255)    DEFAULT NULL,
   	`ebid`	varchar(255)    DEFAULT NULL,
   	`did`	varchar(255)    DEFAULT NULL,
   	`aid` 	varchar(255)    NOT NULL,
   	`aname`	varchar(255)    NOT NULL,
   	`rid`	varchar(255)    NOT NULL,
	`sid`	varchar(255)    NOT NULL,
	`chnl`	varchar(255)    NOT NULL,
	`atype`	varchar(255)    NOT NULL,
	`plat`	varchar(255)    NOT NULL,
	`idur`	integer    		NOT NULL,
	`tdur`	integer    		NOT NULL,
	`rip`	varchar(255),
   	`ts`	timestamp		NOT NULL,
   	`dm`    varchar(255),
   	`os`	varchar(255),
   	`ua`	varchar(255),
   	`svcid`	varchar(255)     NOT NULL,
   	`fid`	varchar(255),
	`stype`	varchar(255)     NOT NULL,
   	`aver`	varchar(255),
	`session_key`	bigint(20)      NOT NULL,
   	`request_key`	bigint(20)      NOT NULL,
   	`kuid`		varchar(255)    	DEFAULT NULL,
   	`country`	varchar(2),
   	`region`	varchar(2),
   	`city`		varchar(255),
   	`zip`		varchar(6),
   	`lat`		numeric(8,5),
   	`lon`		numeric(8,5),
   	`dmacd`     integer,
   	`areacd`	varchar(3),
   	`predur`    integer         DEFAULT 0 NOT NULL,
   	`exdur`		integer         DEFAULT 0 NOT NULL,
   	`prsdur`	integer         DEFAULT 0 NOT NULL,
   	`postdur`   integer         DEFAULT 0 NOT NULL,
   	`col1` 		varchar(255) 	DEFAULT NULL,
	`col2` 		varchar(255) 	DEFAULT NULL,
	`col3` 		varchar(255) 	DEFAULT NULL,
	`col4` 		varchar(255) 	DEFAULT NULL,
	`col5` 		varchar(255) 	DEFAULT NULL,
   	PRIMARY KEY (`id`)
);

ALTER TABLE `middleware_requests`
   ADD CONSTRAINT `uk_middleware_requests`
   UNIQUE KEY (`request_key`);
   
CREATE INDEX idx_middleware_requests_session_key
   ON `middleware_requests` (`session_key` ASC);


CREATE TABLE `middleware_sessions` (
	`id`	bigint(20) 		NOT NULL AUTO_INCREMENT,
   	`bid`  	varchar(255)   	NOT NULL,
   	`mid`   varchar(255)    DEFAULT NULL,
   	`kaid` 	varchar(255)    NOT NULL,
   	`eid`   varchar(255)    NOT NULL,
   	`awsid` varchar(255)    DEFAULT NULL,
   	`ebid`	varchar(255)    DEFAULT NULL,
   	`did`	varchar(255)    DEFAULT NULL,
   	`aid` 	varchar(255)    NOT NULL,
   	`aname`	varchar(255)    NOT NULL,
	`sid`	varchar(255)    NOT NULL,
	`chnl`	varchar(255)    NOT NULL,
	`atype`	varchar(255)    NOT NULL,
	`plat`	varchar(255)    NOT NULL,
	`tdur`	integer    		NOT NULL,
	`rip`	varchar(255),
   	`ts`	timestamp		NOT NULL,
   	`dm`    varchar(255),
   	`os`	varchar(255),
   	`ua`	varchar(255),
	`stype`	varchar(255)     NOT NULL,
   	`aver`	varchar(255),
	`session_key`	bigint(20)  NOT NULL,
   	`kuid`		varchar(255)    DEFAULT NULL,
   	`country`	varchar(2),
   	`region`	varchar(2),
   	`city`		varchar(255),
   	`zip`		varchar(6),
   	`lat`		numeric(8,5),
   	`lon`		numeric(8,5),
   	`dmacd`     integer,
   	`areacd`	varchar(3),
   	`col1` 		varchar(255) 	DEFAULT NULL,
	`col2` 		varchar(255) 	DEFAULT NULL,
	`col3` 		varchar(255) 	DEFAULT NULL,
	`col4` 		varchar(255) 	DEFAULT NULL,
	`col5` 		varchar(255) 	DEFAULT NULL,
   	PRIMARY KEY (`id`)
);

ALTER TABLE `middleware_sessions`
   ADD CONSTRAINT `uk_middleware_sessions`
   UNIQUE KEY (`session_key`);

ALTER TABLE `middleware_requests`
  ADD CONSTRAINT `fk_middleware_requests_session_key` FOREIGN KEY (`session_key`)
  REFERENCES `middleware_sessions` (`session_key`)
  ON UPDATE NO ACTION
  ON DELETE NO ACTION;
   
CREATE TABLE `custom_metrics_master` (
   	`id`       		bigint(20)		NOT NULL AUTO_INCREMENT,
   	`request_key`	bigint(20)  	NOT NULL,
   	`bid`			varchar(255)    NOT NULL,
   	`mid`	        varchar(255)	DEFAULT NULL,
   	`kaid`			varchar(255)	NOT NULL,
   	`eid`           varchar(255)    NOT NULL,
   	`aid`          	varchar(255)    NOT NULL,
    `s1`           varchar(255),
    `s2`           varchar(255),
    `s3`           varchar(255),
    `s4`           varchar(255),
    `s5`           varchar(255),
    `s6`           varchar(255),
    `s7`           varchar(255),
    `s8`           varchar(255),
    `s9`           varchar(255),
    `s10`          varchar(255),
    `s11`          varchar(255),
    `s12`          varchar(255),
    `s13`          varchar(255),
    `s14`          varchar(255),
    `s15`          varchar(255),
    `s16`          varchar(255),
    `s17`          varchar(255),
    `s18`          varchar(255),
    `s19`          varchar(255),
    `s20`          varchar(255),
    `s21`          varchar(255),
    `s22`          varchar(255),
    `s23`          varchar(255),
    `s24`          varchar(255),
    `s25`          varchar(255),
    `s26`          varchar(255),
    `s27`          varchar(255),
    `s28`          varchar(255),
    `s29`          varchar(255),
    `s30`          varchar(255),
    `s31`          varchar(255),
    `s32`          varchar(255),
    `s33`          varchar(255),
    `s34`          varchar(255),
    `s35`          varchar(255),
    `s36`          varchar(255),
    `s37`          varchar(255),
    `s38`          varchar(255),
    `s39`          varchar(255),
    `s40`          varchar(255),
    `s41`          varchar(255),
    `s42`          varchar(255),
    `s43`          varchar(255),
    `s44`          varchar(255),
    `s45`          varchar(255),
    `s46`          varchar(255),
    `s47`          varchar(255),
    `s48`          varchar(255),
    `s49`          varchar(255),
    `s50`          varchar(255),
	`l1`           bigint,
    `l2`           bigint,
    `l3`           bigint,
    `l4`           bigint,
    `l5`           bigint,
    `l6`           bigint,
    `l7`           bigint,
    `l8`           bigint,
    `l9`           bigint,
    `l10`          bigint,
    `l11`          bigint,
    `l12`          bigint,
    `l13`          bigint,
    `l14`          bigint,
    `l15`          bigint,
    `l16`          bigint,
    `l17`          bigint,
    `l18`          bigint,
    `l19`          bigint,
    `l20`          bigint,
    `l21`          bigint,
    `l22`          bigint,
    `l23`          bigint,
    `l24`          bigint,
    `l25`          bigint,
    `d1`           float8,
    `d2`           float8,
    `d3`           float8,
    `d4`           float8,
    `d5`           float8,
    `d6`           float8,
    `d7`           float8,
    `d8`           float8,
    `d9`           float8,
    `d10`          float8,
    `d11`          float8,
    `d12`          float8,
    `d13`          float8,
    `d14`          float8,
    `d15`          float8,
    `d16`          float8,
    `d17`          float8,
    `d18`          float8,
    `d19`          float8,
    `d20`          float8,
    `d21`          float8,
    `d22`          float8,
    `d23`          float8,
    `d24`          float8,
    `d25`          float8,
    `b1`           boolean,
    `b2`           boolean,
    `b3`           boolean,
    `b4`           boolean,
    `b5`           boolean,
    `b6`           boolean,
    `b7`           boolean,
    `b8`           boolean,
    `b9`           boolean,
    `b10`          boolean,
    `b11`          boolean,
    `b12`          boolean,
    `b13`          boolean,
    `b14`          boolean,
    `b15`          boolean,
    `b16`          boolean,
    `b17`          boolean,
    `b18`          boolean,
    `b19`          boolean,
    `b20`          boolean,
    `b21`          boolean,
    `b22`          boolean,
    `b23`          boolean,
    `b24`          boolean,
    `b25`          boolean,
    `t1`           timestamp NULL,
    `t2`           timestamp NULL,
    `t3`           timestamp NULL,
    `t4`           timestamp NULL,
    `t5`           timestamp NULL,
    `t6`           timestamp NULL,
    `t7`           timestamp NULL,
    `t8`           timestamp NULL,
    `t9`           timestamp NULL,
    `t10`          timestamp NULL,
    `t11`          timestamp NULL,
    `t12`          timestamp NULL,
    `t13`          timestamp NULL,
    `t14`          timestamp NULL,
    `t15`          timestamp NULL,
    `t16`          timestamp NULL,
    `t17`          timestamp NULL,
    `t18`          timestamp NULL,
    `t19`          timestamp NULL,
    `t20`          timestamp NULL,
    `t21`          timestamp NULL,
    `t22`          timestamp NULL,
    `t23`          timestamp NULL,
    `t24`          timestamp NULL,
    `t25`          timestamp NULL,
    `dt1`          date,
    `dt2`          date,
    `dt3`          date,
    `dt4`          date,
    `dt5`          date,
    `dt6`          date,
    `dt7`          date,
    `dt8`          date,
    `dt9`          date,
    `dt10`         date,
    `dt11`         date,
    `dt12`         date,
    `dt13`         date,
    `dt14`         date,
    `dt15`         date,
    `dt16`         date,
    `dt17`         date,
    `dt18`         date,
    `dt19`         date,
    `dt20`         date,
    `dt21`         date,
    `dt22`         date,
    `dt23`         date,
    `dt24`         date,
    `dt25`         date,
    `col1` 		varchar(255) 	DEFAULT NULL,
	`col2` 		varchar(255) 	DEFAULT NULL,
	`col3` 		varchar(255) 	DEFAULT NULL,
	`col4` 		varchar(255) 	DEFAULT NULL,
	`col5` 		varchar(255) 	DEFAULT NULL,
   	PRIMARY KEY (`id`)
);

-- Metadata tables for Legacy reports - store metadata for services and page views.

CREATE TABLE `service_mapping` (
   `id`       		bigint(20) 		NOT NULL AUTO_INCREMENT,
   `aid`          	VARCHAR(255)   	NOT NULL,
   `serviceid`    	VARCHAR(255)   	NOT NULL,
   `servicename`  	VARCHAR(255)   	NOT NULL,
   `menuname`   	VARCHAR(255)   	DEFAULT NULL,
   `eventname`   	VARCHAR(255)   	DEFAULT NULL,
   `col1` 		varchar(255) 	DEFAULT NULL,
	`col2` 		varchar(255) 	DEFAULT NULL,
	`col3` 		varchar(255) 	DEFAULT NULL,
	`col4` 		varchar(255) 	DEFAULT NULL,
	`col5` 		varchar(255) 	DEFAULT NULL,
	`created_date`  	TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`created_by` 		VARCHAR(255) DEFAULT NULL,	
	`updated_date` 		DATETIME DEFAULT NULL,
	`updated_by` 		VARCHAR(255) DEFAULT NULL,
   PRIMARY KEY (`id`)
);
   
CREATE TABLE `form_mapping` (
   `id`       		bigint(20) 		NOT NULL AUTO_INCREMENT,
   `aid`           	VARCHAR(255) 	NOT NULL,
   `formid`       	VARCHAR(255)   	NOT NULL,
   `formname`     	VARCHAR(255)   	NOT NULL,
   `menuname`      	VARCHAR(255)   	DEFAULT NULL,
   `eventname`     	VARCHAR(255)   	DEFAULT NULL,
   `col1` 		varchar(255) 	DEFAULT NULL,
	`col2` 		varchar(255) 	DEFAULT NULL,
	`col3` 		varchar(255) 	DEFAULT NULL,
	`col4` 		varchar(255) 	DEFAULT NULL,
	`col5` 		varchar(255) 	DEFAULT NULL,
	`created_date`  	TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`created_by` 		VARCHAR(255) DEFAULT NULL,	
	`updated_date` 		DATETIME DEFAULT NULL,
	`updated_by` 		VARCHAR(255) DEFAULT NULL,
   PRIMARY KEY (`id`)
);

-- Invalid messages table for on-prem

CREATE TABLE `invalid_messages` (
   `id`       			bigint(20) 		NOT NULL AUTO_INCREMENT,
   `msg_body`	    	VARCHAR(10000) 	NOT NULL,
   `msg_type`		    VARCHAR(255)   	NOT NULL,
   `bid`        		VARCHAR(255)   	NOT NULL,
   `rsn`       			VARCHAR(1000)   NOT NULL,
   `insert_date`  		TIMESTAMP   	NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `col1` 				varchar(255) 	DEFAULT NULL,
   `col2` 		varchar(255) 	DEFAULT NULL,
   `col3` 		varchar(255) 	DEFAULT NULL,
   `col4` 		varchar(255) 	DEFAULT NULL,
   `col5` 		varchar(255) 	DEFAULT NULL,
   PRIMARY KEY (`id`)
);

-- Reports metadata tables (moved from konyadmin database)

CREATE TABLE `dw_keys_request` (
   	`request_key`  	bigint(20)		NOT NULL AUTO_INCREMENT,
   	`rid`          	VARCHAR(255)   	NOT NULL,
   	`eid`          	VARCHAR(255)    NOT NULL,
   	`ts`    	DATETIME       NOT NULL,
   	`insert_date`  	TIMESTAMP    	DEFAULT CURRENT_TIMESTAMP NOT NULL,
   	`col1` varchar(255) DEFAULT NULL ,
	`col2` varchar(255) DEFAULT NULL,
	`col3` varchar(255) DEFAULT NULL,
	`col4` varchar(255) DEFAULT NULL,
	`col5` varchar(255) DEFAULT NULL,
	`created_by` 		VARCHAR(255) DEFAULT NULL,	
	`created_date` 		DATETIME DEFAULT NULL,	
	`updated_by` 		VARCHAR(255) DEFAULT NULL,
	`updated_date` 		DATETIME DEFAULT NULL,
   	PRIMARY KEY (`request_key`)
);

ALTER TABLE dw_keys_request
   ADD CONSTRAINT pk_dw_keys_request
   UNIQUE KEY (rid, eid, ts);
   

CREATE TABLE `dw_keys_session` (
   	`session_key`  bigint(20)		NOT NULL AUTO_INCREMENT,
   	`sid`          VARBINARY(100)	NOT NULL,
   	`hash_code`    VARBINARY(100)   NOT NULL,
   	`insert_date`  TIMESTAMP   		DEFAULT CURRENT_TIMESTAMP NOT NULL,
   	`col1` varchar(255) DEFAULT NULL ,
	`col2` varchar(255) DEFAULT NULL,
	`col3` varchar(255) DEFAULT NULL,
	`col4` varchar(255) DEFAULT NULL,
	`col5` varchar(255) DEFAULT NULL,
	`created_by` 		VARCHAR(255) DEFAULT NULL,	
	`created_date` 		DATETIME DEFAULT NULL,	
	`updated_by` 		VARCHAR(255) DEFAULT NULL,
	`updated_date` 		DATETIME DEFAULT NULL,
   	PRIMARY KEY (`session_key`)
);

ALTER TABLE dw_keys_session
   ADD CONSTRAINT pk_dw_keys_session
   UNIQUE KEY (sid, hash_code);

CREATE TABLE `geolocations_ip4` (
   	`startIpNum`  VARCHAR(15),
   	`endIpNum`    VARCHAR(15),
   	`startIpInt`  INT UNSIGNED   NOT NULL,
   	`endIpInt`    INT UNSIGNED   DEFAULT 0 NOT NULL,
   	`country`     VARCHAR(2),
   	`region`      VARCHAR(2),
   	`city`        VARCHAR(255),
   	`postalCode`  VARCHAR(6),
   	`latitude`    DECIMAL(8,5),
   	`longitude`   DECIMAL(8,5),
   	`dmaCode`     VARCHAR(3),
   	`areaCode`    VARCHAR(3),
   	`col1` varchar(255) DEFAULT NULL ,
	`col2` varchar(255) DEFAULT NULL,
	`col3` varchar(255) DEFAULT NULL,
	`col4` varchar(255) DEFAULT NULL,
	`col5` varchar(255) DEFAULT NULL,
	`created_by` 		VARCHAR(255) DEFAULT NULL,	
	`created_date` 		DATETIME DEFAULT NULL,	
	`updated_by` 		VARCHAR(255) DEFAULT NULL,
	`updated_date` 		DATETIME DEFAULT NULL
);

ALTER TABLE `geolocations_ip4`
   ADD CONSTRAINT pk_geolocations_ip4
   PRIMARY KEY (`startIpInt`, `endIpInt`);

CREATE TABLE `crpt_metric` (
	`id`       		bigint(20)		NOT NULL AUTO_INCREMENT,
   	`owner_id`      bigint(20)      NOT NULL,
   	`name`          VARCHAR(255)   	NOT NULL,
   	`mtype`         VARCHAR(255)   	NOT NULL,
   	`dtype`         VARCHAR(255)   	NOT NULL,
   	`aggr_func`     VARCHAR(255),
   	`is_deleted`    bit(1) 				DEFAULT NULL,
   	`dw_column_name`	VARCHAR(255)   	NOT NULL,
   	`col1` varchar(255) DEFAULT NULL ,
	`col2` varchar(255) DEFAULT NULL,
	`col3` varchar(255) DEFAULT NULL,
	`col4` varchar(255) DEFAULT NULL,
	`col5` varchar(255) DEFAULT NULL,
	`created_by` 		VARCHAR(255) DEFAULT NULL,	
	`created_date` 		DATETIME DEFAULT NULL,	
	`updated_by` 		VARCHAR(255) DEFAULT NULL,
	`updated_date` 		DATETIME DEFAULT NULL,
   	PRIMARY KEY (`id`)
);
CREATE INDEX idx_crpt_metric_owner_id
   ON `crpt_metric` (`owner_id` ASC);

CREATE TABLE `crpt_owner` (
   	`id`       		bigint(20)		NOT NULL AUTO_INCREMENT,
   	`kaid`          varchar(255)    NOT NULL,
   	`eid`           VARCHAR(255)    NOT NULL,
   	`aid`           VARCHAR(255)	NOT NULL,
   	`dw_table_name` VARCHAR(255)  	NOT NULL,
  	`jrs_domain`    VARCHAR(255),
   	`col1` varchar(255) DEFAULT NULL ,
	`col2` varchar(255) DEFAULT NULL,
	`col3` varchar(255) DEFAULT NULL,
	`col4` varchar(255) DEFAULT NULL,
	`col5` varchar(255) DEFAULT NULL,
	`created_by` 		VARCHAR(255) DEFAULT NULL,	
	`created_date` 		DATETIME DEFAULT NULL,	
	`updated_by` 		VARCHAR(255) DEFAULT NULL,
	`updated_date` 		DATETIME DEFAULT NULL,
   	PRIMARY KEY (`id`)
);

ALTER TABLE `crpt_owner`
   ADD CONSTRAINT `uk_crpt_owner`
   UNIQUE KEY (`kaid`, `eid`, `aid`);

ALTER TABLE `crpt_metric`
  ADD CONSTRAINT `fk_crpt_metric_owner_id` FOREIGN KEY (`owner_id`)
  REFERENCES crpt_owner (`id`)
  ON UPDATE NO ACTION
  ON DELETE NO ACTION;
 
CREATE TABLE `crpt_master_info` (
   	`id`       		bigint(20)		NOT NULL AUTO_INCREMENT,
   	`datatype`      VARCHAR(20)		NOT NULL,
   	`col_prefix`    VARCHAR(20)	    NOT NULL,
   	`col_count`     SMALLINT		NOT NULL,
   	`col_metadata`	VARCHAR(255)	NOT NULL,
   	`jas_datatype`  VARCHAR(255)	DEFAULT NULL,
   	`col1` varchar(255) DEFAULT NULL ,
	`col2` varchar(255) DEFAULT NULL,
	`col3` varchar(255) DEFAULT NULL,
	`col4` varchar(255) DEFAULT NULL,
	`col5` varchar(255) DEFAULT NULL,
	`created_by` 		VARCHAR(255) DEFAULT NULL,	
	`created_date` 		DATETIME DEFAULT NULL,	
	`updated_by` 		VARCHAR(255) DEFAULT NULL,
	`updated_date` 		DATETIME DEFAULT NULL,
   	PRIMARY KEY (`id`)
);

CREATE TABLE `reports_settings` (
  `id`       		bigint(20)		NOT NULL AUTO_INCREMENT,
  `config_name` varchar(255) NOT NULL,
  `config_value` varchar(255) NOT NULL,
  `config_type` varchar(1000) NOT NULL,
  `selected` bit(1) DEFAULT NULL,
  `col1` varchar(255) DEFAULT NULL ,
  `col2` varchar(255) DEFAULT NULL,
  `col3` varchar(255) DEFAULT NULL,
  `col4` varchar(255) DEFAULT NULL,
  `col5` varchar(255) DEFAULT NULL,
  `created_by` 		VARCHAR(255) DEFAULT NULL,	
  `created_date` 		DATETIME DEFAULT NULL,	
  `updated_by` 		VARCHAR(255) DEFAULT NULL,
  `updated_date` 		DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`)
);

ALTER TABLE `reports_settings`
   ADD CONSTRAINT `uk_reports_settings_name`
   UNIQUE KEY (`config_name`);

CREATE TABLE `build_version` (
  `build_version` varchar(255) DEFAULT NULL,
  `build_date` datetime DEFAULT NULL
);
   
   
LOCK TABLES `reports_settings` WRITE;
INSERT INTO `reports_settings`(`id`, `config_name`,`config_value`,`config_type`, `selected`, `created_by`, `updated_by`, `created_date`, `updated_date`)
VALUES (1,'DAY','Day','aggregate',true,'admin','admin', NOW(), NOW()),
(2,'WEEK','Week','aggregate',true,'admin','admin', NOW(), NOW()),
(3,'MONTH','Month','aggregate',true,'admin','admin', NOW(), NOW()),

(4,'ios','iOS','platform',true,'admin','admin', NOW(), NOW()),
(5,'windows','Windows','platform',true,'admin','admin', NOW(), NOW()),
(6,'blackberry','Blackberry','platform',true,'admin','admin', NOW(), NOW()),
(7,'j2me','J2ME','platform',true,'admin','admin', NOW(), NOW()),
(8,'android','Android','platform',true,'admin','admin', NOW(), NOW()),

(9,'native','Native','applicationtype',true,'admin','admin', NOW(), NOW()),
(10,'hybrid','Hybrid','applicationtype',true,'admin','admin', NOW(), NOW()),
(11,'spa','SPA','applicationtype',true,'admin','admin', NOW(), NOW()),
(12,'mobileweb','Mobile Web','applicationtype',true,'admin','admin', NOW(), NOW()),
(13,'mixedmode','Mixed Mode','applicationtype',true,'admin','admin', NOW(), NOW()),

(14,'mobile','Mobile','channel',true,'admin','admin', NOW(), NOW()),
(15,'tablet','Tablet','channel',true,'admin','admin', NOW(), NOW()),
(16,'desktop','Desktop','channel',true,'admin','admin', NOW(), NOW()),

(17,'servertimezone','UTC','timezone',true,'admin','admin', NOW(), NOW());

UNLOCK TABLES;

LOCK TABLES `crpt_master_info` WRITE;

INSERT INTO `crpt_master_info`(`id`, `datatype`,`col_prefix`,`col_count`, `col_metadata`, `jas_datatype`, `created_by`, `updated_by`, `created_date`, `updated_date`)
VALUES (1,'string','s',50,'varchar(255)', NULL,'admin','admin', NOW(), NOW()),
(2,'long','l',25,'bigint', NULL,'admin','admin', NOW(), NOW()),
(3,'double','d',25,'float8', NULL,'admin','admin', NOW(), NOW()),
(4,'boolean','b',25,'boolean', NULL,'admin','admin', NOW(), NOW()),
(5,'timestamp','t',25,'timestamp null', NULL,'admin','admin', NOW(), NOW()),
(6,'date','dt',25,'date', NULL,'admin','admin', NOW(), NOW());

UNLOCK TABLES;

insert  into `build_version`(`build_version`,`build_date`) values ('#SERVER_BUILD_VERSION#', NOW());

commit;

SET FOREIGN_KEY_CHECKS=1;
