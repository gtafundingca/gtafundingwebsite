-- Stores "Apply Now" form submissions.

create table if not exists public.apply_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text not null default '',
  company text not null default '',
  monthly_revenue text not null default '',
  amount_needed text not null default '',
  funding_use text not null
);

create index if not exists apply_submissions_created_at_idx
  on public.apply_submissions (created_at desc);

alter table public.apply_submissions enable row level security;

comment on table public.apply_submissions is 'Homepage apply form submissions; written by API route with service role.';

