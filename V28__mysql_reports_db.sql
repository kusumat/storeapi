-- Adding 'osversion' column for view of 'application_form_detail' table
CREATE OR REPLACE VIEW vw_application_events_detail 
AS
SELECT kaid,
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
       os AS osversion,
       ua,
       aver,
       kuid,
       sdktype,
       sdkversion,
       mfbaseid,
       mfaname,
       mfaid,
       did,
       1 AS cnt,
       formdur,
       foredur,
       loaddur,
       sessiontype AS sessionCategory
FROM application_form_detail;

-- Creating a view for 'application_service_detail' table
CREATE OR REPLACE VIEW vw_application_service_detail 
AS
SELECT kaid,
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
       opstatus,
       httpcode,
       resptime,
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
       os AS osversion,
       ua,
       aver,
       kuid,
       sdktype,
       sdkversion,
       mfbaseid,
       mfaname,
       mfaid,
       did,
       sessiontype AS sessionCategory
FROM application_service_detail;

COMMIT;