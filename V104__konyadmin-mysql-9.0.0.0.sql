ALTER TABLE  workflow_task_info
	MODIFY initiated_date DATETIME(3),
	MODIFY completed_date DATETIME(3);
	
ALTER TABLE workflow_instance_info ADD COLUMN workflow_context LONGTEXT; 
	
