DROP TABLE IF EXISTS tmp_calendar;
CREATE TABLE IF NOT EXISTS tmp_calendar(dt DATE NOT NULL PRIMARY KEY);

DELIMITER |

CREATE PROCEDURE filldates(dateStart DATE, dateEnd DATE)
BEGIN
  DECLARE EXIT HANDLER FOR 1062 SELECT 'Duplicate keys error encountered';
  DECLARE EXIT HANDLER FOR SQLEXCEPTION SELECT 'SQLException encountered';
  DECLARE EXIT HANDLER FOR SQLSTATE '23000' SELECT 'SQLSTATE 23000';
 
 WHILE dateStart <= dateEnd DO
    INSERT INTO tmp_calendar (dt) VALUES (dateStart);
    SET dateStart = date_add(dateStart, INTERVAL 1 DAY);
  END WHILE;

  COMMIT;
  -- return record count for the calendar
 SELECT COUNT(*) FROM tmp_calendar;
  
END;
|

DELIMITER ;

CALL filldates('2010-01-01','2040-12-31');
