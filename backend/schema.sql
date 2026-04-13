create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique,
  name text,
  email text unique,
  phone text,
  google_id text,
  profession text,
  salary_range text,
  monthly_spending text,
  preferred_card_type text,
  created_at timestamptz default now()
);

create table if not exists public.banks (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  logo_url text,
  description text,
  created_at timestamptz default now()
);

create table if not exists public.credit_cards (
  id uuid primary key default gen_random_uuid(),
  bank_id uuid references public.banks(id) on delete cascade,
  name text not null,
  slug text not null unique,
  image_url text,
  joining_fee numeric,
  annual_fee numeric,
  reward_type text,
  best_for text,
  lounge_access text,
  forex_markup text,
  eligibility_summary text,
  rating numeric,
  summary text,
  created_at timestamptz default now()
);

create table if not exists public.card_benefits (
  id uuid primary key default gen_random_uuid(),
  card_id uuid references public.credit_cards(id) on delete cascade,
  category text,
  title text,
  description text
);

create table if not exists public.card_fees (
  id uuid primary key default gen_random_uuid(),
  card_id uuid references public.credit_cards(id) on delete cascade,
  fee_type text,
  amount text,
  notes text
);

create table if not exists public.card_eligibility (
  id uuid primary key default gen_random_uuid(),
  card_id uuid references public.credit_cards(id) on delete cascade,
  age_requirement text,
  income_requirement text,
  credit_score_recommendation text,
  employment_type text
);

create table if not exists public.card_documents (
  id uuid primary key default gen_random_uuid(),
  card_id uuid references public.credit_cards(id) on delete cascade,
  document_name text
);

create table if not exists public.card_pros_cons (
  id uuid primary key default gen_random_uuid(),
  card_id uuid references public.credit_cards(id) on delete cascade,
  type text check (type in ('pro', 'con')),
  text text
);

create table if not exists public.card_faqs (
  id uuid primary key default gen_random_uuid(),
  card_id uuid references public.credit_cards(id) on delete cascade,
  question text,
  answer text
);

create table if not exists public.saved_cards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  card_id uuid references public.credit_cards(id) on delete cascade,
  card_slug text,
  card_name text,
  bank_slug text,
  bank_name text,
  created_at timestamptz default now()
);

create table if not exists public.card_reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  card_id uuid references public.credit_cards(id) on delete cascade,
  card_slug text,
  card_name text,
  rating integer check (rating between 1 and 5),
  review text,
  created_at timestamptz default now()
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  card_id uuid references public.credit_cards(id) on delete cascade,
  card_slug text,
  card_name text,
  comment text,
  parent_id uuid references public.comments(id) on delete cascade,
  created_at timestamptz default now()
);

create table if not exists public.user_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  session_id text not null,
  event_name text not null,
  bank_id uuid references public.banks(id) on delete set null,
  card_id uuid references public.credit_cards(id) on delete set null,
  bank_slug text,
  card_slug text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists public.downloads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  ebook_name text not null,
  ebook_slug text,
  downloaded_at timestamptz default now()
);

create table if not exists public.ebook_email_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  ebook_id uuid,
  ebook_slug text,
  email text not null,
  sent_at timestamptz default now()
);

create table if not exists public.search_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  session_id text not null,
  search_term text not null,
  result_clicked_type text,
  result_clicked_id text,
  result_clicked_slug text,
  result_clicked_title text,
  created_at timestamptz default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  source_page text,
  card_id uuid references public.credit_cards(id) on delete set null,
  bank_id uuid references public.banks(id) on delete set null,
  card_slug text,
  card_name text,
  bank_slug text,
  bank_name text,
  intent_type text,
  status text default 'new',
  notes text,
  created_at timestamptz default now()
);

create table if not exists public.ebooks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  file_url text not null,
  is_active boolean default true,
  created_at timestamptz default now()
);

alter table public.saved_cards enable row level security;
alter table public.card_reviews enable row level security;
alter table public.comments enable row level security;
alter table public.user_events enable row level security;
alter table public.search_logs enable row level security;
alter table public.leads enable row level security;

create policy "Users can manage own saved cards" on public.saved_cards
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can add own reviews" on public.card_reviews
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can add own comments" on public.comments
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can insert own events" on public.user_events
for insert with check (auth.uid() = user_id or user_id is null);

create policy "Users can insert own search logs" on public.search_logs
for insert with check (auth.uid() = user_id or user_id is null);

create policy "Users can insert own leads" on public.leads
for insert with check (auth.uid() = user_id or user_id is null);

alter table public.saved_cards add column if not exists card_slug text;
alter table public.saved_cards add column if not exists card_name text;
alter table public.saved_cards add column if not exists bank_slug text;
alter table public.saved_cards add column if not exists bank_name text;

alter table public.card_reviews add column if not exists card_slug text;
alter table public.card_reviews add column if not exists card_name text;

alter table public.comments add column if not exists card_slug text;
alter table public.comments add column if not exists card_name text;

alter table public.user_events add column if not exists bank_slug text;
alter table public.user_events add column if not exists card_slug text;

alter table public.downloads add column if not exists ebook_slug text;
alter table public.ebook_email_logs add column if not exists ebook_slug text;

alter table public.search_logs add column if not exists result_clicked_slug text;
alter table public.search_logs add column if not exists result_clicked_title text;

alter table public.leads add column if not exists card_slug text;
alter table public.leads add column if not exists card_name text;
alter table public.leads add column if not exists bank_slug text;
alter table public.leads add column if not exists bank_name text;

create unique index if not exists saved_cards_user_card_slug_idx on public.saved_cards (user_id, card_slug);
create index if not exists comments_card_slug_idx on public.comments (card_slug, created_at desc);
create index if not exists leads_user_created_idx on public.leads (user_id, created_at desc);
create index if not exists user_events_user_created_idx on public.user_events (user_id, created_at desc);
create index if not exists search_logs_term_created_idx on public.search_logs (search_term, created_at desc);
