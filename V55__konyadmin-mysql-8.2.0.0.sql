create table tmp_app_jar_info select * from app_jar_info;
delete from app_jar_info;
ALTER TABLE `app_jar_info` ADD column `id` bigint(20) NOT NULL AUTO_INCREMENT PRIMARY KEY;
insert into app_jar_info(app_id,jar_id) select app_id,jar_id from tmp_app_jar_info;
drop table tmp_app_jar_info; 

create table tmp_app_asset_info select * from app_asset_info;
delete from app_asset_info;
ALTER TABLE `app_asset_info` ADD column `id` bigint(20) NOT NULL AUTO_INCREMENT PRIMARY KEY;
insert into app_asset_info(app_id,asset_id) select app_id,asset_id from tmp_app_asset_info;
drop table tmp_app_asset_info;

COMMIT;