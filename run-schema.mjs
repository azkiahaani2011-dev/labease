import pkg from 'pg';
const { Client } = pkg;

const SERVICE_ROLE = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjcnhyeGNvbW9pZWphc2xtY2Z0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjQ5ODEwOSwiZXhwIjoyMDk4MDc0MTA5fQ.puL7H27rjCYDT8lM89C4_kwv0GEmmtthNGk27KFGBjE';

const client = new Client({
  host: 'db.lcrxrxcomoiejaslmcft.supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: SERVICE_ROLE,
  ssl: { rejectUnauthorized: false },
});

const SQL = `
create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  name        text,
  phone       text,
  email       text,
  address     text,
  created_at  timestamptz default now()
);
alter table public.profiles enable row level security;

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

create table if not exists public.tests (
  id         text primary key,
  lab_id     text references public.labs(id) on delete cascade,
  name       text not null,
  cat        text,
  price      int not null,
  mrp        int not null,
  time       text default '12 - 48 hours',
  created_at timestamptz default now()
);
alter table public.tests enable row level security;

create table if not exists public.cart_items (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references auth.users(id) on delete cascade,
  lab_id     text,
  test_id    text,
  price      int,
  created_at timestamptz default now(),
  unique(user_id, test_id)
);
alter table public.cart_items enable row level security;

create table if not exists public.bookings (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid references auth.users(id) on delete set null,
  lab_id         text,
  lab_name       text,
  patient_name   text not null,
  patient_phone  text not null,
  patient_age    text,
  patient_gender text,
  address        text,
  slot_date      date,
  slot_time      text,
  collection     text default 'lab',
  status         text default 'confirmed',
  total          int not null,
  items          jsonb,
  created_at     timestamptz default now()
);
alter table public.bookings enable row level security;

create table if not exists public.price_overrides (
  test_id    text primary key,
  price      int not null,
  updated_at timestamptz default now()
);
alter table public.price_overrides enable row level security;
`;

// Policies (run separately to avoid conflicts)
const POLICIES = [
  `do $$ begin
    if not exists (select 1 from pg_policies where tablename='profiles' and policyname='Users can view own profile') then
      create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
    end if;
  end $$;`,
  `do $$ begin
    if not exists (select 1 from pg_policies where tablename='profiles' and policyname='Users can update own profile') then
      create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
    end if;
  end $$;`,
  `do $$ begin
    if not exists (select 1 from pg_policies where tablename='profiles' and policyname='Users can insert own profile') then
      create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);
    end if;
  end $$;`,
  `do $$ begin
    if not exists (select 1 from pg_policies where tablename='labs' and policyname='Anyone can read labs') then
      create policy "Anyone can read labs" on public.labs for select using (true);
    end if;
  end $$;`,
  `do $$ begin
    if not exists (select 1 from pg_policies where tablename='tests' and policyname='Anyone can read tests') then
      create policy "Anyone can read tests" on public.tests for select using (true);
    end if;
  end $$;`,
  `do $$ begin
    if not exists (select 1 from pg_policies where tablename='cart_items' and policyname='Users manage own cart') then
      create policy "Users manage own cart" on public.cart_items for all using (auth.uid() = user_id);
    end if;
  end $$;`,
  `do $$ begin
    if not exists (select 1 from pg_policies where tablename='bookings' and policyname='Users view own bookings') then
      create policy "Users view own bookings" on public.bookings for select using (auth.uid() = user_id);
    end if;
  end $$;`,
  `do $$ begin
    if not exists (select 1 from pg_policies where tablename='bookings' and policyname='Users create bookings') then
      create policy "Users create bookings" on public.bookings for insert with check (auth.uid() = user_id);
    end if;
  end $$;`,
  `do $$ begin
    if not exists (select 1 from pg_policies where tablename='price_overrides' and policyname='Anyone can read price overrides') then
      create policy "Anyone can read price overrides" on public.price_overrides for select using (true);
    end if;
  end $$;`,
];

const TRIGGER = `
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email, name)
  values (new.id, new.email, new.raw_user_meta_data->>'name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
`;

try {
  await client.connect();
  console.log('✓ Connected to Supabase database');

  await client.query(SQL);
  console.log('✓ Tables created');

  for (const policy of POLICIES) {
    await client.query(policy);
  }
  console.log('✓ Row Level Security policies applied');

  await client.query(TRIGGER);
  console.log('✓ Auth trigger created');

  console.log('\n✅ Schema fully applied — Supabase is ready!');
} catch (err) {
  console.error('✗ Error:', err.message);
} finally {
  await client.end();
}
