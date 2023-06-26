SET foreign_key_checks = 0;

--
-- Table structure for table `accounts_timer_metrics`
--
CREATE TABLE `accounts_timer_metrics` (
  `name` varchar(512) NOT NULL,
  `instance_id` varchar(25) NOT NULL,
  `category` int(10),
  `count` int(10) unsigned,
  `min` int(10) unsigned,
  `max` int(10) unsigned,
  `mean` int(10) unsigned,
  `stddev` int(10) unsigned,
  `p95` int(10) unsigned,
  `p99` int(10) unsigned,
  `timestamp` timestamp NOT NULL,
  KEY `idx_acctmetrics_inst_id` (`instance_id`),
  KEY `idx_acctmetrics_cat` (`category`),
  KEY `idx_acctmetrics_ts` (`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET foreign_key_checks = 1;

INSERT INTO `accounts_configurations` (name, value) VALUES ('KONY_ACCOUNTS_PERF_MEASUREMENT', 'false');