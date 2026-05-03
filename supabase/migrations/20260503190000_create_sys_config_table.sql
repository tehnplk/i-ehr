create table if not exists public.sys_config (
  id bigint generated always as identity primary key,
  name text not null unique,
  val text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by text,
  updated_by text
);

drop trigger if exists set_updated_at on public.sys_config;
create trigger set_updated_at
before update on public.sys_config
for each row execute function public.set_updated_at();

alter publication supabase_realtime add table public.sys_config;
