CREATE TABLE `server_node_notifier` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `process_id` bigint(20) NOT NULL,
  `action` varchar(50) NOT NULL,
  `status` varchar(50),
  `status_details` varchar(255),
  `created_by` varchar(50),
  `created_date` datetime default now(),
  `updated_by` varchar(50),
  `updated_date` datetime,
  PRIMARY KEY (`id`)
);
CREATE TABLE `server_node_status` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `node_id` varchar(50) NOT NULL,
  `node_status` varchar(50) NOT NULL,
  `process_id` bigint(20),
  `process_action` varchar(50),
  `process_status` varchar(50),
  `err_msg` varchar(255),
  `health_acknowledge` bigint(20),
  `publish_timer_disabled` TINYINT default 0,
  `created_by` varchar(50),
  `created_date` datetime default now(),
  `updated_by` varchar(50),
  `updated_date` datetime,
  PRIMARY KEY (`id`)
);