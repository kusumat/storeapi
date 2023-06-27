CREATE TABLE `server_token_signing_key_store` (
   `acs_name` varchar(128) NOT NULL,
   `pubkey_or_cert` varchar(4000)  NOT NULL,
   `privkey` varchar(4000) NOT NULL,
   `validation_type` tinyint(1) NOT NULL,
   `pubkey_hash` varchar(50) NOT NULL,
   `metadata` varchar(1024) NOT NULL,
   `created_by` VARCHAR(255),
   `created_date` DATETIME,
   `updated_by` VARCHAR(255),
   `updated_date` DATETIME,
   PRIMARY KEY (`acs_name`,`pubkey_hash`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;