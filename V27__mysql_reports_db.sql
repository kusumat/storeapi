-- Adding new value for platform param in middleware_sessions view
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
		 WHEN m.plat = 'web' THEN 'Web'
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

-- Adding new value for platform param in middleware_requests view
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
		 WHEN m.plat = 'web' THEN 'Web'		 
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

-- Adding new value for platform param in application_events view
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
       ae.sessiontype AS sessionCategory
FROM application_events ae;

-- Adding new value for platform param in application_form_detail view  
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
		 WHEN plat = 'web' THEN 'Web'		 
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

-- Adding new value for platform param in application_error_detail view
CREATE OR REPLACE VIEW vw_application_error_detail
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
		 WHEN ae.plat = 'web' THEN 'Web'		 
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

-- Adding new value for platform param in middleware_sub_requests view
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
		 WHEN m.plat = 'web' THEN 'Web'		 
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

COMMIT;