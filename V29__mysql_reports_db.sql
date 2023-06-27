-- Adding app version in vw_application_events view
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
		 WHEN ae.plat = 'web' THEN 'Web'		 
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
       ae.sessiontype AS sessionCategory,
	   ae.aver AS appversion
FROM application_events ae;
