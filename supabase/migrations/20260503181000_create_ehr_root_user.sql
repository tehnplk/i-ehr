-- Run with:
-- psql -v APP_DB_USER=<user> -v APP_DB_PASSWORD=<password> -f 20260503181000_create_ehr_root_user.sql

select format(
  'create role %I login password %L',
  :'APP_DB_USER',
  :'APP_DB_PASSWORD'
)
where not exists (
  select 1
  from pg_roles
  where rolname = :'APP_DB_USER'
)
\gexec

select format(
  'alter role %I with login password %L',
  :'APP_DB_USER',
  :'APP_DB_PASSWORD'
)
\gexec

grant connect, temporary on database ehr to :"APP_DB_USER";
grant usage, create on schema public to :"APP_DB_USER";
grant all privileges on all tables in schema public to :"APP_DB_USER";
grant all privileges on all sequences in schema public to :"APP_DB_USER";
grant execute on all functions in schema public to :"APP_DB_USER";

alter default privileges in schema public grant all privileges on tables to :"APP_DB_USER";
alter default privileges in schema public grant all privileges on sequences to :"APP_DB_USER";
alter default privileges in schema public grant execute on functions to :"APP_DB_USER";
