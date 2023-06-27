ALTER TABLE webapp
ADD process_id bigint(20);

ALTER TABLE webapp
ADD FOREIGN KEY (process_id) REFERENCES process_info(process_id);