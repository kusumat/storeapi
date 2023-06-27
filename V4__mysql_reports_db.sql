-- Drop Foreign key constraints on events, errors and response

alter table application_events drop foreign key fk_application_events_request_key;
alter table application_events drop foreign key fk_application_events_session_key;

alter table application_error_detail drop foreign key fk_application_error_detail_rkey;
alter table application_error_detail drop foreign key fk_application_error_detail_skey;

alter table application_service_detail drop foreign key fk_application_service_detail_rkey;
alter table application_service_detail drop foreign key fk_application_service_detail_skey;

-- Add new columns mfbaseid,mfname,mfaid


ALTER TABLE middleware_sessions ADD mfbaseid varchar(255) ;
ALTER TABLE middleware_sessions ADD mfaid	varchar(255) ;
ALTER TABLE middleware_sessions ADD mfaname	varchar(255) ;

ALTER TABLE middleware_requests ADD mfbaseid varchar(255);
ALTER TABLE middleware_requests ADD mfaid varchar(255);
ALTER TABLE middleware_requests ADD mfaname	varchar(255);

alter table application_events modify metadata_var varchar(9216);

ALTER TABLE application_events ADD mfbaseid varchar(255) ;
ALTER TABLE application_events ADD mfaid	varchar(255) ;
ALTER TABLE application_events ADD mfaname	varchar(255) ;

alter table application_error_detail modify errstacktrace_var varchar(3072);
alter table application_error_detail modify errcustommsg_var varchar(3072);
alter table application_error_detail modify errcrashreport_var varchar(3072);


ALTER TABLE application_error_detail ADD mfbaseid varchar(255) ;
ALTER TABLE application_error_detail ADD mfaid	varchar(255) ;
ALTER TABLE application_error_detail ADD mfaname	varchar(255) ;

ALTER TABLE application_service_detail ADD mfbaseid varchar(255) ;
ALTER TABLE application_service_detail ADD mfaid	varchar(255) ;
ALTER TABLE application_service_detail ADD mfaname	varchar(255) ;


CREATE OR REPLACE VIEW vw_application_events
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
  metadata,
  mfbaseid,
  mfaid,
  mfaname

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
        END AS usagetype, ae.sdktype, ae.sdkversion AS skdversion, ae.evttype, ae.formid, ae.widgetid, ae.evtsubtype, ae.flowtag, ae.metadata,
		ae.mfbaseid,
		ae.mfaid,
		ae.mfaname
	   FROM application_events ae;

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
		m.sdktype,
		m.sdkversion,
		m.opstatus,
		m.httpcode,
		m.errmsg,
		m.errstack_var,
		m.errstack,
		m.mfbaseid,
		m.mfaid,
		m.mfaname
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
     	m.sdktype,
		m.sdkversion,
		m.opstatus,
		m.httpcode,
		m.errmsg,
		m.errstack_var,
		m.errstack,
		m.mfbaseid,
		m.mfaid,
		m.mfaname
	FROM middleware_sessions m;

	
-- Drop dummy columns col1,col2,col3,col4
   
ALTER TABLE crpt_master_info drop column col1 ;
ALTER TABLE crpt_master_info drop column col2 ;
ALTER TABLE crpt_master_info drop column col3 ;
ALTER TABLE crpt_master_info drop column col4 ;
ALTER TABLE crpt_master_info drop column col5 ;

ALTER TABLE crpt_metric drop column col1 ;
ALTER TABLE crpt_metric drop column col2 ;
ALTER TABLE crpt_metric drop column col3 ;
ALTER TABLE crpt_metric drop column col4 ;
ALTER TABLE crpt_metric drop column col5 ;

ALTER TABLE crpt_owner drop column col1 ;
ALTER TABLE crpt_owner drop column col2 ;
ALTER TABLE crpt_owner drop column col3 ;
ALTER TABLE crpt_owner drop column col4 ;
ALTER TABLE crpt_owner drop column col5 ;

ALTER TABLE custom_metrics_master drop column col1 ;
ALTER TABLE custom_metrics_master drop column col2 ;
ALTER TABLE custom_metrics_master drop column col3 ;
ALTER TABLE custom_metrics_master drop column col4 ;
ALTER TABLE custom_metrics_master drop column col5 ;

ALTER TABLE dw_keys_request drop column col1 ;
ALTER TABLE dw_keys_request drop column col2 ;
ALTER TABLE dw_keys_request drop column col3 ;
ALTER TABLE dw_keys_request drop column col4 ;
ALTER TABLE dw_keys_request drop column col5 ;

ALTER TABLE dw_keys_session drop column col1 ;
ALTER TABLE dw_keys_session drop column col2 ;
ALTER TABLE dw_keys_session drop column col3 ;
ALTER TABLE dw_keys_session drop column col4 ;
ALTER TABLE dw_keys_session drop column col5 ;

ALTER TABLE form_mapping drop column col1 ;
ALTER TABLE form_mapping drop column col2 ;
ALTER TABLE form_mapping drop column col3 ;
ALTER TABLE form_mapping drop column col4 ;
ALTER TABLE form_mapping drop column col5 ;

ALTER TABLE geolocations_ip4 drop column col1 ;
ALTER TABLE geolocations_ip4 drop column col2 ;
ALTER TABLE geolocations_ip4 drop column col3 ;
ALTER TABLE geolocations_ip4 drop column col4 ;
ALTER TABLE geolocations_ip4 drop column col5 ;

ALTER TABLE invalid_messages drop column col1 ;
ALTER TABLE invalid_messages drop column col2 ;
ALTER TABLE invalid_messages drop column col3 ;
ALTER TABLE invalid_messages drop column col4 ;
ALTER TABLE invalid_messages drop column col5 ;

ALTER TABLE jrs_fusionmap_usa drop column col1 ;
ALTER TABLE jrs_fusionmap_usa drop column col2 ;
ALTER TABLE jrs_fusionmap_usa drop column col3 ;
ALTER TABLE jrs_fusionmap_usa drop column col4 ;
ALTER TABLE jrs_fusionmap_usa drop column col5 ;

ALTER TABLE jrs_fusionmap_world drop column col1 ;
ALTER TABLE jrs_fusionmap_world drop column col2 ;
ALTER TABLE jrs_fusionmap_world drop column col3 ;
ALTER TABLE jrs_fusionmap_world drop column col4 ;
ALTER TABLE jrs_fusionmap_world drop column col5 ;

ALTER TABLE reports_settings drop column col1 ;
ALTER TABLE reports_settings drop column col2 ;
ALTER TABLE reports_settings drop column col3 ;
ALTER TABLE reports_settings drop column col4 ;
ALTER TABLE reports_settings drop column col5 ;

ALTER TABLE service_mapping drop column col1 ;
ALTER TABLE service_mapping drop column col2 ;
ALTER TABLE service_mapping drop column col3 ;
ALTER TABLE service_mapping drop column col4 ;
ALTER TABLE service_mapping drop column col5 ;

ALTER TABLE middleware_sessions drop column col1 ;
ALTER TABLE middleware_sessions drop column col2 ;
ALTER TABLE middleware_sessions drop column col3 ;
ALTER TABLE middleware_sessions drop column col4 ;
ALTER TABLE middleware_sessions drop column col5 ;

ALTER TABLE middleware_requests drop column col1 ;
ALTER TABLE middleware_requests drop column col2 ;
ALTER TABLE middleware_requests drop column col3 ;
ALTER TABLE middleware_requests drop column col4 ;
ALTER TABLE middleware_requests drop column col5 ;

ALTER TABLE application_events drop column col1 ;
ALTER TABLE application_events drop column col2 ;
ALTER TABLE application_events drop column col3 ;
ALTER TABLE application_events drop column col4 ;
ALTER TABLE application_events drop column col5 ;

ALTER TABLE application_error_detail drop column col1 ;
ALTER TABLE application_error_detail drop column col2 ;
ALTER TABLE application_error_detail drop column col3 ;
ALTER TABLE application_error_detail drop column col4 ;
ALTER TABLE application_error_detail drop column col5 ;

ALTER TABLE application_service_detail drop column col1 ;
ALTER TABLE application_service_detail drop column col2 ;
ALTER TABLE application_service_detail drop column col3 ;
ALTER TABLE application_service_detail drop column col4 ;
ALTER TABLE application_service_detail drop column col5 ;
	