drop table server_certs_table;
CREATE TABLE `server_certificate` (
  `id` BIGINT(20) AUTO_INCREMENT,
  `cert_alias` LONGTEXT  NOT NULL,
  `target_domains` LONGTEXT, 
  `certificate_content` LONGTEXT,
  `certificate_file_name` VARCHAR(255) NOT NULL,
  `keypass` LONGTEXT,
  `discriminator` VARCHAR(1) NOT NULL,
  `privatekey_content` LONGTEXT,
  `privatekey_file_name` VARCHAR(255),
  `privatekey_password` LONGTEXT,
  `privatekey_algo`  VARCHAR(255),
  `created_date` DATETIME,
  `updated_date` DATETIME,
  `updated_by` VARCHAR(50),
  `created_by` VARCHAR(50),
  CONSTRAINT `pk_server_cert_id` PRIMARY KEY (`id`)
);