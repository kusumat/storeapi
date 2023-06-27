-- Add indices
CREATE INDEX idx_middleware_sub_requests_request_key
   ON middleware_sub_requests (request_key ASC);

CREATE INDEX idx_api_sub_requests_request_key
   ON api_sub_requests (request_key ASC);
   
-- Add new columns to custom_metrics_master table

ALTER TABLE custom_metrics_master
ADD COLUMN mfbaseid VARCHAR(255),
ADD COLUMN mfaname VARCHAR(255),
ADD COLUMN mfaid VARCHAR(255),
ADD COLUMN aname VARCHAR(255),
ADD COLUMN ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
ADD COLUMN session_key BIGINT,
ADD COLUMN chnl VARCHAR(255),
ADD COLUMN atype VARCHAR(255),
ADD COLUMN plat VARCHAR(255),
ADD COLUMN rip VARCHAR(255),
ADD COLUMN dm VARCHAR(255),
ADD COLUMN os VARCHAR(255),
ADD COLUMN ua VARCHAR(255),
ADD COLUMN aver VARCHAR(255),
ADD COLUMN kuid VARCHAR(255),
ADD COLUMN did VARCHAR(255),
ADD COLUMN country VARCHAR(2),
ADD COLUMN region VARCHAR(10),
ADD COLUMN city VARCHAR(255),
ADD COLUMN zip VARCHAR(32),
ADD COLUMN lat DECIMAL(8,5),
ADD COLUMN lon DECIMAL(8,5),
ADD COLUMN dmacd INT,
ADD COLUMN areacd VARCHAR(3),
ADD COLUMN sdktype VARCHAR(50),
ADD COLUMN sdkversion VARCHAR(50),
ADD COLUMN rid VARCHAR(255),
ADD COLUMN sid VARCHAR(255),
ADD COLUMN svcid VARCHAR(255);


-- Procedure to migrate data to the custom_metrics_master table

DELIMITER ++
DROP PROCEDURE IF EXISTS MIGRATEDATATOCMMTABLE++

CREATE PROCEDURE MIGRATEDATATOCMMTABLE()
BEGIN
 /* create custom_metrics_master_target table joining custom_metrics_master and middleware_requests tables */
 DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING BEGIN END;
 create table custom_metrics_master_target as select cmm.request_key, cmm.bid, cmm.mid, cmm.kaid, cmm.eid, cmm.aid, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, s16, s17, s18, s19, s20, s21, s22, s23, s24, s25, s26, s27, s28, s29, s30, s31, s32, s33, s34, s35, s36, s37, s38, s39, s40, s41, s42, s43, s44, s45, s46, s47, s48, s49, s50, l1, l2, l3, l4, l5, l6, l7, l8, l9, l10, l11, l12, l13, l14, l15, l16, l17, l18, l19, l20, l21, l22, l23, l24, l25, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17, d18, d19, d20, d21, d22, d23, d24, d25, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17, b18, b19, b20, b21, b22, b23, b24, b25, t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12, t13, t14, t15, t16, t17, t18, t19, t20, t21, t22, t23, t24, t25, dt1, dt2, dt3, dt4, dt5, dt6, dt7, dt8, dt9, dt10, dt11, dt12, dt13, dt14, dt15, dt16, dt17, dt18, dt19, dt20, dt21, dt22, dt23, dt24, dt25, mr.did, mr.aname, mr.rid, mr.sid, mr.chnl, mr.atype, mr.plat, mr.rip, mr.ts, mr.dm, mr.os, mr.ua, mr.svcid, mr.aver, mr.session_key, mr.kuid, mr.country, mr.region, mr.city, mr.zip, mr.lat, mr.lon, mr.dmacd, mr.areacd, mr.sdktype, mr.sdkversion, mr.mfbaseid, mr.mfaid, mr.mfaname FROM custom_metrics_master cmm LEFT JOIN middleware_requests mr ON cmm.request_key = mr.request_key;
 
 /* rename custom_metrics_master_target to custom_metrics_master */
 RENAME TABLE 
	custom_metrics_master_target TO custom_metrics_master_tmp,
	custom_metrics_master TO custom_metrics_master_target,
	custom_metrics_master_tmp TO custom_metrics_master;
	
 /* add key contraints to new custom_metrics_master table */
 ALTER TABLE custom_metrics_master ADD id BIGINT PRIMARY KEY AUTO_INCREMENT FIRST;
 CREATE INDEX idx_custom_metrics_master_request_key ON custom_metrics_master (request_key ASC);
 
END++

DELIMITER ;

COMMIT;