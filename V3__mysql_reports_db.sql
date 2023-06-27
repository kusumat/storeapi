-- add additional columns to application_events

alter table application_events drop column col1;
alter table application_events drop column col2;
alter table application_events drop column col3;
alter table application_events drop column col4;
alter table application_events drop column col5;

alter table application_events modify metadata_var  varchar(14000);


ALTER TABLE application_events ADD awsid varchar(255) ;
ALTER TABLE application_events ADD ebid	varchar(255) ;
ALTER TABLE application_events ADD rid	varchar(255) ;
ALTER TABLE application_events ADD did	varchar(255) ;
ALTER TABLE application_events ADD aname	varchar(255)    NOT NULL ;
ALTER TABLE application_events ADD atype	varchar(255)    NOT NULL ;
ALTER TABLE application_events ADD chnl	varchar(255)    NOT NULL ;
ALTER TABLE application_events ADD plat	varchar(255)    NOT NULL ;
ALTER TABLE application_events ADD rip	varchar(255) ;
ALTER TABLE application_events ADD dm    varchar(255) ;
ALTER TABLE application_events ADD os	varchar(255) ;
ALTER TABLE application_events ADD ua	varchar(255) ;
ALTER TABLE application_events ADD stype	varchar(255)     NOT NULL;   	
ALTER TABLE application_events ADD aver	varchar(255);   		
ALTER TABLE application_events ADD kuid		varchar(255);   		
ALTER TABLE application_events ADD country	varchar(2);   		
ALTER TABLE application_events ADD region	varchar(2);   		
ALTER TABLE application_events ADD city		varchar(255);   		
ALTER TABLE application_events ADD zip		varchar(6);   		
ALTER TABLE application_events ADD lat		numeric(8,5);   		
ALTER TABLE application_events ADD lon		numeric(8,5);   		
ALTER TABLE application_events ADD dmacd     integer;   		
ALTER TABLE application_events ADD areacd	varchar(3);   		
ALTER TABLE application_events ADD sdktype varchar(50);
ALTER TABLE application_events ADD sdkversion varchar(50) ;

ALTER TABLE application_events ADD col1	varchar(100) ;
ALTER TABLE application_events ADD col2	varchar(100) ;
ALTER TABLE application_events ADD col3	varchar(100) ;
ALTER TABLE application_events ADD col4	varchar(100) ;
ALTER TABLE application_events ADD col5	varchar(100) ;
	
	
ALTER TABLE application_service_detail modify aname	varchar(255)    NOT NULL ;
ALTER TABLE application_error_detail modify aname	varchar(255)    NOT NULL ;

alter table application_service_detail  drop column col1;
alter table application_service_detail  drop column col2;
alter table application_service_detail  drop column col3;
alter table application_service_detail  drop column col4;
alter table application_service_detail  drop column col5;


ALTER TABLE application_service_detail ADD did	varchar(255) ;
ALTER TABLE application_service_detail ADD dm    varchar(255) ;
ALTER TABLE application_service_detail ADD os	varchar(255) ;
ALTER TABLE application_service_detail ADD ua	varchar(255) ;
ALTER TABLE application_service_detail ADD aver	varchar(255);   		
ALTER TABLE application_service_detail ADD kuid		varchar(255);   		
ALTER TABLE application_service_detail ADD sdktype varchar(50);
ALTER TABLE application_service_detail ADD sdkversion varchar(50) ;

ALTER TABLE application_service_detail ADD col1	varchar(100) ;
ALTER TABLE application_service_detail ADD col2	varchar(100) ;
ALTER TABLE application_service_detail ADD col3	varchar(100) ;
ALTER TABLE application_service_detail ADD col4	varchar(100) ;
ALTER TABLE application_service_detail ADD col5	varchar(100) ;


alter table	application_error_detail modify errstacktrace_var varchar(4100);
alter table	application_error_detail modify    errcrashreport_var varchar(4100);

alter table application_error_detail drop column col1;
alter table application_error_detail drop column col2;
alter table application_error_detail drop column col3;
alter table application_error_detail drop column col4;
alter table application_error_detail drop column col5;



ALTER TABLE application_error_detail ADD sessionid	varchar(255) ;
ALTER TABLE application_error_detail ADD did	varchar(255) ;
ALTER TABLE application_error_detail ADD dm    varchar(255) ;
ALTER TABLE application_error_detail ADD os	varchar(255) ;
ALTER TABLE application_error_detail ADD ua	varchar(255) ;
ALTER TABLE application_error_detail ADD aver	varchar(255);   		
ALTER TABLE application_error_detail ADD kuid		varchar(255);   		
ALTER TABLE application_error_detail ADD sdktype varchar(50);
ALTER TABLE application_error_detail ADD sdkversion varchar(50) ;
ALTER TABLE application_error_detail ADD pluginverplat varchar(255) ;
ALTER TABLE application_error_detail ADD pluginveride varchar(2048) ;

ALTER TABLE application_error_detail ADD col1	varchar(100) ;
ALTER TABLE application_error_detail ADD col2	varchar(100) ;
ALTER TABLE application_error_detail ADD col3	varchar(100) ;
ALTER TABLE application_error_detail ADD col4	varchar(100) ;
ALTER TABLE application_error_detail ADD col5	varchar(100) ;


CREATE VIEW vw_application_events
(
  kaid,
  environmentid,
  awsid,
  ebid,
  deviceid,
  appid,
  appname,
  sessionid,
  channel,
  apptype,
  platform,
  remoteip,
  ts,
  devicemodel,
  osversion,
  useragent,
  sessiontype,
  session_key,
  request_key,
  kuid,
  country,
  region,
  city,
  zip,
  lat,
  lon,
  dmacd,
  areacd,
  cnt,
  usagetype,
  sdktype,
  skdversion,
  evttype,
  formid,
  widgetid,
  evtsubtype,
  flowtag,
  metadata
)
AS
 SELECT ae.kaid, ae.eid AS environmentid, ae.awsid, ae.ebid, ae.did AS deviceid, ae.aid AS appid, ae.aname AS appname, ae.sid AS sessionid,
   CASE
            WHEN ae.chnl = 'mobile' THEN 'Mobile'
            WHEN ae.chnl = 'tablet' THEN 'Tablet'
            WHEN ae.chnl = 'desktop' THEN 'Desktop'
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
            ELSE ''
        END AS platform, ae.rip AS remoteip, ae.ts, ae.dm AS devicemodel, ae.os AS osversion, ae.ua AS useragent,
        CASE
            WHEN ae.stype = 'b2c' THEN 'B2C'
            WHEN ae.stype = 'b2e' THEN 'B2E'
            ELSE ''
        END AS sessiontype, ae.session_key, ae.request_key, ae.kuid, ae.country, ae.region, ae.city, ae.zip, ae.lat, ae.lon, ae.dmacd, ae.areacd, 1 AS cnt,
        CASE
            WHEN ae.chnl = 'desktop' THEN 'D'
            WHEN ae.atype = 'hybrid' OR ae.atype = 'spa' OR ae.atype = 'mobileweb' THEN 'W'
            ELSE 'N'
        END AS usagetype, ae.sdktype, ae.sdkversion AS skdversion, ae.evttype, ae.formid, ae.widgetid, ae.evtsubtype, ae.flowtag, ae.metadata
   FROM application_events ae;