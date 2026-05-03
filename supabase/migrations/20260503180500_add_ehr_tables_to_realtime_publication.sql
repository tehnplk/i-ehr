do $$
declare
  table_record record;
begin
  if not exists (
    select 1
    from pg_publication
    where pubname = 'supabase_realtime'
  ) then
    create publication supabase_realtime;
  end if;

  for table_record in
    select table_schema, table_name
    from information_schema.tables
    where table_schema = 'public'
      and table_type = 'BASE TABLE'
      and table_name like 'tmp_exp_3093_%'
    order by table_name
  loop
    if not exists (
      select 1
      from pg_publication_tables
      where pubname = 'supabase_realtime'
        and schemaname = table_record.table_schema
        and tablename = table_record.table_name
    ) then
      execute format(
        'alter publication supabase_realtime add table %I.%I',
        table_record.table_schema,
        table_record.table_name
      );
    end if;
  end loop;
end
$$;
