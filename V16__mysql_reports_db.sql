CREATE TABLE if not exists licenseinfo(
    id BIGINT NOT NULL AUTO_INCREMENT, 
	licensetype varchar(20) NOT NULL, 
	insertdate DATETIME NOT NULL, 
	effectivedate DATETIME NOT NULL,
	lastyear int,
	yeartodate int,
	lastquarter int,
	quartertodate int,
	lastmonth int,
	error TEXT,
    modifieddate DATETIME,
	PRIMARY KEY pk_licenseinfo(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TRIGGER TRG_LICENSEINFO_UPDATE BEFORE UPDATE ON licenseinfo FOR EACH ROW SET NEW.modifieddate = UTC_TIMESTAMP();
  
DELIMITER ++

CREATE PROCEDURE FETCHLICENSEINFOERRORS(IN ARGTYPE VARCHAR(25), IN ERRORCODE varchar(10), IN ERRORMESSAGE VARCHAR(255), OUT SETERROR VARCHAR(4000))

BEGIN
IF ERRORCODE IS NOT NULL THEN
    SET SETERROR = concat("\"", ARGTYPE ,"ERRORCODE\" : \"", ERRORCODE ,"\" , \"", ARGTYPE ,"ERRORMESSAGE\" : \"", ERRORMESSAGE ,"\" ,");
END IF;

END ++

CREATE PROCEDURE FETCHSESSIONSDATA(IN STARTDATE datetime, IN ENDDATE datetime, OUT SESSIONS INT, OUT V_ERROR_CODE VARCHAR(10), OUT V_ERROR_MESSAGE VARCHAR(255))
BEGIN
  DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    BEGIN
      GET DIAGNOSTICS CONDITION 1
        V_ERROR_CODE = RETURNED_SQLSTATE, V_ERROR_MESSAGE = MESSAGE_TEXT;
    END;
    select count(id) into SESSIONS FROM middleware_sessions where ts between STARTDATE and ENDDATE;
 END ++

CREATE PROCEDURE FETCHNAMEDUSERSDATA(IN STARTDATE datetime, IN ENDDATE datetime, OUT NAMEDUSERS INT, OUT V_ERROR_CODE VARCHAR(10), OUT V_ERROR_MESSAGE VARCHAR(255))
BEGIN
  DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    BEGIN
      GET DIAGNOSTICS CONDITION 1
        V_ERROR_CODE = RETURNED_SQLSTATE, V_ERROR_MESSAGE = MESSAGE_TEXT;
    END;
   select count(distinct kuid) into NAMEDUSERS FROM middleware_sessions where ts between STARTDATE and ENDDATE and (kuid <> '' and kuid is not null);
END ++

CREATE PROCEDURE FETCHDEVICESDATA(IN STARTDATE datetime, IN ENDDATE datetime, OUT DEVICES INT, OUT V_ERROR_CODE VARCHAR(10), OUT V_ERROR_MESSAGE VARCHAR(255))
BEGIN
  DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    BEGIN
      GET DIAGNOSTICS CONDITION 1
        V_ERROR_CODE = RETURNED_SQLSTATE, V_ERROR_MESSAGE = MESSAGE_TEXT;
    END;
	select count(users) into DEVICES from(
    select distinct did as users from middleware_sessions where ts between STARTDATE and ENDDATE and (did <> '' and did is not null)
	union all
	select sid as users from middleware_sessions where ((did = '' or did IS NULL) and (kuid = '' or kuid IS  NULL)) and ts BETWEEN STARTDATE and ENDDATE) al;
END ++

CREATE PROCEDURE FETCHLICENSEDUSERSDATA(IN STARTDATE datetime, IN ENDDATE datetime, OUT LICENSEDUSERS INT, OUT V_ERROR_CODE VARCHAR(10), OUT V_ERROR_MESSAGE varchar(255))
BEGIN
  DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    BEGIN
      GET DIAGNOSTICS CONDITION 1
        V_ERROR_CODE = RETURNED_SQLSTATE, V_ERROR_MESSAGE = MESSAGE_TEXT;
    END;
	select count(totalUser) into LICENSEDUSERS from(
    select  distinct kuid  as totalUser from middleware_sessions where (kuid <> '' and kuid IS NOT NULL)
    and ts BETWEEN STARTDATE and ENDDATE 
    union all
    select distinct did  as totalUser from middleware_sessions where (did <> '' and did IS NOT NULL)
    and ts BETWEEN STARTDATE and ENDDATE and
    did NOT IN(select did from middleware_sessions where ((did <> '' and did IS NOT NULL) and (kuid <> '' and kuid IS NOT NULL)) and ts BETWEEN STARTDATE and ENDDATE)
    union all
    select sid as totalUser from middleware_sessions where ((did = '' or did IS NULL) and (kuid = '' or kuid IS  NULL)) and ts BETWEEN STARTDATE and ENDDATE) al;
END ++

CREATE PROCEDURE FETCHLICENSEINFO ()

BEGIN

DECLARE vcode VARCHAR(10) DEFAULT '00000';
DECLARE vmsg TEXT;
DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
BEGIN
   GET DIAGNOSTICS CONDITION 1
      vcode = RETURNED_SQLSTATE, vmsg = MESSAGE_TEXT;
   END;

SET @vlastyearstartdate = DATE_FORMAT(date_sub(CURDATE(), INTERVAL 1 YEAR), '%Y-01-01');
SET @vlastyearenddate = DATE_FORMAT(date_sub(CURDATE(), INTERVAL 1 YEAR), '%Y-12-31 23:59:59');

SET @vlastmonthstartdate = DATE_FORMAT(date_sub(CURDATE(), INTERVAL 1 MONTH), '%Y-%m-01');
SET @vlastmonthenddate = DATE_FORMAT(LAST_DAY(date_sub(CURDATE(), INTERVAL 1 MONTH)), '%Y-%m-%d 23:59:59');

SET @vyeartoddatestartdate = DATE_FORMAT(CURDATE(), '%Y-01-01');
SET @vyeartoddateenddate = @vlastmonthenddate;

SET @vlastquarterstatdate = MAKEDATE(YEAR(CURDATE()), 1) + INTERVAL QUARTER(CURDATE())-2 QUARTER;
SET @vlastquarterenddate = DATE_FORMAT(MAKEDATE(YEAR(CURDATE()), 1) + INTERVAL QUARTER(CURDATE())-1 QUARTER - INTERVAL 1 DAY, '%Y-%m-%d 23:59:59');

SET @vquartertodatestartdate = MAKEDATE(YEAR(CURDATE()), 1) + INTERVAL QUARTER(CURDATE()) QUARTER - INTERVAL 1 QUARTER ;
SET @vquartertodateenddate = @vlastmonthenddate;

CALL FETCHSESSIONSDATA(@vlastyearstartdate, @vlastyearenddate, @v_total_lastyear, @vlastyearerrorcode, @vlastyearerrormessage);
CALL FETCHLICENSEINFOERRORS('LASTYEAR', @vlastyearerrorcode, @vlastyearerrormessage, @vlastyearError);
CALL FETCHSESSIONSDATA(@vyeartoddatestartdate, @vyeartoddateenddate, @v_total_yeartodate, @vyeartodateerrorcode,@vyeartodateerrormessage);
CALL FETCHLICENSEINFOERRORS('YEARTODATE', @vyeartodateerrorcode,@vyeartodateerrormessage, @vyeartodateError);
CALL FETCHSESSIONSDATA(@vlastquarterstatdate, @vlastquarterenddate, @v_total_lastquarter, @vlastquarterrorcode, @vlastquarterrormessage);
CALL FETCHLICENSEINFOERRORS('LASTQUARTER', @vlastquarterrorcode, @vlastquarterrormessage, @vlastquarterError);
CALL FETCHSESSIONSDATA(@vquartertodatestartdate, @vquartertodateenddate, @v_total_quartertodate, @vquartertodateerrorcode, @vquartertodateerrormessage);
CALL FETCHLICENSEINFOERRORS('QUARTERTODATE', @vquartertodateerrorcode, @vquartertodateerrormessage, @vquartertodateError);
CALL FETCHSESSIONSDATA(@vlastmonthstartdate, @vlastmonthenddate, @v_total_lastmonth, @vlastmontherrorcode, @vlastmontherrormessage);
CALL FETCHLICENSEINFOERRORS('LASTMONTH', @vlastmontherrorcode, @vlastmontherrormessage, @vlastmonthError);

SET @VERRORS = concat(@vlastyearError ,"", @vyeartodateError ,"", @vlastquarterError ,"", @vquartertodateError ,"", @vlastmonthError);

IF(@VERRORS IS NULL) THEN
    SET @VJSONERROR = "{}";
ELSE
    SET @VJSONERROR = concat("{", TRIM(TRAILING  ',' FROM @VERRORS) ,"}");
END IF;

insert into licenseinfo (licensetype, insertdate, effectivedate, lastyear, yeartodate, lastquarter, quartertodate, lastmonth, error) values ('SESSIONS', now(), @vlastmonthenddate, @v_total_lastyear, @v_total_yeartodate, @v_total_lastquarter, @v_total_quartertodate, @v_total_lastmonth, @VJSONERROR);


CALL FETCHNAMEDUSERSDATA(@vlastyearstartdate, @vlastyearenddate, @v_total_lastyear, @vlastyearerrorcode, @vlastyearerrormessage);
CALL FETCHLICENSEINFOERRORS('LASTYEAR', @vlastyearerrorcode, @vlastyearerrormessage, @vlastyearError);
CALL FETCHNAMEDUSERSDATA(@vyeartoddatestartdate, @vyeartoddateenddate, @v_total_yeartodate, @vyeartodateerrorcode, @vyeartodateerrormessage);
CALL FETCHLICENSEINFOERRORS('YEARTODATE', @vyeartodateerrorcode, @vyeartodateerrormessage, @vyeartodateError);
CALL FETCHNAMEDUSERSDATA(@vlastquarterstatdate, @vlastquarterenddate, @v_total_lastquarter, @vlastquarterrorcode, @vlastquarterrormessage);
CALL FETCHLICENSEINFOERRORS('LASTQUARTER', @vlastquarterrorcode, @vlastquarterrormessage, @vlastquarterError);
CALL FETCHNAMEDUSERSDATA(@vquartertodatestartdate, @vquartertodateenddate, @v_total_quartertodate, @vquartertodateerrorcode, @vquartertodateerrormessage);
CALL FETCHLICENSEINFOERRORS('QUARTERTODATE', @vquartertodateerrorcode, @vquartertodateerrormessage, @vquartertodateError);
CALL FETCHNAMEDUSERSDATA(@vlastmonthstartdate, @vlastmonthenddate, @v_total_lastmonth, @vlastmontherrorcode, @vlastmontherrormessage);
CALL FETCHLICENSEINFOERRORS('LASTMONTH', @vlastmontherrorcode, @vlastmontherrormessage, @vlastmonthError);

SET @VERRORS = concat(@vlastyearError ,"", @vyeartodateError ,"", @vlastquarterError ,"", @vquartertodateError ,"", @vlastmonthError);

IF(@VERRORS IS NULL) THEN
    SET @VJSONERROR = "{}";
ELSE
    SET @VJSONERROR = concat("{", TRIM(TRAILING  ',' FROM @VERRORS) ,"}");
END IF;

insert into licenseinfo (licensetype, insertdate, effectivedate, lastyear, yeartodate, lastquarter, quartertodate, lastmonth, error) values ('NAMEDUSERS', now(), @vlastmonthenddate, @v_total_lastyear, @v_total_yeartodate, @v_total_lastquarter, @v_total_quartertodate, @v_total_lastmonth, @VJSONERROR); 

CALL FETCHDEVICESDATA(@vlastyearstartdate, @vlastyearenddate, @v_total_lastyear, @vlastyearerrorcode, @vlastyearerrormessage);
CALL FETCHLICENSEINFOERRORS('LASTYEAR', @vlastyearerrorcode, @vlastyearerrormessage, @vlastyearError);
CALL FETCHDEVICESDATA(@vyeartoddatestartdate, @vyeartoddateenddate, @v_total_yeartodate, @vyeartodateerrorcode, @vyeartodateerrormessage);
CALL FETCHLICENSEINFOERRORS('YEARTODATE', @vyeartodateerrorcode, @vyeartodateerrormessage, @vyeartodateError);
CALL FETCHDEVICESDATA(@vlastquarterstatdate, @vlastquarterenddate, @v_total_lastquarter, @vlastquarterrorcode, @vlastquarterrormessage);
CALL FETCHLICENSEINFOERRORS('LASTQUARTER', @vlastquarterrorcode, @vlastquarterrormessage, @vlastquarterError);
CALL FETCHDEVICESDATA(@vquartertodatestartdate, @vquartertodateenddate, @v_total_quartertodate, @vquartertodateerrorcode, @vquartertodateerrormessage);
CALL FETCHLICENSEINFOERRORS('QUARTERTODATE', @vquartertodateerrorcode, @vquartertodateerrormessage, @vquartertodateError);
CALL FETCHDEVICESDATA(@vlastmonthstartdate, @vlastmonthenddate, @v_total_lastmonth, @vlastmontherrorcode, @vlastmontherrormessage);
CALL FETCHLICENSEINFOERRORS('LASTMONTH', @vlastmontherrorcode, @vlastmontherrormessage, @vlastmonthError);

SET @VERRORS = concat(@vlastyearError ,"", @vyeartodateError ,"", @vlastquarterError ,"", @vquartertodateError ,"", @vlastmonthError);

IF(@VERRORS IS NULL) THEN
    SET @VJSONERROR = "{}";
ELSE
    SET @VJSONERROR = concat("{", TRIM(TRAILING  ',' FROM @VERRORS) ,"}");
END IF;

insert into licenseinfo (licensetype, insertdate, effectivedate, lastyear, yeartodate, lastquarter, quartertodate, lastmonth, error) values ('DEVICES', now(), @vlastmonthenddate, @v_total_lastyear, @v_total_yeartodate, @v_total_lastquarter, @v_total_quartertodate, @v_total_lastmonth, @VJSONERROR); 


CALL FETCHLICENSEDUSERSDATA(@vlastyearstartdate, @vlastyearenddate, @v_total_lastyear, @vlastyearerrorcode, @vlastyearerrormessage);
CALL FETCHLICENSEINFOERRORS('LASTYEAR', @vlastyearerrorcode, @vlastyearerrormessage, @vlastyearError);
CALL FETCHLICENSEDUSERSDATA(@vyeartoddatestartdate, @vyeartoddateenddate, @v_total_yeartodate, @vyeartodateerrorcode, @vyeartodateerrormessage);
CALL FETCHLICENSEINFOERRORS('YEARTODATE', @vyeartodateerrorcode, @vyeartodateerrormessage, @vyeartodateError);
CALL FETCHLICENSEDUSERSDATA(@vlastquarterstatdate, @vlastquarterenddate, @v_total_lastquarter, @vlastquarterrorcode, @vlastquarterrormessage);
CALL FETCHLICENSEINFOERRORS('LASTQUARTER', @vlastquarterrorcode, @vlastquarterrormessage, @vlastquarterError);
CALL FETCHLICENSEDUSERSDATA(@vquartertodatestartdate, @vquartertodateenddate, @v_total_quartertodate, @vquartertodateerrorcode, @vquartertodateerrormessage);
CALL FETCHLICENSEINFOERRORS('QUARTERTODATE', @vquartertodateerrorcode, @vquartertodateerrormessage, @vquartertodateError);
CALL FETCHLICENSEDUSERSDATA(@vlastmonthstartdate, @vlastmonthenddate, @v_total_lastmonth, @vlastmontherrorcode, @vlastmontherrormessage);
CALL FETCHLICENSEINFOERRORS('LASTMONTH', @vlastmontherrorcode, @vlastmontherrormessage, @vlastmonthError);

SET @VERRORS = concat(@vlastyearError ,"", @vyeartodateError ,"", @vlastquarterError ,"", @vquartertodateError ,"", @vlastmonthError);

IF(@VERRORS IS NULL) THEN
    SET @VJSONERROR = "{}";
ELSE
    SET @VJSONERROR = concat("{", TRIM(TRAILING  ',' FROM @VERRORS) ,"}");
END IF;

insert into licenseinfo (licensetype, insertdate, effectivedate, lastyear, yeartodate, lastquarter, quartertodate, lastmonth, error) values ('LICENSEDUSERS', now(), @vlastmonthenddate, @v_total_lastyear, @v_total_yeartodate, @v_total_lastquarter, @v_total_quartertodate, @v_total_lastmonth, @VJSONERROR);

IF vcode != '00000' THEN
	SET @OUTER_ERROR_CODE = vcode;
	SET @OUTER_ERROR_MESSAGE = vmsg;
	CALL FETCHLICENSEINFOERRORS('OUTERBLOCK', @OUTER_ERROR_CODE, @OUTER_ERROR_MESSAGE, @vError);
    insert into licenseinfo (licensetype, insertdate, effectivedate, error) values ('ERROR', now(), @vlastmonthenddate, @vError);
END IF;

END ++
DELIMITER ;