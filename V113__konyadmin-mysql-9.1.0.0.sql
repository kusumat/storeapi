UPDATE workflow_instance_info set linked_object_primary_key = '{}';
ALTER TABLE workflow_instance_info MODIFY COLUMN linked_object_primary_key varchar(1000);
COMMIT;