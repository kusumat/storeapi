-- rename tables will automatically handles structure as well as data residing in it.
-- completely safe and fastest way
-- corresponding indexes will also be modified pointing to renamed table.
-- rename tables: You must also have the ALTER and DROP privileges on the original table, and the CREATE and INSERT privileges on the new table. 
-- Database automatically transfers integrity constraints, indexes, and grants on the old object to the new object.

rename table users to server_users;
rename table user_roles to server_user_roles;
rename table roles to server_roles;
rename table mobilefabric_configuration to server_configuration;
rename table jar_info to server_jar_info;
rename table mobilefabric_environment to server_environment;