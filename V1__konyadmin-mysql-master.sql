SET FOREIGN_KEY_CHECKS=0;

CREATE TABLE `users` (
  `id`       		bigint(20)		NOT NULL AUTO_INCREMENT,
  `userid` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(1000) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `deleted` bit(1) DEFAULT NULL,
  `enabled` bit(1) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
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

ALTER TABLE `users`
   ADD CONSTRAINT `uk_users_userid`
   UNIQUE KEY (`userid`);

CREATE TABLE `roles` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `display_name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
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

ALTER TABLE `roles`
   ADD CONSTRAINT `uk_roles_name`
   UNIQUE KEY (`name`);

CREATE TABLE `user_roles` (
  `roleid` bigint(20) NOT NULL,
  `userid` bigint(20) NOT NULL,
  PRIMARY KEY (`userid`,`roleid`)
);
   
ALTER TABLE `user_roles`
  ADD CONSTRAINT `fk_user_roles_userid` FOREIGN KEY (`userid`)
  REFERENCES `users` (`id`)
  ON UPDATE NO ACTION
  ON DELETE NO ACTION;
  
ALTER TABLE `user_roles`
  ADD CONSTRAINT `fk_user_roles_roleid` FOREIGN KEY (`roleid`)
  REFERENCES `roles` (`id`)
  ON UPDATE NO ACTION
  ON DELETE NO ACTION;

CREATE TABLE `mobilefabric_configuration` (
  `id`       		bigint(20)		NOT NULL AUTO_INCREMENT,
  `prop_name` varchar(255) NOT NULL,
  `prop_value` varchar(255) NOT NULL,
  `prop_type` varchar(1000) DEFAULT NULL,
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

ALTER TABLE `mobilefabric_configuration`
   ADD CONSTRAINT `uk_configuration_name`
   UNIQUE KEY (`prop_name`);
   
CREATE TABLE `mobilefabric_environment` (
    `id` bigint(20) NOT NULL AUTO_INCREMENT,
	`environment_guid` varchar(40) DEFAULT NULL,
    `mobile_fabric_version` varchar(255) DEFAULT NULL,
	`account_guid`  varchar(40) DEFAULT NULL,
	`account_id` int(20) DEFAULT NULL,	
	`environment_name` varchar(255) DEFAULT NULL,	 
	`environment_service_url`  varchar(255) DEFAULT NULL,
	`account_auth_url`  varchar(255) DEFAULT NULL ,
	`environment_auth_url`  varchar(255) DEFAULT NULL,
	`account_api_base_url` varchar(255) DEFAULT NULL,
	`account_ui_base_url` varchar(255) DEFAULT NULL,
	`col1` varchar(255) DEFAULT NULL ,
	`col2` varchar(255) DEFAULT NULL,
	`col3` varchar(255) DEFAULT NULL,
	`col4` varchar(255) DEFAULT NULL,
	`col5` varchar(255) DEFAULT NULL,
	`created_by` 		VARCHAR(255) DEFAULT NULL,	
	`created_date` 		DATETIME DEFAULT NULL,	
	`updated_by` 		VARCHAR(255) DEFAULT NULL,
	`updated_date` 		DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `environment_guid` (`environment_guid`) 
);

CREATE TABLE `app_war_info` (
  `app_war_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `war_name` varchar(255) DEFAULT NULL,
  `war_content` longblob,
  `col1` varchar(255) DEFAULT NULL ,
  `col2` varchar(255) DEFAULT NULL,
  `col3` varchar(255) DEFAULT NULL,
  `col4` varchar(255) DEFAULT NULL,
  `col5` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`app_war_id`),
  UNIQUE KEY `war_name` (`war_name`)
);

CREATE TABLE `app_info` (
	`app_id` bigint(20) NOT NULL AUTO_INCREMENT,
	`app_content` longblob,
 	`app_name` varchar(255) NOT NULL,
 	`application_id` varchar(255) NOT NULL,
 	`application_guid` varchar(255) DEFAULT NULL,
  	`application_description` varchar(255) DEFAULT NULL,
  	`app_status` varchar(255) DEFAULT NULL,
  	`app_war_id` bigint(20) DEFAULT NULL,
 	`col1` varchar(255) DEFAULT NULL ,
	`col2` varchar(255) DEFAULT NULL,
	`col3` varchar(255) DEFAULT NULL,
	`col4` varchar(255) DEFAULT NULL,
	`col5` varchar(255) DEFAULT NULL,
	`created_by` 		VARCHAR(255) DEFAULT NULL,	
	`created_date` 		DATETIME DEFAULT NULL,	
	`updated_by` 		VARCHAR(255) DEFAULT NULL,
	`updated_date` 		DATETIME DEFAULT NULL,
	PRIMARY KEY (`app_id`),  
	UNIQUE KEY application_id (`application_id`),
	KEY `fk_app_war_id` (`app_war_id`),
  	CONSTRAINT `fk_app_war_id` FOREIGN KEY (`app_war_id`) REFERENCES `app_war_info` (`app_war_id`)
 );
 
CREATE TABLE `jar_info` (
  	`jar_id` bigint(20) NOT NULL AUTO_INCREMENT,
  	`jar_content` longblob,
  	`jar_name` varchar(255) DEFAULT NULL,
  	`col1` varchar(255) DEFAULT NULL ,
	`col2` varchar(255) DEFAULT NULL,
	`col3` varchar(255) DEFAULT NULL,
	`col4` varchar(255) DEFAULT NULL,
	`col5` varchar(255) DEFAULT NULL,
	`created_by` 		VARCHAR(255) DEFAULT NULL,	
	`created_date` 		DATETIME DEFAULT NULL,	
	`updated_by` 		VARCHAR(255) DEFAULT NULL,
	`updated_date` 		DATETIME DEFAULT NULL,
 	 PRIMARY KEY (`jar_id`),
 	 UNIQUE KEY `jar_name` (`jar_name`)
);
	
CREATE TABLE `app_jar_info` (
  `app_id` bigint(20) NOT NULL,
  `jar_id` bigint(20) NOT NULL,
  KEY `fk_app_id` (`app_id`),
  KEY `fk_jar_id` (`jar_id`),
  CONSTRAINT `fk_app_id` FOREIGN KEY (`jar_id`) REFERENCES `jar_info` (`jar_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_jar_id` FOREIGN KEY (`app_id`) REFERENCES `app_info` (`app_id`) ON DELETE CASCADE
);

CREATE TABLE `build_version` (
  `build_version` varchar(255) DEFAULT NULL,
  `build_date` datetime DEFAULT NULL
);


/****Inser statements to insert required data **/
LOCK TABLES `roles` WRITE;
INSERT INTO `roles`(id, description, name, display_name) VALUES (1,'Represents the system administrator','ROLE_ADMIN', 'Admin'),
(2,'Represents the report viewer who uses application for report viewing','ROLE_REPORT_VIEWER', 'Report Viewer'),
(3,'Represents the end user who publish the application','ROLE_PUBLISHER', 'Publisher');
UNLOCK TABLES;

LOCK TABLES `users` WRITE;
INSERT INTO `users`(id, userId, name, password, mobile, email, deleted, enabled, created_by, updated_by, created_date, updated_date)
VALUES (1,'admin','Administrator','240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9','1234567890','admin@kony.com',false, true,'admin','admin', NOW(), NOW()),
(2,'mobilefabricadmin','MobileFoundry Administrator','1afc111ca0e435623faca0e5ab5a27d69547f1cfa1a6e4ff99cea31a2cc37674','1234567890','mobilefabricadmin@kony.com',false, true,'mobilefabricadmin','mobilefabricadmin', NOW(), NOW());
UNLOCK TABLES;

LOCK TABLES `user_roles` WRITE;
INSERT INTO `user_roles`(userid, roleid) VALUES (1,1),(2,1);
UNLOCK TABLES;

insert  into `build_version`(`build_version`,`build_date`) values ('#SERVER_BUILD_VERSION#', NOW());

commit;

SET FOREIGN_KEY_CHECKS=1;
