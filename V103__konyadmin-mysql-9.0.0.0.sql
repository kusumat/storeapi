UPDATE server_configuration SET prop_value='false', updated_date=NOW() WHERE prop_name='KONY_SERVER_RESPONSE_CONTENT_TYPE_PLAIN_TEXT';
COMMIT;