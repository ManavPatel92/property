-- Run this once in your Supabase project's SQL editor.
create extension if not exists pgcrypto;

create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'draft' check (status in ('draft','available','under_offer','let_agreed','sold','off_market')),
  payload text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_sessions (
  token_hash text primary key,
  expires_at timestamptz not null
);

create table if not exists public.login_attempts (
  id bigint generated always as identity primary key,
  login_key text not null,
  created_at timestamptz not null default now()
);
create index if not exists login_attempts_lookup on public.login_attempts (login_key, created_at desc);

alter table public.properties enable row level security;
alter table public.admin_sessions enable row level security;
alter table public.login_attempts enable row level security;

revoke all on public.properties, public.admin_sessions, public.login_attempts from anon, authenticated, public;
grant select, insert, update, delete on public.properties, public.admin_sessions, public.login_attempts to service_role;
grant usage, select on sequence public.login_attempts_id_seq to service_role;
-- No RLS policies: browser keys cannot read or change the tables.
-- Only the server-side secret key accesses data after the app checks authentication.
