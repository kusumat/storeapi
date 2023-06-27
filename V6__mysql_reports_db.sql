
DELIMITER |
CREATE PROCEDURE insertdimdate()
BEGIN

  DECLARE EXIT HANDLER FOR 1062 SELECT 'Duplicate keys error encountered';
  DECLARE EXIT HANDLER FOR SQLEXCEPTION SELECT 'SQLException encountered';
  DECLARE EXIT HANDLER FOR SQLSTATE '23000' SELECT 'SQLSTATE 23000';

INSERT INTO dim_date(
  date_key,
  dt,
  year_number,
  quarter_number,
  quarter_name,
  month_number,
  month_name,
  month_short_name,
  week_of_year,
  week_of_month,
  month_full_weeks,
  full_week_flag,
  day_of_week_number,
  day_of_week_short_name,
  day_of_week_name,
  day_number
)
select 
 DATE_FORMAT(dt, '%Y%m%d') as date_key,
  dt,
date_format(dt,'%Y') year_number,
quarter(dt) as quarter_number,
concat('Quarter ', quarter(dt)) as quarter_name,
month(dt) as month_mumber,
monthname(dt) as month_name,
date_format(dt,'%b') as month_short_name,
weekofyear(dt) as year_number,
FLOOR((DayOfMonth(dt)-1)/7)+1 as week_month,
w.fullweeknum as month_full_weeks,
case when month(date_add(dt,interval(1-dayofweek(dt)) DAY)) = month(dt) and  MONTH(date_add(date_add(dt,interval(1-dayofweek(dt)) DAY), interval 6 day)) = month(dt)  
then 1 else 0 end as full_week_flag,
DAYOFWEEK(dt) as day_of_week_number,
substr(dayname(dt),1,3) as day_of_week_short_name, 
dayname(dt) as day_of_week_name,
day(dt) as day_number 
   from tmp_calendar c,
(select date_format(dt,'%Y-%m-01') as month, count(distinct(
case when month(date_add(dt,interval(1-dayofweek(dt)) DAY)) = month(dt) and  MONTH(date_add(date_add(dt,interval(1-dayofweek(dt)) DAY), interval 6 day)) = month(dt)  
then
week(dt,2)
                                else null end)) as fullweeknum
from tmp_calendar
group by date_format(dt,'%Y-%m-01')) w
where date_format(c.dt,'%Y-%m-01') = w.month
order by dt;

COMMIT;
END;

|



CALL insertdimdate();