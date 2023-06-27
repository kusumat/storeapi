truncate table jrs_fusionmap_world;
 
 
-- Loading updated data into jrs_fusionmap_world
INSERT INTO jrs_fusionmap_world
(
  geoname_country,
  chartentityid,
  shortname,
  longname
)
SELECT 'AF','93','AF','Afghanistan' UNION
SELECT 'AL','129','AL','Albania' UNION
SELECT 'DZ','39','DZ','Algeria' UNION
SELECT 'AD','130','AD','Andorra' UNION
SELECT 'AO','40','AO','Angola' UNION
SELECT 'AG','01','AG','Antigua and Barbuda' UNION
SELECT 'AR','25','AR','Argentina' UNION
SELECT 'AM','94','AM','Armenia' UNION
SELECT 'AU','175','AU','Australia' UNION
SELECT 'AT','131','AT','Austria' UNION
SELECT 'AZ','95','AZ','Azerbaijan' UNION
SELECT 'BS','02','BS','Bahamas' UNION
SELECT 'BH','190','BA','Bahrain' UNION
SELECT 'BD','96','BD','Bangladesh' UNION
SELECT 'BB','03','BB','Barbados' UNION
SELECT 'BY','132','BY','Belarus' UNION
SELECT 'BE','133','BE','Belgium' UNION
SELECT 'BZ','04','BZ','Belize' UNION
SELECT 'BJ','41','BJ','Benin' UNION
SELECT 'BT','97','BT','Bhutan' UNION
SELECT 'BO','26','BO','Bolivia' UNION
SELECT 'BA','134','BH','Bosnia and Herzegovina' UNION
SELECT 'BW','42','BW','Botswana' UNION
SELECT 'BR','27','BR','Brazil' UNION
SELECT 'BN','98','BN','Brunei' UNION
SELECT 'BG','135','BG','Bulgaria' UNION
SELECT 'BF','43','BF','Burkina Faso' UNION
SELECT 'MM','99','MM','Burma (Myanmar)' UNION
SELECT 'BI','44','BI','Burundi' UNION
SELECT 'KH','100','KH','Cambodia' UNION
SELECT 'CM','45','CM','Cameroon' UNION
SELECT 'CA','05','CA','Canada' UNION
SELECT 'CV','46','CV','Cape Verde' UNION
SELECT 'KY','203','KY','Cayman Islands' UNION
SELECT 'CP','47','CP','Central African Republic' UNION
SELECT 'TD','48','TD','Chad' UNION
SELECT 'CL','28','CL','Chile' UNION
SELECT 'CN','101','CN','China' UNION
SELECT 'CO','29','CO','Colombia' UNION
SELECT 'KM','49','KM','Comoros' UNION
SELECT 'CG','91','CG','Congo' UNION
SELECT 'CR','06','CR','Costa Rica' UNION
SELECT 'CI','50','CI','Cote d Ivoire' UNION
SELECT 'HR','136','HY','Croatia' UNION
SELECT 'CU','07','CU','Cuba' UNION
SELECT 'CY','172','CY','Cyprus' UNION
SELECT 'CZ','137','CZ','Czech Republic' UNION
SELECT 'CD','51','CD','Democratic Republic of the Congo' UNION
SELECT 'DK','138','DK','Denmark' UNION
SELECT 'DJ','52','DJ','Djibouti' UNION
SELECT 'DM','08','DM','Dominica' UNION
SELECT 'DO','09','DO','Dominican Rep.' UNION
SELECT 'TL','102','TP','East Timor' UNION
SELECT 'EC','30','EC','Ecuador' UNION
SELECT 'EG','53','EG','Egypt' UNION
SELECT 'SV','10','SV','El Salvador' UNION
SELECT 'GQ','54','GQ','Equatorial Guinea' UNION
SELECT 'ER','55','ER','Eritrea' UNION
SELECT 'EE','139','EE','Estonia' UNION
SELECT 'ET','56','ET','Ethiopia' UNION
SELECT 'FK','31','FK','Falkland Islands' UNION
SELECT 'FJ','176','FJ','Fiji' UNION
SELECT 'FI','140','FI','Finland' UNION
SELECT 'FR','141','FR','France' UNION
SELECT 'GF','32','GF','French Guiana' UNION
SELECT 'GA','57','GA','Gabon' UNION
SELECT 'GM','90','GM','Gambia' UNION
SELECT 'GE','103','GE','Georgia' UNION
SELECT 'DE','142','DE','Germany' UNION
SELECT 'GH','58','GH','Ghana' UNION
SELECT 'GR','143','GR','Greece' UNION
SELECT 'GL','24','GL','Greenland' UNION
SELECT 'GD','11','GD','Grenada' UNION
SELECT 'GT','12','GT','Guatemala' UNION
SELECT 'GN','59','GN','Guinea' UNION
SELECT 'GW','60','GW','Guinea-Bissau' UNION
SELECT 'GY','33','GY','Guyana' UNION
SELECT 'HT','13','HT','Haiti' UNION
SELECT 'HN','14','HN','Honduras' UNION
SELECT 'HK','127','HK','Hong Kong' UNION
SELECT 'HU','144','HU','Hungary' UNION
SELECT 'IS','145','IS','Iceland' UNION
SELECT 'IN','104','IN','India' UNION
SELECT 'ID','105','ID','Indonesia' UNION
SELECT 'IR','106','IA','Iran' UNION
SELECT 'IQ','191','IZ','Iraq' UNION
SELECT 'IE','146','IR','Ireland' UNION
SELECT 'IL','192','IE','Israel' UNION
SELECT 'IT','147','IT','Italy' UNION
SELECT 'JM','15','JM','Jamaica' UNION
SELECT 'JP','107','JP','Japan' UNION
SELECT 'JO','193','JO','Jordan' UNION
SELECT 'KZ','108','KZ','Kazakhstan' UNION
SELECT 'KE','61','KE','Kenya' UNION
SELECT 'KI','177','KI','Kiribati' UNION
SELECT 'KP','109','KP','Korea (north)' UNION
SELECT 'KR','110','KR','Korea (south)' UNION
SELECT 'RS','205','KO','Kosovo' UNION
SELECT 'KW','194','KU','Kuwait' UNION
SELECT 'KG','111','KG','Kyrgyzstan' UNION
SELECT 'LA','112','LA','Laos' UNION
SELECT 'LV','148','LV','Latvia' UNION
SELECT 'LB','195','LB','Lebanon' UNION
SELECT 'LS','62','LS','Lesotho' UNION
SELECT 'LR','63','LI','Liberia' UNION
SELECT 'LY','64','LR','Libya' UNION
SELECT 'LI','149','LN','Liechtenstein' UNION
SELECT 'LT','150','LT','Lithuania' UNION
SELECT 'LU','151','LU','Luxembourg' UNION
SELECT 'MO','128','MO','Macau' UNION
SELECT 'MK','152','MK','Macedonia' UNION
SELECT 'MG','65','MS','Madagascar' UNION
SELECT 'MW','66','MW','Malawi' UNION
SELECT 'MY','113','MY','Malaysia' UNION
SELECT 'ML','67','ML','Mali' UNION
SELECT 'MT','153','MT','Malta' UNION
SELECT 'MH','178','MH','Marshall Islands' UNION
SELECT 'MR','68','MR','Mauritania' UNION
SELECT 'MU','92','MI','Mauritius' UNION
SELECT 'MX','16','MX','Mexico' UNION
SELECT 'FM','179','FM','Micronesia' UNION
SELECT 'MD','154','MV','Moldova' UNION
SELECT 'MC','155','MC','Monaco' UNION
SELECT 'MN','114','MN','Mongolia' UNION
SELECT 'ME','156','MG','Montenegro' UNION
SELECT 'MA','69','MA','Morocco' UNION
SELECT 'MZ','70','MZ','Mozambique' UNION
SELECT 'NA','71','NA','Namibia' UNION
SELECT 'NR','180','NR','Nauru' UNION
SELECT 'NP','115','NP','Nepal' UNION
SELECT 'NL','157','NL','Netherlands' UNION
SELECT 'NC','189','NC','New Caledonia' UNION
SELECT 'NZ','181','NZ','New Zealand' UNION
SELECT 'NI','17','NI','Nicaragua' UNION
SELECT 'NE','72','NE','Niger' UNION
SELECT 'NG','73','NG','Nigeria' UNION
SELECT 'NO','158','NO','Norway' UNION
SELECT 'OM','196','OM','Oman' UNION
SELECT 'PK','116','PK','Pakistan' UNION
SELECT 'PW','182','PW','Palau' UNION
SELECT 'PA','18','PA','Panama' UNION
SELECT 'PG','183','PG','Papua New Guinea' UNION
SELECT 'PY','34','PY','Paraguay' UNION
SELECT 'PE','35','PE','Peru' UNION
SELECT 'PH','117','PH','Philippines' UNION
SELECT 'PL','159','PL','Poland' UNION
SELECT 'PT','160','PT','Portugal' UNION
SELECT 'PR','202','PR','Puerto Rico' UNION
SELECT 'QA','197','QA','Qatar' UNION
SELECT 'RO','161','RO','Romania' UNION
SELECT 'RU','118','RU','Russia' UNION
SELECT 'RW','74','RW','Rwanda' UNION
SELECT 'WS','184','WS','Samoa' UNION
SELECT 'SM','162','SM','San Marino' UNION
SELECT 'ST','75','ST','Sao Tome and Principe' UNION
SELECT 'SA','198','SA','Saudi Arabia' UNION
SELECT 'SN','76','SN','Senegal' UNION
SELECT 'RS','163','CS','Serbia' UNION
SELECT 'SC','77','SC','Seychelles' UNION
SELECT 'SL','78','SL','Sierra Leone' UNION
SELECT 'SG','119','SG','Singapore' UNION
SELECT 'SK','164','SK','Slovakia' UNION
SELECT 'SI','165','SI','Slovenia' UNION
SELECT 'SB','185','SB','Solomon Islands' UNION
SELECT 'SO','79','SO','Somalia' UNION
SELECT 'ZA','80','ZA','South Africa' UNION
SELECT 'SS','204','SS','South Sudan' UNION
SELECT 'ES','166','ES','Spain' UNION
SELECT 'LK','120','LK','Sri Lanka' UNION
SELECT 'KN','19','KN','St. Kitts & Nevis' UNION
SELECT 'LC','20','LC','St. Lucia' UNION
SELECT 'VC','21','VC','St. Vincent & the Grenadines' UNION
SELECT 'SD','81','SD','Sudan' UNION
SELECT 'SR','36','SR','Suriname' UNION
SELECT 'SZ','82','SZ','Swaziland' UNION
SELECT 'SE','167','SE','Sweden' UNION
SELECT 'CH','168','CH','Switzerland' UNION
SELECT 'SY','199','SY','Syria' UNION
SELECT 'TW','126','TW','Taiwan' UNION
SELECT 'TJ','121','TJ','Tajikistan' UNION
SELECT 'TZ','83','TZ','Tanzania' UNION
SELECT 'TH','122','TH','Thailand' UNION
SELECT 'TG','84','TG','Togo' UNION
SELECT 'TO','186','TO','Tonga' UNION
SELECT 'TT','22','TT','Trinidad & Tobago' UNION
SELECT 'TN','85','TN','Tunisia' UNION
SELECT 'TR','173','TK','Turkey' UNION
SELECT 'TM','123','TM','Turkmenistan' UNION
SELECT 'TV','187','TV','Tuvalu' UNION
SELECT 'UG','86','UG','Uganda' UNION
SELECT 'UA','169','UA','Ukraine' UNION
SELECT 'GB','170','UK','United Kingdom' UNION
SELECT 'US','23','US','United States' UNION
SELECT 'AE','200','AE','UnitedArabEmirates' UNION
SELECT 'UY','37','UY','Uruguay' UNION
SELECT 'UZ','124','UZ','Uzbekistan' UNION
SELECT 'VU','188','VU','Vanuatu' UNION
SELECT 'VA','171','VA','Vatican City' UNION
SELECT 'VE','38','VE','Venezuela' UNION
SELECT 'VN','125','VN','Vietnam' UNION
SELECT 'EH','87','WA','Western Sahara' UNION
SELECT 'YE','201','YM','Yemen' UNION
SELECT 'ZM','88','ZM','Zambia' UNION
SELECT 'ZW','89','ZW','Zimbabwe';

COMMIT;