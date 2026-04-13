-- Run this in the Supabase SQL editor (or via CLI) before using the contact form in production.

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text not null default '',
  company text not null default '',
  topic text not null default '',
  message text not null
);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

alter table public.contact_submissions enable row level security;

-- No policies: only the service role (server) accesses this table.

comment on table public.contact_submissions is 'Homepage contact form leads; written by API route with service role.';
