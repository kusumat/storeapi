ALTER TABLE `workflow_info` ADD COLUMN `trigger_type` VARCHAR(20);
ALTER TABLE `workflow_info` ADD COLUMN `process_id` BIGINT(20);
UPDATE workflow_info SET `trigger_type`='object';

COMMIT;