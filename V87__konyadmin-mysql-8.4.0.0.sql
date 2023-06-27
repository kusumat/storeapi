update `server_configuration` set prop_value='{"CreateBinary": "/data/v1/EASUploadBinaryService/objects/File","UploadBinary": "/data/v1/EASUploadBinaryService/binary/File","CommitBinary": "/data/v1/EASUploadBinaryService/objects/File","DeleteBinary": "/data/v1/EASUploadBinaryService/objects/File","CreateAppMeta": "/data/v1/EASMetaServices/objects/nativeappinfo","UpdateAppMeta": "/data/v1/EASMetaServices/objects/nativeappinfo","DeleteAppMeta": "/data/v1/EASMetaServices/objects/nativeappchannelsinfo","GetAppMeta": "/data/v1/EASMetaServices/objects/nativeappchannelsinfo"}' where prop_name = 'KONY_SERVER_EAS_SERVICE_DISCOVERY_JSON';
ALTER TABLE attachment_metadata_info ADD service_namespace varchar(120), DROP INDEX `UNIQUE`;
ALTER TABLE attachment_metadata_info ADD custom_field1 varchar(256), ADD custom_field2 varchar(256), ADD custom_field3 varchar(256), ADD custom_field4 varchar(256), ADD custom_field5 varchar(256), ADD custom_field6 varchar(256), ADD custom_field7 varchar(256), ADD custom_field8 varchar(256), ADD custom_field9 varchar(256), ADD custom_field10 varchar(256), ADD custom_field11 varchar(256), ADD custom_field12 varchar(256), ADD custom_field13 varchar(256), ADD custom_field14 varchar(256), ADD custom_field15 varchar(256), ADD custom_field16 varchar(256), ADD custom_field17 varchar(256), ADD custom_field18 varchar(256), ADD custom_field19 varchar(256), ADD custom_field20 varchar(256), ADD custom_int_field1 int, ADD custom_int_field2 int, ADD custom_int_field3 int, ADD custom_int_field4 int, ADD custom_int_field5 int, ADD custom_int_field6 int, ADD custom_int_field7 int, ADD custom_int_field8 int, ADD custom_int_field9 int, ADD custom_int_field10 int;