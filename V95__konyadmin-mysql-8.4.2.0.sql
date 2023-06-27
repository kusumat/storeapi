ALTER TABLE attachment_metadata_info ADD COLUMN status int(6); 

UPDATE attachment_metadata_info SET status=1113 WHERE commit_status='completed';
UPDATE attachment_metadata_info SET status=1111 WHERE commit_status IS NULL OR commit_status='';
COMMIT;

ALTER TABLE attachment_metadata_info DROP COLUMN commit_status;

ALTER TABLE attachment_metadata_info ADD transaction_details varchar(500);
ALTER TABLE attachment_chunk_info ADD status int(6);
ALTER TABLE attachment_chunk_info ADD transaction_details varchar(500);