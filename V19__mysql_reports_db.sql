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
       CASE
         WHEN m.stype = 'b2c' THEN 'B2C'
         WHEN m.stype = 'b2e' THEN 'B2E'
         WHEN m.stype = 'iot' THEN 'IoT'
         ELSE ' '
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
       m.omethod,
       m.svctype,
       m.contype,
       m.xmode
FROM middleware_requests m;

-- create view for application_form_detail
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
        loaddur
FROM application_form_detail;

COMMIT;