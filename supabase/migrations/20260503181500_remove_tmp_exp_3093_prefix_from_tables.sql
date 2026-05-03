do $$
declare
  item record;
  new_table_name text;
  new_index_name text;
begin
  for item in
    select table_name
    from information_schema.tables
    where table_schema = 'public'
      and table_type = 'BASE TABLE'
      and table_name like 'tmp_exp_3093_%'
    order by table_name
  loop
    new_table_name := regexp_replace(item.table_name, '^tmp_exp_3093_', '');

    if exists (
      select 1
      from information_schema.tables
      where table_schema = 'public'
        and table_name = new_table_name
    ) then
      raise exception 'Cannot rename %.% to %.% because target table already exists',
        'public', item.table_name, 'public', new_table_name;
    end if;

    execute format(
      'alter table public.%I rename to %I',
      item.table_name,
      new_table_name
    );
  end loop;

  for item in
    select indexname
    from pg_indexes
    where schemaname = 'public'
      and indexname like 'tmp_exp_3093_%'
    order by indexname
  loop
    new_index_name := regexp_replace(item.indexname, '^tmp_exp_3093_', '');

    if exists (
      select 1
      from pg_class c
      join pg_namespace n on n.oid = c.relnamespace
      where n.nspname = 'public'
        and c.relkind = 'i'
        and c.relname = new_index_name
    ) then
      raise exception 'Cannot rename index %.% to %.% because target index already exists',
        'public', item.indexname, 'public', new_index_name;
    end if;

    execute format(
      'alter index public.%I rename to %I',
      item.indexname,
      new_index_name
    );
  end loop;
end
$$;
