DROP TABLE IF EXISTS `server_node_notifier`, `server_node_status`;
CREATE TABLE `server_node_notifier` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `action` varchar(50) NOT NULL,
  `tenant_id` varchar(50) NOT NULL,
  `notification_details` LONGTEXT,
  `status` varchar(50),
  `status_details` varchar(255),
  `created_by` varchar(50),
  `created_date` datetime default now(),
  `updated_by` varchar(50),
  `updated_date` datetime,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `server_node_status` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `node_id` varchar(50) NOT NULL,
  `node_status` varchar(50) NOT NULL,
  `health_acknowledge` bigint(20),
  `publish_timer_disabled` TINYINT default 0,
  `created_by` varchar(50),
  `created_date` datetime default now(),
  `updated_by` varchar(50),
  `updated_date` datetime,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `server_notification_process` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `node_id` bigint(20) NOT NULL,
  `notification_id` bigint(20) NOT NULL,
  `action` varchar(50),
  `status` varchar(50),
  `err_msg` LONGTEXT,
  `created_by` varchar(50),
  `created_date` datetime default now(),
  `updated_by` varchar(50),
  `updated_date` datetime,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE process_info ADD COLUMN notification_id bigint(20) AFTER current_status;
