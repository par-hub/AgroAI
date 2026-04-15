-- ═══════════════════════════════════════════════════════════════
-- AgroAI — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- Enable UUID extension (already on by default in Supabase)
create extension if not exists "uuid-ossp";

-- ───────────────────────────────────────────────────────────────
-- breeds
-- ───────────────────────────────────────────────────────────────
create table if not exists public.breeds (
  id             uuid primary key default uuid_generate_v4(),
  name           text not null unique,
  origin         text not null,
  milk_production text not null,
  lifespan       text not null,
  description    text not null,
  image_url      text
);

-- Allow anyone (including anonymous) to read breeds
alter table public.breeds enable row level security;

create policy "Public read breeds"
  on public.breeds for select
  using (true);

-- ───────────────────────────────────────────────────────────────
-- saved_breeds
-- ───────────────────────────────────────────────────────────────
create table if not exists public.saved_breeds (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  breed_name  text not null,
  notes       text,
  created_at  timestamptz not null default now()
);

-- Users can only see / modify their own rows
alter table public.saved_breeds enable row level security;

create policy "Users select own saved_breeds"
  on public.saved_breeds for select
  using (auth.uid() = user_id);

create policy "Users insert own saved_breeds"
  on public.saved_breeds for insert
  with check (auth.uid() = user_id);

create policy "Users delete own saved_breeds"
  on public.saved_breeds for delete
  using (auth.uid() = user_id);

-- Index for fast per-user queries
create index if not exists idx_saved_breeds_user_id
  on public.saved_breeds(user_id);

-- ───────────────────────────────────────────────────────────────
-- Sample breed data (edit / extend as needed)
-- ───────────────────────────────────────────────────────────────
insert into public.breeds (name, origin, milk_production, lifespan, description, image_url)
values
  ('Gir',      'India (Gujarat)',    '10–12 L/day',  '12–15 years',
   'Hardy tropical breed known for A2 milk and disease resistance. Widely used in crossbreeding programs.', null),
  ('HF',       'Netherlands',        '25–35 L/day',  '10–12 years',
   'Holstein-Friesian is the world''s highest milk-producing dairy breed with distinctive black-and-white markings.', null),
  ('Jersey',   'Channel Islands, UK','15–20 L/day',  '10–13 years',
   'Small-bodied breed producing high butterfat milk. Highly adaptable and efficient feed converter.', null),
  ('Sahiwal',  'Pakistan/India',     '12–15 L/day',  '14–16 years',
   'Best dairy breed among Zebu cattle. Highly tick-resistant and heat-tolerant.', null),
  ('Tharparkar','India (Rajasthan)', '8–10 L/day',   '12–14 years',
   'Dual-purpose breed suited to arid conditions. White or grey coat with large dewlap.', null),
  ('Red Sindhi','Pakistan (Sindh)',  '10–12 L/day',  '13–15 years',
   'Deep red tropical dairy breed with strong disease resistance and good milk fat percentage.', null),
  ('Kankrej',  'India (Gujarat)',    '6–9 L/day',    '12–16 years',
   'Powerful dual-purpose breed; excellent draught animal with good milk yield in harsh conditions.', null),
  ('Rathi',    'India (Rajasthan)',  '8–12 L/day',   '12–14 years',
   'Moderately-sized dairy breed from the Bikaner region; adapted to semi-arid climates.', null),
  ('Ongole',   'India (Andhra Pradesh)', '5–8 L/day', '15–18 years',
   'Massive white Zebu breed prized for draught work and beef. Strong immune system.', null),
  ('Murrah',   'India (Haryana)',    '18–25 L/day',  '12–14 years',
   'World''s best buffalo breed for milk production. Jet-black coat with tightly-coiled horns.', null)
on conflict (name) do nothing;
