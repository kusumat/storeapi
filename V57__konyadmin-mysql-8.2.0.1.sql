UPDATE `server_configuration` SET prop_value='${SERVER_TOPIC_CONNECTION_FACTORY}' WHERE prop_name='metrics.TopicConnectionFactoryName';
COMMIT;