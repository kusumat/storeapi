ALTER TABLE middleware_sessions ADD (svcgroup VARCHAR (255),rver VARCHAR (50),svcver VARCHAR (50));

ALTER TABLE middleware_requests ADD (svcgroup VARCHAR (255),rver VARCHAR (50),svcver VARCHAR (50),reqmapdur INT,respmapdur INT,oname VARCHAR (255),omethod VARCHAR (50));

ALTER TABLE geolocations_ip4 MODIFY postalcode varchar(32);

ALTER TABLE middleware_sessions MODIFY zip varchar(32);

ALTER TABLE middleware_requests MODIFY zip varchar(32);

ALTER TABLE application_events MODIFY zip varchar(32);



CREATE OR REPLACE VIEW vw_middleware_requests 
AS
SELECT m.kaid,
       m.eid AS environmentid,
       m.awsid,
       m.ebid,
       m.did AS deviceid,
       m.aid AS appid,
       m.aname AS appname,
       m.rid AS requestid,
       m.sid AS sessionid,
       CASE
         WHEN m.chnl = 'mobile' THEN 'Mobile'
         WHEN m.chnl = 'tablet' THEN 'Tablet'
         WHEN m.chnl = 'desktop' THEN 'Desktop'
         WHEN m.chnl = 'ipod' THEN 'Ipod'
         WHEN m.chnl = 'watch' THEN 'Watch'
         WHEN m.chnl = 'iot' THEN 'IoT'
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
         WHEN m.plat = 'iot' THEN 'IoT'
         ELSE ''
       END AS platform,
       m.idur,
       m.tdur,
       m.predur,
       m.exdur,
       m.prsdur,
       m.postdur,
       m.rip AS remoteip,
       m.ts AS ts,
       m.dm AS devicemodel,
       m.os AS osversion,
       m.ua AS useragent,
       m.svcid AS serviceid,
       m.fid AS formid,
       CASE
         WHEN m.stype = 'b2c' THEN 'B2C'
         WHEN m.stype = 'b2e' THEN 'B2E'
         WHEN m.stype = 'iot' THEN 'IoT'
         ELSE ''
       END AS sessiontype,
       m.session_key,
       m.request_key,
       m.kuid,
       m.country,
       m.region AS region,
       m.city,
       m.zip,
       m.lat,
       m.lon,
       m.dmacd,
       m.areacd,
       1 AS cnt,
       CASE
         WHEN m.chnl = 'desktop' THEN 'D'
         WHEN m.atype = 'hybrid' OR m.atype = 'spa' OR m.atype = 'mobileweb' THEN 'W'
         ELSE 'N'
       END AS usagetype,
       m.sdktype,
       m.sdkversion,
       m.opstatus,
       m.httpcode,
       m.errmsg,
       m.errstack_var,
       m.errstack,
       m.mfbaseid,
       m.mfaid,
       m.mfaname,
       m.svcgroup,
       m.rver,
       m.svcver,
       m.reqmapdur,
       m.respmapdur,
       m.oname,
       m.omethod
FROM middleware_requests m;

CREATE OR REPLACE VIEW vw_middleware_sessions 
AS
SELECT m.kaid,
       m.eid AS environmentid,
       m.awsid,
       m.ebid,
       m.did AS deviceid,
       m.aid AS appid,
       m.aname AS appname,
       m.sid AS sessionid,
       CASE
         WHEN m.chnl = 'mobile' THEN 'Mobile'
         WHEN m.chnl = 'tablet' THEN 'Tablet'
         WHEN m.chnl = 'desktop' THEN 'Desktop'
         WHEN m.chnl = 'ipod' THEN 'Ipod'
         WHEN m.chnl = 'watch' THEN 'Watch'
         WHEN m.chnl = 'iot' THEN 'IoT'
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
         WHEN m.plat = 'iot' THEN 'IoT'
         ELSE ''
       END AS platform,
       m.tdur,
       m.rip AS remoteip,
       m.ts,
       m.dm AS devicemodel,
       m.os AS osversion,
       m.ua AS useragent,
       CASE
         WHEN m.stype = 'b2c' THEN 'B2C'
         WHEN m.stype = 'b2e' THEN 'B2E'
         WHEN m.stype = 'iot' THEN 'IoT'
         ELSE ''
       END AS sessiontype,
       m.session_key,
       m.kuid,
       m.country,
       m.region,
       m.city,
       m.zip,
       m.lat,
       m.lon,
       m.dmacd,
       m.areacd,
       1 AS cnt,
       CASE
         WHEN m.chnl = 'desktop' THEN 'D'
         WHEN m.atype = 'hybrid' OR m.atype = 'spa' OR m.atype = 'mobileweb' THEN 'W'
         ELSE 'N'
       END AS usagetype,
       m.sdktype,
       m.sdkversion,
       m.opstatus,
       m.httpcode,
       m.errmsg,
       m.errstack_var,
       m.errstack,
       m.mfbaseid,
       m.mfaid,
       m.mfaname,
       m.svcgroup,
       m.rver,
       m.svcver
FROM middleware_sessions m;

CREATE OR REPLACE VIEW vw_application_events 
AS
SELECT ae.kaid,
       ae.eid AS environmentid,
       ae.awsid,
       ae.ebid,
       ae.did AS deviceid,
       ae.aid AS appid,
       ae.aname AS appname,
       ae.sid AS sessionid,
       CASE
         WHEN ae.chnl = 'mobile' THEN 'Mobile'
         WHEN ae.chnl = 'tablet' THEN 'Tablet'
         WHEN ae.chnl = 'desktop' THEN 'Desktop'
         WHEN ae.chnl = 'ipod' THEN 'Ipod'
         WHEN ae.chnl = 'watch' THEN 'Watch'
         WHEN ae.chnl = 'iot' THEN 'IoT'
         ELSE ''
       END AS channel,
       CASE
         WHEN ae.atype = 'hybrid' THEN 'Hybrid'
         WHEN ae.atype = 'native' THEN 'Native'
         WHEN ae.atype = 'mixedmode' THEN 'Mixed-Mode'
         WHEN ae.atype = 'spa' THEN 'SPA'
         WHEN ae.atype = 'mobileweb' THEN 'Mobile Web'
         ELSE ''
       END AS apptype,
       CASE
         WHEN ae.plat = 'ios' THEN 'iOS'
         WHEN ae.plat = 'android' THEN 'Android'
         WHEN ae.plat = 'blackberry' THEN 'Blackberry'
         WHEN ae.plat = 'windows' THEN 'Windows'
         WHEN ae.plat = 'j2me' THEN 'j2me'
         WHEN ae.plat = 'iot' THEN 'IoT'
         ELSE ''
       END AS platform,
       ae.rip AS remoteip,
       ae.ts,
       ae.dm AS devicemodel,
       ae.os AS osversion,
       ae.ua AS useragent,
       CASE
         WHEN ae.stype = 'b2c' THEN 'B2C'
         WHEN ae.stype = 'b2e' THEN 'B2E'
         WHEN ae.stype = 'iot' THEN 'IoT'
         ELSE ''
       END AS sessiontype,
       ae.session_key,
       ae.request_key,
       ae.kuid,
       ae.country,
       ae.region,
       ae.city,
       ae.zip,
       ae.lat,
       ae.lon,
       ae.dmacd,
       ae.areacd,
       1 AS cnt,
       CASE
         WHEN ae.chnl = 'desktop' THEN 'D'
         WHEN ae.atype = 'hybrid' OR ae.atype = 'spa' OR ae.atype = 'mobileweb' THEN 'W'
         ELSE 'N'
       END AS usagetype,
       ae.sdktype,
       ae.sdkversion AS skdversion,
       ae.evttype,
       ae.formid,
       ae.widgetid,
       ae.evtsubtype,
       ae.flowtag,
       ae.metadata,
       ae.mfbaseid,
       ae.mfaid,
       ae.mfaname
FROM application_events ae;

CREATE TABLE geolocations_ip4_tmp 
(
  startIpNum   VARCHAR(15),
  endIpNum     VARCHAR(15),
  startIpInt   INT(10) unsigned NOT NULL,
  endIpInt     INT(10) unsigned NOT NULL DEFAULT '0',
  country      VARCHAR(2),
  region       VARCHAR(2),
  city         VARCHAR(255),
  postalCode   VARCHAR(32),
  latitude     DECIMAL(8,5),
  longitude    DECIMAL(8,5),
  dmaCode      VARCHAR(3),
  areaCode     VARCHAR(3),
  PRIMARY KEY (startIpInt,endIpInt)
);



 ALTER TABLE middleware_requests DROP FOREIGN KEY fk_middleware_requests_session_key;