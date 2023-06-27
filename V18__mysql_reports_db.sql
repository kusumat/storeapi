-- New fields for middleware_requests table--

ALTER TABLE middleware_requests ADD COLUMN svctype VARCHAR(100);
ALTER TABLE middleware_requests ADD COLUMN contype VARCHAR(100);
ALTER TABLE middleware_requests ADD COLUMN xmode VARCHAR(100) default 'online';	