SET foreign_key_checks = 0;

ALTER TABLE `accounts_timer_metrics`
	ADD column `id` bigint(20) NOT NULL AUTO_INCREMENT PRIMARY KEY;

SET foreign_key_checks = 1;