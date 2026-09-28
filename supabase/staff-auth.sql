begin;

create table if not exists public.staff_profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null,
  role text not null default 'staff' check (role in ('staff', 'admin')),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.leads
  add column if not exists assigned_to uuid references public.staff_profiles (user_id) on delete set null,
  add column if not exists status text not null default 'New';

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.leads'::regclass
      and conname = 'leads_status_check'
  ) then
    alter table public.leads
      add constraint leads_status_check check (status in ('New', 'Contacted', 'Done'));
  end if;
end;
$$;

create index if not exists leads_assigned_to_idx on public.leads (assigned_to);

alter table public.staff_profiles enable row level security;
alter table public.leads enable row level security;

do $$
declare
  existing_policy record;
begin
  for existing_policy in
    select schemaname, tablename, policyname
    from pg_policies
    where schemaname = 'public'
      and tablename in ('staff_profiles', 'leads')
  loop
    execute format(
      'drop policy %I on %I.%I',
      existing_policy.policyname,
      existing_policy.schemaname,
      existing_policy.tablename
    );
  end loop;
end;
$$;

create policy staff_profiles_read_own
  on public.staff_profiles
  for select
  to authenticated
  using (user_id = (select auth.uid()));

create policy staff_read_assigned_leads
  on public.leads
  for select
  to authenticated
  using (
    assigned_to = (select auth.uid())
    and exists (
      select 1
      from public.staff_profiles
      where staff_profiles.user_id = (select auth.uid())
        and staff_profiles.is_active
    )
  );

create policy staff_update_assigned_lead_status
  on public.leads
  for update
  to authenticated
  using (
    assigned_to = (select auth.uid())
    and exists (
      select 1
      from public.staff_profiles
      where staff_profiles.user_id = (select auth.uid())
        and staff_profiles.is_active
    )
  )
  with check (
    assigned_to = (select auth.uid())
    and exists (
      select 1
      from public.staff_profiles
      where staff_profiles.user_id = (select auth.uid())
        and staff_profiles.is_active
    )
  );

revoke all on public.staff_profiles from anon, authenticated;
grant select on public.staff_profiles to authenticated;

revoke all on public.leads from anon, authenticated;
grant select on public.leads to authenticated;
grant update (status) on public.leads to authenticated;

commit;