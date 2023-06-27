UPDATE `mobilefabric_configuration` SET prop_value='true' WHERE prop_name='use.encryption';
UPDATE `mobilefabric_configuration` SET prop_value='{ServerAES}1yc5XvethNEkq1ykJZntvw==' WHERE prop_name='license.mail.fromPwd';
DELETE FROM `build_version`;
DROP TABLE `build_version`;