-- Remove trailing slashes from URL
UPDATE `features` set url = TRIM(TRAILING  '/' FROM url );

-- Update SERVICE_URL with default context paths
UPDATE `features` SET `service_url`=concat(url , '/services') WHERE `type`='server';
UPDATE `features` SET `service_url`=concat(url , '/syncservice') WHERE `type`='sync';
UPDATE `features` SET `service_url`=concat(url , '/kpns') WHERE `type`='kpns';

-- Update URL with default context path
UPDATE `features` set url = concat(url, '/admin') WHERE `type`='server';
UPDATE `features` set url = concat(url, '/syncconsole') WHERE `type`='sync';
UPDATE `features` set url = concat(url, '/kpns') WHERE `type`='kpns';
UPDATE `features` set url = concat(url, '/emm') WHERE `type`='emm';
