-- ============================================================
-- LabEase Supabase Setup — run this in the SQL Editor
-- ============================================================

-- 1. PROFILES TABLE
-- -----------------
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  email text,
  phone text,
  created_at timestamptz default now()
);

alter table profiles enable row level security;

-- Drop old policies if any, then recreate
drop policy if exists "Users read own profile" on profiles;
drop policy if exists "Users update own profile" on profiles;
drop policy if exists "Users insert own profile" on profiles;

create policy "Users read own profile"   on profiles for select using (auth.uid() = id);
create policy "Users insert own profile" on profiles for insert with check (auth.uid() = id);
create policy "Users update own profile" on profiles for update using (auth.uid() = id);


-- 2. BOOKINGS TABLE
-- ------------------
create table if not exists bookings (
  id           uuid primary key default gen_random_uuid(),
  booking_ref  text,
  user_id      uuid references auth.users(id) on delete set null,
  lab_name     text,
  patient_name text,
  patient_phone text,
  patient_age  text,
  patient_gender text,
  address      text,
  slot_date    date,
  slot_time    text,
  collection   text,
  status       text default 'confirmed',
  total        int,
  items        jsonb,
  created_at   timestamptz default now()
);

alter table bookings enable row level security;

-- Drop ALL existing booking policies and recreate permissively
drop policy if exists "Users create bookings"      on bookings;
drop policy if exists "Allow all inserts"          on bookings;
drop policy if exists "Anyone can insert bookings" on bookings;
drop policy if exists "Users read own bookings"    on bookings;
drop policy if exists "Admin read all bookings"    on bookings;
drop policy if exists "Anyone can read bookings"   on bookings;

-- Allow anyone (logged in or not) to insert a booking
create policy "Anyone can insert bookings"
  on bookings for insert
  with check (true);

-- Anyone can read bookings (admin panel needs to see all; users only see their own in the app)
create policy "Anyone can read bookings"
  on bookings for select
  using (true);


-- 3. GRANT ANON ROLE INSERT (belt-and-suspenders)
-- -------------------------------------------------
grant insert on bookings to anon;
grant select on bookings to anon;
grant insert on bookings to authenticated;
grant select on bookings to authenticated;
grant all    on profiles  to authenticated;


-- 4. LAB SETTINGS TABLE (admin-controlled timing per lab)
-- --------------------------------------------------------
create table if not exists lab_settings (
  lab_id        text primary key,
  timing        text,
  sunday_timing text,
  updated_at    timestamptz default now()
);

alter table lab_settings enable row level security;

drop policy if exists "Public read lab_settings"   on lab_settings;
drop policy if exists "Public insert lab_settings" on lab_settings;
drop policy if exists "Public update lab_settings" on lab_settings;

create policy "Public read lab_settings"   on lab_settings for select using (true);
create policy "Public insert lab_settings" on lab_settings for insert with check (true);
create policy "Public update lab_settings" on lab_settings for update using (true);

grant all on lab_settings to anon;
grant all on lab_settings to authenticated;

-- 5. EXTRA LABS TABLE (labs added via admin panel, visible on all devices)
-- -----------------------------------------------------------------------
create table if not exists extra_labs (
  id            serial primary key,
  name          text not null,
  city          text,
  address       text,
  phone         text,
  rating        numeric default 4.5,
  reviews       int default 0,
  timing        text,
  sunday_timing text,
  report_time   text default 'Same Day',
  home_collection boolean default false,
  nabl          boolean default false,
  color         text default '#1158A6',
  logo_base64   text,
  tests         jsonb default '[]',
  active        boolean default true,
  distance      text default '—',
  founded       text,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

alter table extra_labs enable row level security;

drop policy if exists "Public read extra_labs"   on extra_labs;
drop policy if exists "Public insert extra_labs" on extra_labs;
drop policy if exists "Public update extra_labs" on extra_labs;
drop policy if exists "Public delete extra_labs" on extra_labs;

create policy "Public read extra_labs"   on extra_labs for select using (true);
create policy "Public insert extra_labs" on extra_labs for insert with check (true);
create policy "Public update extra_labs" on extra_labs for update using (true);
create policy "Public delete extra_labs" on extra_labs for delete using (true);

grant all on extra_labs to anon;
grant all on extra_labs to authenticated;
grant usage, select on sequence extra_labs_id_seq to anon;
grant usage, select on sequence extra_labs_id_seq to authenticated;
