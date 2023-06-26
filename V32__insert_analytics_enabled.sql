INSERT INTO `accounts_configurations` (name, value)
    SELECT 'analyticsEnabled', 'false' FROM dual
        WHERE NOT EXISTS (
            SELECT * FROM `accounts_configurations` WHERE name = 'analyticsEnabled'
        );

INSERT INTO `accounts_configurations` (name, value)
    SELECT 'analyticsContainerId', 'GTM-TZ8PWH' FROM dual
        WHERE NOT EXISTS (
            SELECT * FROM `accounts_configurations` WHERE name = 'analyticsContainerId'
        );
