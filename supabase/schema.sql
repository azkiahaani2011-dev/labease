-- ─────────────────────────────────────────────────────────────
-- LabEase — Supabase / PostgreSQL Schema
-- Run this entire file in your Supabase SQL Editor once.
-- ─────────────────────────────────────────────────────────────

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ─── USERS (extends Supabase Auth) ───────────────────────────
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  name        text,
  phone       text,
  email       text,
  address     text,
  created_at  timestamptz default now()
);
alter table public.profiles enable row level security;
create policy "Users can view own profile"   on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);

-- ─── LABS ────────────────────────────────────────────────────
create table if not exists public.labs (
  id              text primary key,
  name            text not null,
  city            text,
  area            text,
  address         text,
  rating          numeric(3,1) default 4.5,
  reviews         int default 0,
  color           text default '#1158A6',
  nabl            boolean default false,
  home_collection boolean default false,
  timing          text default '6AM – 10PM',
  image           text,
  created_at      timestamptz default now()
);
alter table public.labs enable row level security;
create policy "Anyone can read labs" on public.labs for select using (true);
create policy "Admins can manage labs" on public.labs for all using (auth.role() = 'service_role');

-- ─── TESTS ────────────────────────────────────────────────────
create table if not exists public.tests (
  id      text primary key,
  lab_id  text references public.labs(id) on delete cascade,
  name    text not null,
  cat     text,
  price   int not null,
  mrp     int not null,
  time    text default '12 - 48 hours',
  created_at timestamptz default now()
);
alter table public.tests enable row level security;
create policy "Anyone can read tests" on public.tests for select using (true);
create policy "Admins can manage tests" on public.tests for all using (auth.role() = 'service_role');

-- ─── CART ────────────────────────────────────────────────────
create table if not exists public.cart_items (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references auth.users(id) on delete cascade,
  lab_id     text references public.labs(id),
  test_id    text references public.tests(id),
  price      int,
  created_at timestamptz default now(),
  unique(user_id, test_id)
);
alter table public.cart_items enable row level security;
create policy "Users manage own cart" on public.cart_items for all using (auth.uid() = user_id);

-- ─── BOOKINGS ────────────────────────────────────────────────
create table if not exists public.bookings (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references auth.users(id) on delete set null,
  lab_id        text references public.labs(id),
  lab_name      text,
  patient_name  text not null,
  patient_phone text not null,
  patient_age   text,
  patient_gender text,
  address       text,
  slot_date     date,
  slot_time     text,
  collection    text default 'lab',   -- 'lab' | 'home'
  status        text default 'confirmed', -- confirmed | processing | completed | cancelled
  total         int not null,
  items         jsonb,                -- snapshot of tests at booking time
  created_at    timestamptz default now()
);
alter table public.bookings enable row level security;
create policy "Users view own bookings"   on public.bookings for select using (auth.uid() = user_id);
create policy "Users create bookings"     on public.bookings for insert with check (auth.uid() = user_id);
create policy "Admins manage all bookings" on public.bookings for all using (auth.role() = 'service_role');

-- ─── PRICE OVERRIDES (admin feature) ─────────────────────────
create table if not exists public.price_overrides (
  test_id   text primary key references public.tests(id) on delete cascade,
  price     int not null,
  updated_at timestamptz default now()
);
alter table public.price_overrides enable row level security;
create policy "Admins manage price overrides" on public.price_overrides for all using (auth.role() = 'service_role');
create policy "Anyone can read price overrides" on public.price_overrides for select using (true);

-- ─── HELPER: trigger to create profile on signup ─────────────
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email, name)
  values (new.id, new.email, new.raw_user_meta_data->>'name');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
