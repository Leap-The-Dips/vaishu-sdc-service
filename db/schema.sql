DROP DATABASE IF EXISTS gallery;
CREATE DATABASE gallery;

GRANT INSERT, CREATE, ALTER, UPDATE on gallery.*
TO 'fec_gallery'@'%' IDENTIFIED BY '123'
WITH GRANT OPTION;
-- ALTER USER 'fec_gallery'@'%' IDENTIFIED WITH mysql_native_password BY '123';
-- USE gallery;