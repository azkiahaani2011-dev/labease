-- Run this in Supabase SQL Editor to enable cross-device admin sync
-- Dashboard → SQL Editor → New query → paste → Run

create table if not exists admin_settings (
  key text primary key,
  value jsonb not null default '{}',
  updated_at timestamptz default now()
);

-- Allow anon role to read and write (admin panel uses anon key)
alter table admin_settings enable row level security;
create policy "allow anon read" on admin_settings for select using (true);
create policy "allow anon write" on admin_settings for all using (true) with check (true);

-- Enable Realtime for instant push to all connected clients
alter publication supabase_realtime add table admin_settings;
