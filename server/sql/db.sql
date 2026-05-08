CREATE USER event_sync_db_manager WITH PASSWORD '123456';
CREATE DATABASE event_sync_db;
ALTER DATABASE event_sync_db OWNER TO event_sync_db_manager;