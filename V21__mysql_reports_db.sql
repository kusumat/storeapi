-- Adding new column sessiontype to few tables
ALTER TABLE middleware_sessions ADD COLUMN sessiontype VARCHAR (50) COMMENT 'Type of session, interactive/non-interactive etc';
ALTER TABLE middleware_requests ADD COLUMN sessiontype VARCHAR (50) COMMENT 'Type of session, interactive/non-interactive etc';
ALTER TABLE application_events ADD COLUMN sessiontype VARCHAR (50) COMMENT 'Type of session, interactive/non-interactive etc';
ALTER TABLE application_error_detail ADD COLUMN sessiontype VARCHAR (50) COMMENT 'Type of session, interactive/non-interactive etc';
ALTER TABLE application_service_detail ADD COLUMN sessiontype VARCHAR (50) COMMENT 'Type of session, interactive/non-interactive etc';
ALTER TABLE application_form_detail ADD COLUMN sessiontype VARCHAR (50) COMMENT 'Type of session, interactive/non-interactive etc';

-- Creating view for application_error_detail
CREATE VIEW vw_application_error_detail
AS 
SELECT ae.kaid AS kaid,
       ae.eid AS environmentid,
       ae.did AS deviceid,
       ae.aid AS appid,
       ae.aname AS appname,
       ae.aver AS appversion,
       ae.sid AS sid,
       ae.sessionid AS sessionid,
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
       ae.ts AS ts,
       ae.dm AS devicemodel,
       ae.os AS osversion,
       ae.ua AS useragent,
       ae.session_key AS session_key,
       ae.request_key AS request_key,
       ae.kuid AS kuid,
       1 AS cnt,
       CASE
         WHEN ae.chnl = 'desktop' THEN 'D'
         WHEN ae.atype = 'hybrid' OR ae.atype = 'spa' OR ae.atype = 'mobileweb' THEN 'W'
         ELSE 'N'
       END AS usagetype,
       ae.sdktype AS sdktype,
       ae.sdkversion AS skdversion,
       ae.evttype AS evttype,
       ae.formid AS formid,
       ae.widgetid AS widgetid,
       ae.evtsubtype AS evtsubtype,
       ae.flowtag AS flowtag,
       ae.mfbaseid AS mfbaseid,
       ae.mfaid AS mfaid,
       ae.mfaname AS mfaname,
       ae.errcode AS errcode,
       ae.errmsg AS errmsg,
       ae.errfile AS errfile,
       ae.errmethod AS errmethod,
       ae.errline AS errline,
       ae.errstacktrace AS errstacktrace,
       ae.errtype AS errtype,
       ae.iserror AS iserror,
       ae.errcustommsg AS errcustommsg,
       ae.errcrashreport AS errcrashreport,
       ae.pluginverplat AS pluginverplat,
       ae.pluginveride AS pluginveride,
       ae.diskmemfree AS diskmemfree,
       ae.diskmemtot AS diskmemtot,
       ae.sdmemfree AS sdmemfree,
       ae.sdmemtot AS sdmemtot,
       ae.chargelevel AS chargelevel,
       ae.ramused AS ramused,
       ae.cpu AS cpu,
       ae.networktype AS networktype,
       ae.sessiontype AS sessionCategory
FROM application_error_detail ae;

-- Adding New fields to middleware_requests table to process object Service
ALTER TABLE middleware_requests
    ADD COLUMN trecords INT COMMENT 'Total Records- Total number of records downloaded/uploaded during sync service call',
    ADD COLUMN reqtype VARCHAR(50) COMMENT 'Request Type- Type of request from the device',
    ADD COLUMN reqbytes INT COMMENT 'Request Bytes- Transaction request data in bytes',
    ADD COLUMN respbytes INT COMMENT 'Response Bytes- Transaction response data in bytes',
    ADD COLUMN reqprsdur INT COMMENT 'Request Data Processing Duration- Time taken to parse the data and convert to JSON for a request',
    ADD COLUMN respprsdur INT COMMENT 'Response Data Processing Duration- Time taken to parse the data and convert to JSON for a response',
    ADD COLUMN incnfdur INT COMMENT 'Interceptor Conflict Duration- Time taken to execute built-in interceptor logic for conflicts in milliseconds',
    ADD COLUMN cnfcnt INT COMMENT 'Conflict Count- Number of conflicts occured during sync service call',
    ADD COLUMN iserror VARCHAR(10) COMMENT 'True if any error occurs during sync service call, otherwise false';

-- Adding new fields to the middleware_request view
CREATE OR REPLACE VIEW vw_middleware_requests
AS
SELECT m.kaid,
       m.eid AS environmentid,
       m.awsid,
       m.ebid,
       m.did AS deviceid,
       m.aid AS appid,
       m.aname AS appname,
	   m.aver AS appversion,
       m.rid AS requestid,
       m.sid AS sessionid,
       CASE
         WHEN m.chnl = 'mobile' THEN 'Mobile'
         WHEN m.chnl = 'tablet' THEN 'Tablet'
         WHEN m.chnl = 'desktop' THEN 'Desktop'
         WHEN m.chnl = 'ipod' THEN 'Ipod'
         WHEN m.chnl = 'watch' THEN 'Watch'
         WHEN m.chnl = 'iot' THEN 'IoT'
         ELSE ' '
       END AS channel,
       CASE
         WHEN m.atype = 'hybrid' THEN 'Hybrid'
         WHEN m.atype = 'native' THEN 'Native'
         WHEN m.atype = 'mixedmode' THEN 'Mixed-Mode'
         WHEN m.atype = 'spa' THEN 'SPA'
         WHEN m.atype = 'mobileweb' THEN 'Mobile Web'
         ELSE ' '
       END AS apptype,
       CASE
         WHEN m.plat = 'ios' THEN 'iOS'
         WHEN m.plat = 'android' THEN 'Android'
         WHEN m.plat = 'blackberry' THEN 'Blackberry'
         WHEN m.plat = 'windows' THEN 'Windows'
         WHEN m.plat = 'j2me' THEN 'j2me'
         WHEN m.plat = 'iot' THEN 'IoT'
         ELSE ' '
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
       m.stype AS sessiontype,
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
       m.omethod,
       m.svctype,
       m.contype,
       m.xmode,
       m.trecords,
       m.reqtype,
       m.reqbytes,
       m.respbytes,
       m.reqprsdur,
       m.respprsdur,
       m.incnfdur,
       m.cnfcnt,
       m.iserror,
       m.sessiontype AS sessionCategory
FROM middleware_requests m;

-- Removed the check for stype field
CREATE OR REPLACE VIEW vw_middleware_sessions
AS
SELECT m.kaid,
       m.eid AS environmentid,
       m.awsid,
       m.ebid,
       m.did AS deviceid,
       m.aid AS appid,
       m.aname AS appname,
	   m.aver AS appversion,
       m.sid AS sessionid,
       CASE
         WHEN m.chnl = 'mobile' THEN 'Mobile'
         WHEN m.chnl = 'tablet' THEN 'Tablet'
         WHEN m.chnl = 'desktop' THEN 'Desktop'
         WHEN m.chnl = 'ipod' THEN 'Ipod'
         WHEN m.chnl = 'watch' THEN 'Watch'
         WHEN m.chnl = 'iot' THEN 'IoT'
         ELSE ' '
       END AS channel,
       CASE
         WHEN m.atype = 'hybrid' THEN 'Hybrid'
         WHEN m.atype = 'native' THEN 'Native'
         WHEN m.atype = 'mixedmode' THEN 'Mixed-Mode'
         WHEN m.atype = 'spa' THEN 'SPA'
         WHEN m.atype = 'mobileweb' THEN 'Mobile Web'
         ELSE ' '
       END AS apptype,
       CASE
         WHEN m.plat = 'ios' THEN 'iOS'
         WHEN m.plat = 'android' THEN 'Android'
         WHEN m.plat = 'blackberry' THEN 'Blackberry'
         WHEN m.plat = 'windows' THEN 'Windows'
         WHEN m.plat = 'j2me' THEN 'j2me'
         WHEN m.plat = 'iot' THEN 'IoT'
         ELSE ' '
       END AS platform,
       m.tdur,
       m.rip AS remoteip,
       m.ts,
       m.dm AS devicemodel,
       m.os AS osversion,
       m.ua AS useragent,
       m.stype AS sessiontype,
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
       m.svcver,
       m.sessiontype AS sessionCategory
FROM middleware_sessions m;

-- Removed the check for stype field
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
       ae.stype AS sessiontype,
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
       ae.mfaname,
       ae.sessiontype AS sessionCategory
FROM application_events ae;

CREATE TABLE api_requests
(
  id             BIGINT NOT NULL AUTO_INCREMENT,
  bid            VARCHAR(255) NOT NULL,
  mid            VARCHAR(255),
  kaid           VARCHAR(255) NOT NULL,
  eid            VARCHAR(255) NOT NULL,
  awsid          VARCHAR(255),
  ebid           VARCHAR(255),
  aid            VARCHAR(255),
  aname          VARCHAR(255),
  rid            VARCHAR(255) NOT NULL,
  request_key    BIGINT NOT NULL,
  idur           INT NOT NULL,
  tdur           INT NOT NULL,
  rip            VARCHAR(255),
  ts             TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  svcid          VARCHAR(255) NOT NULL,
  stype          VARCHAR(255) NOT NULL,
  country        VARCHAR(2),
  region         VARCHAR(10),
  city           VARCHAR(255),
  zip            VARCHAR(32),
  lat            DECIMAL(8,5),
  lon            DECIMAL(8,5),
  dmacd          INT,
  areacd         VARCHAR(3),
  predur         INT DEFAULT 0 NOT NULL,
  exdur          INT DEFAULT 0 NOT NULL,
  prsdur         INT DEFAULT 0 NOT NULL,
  postdur        INT DEFAULT 0 NOT NULL,
  sdktype        VARCHAR(50) NOT NULL,
  sdkversion     VARCHAR(50),
  opstatus       INT,
  httpcode       INT,
  errmsg         VARCHAR(4095),
  errstack_var   VARCHAR(8095),
  errstack       MEDIUMTEXT,
  mfaid          VARCHAR(255),
  mfbaseid       VARCHAR(255),
  mfaname        VARCHAR(255),
  svcgroup       VARCHAR(255),
  svcver         VARCHAR(50),
  rver           VARCHAR(50),
  reqmapdur      INT,
  respmapdur     INT,
  oname          VARCHAR(255),
  omethod        VARCHAR(50),
  svctype        VARCHAR(100),
  contype        VARCHAR(100),
  trecords       INT COMMENT 'Total Records- Total number of records downloaded/uploaded during sync service call',
  reqtype        VARCHAR(50) COMMENT 'Request Type- Type of request from the device',
  reqbytes       INT COMMENT 'Request Bytes- Transaction request data in bytes',
  respbytes      INT COMMENT 'Response Bytes- Transaction response data in bytes',
  reqprsdur      INT COMMENT 'Request Data Processing Duration- Time taken to parse the data and convert to JSON for a request',
  respprsdur     INT COMMENT 'Response Data Processing Duration- Time taken to parse the data and convert to JSON for a response',
  incnfdur       INT COMMENT 'Interceptor Conflict Duration- Time taken to execute built-in Interceptor logic for conflicts in milliseconds',
  cnfcnt         INT COMMENT 'Conflicts Count- Number of Conflicts occured during sync service call',
  iserror        VARCHAR(10) COMMENT 'True if any error occurs during sync service call, otherwe false',
  PRIMARY KEY (id)
);

DELIMITER ++

CREATE PROCEDURE DROPCOLUMNIFEXISTS(TABLENAME VARCHAR(255), COLUMNNAME VARCHAR(255))
BEGIN
 /* delete column if it exists */
 IF EXISTS (SELECT * FROM information_schema.columns WHERE table_schema = '${KONY_REPORTS_DB}' and table_name COLLATE utf8_unicode_ci = TABLENAME and column_name COLLATE utf8_unicode_ci = COLUMNNAME) THEN
  SET @s = CONCAT("ALTER TABLE ", TABLENAME, " DROP COLUMN ", COLUMNNAME);
  PREPARE stmtd FROM @s;
  EXECUTE stmtd;
 END IF;
END++

DELIMITER ;

CALL DROPCOLUMNIFEXISTS('geolocations_ip4', 'IPSPATIAL');

-- Add new fields to geolocations_ip4 table
ALTER TABLE geolocations_ip4
	ADD COLUMN countryName VARCHAR(255) AFTER country,
    ADD COLUMN regionName VARCHAR(255) AFTER region,
    ADD COLUMN continentCode VARCHAR(10) AFTER endIpInt,
    ADD COLUMN continentName VARCHAR(255) AFTER continentCode,
    ADD COLUMN timezone VARCHAR(255) AFTER dmacode,
    ADD COLUMN isInEuropeanUnion boolean AFTER timezone;
	
-- Modified length of region field
ALTER TABLE geolocations_ip4 MODIFY COLUMN region VARCHAR(10);
ALTER TABLE middleware_requests MODIFY COLUMN region VARCHAR(10);
ALTER TABLE middleware_sessions MODIFY COLUMN region VARCHAR(10);
ALTER TABLE application_events MODIFY COLUMN region VARCHAR(10);
   
-- Added indexes to geolocations_ip4 table
ALTER TABLE `geolocations_ip4` ADD INDEX idx_geolocations_ip4_start (`startIpInt`);
ALTER TABLE `geolocations_ip4` ADD INDEX idx_geolocations_ip4_end (`endIpInt`);

-- Creating a view for api_requests
CREATE VIEW vw_api_requests 
AS
SELECT kaid,
       eid AS environmentid,
       awsid,
       ebid,
       aid AS appid,
       aname AS appname,
       rid AS requestid,
       request_key,
       idur,
       tdur,
       rip AS remoteip,
       ts AS ts,
       svcid AS serviceid,
       stype AS sessiontype,
       country,
       region AS region,
       city,
       zip,
       lat,
       lon,
       dmacd,
       areacd,
       predur,
       exdur,
       prsdur,
       postdur,
       1 AS cnt,
       sdktype,
       sdkversion,
       opstatus,
       httpcode,
       errmsg,
       errstack_var,
       errstack,
       mfaid,
       mfbaseid,
       mfaname,
       svcgroup,
       svcver,
       rver,
       reqmapdur,
       respmapdur,
       oname,
       omethod,
       svctype,
       contype,
       trecords,
       reqtype,
       reqbytes,
       respbytes,
       reqprsdur,
       respprsdur,
       incnfdur,
       cnfcnt,
       iserror
FROM api_requests;

-- Re-creating view for application_form_detail
CREATE OR REPLACE VIEW vw_application_events_detail
AS 
SELECT  kaid,
        eid,
        aid,
        ts,
        evttype,
        formid,
        widgetid,
        sid,
        evtsubtype,
        flowtag,
        request_key,
        session_key,
        aname,
        CASE
         WHEN chnl = 'mobile' THEN 'Mobile'
         WHEN chnl = 'tablet' THEN 'Tablet'
         WHEN chnl = 'desktop' THEN 'Desktop'
         WHEN chnl = 'ipod' THEN 'Ipod'
         WHEN chnl = 'watch' THEN 'Watch'
         WHEN chnl = 'iot' THEN 'IoT'
         ELSE ' '
        END AS chnl,
        CASE
         WHEN atype = 'hybrid' THEN 'Hybrid'
         WHEN atype = 'native' THEN 'Native'
         WHEN atype = 'mixedmode' THEN 'Mixed-Mode'
         WHEN atype = 'spa' THEN 'SPA'
         WHEN atype = 'mobileweb' THEN 'Mobile Web'
         ELSE ' '
        END AS atype,
        CASE
         WHEN plat = 'ios' THEN 'iOS'
         WHEN plat = 'android' THEN 'Android'
         WHEN plat = 'blackberry' THEN 'Blackberry'
         WHEN plat = 'windows' THEN 'Windows'
         WHEN plat = 'j2me' THEN 'j2me'
         WHEN plat = 'iot' THEN 'IoT'
         ELSE ' '
        END AS plat,
        dm,
        ua,
        aver,
        kuid,
        sdktype,
        sdkversion,
        mfbaseid,
        mfaname,
        mfaid,
        did,
        1 as cnt,
        formdur,
        foredur,
        loaddur,
        sessiontype AS sessionCategory
FROM application_form_detail;

COMMIT;