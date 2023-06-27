CREATE TABLE `workflow_event` (
  `id` varchar(50) NOT NULL,
  `workflow_instance_id` varchar(255),
  `throw_signal_event_id` varchar(255),
  `topic_name` varchar(255),
  `created_by` varchar(255),
  `created_date` datetime,
  `updated_by` varchar(255),
  `updated_date` datetime,
  `payload` longtext,
  `is_processed` TINYINT(1) DEFAULT 0,
  PRIMARY KEY (`id`)
) ;