create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare
  item record;
begin
  for item in
    select table_name
    from information_schema.tables
    where table_schema = 'public'
      and table_type = 'BASE TABLE'
    order by table_name
  loop
    if not exists (
      select 1
      from information_schema.columns
      where table_schema = 'public'
        and table_name = item.table_name
        and column_name = 'created_at'
    ) then
      execute format(
        'alter table public.%I add column created_at timestamptz not null default now()',
        item.table_name
      );
    end if;

    if not exists (
      select 1
      from information_schema.columns
      where table_schema = 'public'
        and table_name = item.table_name
        and column_name = 'updated_at'
    ) then
      execute format(
        'alter table public.%I add column updated_at timestamptz not null default now()',
        item.table_name
      );
    end if;

    if not exists (
      select 1
      from information_schema.columns
      where table_schema = 'public'
        and table_name = item.table_name
        and column_name = 'created_by'
    ) then
      execute format(
        'alter table public.%I add column created_by text',
        item.table_name
      );
    end if;

    if not exists (
      select 1
      from information_schema.columns
      where table_schema = 'public'
        and table_name = item.table_name
        and column_name = 'updated_by'
    ) then
      execute format(
        'alter table public.%I add column updated_by text',
        item.table_name
      );
    end if;

    execute format(
      'drop trigger if exists set_%I_updated_at on public.%I',
      item.table_name,
      item.table_name
    );

    execute format(
      'create trigger set_%I_updated_at before update on public.%I for each row execute function public.set_updated_at()',
      item.table_name,
      item.table_name
    );
  end loop;
end
$$;
