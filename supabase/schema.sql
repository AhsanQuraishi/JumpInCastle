-- Run this once in the Supabase SQL editor (Project > SQL Editor > New query).

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  booking_date date not null,
  slot_time text not null,
  booking_type text not null default 'general' check (booking_type in ('general', 'party')),
  customer_name text not null,
  phone text not null,
  email text,
  party_size int not null check (party_size > 0),
  package_name text,
  addons jsonb,
  total_price numeric,
  status text not null default 'confirmed' check (status in ('confirmed', 'cancelled'))
);

create index if not exists bookings_date_slot_idx on bookings (booking_date, slot_time);

-- RLS is enabled with no policies, so anon/authenticated clients get zero
-- access. All reads/writes go through Next.js API routes using the service
-- role key, which bypasses RLS entirely — keep that key server-only.
alter table bookings enable row level security;
