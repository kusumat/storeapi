ALTER TABLE workflow_task_info ADD COLUMN node_context LONGTEXT; 
ALTER TABLE workflow_task_info ADD COLUMN retry_type varchar(20);
ALTER TABLE workflow_task_info ADD COLUMN is_retry_allowed TINYINT(1) DEFAULT 0;
ALTER TABLE workflow_task_info MODIFY updated_date DATETIME(3);

COMMIT;
