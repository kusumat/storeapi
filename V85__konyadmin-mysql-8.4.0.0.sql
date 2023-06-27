CREATE TABLE `attachment_metadata_info` (
  `file_id` int(11) NOT NULL AUTO_INCREMENT,
  `file_name` varchar(98) NOT NULL,
  `checksum` varchar(260),
  `size` varchar(32),
  `security_key` varchar(64) NOT NULL,
  `description` varchar(200),
  `tags` varchar(64),
  `commit_status` varchar(64),
  `commit_properties` varchar(500),
  `file_namespace` varchar(64),
  `relative_path` varchar(128) DEFAULT '',
  `createdby` varchar(45),
  `modifiedby` varchar(45),
  `CreatedTimeStamp` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `ModifiedTimeStamp` datetime(3) DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`file_id`),
  UNIQUE KEY `UNIQUE` (`file_name`,`security_key`,`file_namespace`,`relative_path`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `attachment_chunk_info` (
  `attachment_chunk_id` int(11) NOT NULL AUTO_INCREMENT,
  `attachment_reference` int(11),
  `client_chunk_sequence` int(11),
  `server_chunk_sequence` int(11),
  `chunk_checksum` varchar(260),
  `backend_path` varchar(512),
  PRIMARY KEY (`attachment_chunk_id`),
  KEY `reference_idx` (`attachment_reference`),
  KEY `UNIQUE` (`attachment_reference`,`client_chunk_sequence`,`server_chunk_sequence`),
  CONSTRAINT `reference` FOREIGN KEY (`attachment_reference`) REFERENCES `attachment_metadata_info` (`file_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `attachment_binary_info` (
  `binary_content_id` int(11) NOT NULL AUTO_INCREMENT,
  `content` mediumblob,
  `chunk_id` int(11),
  PRIMARY KEY (`binary_content_id`),
  KEY `chunk_reference_idx` (`chunk_id`),
  CONSTRAINT `chunk_reference` FOREIGN KEY (`chunk_id`) REFERENCES `attachment_chunk_info` (`attachment_chunk_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;