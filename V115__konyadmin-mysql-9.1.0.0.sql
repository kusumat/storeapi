UPDATE workflow_task_info set current_status = 'DONE' where current_status='COMPLETED';
COMMIT;