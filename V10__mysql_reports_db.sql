
ALTER TABLE application_error_detail ADD COLUMN diskmemfree DOUBLE PRECISION;
ALTER TABLE application_error_detail ADD COLUMN diskmemtot  DOUBLE PRECISION;
ALTER TABLE application_error_detail ADD COLUMN sdmemfree   DOUBLE PRECISION;
ALTER TABLE application_error_detail ADD COLUMN sdmemtot    DOUBLE PRECISION;
ALTER TABLE application_error_detail ADD COLUMN chargelevel	DOUBLE PRECISION; 
ALTER TABLE application_error_detail ADD COLUMN ramused 	DOUBLE PRECISION ;
ALTER TABLE application_error_detail ADD COLUMN cpu    		DOUBLE PRECISION ;
ALTER TABLE application_error_detail ADD COLUMN networktype  varchar(50) ;


CREATE TABLE application_form_detail
(
   id           BIGINT(20)    NOT NULL AUTO_INCREMENT,
   bid          VARCHAR(255)   NOT NULL,
   mid          VARCHAR(255),
   kaid         VARCHAR(255)   NOT NULL,
   eid          VARCHAR(255)   NOT NULL,
   aid          VARCHAR(255)   NOT NULL,
   ts           DATETIME       NOT NULL,
   evttype      VARCHAR(100)   NOT NULL,
   aname        VARCHAR(255)   NOT NULL,
   atype        VARCHAR(255)   NOT NULL,
   plat         VARCHAR(255)   NOT NULL,
   chnl         VARCHAR(255)   NOT NULL,
   formid       VARCHAR(255),
   widgetid     VARCHAR(255),
   sid          VARCHAR(255)   NOT NULL,
   evtsubtype   VARCHAR(255),
   flowtag      VARCHAR(255),
   request_key  BIGINT,
   session_key  BIGINT         NOT NULL,
   did          VARCHAR(255),
   dm           VARCHAR(255),
   os           VARCHAR(255),
   ua           VARCHAR(255),
   aver         VARCHAR(255),
   kuid         VARCHAR(255),
   sdktype      VARCHAR(50),
   sdkversion   VARCHAR(50),
   mfbaseid     VARCHAR(255),
   mfaid        VARCHAR(255),
   mfaname      VARCHAR(255),
   formdur	INTEGER,
   primary key pk_application_form_detail(id)
)
ENGINE=InnoDB;

CREATE INDEX fk_application_form_detail_rkey
   ON application_form_detail (request_key ASC);

CREATE INDEX fk_application_form_detail_skey
   ON application_form_detail (session_key ASC);



RENAME TABLE configurations TO metrics_configuration;

RENAME TABLE application_log TO metrics_application_log;

DROP TABLE build_version;