
create table application_events
(
    id              bigint(20) 	NOT NULL AUTO_INCREMENT,
    bid   			varchar(255)   not null,
    mid   			varchar(255),
    kaid    		varchar(255)   not null,
    eid     		varchar(255)   not null,
    aid     		varchar(255)   not null,
    ts 				datetime     not null, 
    evttype 		varchar(100)  not null,
    formid   		varchar(255),
    widgetid   		varchar(255),
    sid   		    varchar(255) not null,
    evtsubtype   	varchar(255),
    flowtag   		varchar(255),
    request_key 	bigint(20),
    session_key 	bigint(20) NOT NULL,
	metadata_var  varchar(16000),
	metadata 	mediumtext,
	col1 		varchar(255),
	col2 		varchar(255),
	col3 		varchar(255),
	col4 		varchar(255),
	col5 		varchar(255),
	primary key pk_application_events(id)
	)
ENGINE=InnoDB;

ALTER TABLE `application_events`
  ADD CONSTRAINT `fk_application_events_session_key` FOREIGN KEY (`session_key`)
  REFERENCES `middleware_sessions` (`session_key`)
  ON UPDATE NO ACTION
  ON DELETE NO ACTION;


  ALTER TABLE `application_events`
  ADD CONSTRAINT `fk_application_events_request_key` FOREIGN KEY (`request_key`)
  REFERENCES `middleware_requests` (`request_key`)
  ON UPDATE NO ACTION
  ON DELETE NO ACTION;

  
create table application_service_detail
(
    id               bigint(20) 	NOT NULL AUTO_INCREMENT,
    bid   			varchar(255)   not null,
    mid   			varchar(255),
    kaid    		varchar(255)   not null,
    eid     		varchar(255)   not null,
    aid     		varchar(255)   not null,
    ts 				datetime     not null,
    evttype 		varchar(100)  not null,
	aname varchar(255),
	atype varchar(255) not null,
	plat varchar(255) not null,
	chnl varchar(255) not null,
    formid   		varchar(255), 
    widgetid   		varchar(255),
    sid   		    varchar(255)  not null,
    evtsubtype   	varchar(255),
    flowtag   		varchar(255),
    request_key 	bigint(20),
    session_key 	bigint(20) NOT NULL,
    opstatus        varchar(50) NOT NULL,
    httpcode        int NOT NULL,
    resptime        int NOT NULL,
	col1 		varchar(255),
	col2 		varchar(255),
	col3 		varchar(255),
	col4 		varchar(255),
	col5 		varchar(255),
	primary key pk_service_detail(id)
	)
ENGINE=InnoDB;


ALTER TABLE `application_service_detail`
  ADD CONSTRAINT `fk_application_service_detail_skey` FOREIGN KEY (`session_key`)
  REFERENCES `middleware_sessions` (`session_key`)
  ON UPDATE NO ACTION
  ON DELETE NO ACTION;


  ALTER TABLE `application_service_detail`
  ADD CONSTRAINT `fk_application_service_detail_rkey` FOREIGN KEY (`request_key`)
  REFERENCES `middleware_requests` (`request_key`)
  ON UPDATE NO ACTION
  ON DELETE NO ACTION;


create table application_error_detail
(
    id          bigint(20) 	NOT NULL AUTO_INCREMENT,
    bid   			varchar(255)   not null,
    mid   			varchar(255),
    kaid    		varchar(255)   not null,
    eid     		varchar(255)   not null,
    aid     		varchar(255)   not null,
    ts 				datetime     not null,
    evttype 		varchar(100)  not null,
	aname varchar(255),
	atype varchar(255) not null,
	plat varchar(255) not null,
	chnl varchar(255) not null,
    formid   		varchar(255),
    widgetid   		varchar(255),
    sid   		    varchar(255)  not null,
    evtsubtype   	varchar(255),
    flowtag   		varchar(255),
    request_key 	bigint(20),
    session_key 	bigint(20) NOT NULL,
    errcode         varchar(50),
    errmsg          varchar(255),
    errfile         varchar (255),
    errmethod       varchar(255),
    errline         int,
	errstacktrace_var varchar(5100),
    errstacktrace   MediumTEXT,
    errtype         varchar(255),
    iserror         tinyint(1),
	errcustommsg_var varchar(4095),
	errcustommsg MediumTEXT,
	errcrashreport_var varchar(5100),
	errcrashreport MediumTEXT,
	col1 		varchar(255),
	col2 		varchar(255),
	col3 		varchar(255),
	col4 		varchar(255),
	col5 		varchar(255),
	primary key pk_application_error_detail(id)
	)
ENGINE=InnoDB;


ALTER TABLE `application_error_detail`
  ADD CONSTRAINT `fk_application_error_detail_skey` FOREIGN KEY (`session_key`)
  REFERENCES `middleware_sessions` (`session_key`)
  ON UPDATE NO ACTION
  ON DELETE NO ACTION;


  ALTER TABLE `application_error_detail`
  ADD CONSTRAINT `fk_application_error_detail_rkey` FOREIGN KEY (`request_key`)
  REFERENCES `middleware_requests` (`request_key`)
  ON UPDATE NO ACTION
  ON DELETE NO ACTION;
  
 

-- ALTER SCRIPTS FOR MIDDLEWARE REQUESTS

ALTER TABLE middleware_requests ADD COLUMN sdktype varchar(50);
ALTER TABLE middleware_requests ADD COLUMN sdkversion varchar(50) ;
ALTER TABLE middleware_requests ADD COLUMN opstatus int;
ALTER TABLE middleware_requests ADD COLUMN httpcode int;
ALTER TABLE middleware_requests ADD COLUMN errmsg varchar(4095) ;
ALTER TABLE middleware_requests ADD COLUMN errstack_var varchar(8095) ;
ALTER TABLE middleware_requests ADD COLUMN errstack MediumTEXT ;

-- ALTER SCRIPTS FOR MIDDLEWARE SESSIONS

ALTER TABLE middleware_sessions ADD COLUMN sdktype varchar(50);
ALTER TABLE middleware_sessions ADD COLUMN sdkversion varchar(50) ;
ALTER TABLE middleware_sessions ADD COLUMN opstatus int;
ALTER TABLE middleware_sessions ADD COLUMN httpcode int;
ALTER TABLE middleware_sessions ADD COLUMN errmsg varchar(4095);
ALTER TABLE middleware_sessions ADD COLUMN errstack_var varchar(8095) ;
ALTER TABLE middleware_sessions ADD COLUMN errstack MediumTEXT ;


create table jrs_fusionmap_world(
id  bigint(20) 	NOT NULL AUTO_INCREMENT,
geoname_country varchar(2),
chartentityid varchar(3),
shortname varchar(2),
longname varchar(50),
col1 		varchar(255),
col2 		varchar(255),
col3 		varchar(255),
col4 		varchar(255),
col5 		varchar(255),
primary key pk_jrs_fusionmap_world(id)
	)
ENGINE=InnoDB;


insert into jrs_fusionmap_world(geoname_country,chartentityid,shortname,longname)
        select 'AG','1','AG','Antigua and Barbuda' union
        select 'BS','2','BS','Bahamas' union
        select 'BB','3','BB','Barbados' union
        select 'BZ','4','BZ','Belize' union
        select 'CA','5','CA','Canada' union
        select 'CR','6','CR','Costa Rica' union
        select 'CU','7','CU','Cuba' union
        select 'DM','8','DM','Dominica' union
        select 'DO','9','DO','Dominican Rep.' union
        select 'SV','10','SV','El Salvador' union
        select 'GD','11','GD','Grenada' union
        select 'GT','12','GT','Guatemala' union
        select 'HT','13','HT','Haiti' union
        select 'HN','14','HN','Honduras' union
        select 'JM','15','JM','Jamaica' union
        select 'MX','16','MX','Mexico' union
        select 'NI','17','NI','Nicaragua' union
        select 'PA','18','PA','Panama' union
        select 'KN','19','KN','St. Kitts & Nevis' union
        select 'LC','20','LC','St. Lucia' union
        select 'VC','21','VC','St. Vincent & the Grenadines' union
        select 'TT','22','TT','Trinidad & Tobago' union
        select 'US','23','US','United States' union
        select 'GL','24','GL','Greenland' union
        select 'AR','25','AR','Argentina' union
        select 'BO','26','BO','Bolivia' union
        select 'BR','27','BR','Brazil' union
        select 'CL','28','CL','Chile' union
        select 'CO','29','CO','Colombia' union
        select 'EC','30','EC','Ecuador' union
        select 'FK','31','FK','Falkland Islands' union
        select 'GF','32','GF','French Guiana' union
        select 'GY','33','GY','Guyana' union
        select 'PY','34','PY','Paraguay' union
        select 'PE','35','PE','Peru' union
        select 'SR','36','SR','Suriname' union
        select 'UY','37','UY','Uruguay' union
        select 'VE','38','VE','Venezuela' union
        select 'DZ','39','DZ','Algeria' union
        select 'AO','40','AO','Angola' union
        select 'BJ','41','BJ','Benin' union
        select 'BW','42','BW','Botswana' union
        select 'BF','43','BF','Burkina Faso' union
        select 'BI','44','BI','Burundi' union
        select 'CM','45','CM','Cameroon' union
        select 'CV','46','CV','Cape Verde' union
        select 'CP','47','CP','Central African Republic' union
        select 'TD','48','TD','Chad' union
        select 'KM','49','KM','Comoros' union
        select 'CI','50','CI','Cote d Ivoire' union
        select 'CD','51','CD','Democratic Republic of the Congo' union
        select 'DJ','52','DJ','Djibouti' union
        select 'EG','53','EG','Egypt' union
        select 'GQ','54','GQ','Equatorial Guinea' union
        select 'ER','55','ER','Eritrea' union
        select 'ET','56','ET','Ethiopia' union
        select 'GA','57','GA','Gabon' union
        select 'GH','58','GH','Ghana' union
        select 'GN','59','GN','Guinea' union
        select 'GW','60','GW','Guinea-Bissau' union
        select 'KE','61','KE','Kenya' union
        select 'LS','62','LS','Lesotho' union
        select 'LI','63','LI','Liberia' union
        select 'LR','64','LR','Libya' union
        select 'MS','65','MS','Madagascar' union
        select 'MW','66','MW','Malawi' union
        select 'ML','67','ML','Mali' union
        select 'MR','68','MR','Mauritania' union
        select 'MA','69','MA','Morocco' union
        select 'MZ','70','MZ','Mozambique' union
        select 'NA','71','NA','Namibia' union
        select 'NE','72','NE','Niger' union
        select 'NG','73','NG','Nigeria' union
        select 'RW','74','RW','Rwanda' union
        select 'ST','75','ST','Sao Tome and Principe' union
        select 'SN','76','SN','Senegal' union
        select 'SC','77','SC','Seychelles' union
        select 'SL','78','SL','Sierra Leone' union
        select 'SO','79','SO','Somalia' union
        select 'ZA','80','ZA','South Africa' union
        select 'SD','81','SD','Sudan' union
        select 'SZ','82','SZ','Swaziland' union
        select 'TZ','83','TZ','Tanzania' union
        select 'TG','84','TG','Togo' union
        select 'TN','85','TN','Tunisia' union
        select 'UG','86','UG','Uganda' union
        select 'WA','87','WA','Western Sahara' union
        select 'ZM','88','ZM','Zambia' union
        select 'ZW','89','ZW','Zimbabwe' union
        select 'GM','90','GM','Gambia' union
        select 'CG','91','CG','Congo' union
        select 'MI','92','MI','Mauritius' union
        select 'AF','93','AF','Afghanistan' union
        select 'AM','94','AM','Armenia' union
        select 'AZ','95','AZ','Azerbaijan' union
        select 'BD','96','BD','Bangladesh' union
        select 'BT','97','BT','Bhutan' union
        select 'BN','98','BN','Brunei' union
        select 'MM','99','MM','Burma (Myanmar)' union
        select 'KH','100','KH','Cambodia' union
        select 'CN','101','CN','China' union
        select 'TP','102','TP','East Timor' union
        select 'GE','103','GE','Georgia' union
        select 'IN','104','IN','India' union
        select 'ID','105','ID','Indonesia' union
        select 'IA','106','IA','Iran' union
        select 'JP','107','JP','Japan' union
        select 'KZ','108','KZ','Kazakhstan' union
        select 'KP','109','KP','Korea (north)' union
        select 'KR','110','KR','Korea (south)' union
        select 'KG','111','KG','Kyrgyzstan' union
        select 'LA','112','LA','Laos' union
        select 'MY','113','MY','Malaysia' union
        select 'MN','114','MN','Mongolia' union
        select 'NP','115','NP','Nepal' union
        select 'PK','116','PK','Pakistan' union
        select 'PH','117','PH','Philippines' union
        select 'RU','118','RU','Russia' union
        select 'SG','119','SG','Singapore' union
        select 'LK','120','LK','Sri Lanka' union
        select 'TJ','121','TJ','Tajikistan' union
        select 'TH','122','TH','Thailand' union
        select 'TM','123','TM','Turkmenistan' union
        select 'UZ','124','UZ','Uzbekistan' union
        select 'VN','125','VN','Vietnam' union
        select 'TW','126','TW','Taiwan' union
        select 'HK','127','HK','Hong Kong' union
        select 'MO','128','MO','Macau' union
        select 'AL','129','AL','Albania' union
        select 'AD','130','AD','Andorra' union
        select 'AT','131','AT','Austria' union
        select 'BY','132','BY','Belarus' union
        select 'BE','133','BE','Belgium' union
        select 'BH','134','BH','Bosnia and Herzegovina' union
        select 'BG','135','BG','Bulgaria' union
        select 'HY','136','HY','Croatia' union
        select 'CZ','137','CZ','Czech Republic' union
        select 'DK','138','DK','Denmark' union
        select 'EE','139','EE','Estonia' union
        select 'FI','140','FI','Finland' union
        select 'FR','141','FR','France' union
        select 'DE','142','DE','Germany' union
        select 'GR','143','GR','Greece' union
        select 'HU','144','HU','Hungary' union
        select 'IS','145','IS','Iceland' union
        select 'IR','146','IR','Ireland' union
        select 'IT','147','IT','Italy' union
        select 'LV','148','LV','Latvia' union
        select 'LN','149','LN','Liechtenstein' union
        select 'LT','150','LT','Lithuania' union
        select 'LU','151','LU','Luxembourg' union
        select 'MK','152','MK','Macedonia' union
        select 'MT','153','MT','Malta' union
        select 'MV','154','MV','Moldova' union
        select 'MC','155','MC','Monaco' union
        select 'MG','156','MG','Montenegro' union
        select 'NL','157','NL','Netherlands' union
        select 'NO','158','NO','Norway' union
        select 'PL','159','PL','Poland' union
        select 'PT','160','PT','Portugal' union
        select 'RO','161','RO','Romania' union
        select 'SM','162','SM','San Marino' union
        select 'CS','163','CS','Serbia' union
        select 'SK','164','SK','Slovakia' union
        select 'SI','165','SI','Slovenia' union
        select 'ES','166','ES','Spain' union
        select 'SE','167','SE','Sweden' union
        select 'CH','168','CH','Switzerland' union
        select 'UA','169','UA','Ukraine' union
        select 'UK','170','UK','United Kingdom' union
        select 'VA','171','VA','Vatican City' union
        select 'CY','172','CY','Cyprus' union
        select 'TK','173','TK','Turkey' union
        select 'AU','175','AU','Australia' union
        select 'FJ','176','FJ','Fiji' union
        select 'KI','177','KI','Kiribati' union
        select 'MH','178','MH','Marshall Islands' union
        select 'FM','179','FM','Micronesia' union
        select 'NR','180','NR','Nauru' union
        select 'NZ','181','NZ','New Zealand' union
        select 'PW','182','PW','Palau' union
        select 'PG','183','PG','Papua New Guinea' union
        select 'WS','184','WS','Samoa' union
        select 'SB','185','SB','Solomon Islands' union
        select 'TO','186','TO','Tonga' union
        select 'TV','187','TV','Tuvalu' union
        select 'VU','188','VU','Vanuatu' union
        select 'NC','189','NC','New Caledonia' union
        select 'BA','190','BA','Bahrain' union
        select 'IZ','191','IZ','Iraq' union
        select 'IE','192','IE','Israel' union
        select 'JO','193','JO','Jordan' union
        select 'KU','194','KU','Kuwait' union
        select 'LB','195','LB','Lebanon' union
        select 'OM','196','OM','Oman' union
        select 'QA','197','QA','Qatar' union
        select 'SA','198','SA','Saudi Arabia' union
        select 'SY','199','SY','Syria' union
        select 'AE','200','AE','UnitedArabEmirates' union
        select 'YM','201','YM','Yemen' union
        select 'PR','202','PR','Puerto Rico' union
        select 'KY','203','KY','Cayman Islands' union
        select 'SS','204','SS','South Sudan' union
        select 'KO','205','KO','Kosovo';

COMMIT;
		
create table jrs_fusionmap_usa(
id  bigint(20) 	NOT NULL AUTO_INCREMENT,
geoname_state varchar(2),
chartentityid varchar(2),
shortname varchar(2) ,
longname varchar(20), 
col1 		varchar(255),
col2 		varchar(255),
col3 		varchar(255),
col4 		varchar(255),
col5 		varchar(255),
primary key pk_jrs_fusionmap_usa(id)
	)
ENGINE=InnoDB;


insert into jrs_fusionmap_usa(geoname_state,chartentityid,shortname,longname)
    select 'AL','AL','AL','Alabama' union
    select 'AK','AK','AK','Alaska' union
    select 'AZ','AZ','AZ','Arizona' union
    select 'AR','AR','AR','Arkansas' union
    select 'CA','CA','CA','California' union
    select 'CO','CO','CO','Colorado' union
    select 'CT','CT','CT','Connecticut' union
    select 'DC','DC','DC','District of Columbia' union
    select 'DE','DE','DE','Delaware' union
    select 'FL','FL','FL','Florida' union
    select 'GA','GA','GA','Georgia' union
    select 'HI','HI','HI','Hawaii' union
    select 'ID','ID','ID','Idaho' union
    select 'IL','IL','IL','Illinois' union
    select 'IN','IN','IN','Indiana' union
    select 'IA','IA','IA','Iowa' union
    select 'KS','KS','KS','Kansas' union
    select 'KY','KY','KY','Kentucky' union
    select 'LA','LA','LA','Louisiana' union
    select 'ME','ME','ME','Maine' union
    select 'MD','MD','MD','Maryland' union
    select 'MA','MA','MA','Massachusetts' union
    select 'MI','MI','MI','Michigan' union
    select 'MN','MN','MN','Minnesota' union
    select 'MS','MS','MS','Mississippi' union
    select 'MO','MO','MO','Missouri' union
    select 'MT','MT','MT','Montana' union
    select 'NE','NE','NE','Nebraska' union
    select 'NV','NV','NV','Nevada' union
    select 'NH','NH','NH','New Hampshire' union
    select 'NJ','NJ','NJ','New Jersey' union
    select 'NM','NM','NM','New Mexico' union
    select 'NY','NY','NY','New York' union
    select 'NC','NC','NC','North Carolina' union
    select 'ND','ND','ND','North Dakota' union
    select 'OH','OH','OH','Ohio' union
    select 'OK','OK','OK','Oklahoma' union
    select 'OR','OR','OR','Oregon' union
    select 'PA','PA','PA','Pennsylvania' union
    select 'RI','RI','RI','Rhode Island' union
    select 'SC','SC','SC','South Carolina' union
    select 'SD','SD','SD','South Dakota' union
    select 'TN','TN','TN','Tennessee' union
    select 'TX','TX','TX','Texas' union
    select 'UT','UT','UT','Utah' union
    select 'VT','VT','VT','Vermont' union
    select 'VA','VA','VA','Virginia' union
    select 'WA','WA','WA','Washington' union
    select 'WV','WV','WV','West Virginia' union
    select 'WI','WI','WI','Wisconsin' union
    select 'WY','WY','WY','Wyoming';

	COMMIT;

create table dim_date
(
id  bigint(20) 	NOT NULL AUTO_INCREMENT,
  date_key int not null,
  dt date not null,
  year_number int not null,
  quarter_number int not null,
  quarter_name varchar(10) not null,
  month_number int not null,
  month_name varchar(10) not null,
  month_short_name varchar(3) not null, 
  week_of_year int not null,
  week_of_month int not null,
  month_full_weeks int not null,
  full_week_flag int not null,
  day_of_week_number int not null,
  day_of_week_short_name varchar(3) not null,
  day_of_week_name varchar(10) not null,
  day_number int not null,
primary key pk_dim_date(id)
	)
ENGINE=InnoDB;

create table tmp_calendar (dt datetime);


create view vw_dim_date 
as
select 
  date_key,
  dt,
  year_number,
  quarter_number,
  quarter_name,
  month_number,
  month_name,
  month_short_name,
  week_of_year,
  week_of_month,
  month_full_weeks,
  full_week_flag,
  day_of_week_number,
  day_of_week_short_name,
  day_of_week_name,
  day_number
from dim_date;

commit;


CREATE OR REPLACE VIEW vw_middleware_requests
AS 
SELECT m.kaid, m.eid AS environmentid, m.awsid, m.ebid, m.did AS deviceid, m.aid AS appid, m.aname AS appname, m.rid AS requestid, m.sid AS sessionid,
        CASE
            WHEN m.chnl = 'mobile' THEN 'Mobile'
            WHEN m.chnl = 'tablet' THEN 'Tablet'
            WHEN m.chnl = 'desktop' THEN 'Desktop'
            ELSE ''
        END AS channel,
        CASE
            WHEN m.atype = 'hybrid' THEN 'Hybrid'
            WHEN m.atype = 'native' THEN 'Native'
            WHEN m.atype = 'mixedmode' THEN 'Mixed-Mode'
            WHEN m.atype = 'spa' THEN 'SPA'
            WHEN m.atype = 'mobileweb' THEN 'Mobile Web'
            ELSE ''
        END AS apptype,
        CASE
            WHEN m.plat = 'ios' THEN 'iOS'
            WHEN m.plat = 'android' THEN 'Android'
            WHEN m.plat = 'blackberry' THEN 'Blackberry'
            WHEN m.plat = 'windows' THEN 'Windows'
            WHEN m.plat = 'j2me' THEN 'j2me'
            ELSE ''
        END AS platform, m.idur, m.tdur, m.predur, m.exdur, m.prsdur, m.postdur, m.rip AS remoteip, m.ts as ts, m.dm AS devicemodel, m.os AS osversion, m.ua AS useragent, m.svcid AS serviceid, m.fid AS formid,
        CASE
            WHEN m.stype = 'b2c' THEN 'B2C'
            WHEN m.stype = 'b2e' THEN 'B2E'
            ELSE ''
        END AS sessiontype, m.session_key, m.request_key, m.kuid, m.country, m.region as region, m.city, m.zip, m.lat, m.lon, m.dmacd, m.areacd, 1 AS cnt,
        CASE
            WHEN m.chnl = 'desktop' THEN 'D'
            WHEN m.atype = 'hybrid' OR m.atype = 'spa' OR m.atype = 'mobileweb' THEN 'W'
            ELSE 'N'
        END AS usagetype,
		sdktype,
		sdkversion,
		opstatus,
		httpcode,
		errmsg,
		errstack_var,
		errstack
   FROM middleware_requests m;


   
   CREATE OR REPLACE VIEW vw_middleware_sessions
AS 
SELECT m.kaid, m.eid AS environmentid, m.awsid, m.ebid, m.did AS deviceid, m.aid AS appid, m.aname AS appname, m.sid AS sessionid,
        CASE
            WHEN m.chnl = 'mobile' THEN 'Mobile'
            WHEN m.chnl = 'tablet' THEN 'Tablet'
            WHEN m.chnl = 'desktop' THEN 'Desktop'
            ELSE ''
        END AS channel,
        CASE
            WHEN m.atype = 'hybrid' THEN 'Hybrid'
            WHEN m.atype = 'native' THEN 'Native'
            WHEN m.atype = 'mixedmode' THEN 'Mixed-Mode'
            WHEN m.atype = 'spa' THEN 'SPA'
            WHEN m.atype = 'mobileweb' THEN 'Mobile Web'
            ELSE ''
        END AS apptype,
        CASE
            WHEN m.plat = 'ios' THEN 'iOS'
            WHEN m.plat = 'android' THEN 'Android'
            WHEN m.plat = 'blackberry' THEN 'Blackberry'
            WHEN m.plat = 'windows' THEN 'Windows'
            WHEN m.plat = 'j2me' THEN 'j2me'
            ELSE ''
        END AS platform, m.tdur, m.rip AS remoteip, m.ts, m.dm AS devicemodel, m.os AS osversion, m.ua AS useragent,
        CASE
            WHEN m.stype = 'b2c' THEN 'B2C'
            WHEN m.stype = 'b2e' THEN 'B2E'
            ELSE ''
        END AS sessiontype, m.session_key, m.kuid, m.country, m.region, m.city, m.zip, m.lat, m.lon, m.dmacd, m.areacd, 1 AS cnt,
        CASE
            WHEN m.chnl = 'desktop' THEN 'D'
            WHEN m.atype = 'hybrid' OR m.atype = 'spa' OR m.atype = 'mobileweb' THEN 'W'
            ELSE 'N'
        END AS usagetype,
				sdktype,
		sdkversion,
		opstatus,
		httpcode,
		errmsg,
		errstack_var,
		errstack
   FROM middleware_sessions m;

