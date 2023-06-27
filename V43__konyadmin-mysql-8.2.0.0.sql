CREATE TABLE `server_certs_table` (
  `id` bigint(20) AUTO_INCREMENT,
  `alias` LONGTEXT  NOT NULL,
  `certificate_content` blob,
  `certificate_file_name` varchar(255) NOT NULL,
  `keypass` LONGTEXT,
  `discriminator` varchar(1) NOT NULL,
  `privatekey_content` blob,
  `privatekey_file_name` varchar(255),
  `privatekey_password` LONGTEXT,
  `domain` LONGTEXT,  
  `created_date` datetime,
  `updated_date` datetime,
  `updated_by` varchar(50),
  `created_by` varchar(50),
  constraint `pk_server_certs_table_id` PRIMARY KEY (`id`)
);