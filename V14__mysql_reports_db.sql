 -- add columns to application_form_detail
ALTER TABLE application_form_detail ADD COLUMN foredur int;
ALTER TABLE application_form_detail ADD COLUMN loaddur int;

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
		chnl,
		atype,
		plat,
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