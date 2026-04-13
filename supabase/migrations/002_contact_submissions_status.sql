-- Adds inbox lifecycle fields for the admin dashboard.
-- Safe to run multiple times.

alter table public.contact_submissions
  add column if not exists completed_at timestamptz null,
  add column if not exists deleted_at timestamptz null;

create index if not exists contact_submissions_deleted_at_idx
  on public.contact_submissions (deleted_at);

create index if not exists contact_submissions_completed_at_idx
  on public.contact_submissions (completed_at);

