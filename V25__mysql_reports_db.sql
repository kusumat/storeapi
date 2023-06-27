-- Add request_key column to sub tables
ALTER TABLE middleware_sub_requests ADD COLUMN request_key BIGINT;
ALTER TABLE api_sub_requests ADD COLUMN request_key BIGINT;

-- Creating view for middleware_sub_requests
CREATE OR REPLACE VIEW vw_middleware_sub_requests
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
       m.request_key,
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
	   m.psvcid AS parentserviceid,
       m.fid AS formid,
       m.stype AS sessiontype,
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
       m.psvcgroup as parentsvcgroup,
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
FROM middleware_sub_requests m;

-- Creating a view for api_sub_requests
CREATE OR REPLACE VIEW vw_api_sub_requests 
AS
SELECT m.kaid,
       m.eid AS environmentid,
       m.awsid,
       m.ebid,
       m.aid AS appid,
       m.aname AS appname,
       m.rid AS requestid,
       m.request_key,
       m.idur,
       m.tdur,
       m.rip AS remoteip,
       m.ts AS ts,
       m.svcid AS serviceid,
	   m.psvcid AS parentserviceid,
       m.stype AS sessiontype,
       m.country,
       m.region AS region,
       m.city,
       m.zip,
       m.lat,
       m.lon,
       m.dmacd,
       m.areacd,
       m.predur,
       m.exdur,
       m.prsdur,
       m.postdur,
       1 AS cnt,
       m.sdktype,
       m.sdkversion,
       m.opstatus,
       m.httpcode,
       m.errmsg,
       m.errstack_var,
       m.errstack,
       m.mfaid,
       m.mfbaseid,
       m.mfaname,
       m.svcgroup,
       m.psvcgroup as parentsvcgroup,
       m.svcver,
       m.rver,
       m.reqmapdur,
       m.respmapdur,
       m.oname,
       m.omethod,
       m.svctype,
       m.contype,
       m.trecords,
       m.reqtype,
       m.reqbytes,
       m.respbytes,
       m.reqprsdur,
       m.respprsdur,
       m.incnfdur,
       m.cnfcnt,
       m.iserror
FROM api_sub_requests m;

COMMIT;