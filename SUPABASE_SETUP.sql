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

-- Allow anyone (logged in or not) to insert a booking
create policy "Anyone can insert bookings"
  on bookings for insert
  with check (true);

-- Logged-in users can read their own bookings
create policy "Users read own bookings"
  on bookings for select
  using (auth.uid() = user_id OR user_id is null);


-- 3. GRANT ANON ROLE INSERT (belt-and-suspenders)
-- -------------------------------------------------
grant insert on bookings to anon;
grant insert on bookings to authenticated;
grant select on bookings to authenticated;
grant all    on profiles  to authenticated;
