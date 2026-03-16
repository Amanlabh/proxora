-- Proxora AI
-- Supabase bootstrap schema for the managed AI rental platform.
--
-- This script is designed to:
-- 1. create the application tables in public schema
-- 2. sync auth.users into public.users
-- 3. enable row level security
-- 4. add initial provider/renter/admin access policies

begin;

create extension if not exists pgcrypto;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'platform_role') then
    create type public.platform_role as enum ('USER', 'ADMIN');
  end if;

  if not exists (select 1 from pg_type where typname = 'user_status') then
    create type public.user_status as enum ('ACTIVE', 'SUSPENDED', 'DELETED');
  end if;

  if not exists (select 1 from pg_type where typname = 'provider_status') then
    create type public.provider_status as enum ('PENDING', 'VERIFIED', 'REJECTED', 'SUSPENDED');
  end if;

  if not exists (select 1 from pg_type where typname = 'provider_type') then
    create type public.provider_type as enum ('OPENAI_COMPATIBLE', 'ANTHROPIC', 'GOOGLE', 'OTHER');
  end if;

  if not exists (select 1 from pg_type where typname = 'credential_status') then
    create type public.credential_status as enum ('PENDING', 'ACTIVE', 'INVALID', 'REVOKED');
  end if;

  if not exists (select 1 from pg_type where typname = 'listing_status') then
    create type public.listing_status as enum ('DRAFT', 'ACTIVE', 'PAUSED', 'ARCHIVED');
  end if;

  if not exists (select 1 from pg_type where typname = 'visibility_status') then
    create type public.visibility_status as enum ('PRIVATE', 'PUBLIC', 'UNLISTED');
  end if;

  if not exists (select 1 from pg_type where typname = 'rental_duration') then
    create type public.rental_duration as enum ('ONE_HOUR', 'TWO_HOURS', 'SIX_HOURS', 'TWENTY_FOUR_HOURS');
  end if;

  if not exists (select 1 from pg_type where typname = 'rental_status') then
    create type public.rental_status as enum ('PENDING', 'ACTIVE', 'EXPIRED', 'SUSPENDED', 'REVOKED', 'COMPLETED', 'CANCELLED');
  end if;

  if not exists (select 1 from pg_type where typname = 'session_status') then
    create type public.session_status as enum ('PENDING', 'ACTIVE', 'EXPIRED', 'SUSPENDED', 'REVOKED');
  end if;

  if not exists (select 1 from pg_type where typname = 'usage_event_type') then
    create type public.usage_event_type as enum ('REQUEST', 'RESPONSE', 'BILLING', 'ADJUSTMENT', 'ERROR');
  end if;

  if not exists (select 1 from pg_type where typname = 'wallet_status') then
    create type public.wallet_status as enum ('ACTIVE', 'FROZEN', 'CLOSED');
  end if;

  if not exists (select 1 from pg_type where typname = 'ledger_entry_type') then
    create type public.ledger_entry_type as enum (
      'DEPOSIT',
      'WITHDRAWAL',
      'ESCROW_HOLD',
      'ESCROW_RELEASE',
      'RENTAL_CHARGE',
      'PROVIDER_EARNING',
      'PLATFORM_FEE',
      'REFUND',
      'PAYOUT',
      'ADJUSTMENT'
    );
  end if;

  if not exists (select 1 from pg_type where typname = 'ledger_direction') then
    create type public.ledger_direction as enum ('CREDIT', 'DEBIT');
  end if;

  if not exists (select 1 from pg_type where typname = 'payout_status') then
    create type public.payout_status as enum ('PENDING', 'PROCESSING', 'PAID', 'FAILED', 'CANCELLED');
  end if;

  if not exists (select 1 from pg_type where typname = 'dispute_status') then
    create type public.dispute_status as enum ('OPEN', 'IN_REVIEW', 'RESOLVED', 'REJECTED');
  end if;
end
$$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  supabase_auth_user_id uuid not null unique references auth.users(id) on delete cascade,
  email text not null unique,
  display_name text,
  avatar_url text,
  role public.platform_role not null default 'USER',
  status public.user_status not null default 'ACTIVE',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.provider_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.users(id) on delete cascade,
  legal_name text,
  display_name text not null,
  bio text,
  country_code text,
  status public.provider_status not null default 'PENDING',
  verified_at timestamptz,
  suspended_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.provider_credentials (
  id uuid primary key default gen_random_uuid(),
  provider_profile_id uuid not null references public.provider_profiles(id) on delete cascade,
  provider_type public.provider_type not null,
  label text not null,
  encrypted_secret text not null,
  encryption_iv text not null,
  encryption_tag text not null,
  encryption_key_version text not null,
  metadata jsonb,
  supported_models text[] not null default '{}',
  status public.credential_status not null default 'PENDING',
  last_validated_at timestamptz,
  last_validation_error text,
  revoked_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.provider_listings (
  id uuid primary key default gen_random_uuid(),
  provider_profile_id uuid not null references public.provider_profiles(id) on delete cascade,
  provider_credential_id uuid not null references public.provider_credentials(id) on delete restrict,
  title text not null,
  slug text not null unique,
  description text,
  provider_type public.provider_type not null,
  model_family text not null,
  allowed_models text[] not null default '{}',
  currency_code text not null default 'USD',
  hourly_price numeric(18, 6) not null,
  platform_fee_rate numeric(5, 4) not null,
  provider_revenue_rate numeric(5, 4) not null,
  request_limit integer,
  spend_cap numeric(18, 6),
  concurrency_limit integer not null default 1,
  listing_status public.listing_status not null default 'DRAFT',
  visibility_status public.visibility_status not null default 'PRIVATE',
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint provider_listings_hourly_price_positive check (hourly_price > 0),
  constraint provider_listings_platform_fee_rate_valid check (platform_fee_rate >= 0 and platform_fee_rate <= 1),
  constraint provider_listings_provider_revenue_rate_valid check (provider_revenue_rate >= 0 and provider_revenue_rate <= 1),
  constraint provider_listings_spend_cap_positive check (spend_cap is null or spend_cap > 0),
  constraint provider_listings_request_limit_positive check (request_limit is null or request_limit > 0),
  constraint provider_listings_concurrency_limit_positive check (concurrency_limit > 0)
);

create table if not exists public.rentals (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.provider_listings(id) on delete restrict,
  renter_user_id uuid not null references public.users(id) on delete restrict,
  provider_profile_id uuid not null references public.provider_profiles(id) on delete restrict,
  duration public.rental_duration not null,
  status public.rental_status not null default 'PENDING',
  currency_code text not null default 'USD',
  booked_price numeric(18, 6) not null,
  platform_fee_amount numeric(18, 6) not null,
  provider_revenue_amount numeric(18, 6) not null,
  request_limit integer,
  spend_cap numeric(18, 6),
  model_restriction text,
  starts_at timestamptz,
  ends_at timestamptz,
  activated_at timestamptz,
  expired_at timestamptz,
  cancelled_at timestamptz,
  revoked_at timestamptz,
  total_requests integer not null default 0,
  total_input_tokens integer not null default 0,
  total_output_tokens integer not null default 0,
  total_cost numeric(18, 6) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.rental_sessions (
  id uuid primary key default gen_random_uuid(),
  rental_id uuid not null references public.rentals(id) on delete cascade,
  status public.session_status not null default 'PENDING',
  token_hash text not null unique,
  issued_at timestamptz,
  expires_at timestamptz not null,
  revoked_at timestamptz,
  suspended_at timestamptz,
  last_used_at timestamptz,
  requester_ip text,
  user_agent text,
  request_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.usage_events (
  id uuid primary key default gen_random_uuid(),
  rental_id uuid not null references public.rentals(id) on delete cascade,
  rental_session_id uuid references public.rental_sessions(id) on delete set null,
  event_type public.usage_event_type not null,
  provider_type public.provider_type not null,
  model text not null,
  request_id text,
  input_tokens integer,
  output_tokens integer,
  total_tokens integer,
  cost_amount numeric(18, 6),
  currency_code text default 'USD',
  status_code integer,
  latency_ms integer,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.wallets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.users(id) on delete cascade,
  status public.wallet_status not null default 'ACTIVE',
  currency_code text not null default 'USD',
  balance numeric(18, 6) not null default 0,
  held_balance numeric(18, 6) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.payouts (
  id uuid primary key default gen_random_uuid(),
  provider_profile_id uuid not null references public.provider_profiles(id) on delete restrict,
  amount numeric(18, 6) not null,
  currency_code text not null default 'USD',
  status public.payout_status not null default 'PENDING',
  external_reference text,
  requested_at timestamptz not null default now(),
  processed_at timestamptz,
  failure_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ledger_entries (
  id uuid primary key default gen_random_uuid(),
  wallet_id uuid not null references public.wallets(id) on delete cascade,
  rental_id uuid references public.rentals(id) on delete set null,
  payout_id uuid references public.payouts(id) on delete set null,
  entry_type public.ledger_entry_type not null,
  direction public.ledger_direction not null,
  amount numeric(18, 6) not null,
  currency_code text not null default 'USD',
  balance_after numeric(18, 6),
  reference text,
  description text,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.disputes (
  id uuid primary key default gen_random_uuid(),
  rental_id uuid not null references public.rentals(id) on delete cascade,
  opened_by_user_id uuid not null references public.users(id) on delete restrict,
  provider_profile_id uuid references public.provider_profiles(id) on delete set null,
  status public.dispute_status not null default 'OPEN',
  reason text not null,
  resolution text,
  resolved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  rental_id uuid references public.rentals(id) on delete set null,
  action text not null,
  target_type text not null,
  target_id text,
  ip_address text,
  user_agent text,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create index if not exists users_status_idx on public.users (status);
create index if not exists provider_profiles_status_idx on public.provider_profiles (status);
create index if not exists provider_credentials_profile_status_idx on public.provider_credentials (provider_profile_id, status);
create index if not exists provider_credentials_provider_type_idx on public.provider_credentials (provider_type);
create index if not exists provider_listings_profile_status_idx on public.provider_listings (provider_profile_id, listing_status);
create index if not exists provider_listings_visibility_status_idx on public.provider_listings (visibility_status, listing_status);
create index if not exists provider_listings_provider_family_idx on public.provider_listings (provider_type, model_family);
create index if not exists rentals_renter_status_idx on public.rentals (renter_user_id, status);
create index if not exists rentals_provider_status_idx on public.rentals (provider_profile_id, status);
create index if not exists rentals_listing_status_idx on public.rentals (listing_id, status);
create index if not exists rentals_window_idx on public.rentals (starts_at, ends_at);
create index if not exists rental_sessions_rental_status_idx on public.rental_sessions (rental_id, status);
create index if not exists rental_sessions_expires_at_idx on public.rental_sessions (expires_at);
create index if not exists usage_events_rental_created_idx on public.usage_events (rental_id, created_at);
create index if not exists usage_events_session_idx on public.usage_events (rental_session_id);
create index if not exists usage_events_provider_model_idx on public.usage_events (provider_type, model);
create index if not exists wallets_status_idx on public.wallets (status);
create index if not exists ledger_entries_wallet_created_idx on public.ledger_entries (wallet_id, created_at);
create index if not exists ledger_entries_rental_idx on public.ledger_entries (rental_id);
create index if not exists ledger_entries_payout_idx on public.ledger_entries (payout_id);
create index if not exists payouts_provider_status_idx on public.payouts (provider_profile_id, status);
create index if not exists disputes_rental_status_idx on public.disputes (rental_id, status);
create index if not exists disputes_opened_by_idx on public.disputes (opened_by_user_id);
create index if not exists audit_logs_user_created_idx on public.audit_logs (user_id, created_at);
create index if not exists audit_logs_rental_created_idx on public.audit_logs (rental_id, created_at);
create index if not exists audit_logs_target_idx on public.audit_logs (target_type, target_id);

drop trigger if exists set_users_updated_at on public.users;
create trigger set_users_updated_at
before update on public.users
for each row execute function public.set_updated_at();

drop trigger if exists set_provider_profiles_updated_at on public.provider_profiles;
create trigger set_provider_profiles_updated_at
before update on public.provider_profiles
for each row execute function public.set_updated_at();

drop trigger if exists set_provider_credentials_updated_at on public.provider_credentials;
create trigger set_provider_credentials_updated_at
before update on public.provider_credentials
for each row execute function public.set_updated_at();

drop trigger if exists set_provider_listings_updated_at on public.provider_listings;
create trigger set_provider_listings_updated_at
before update on public.provider_listings
for each row execute function public.set_updated_at();

drop trigger if exists set_rentals_updated_at on public.rentals;
create trigger set_rentals_updated_at
before update on public.rentals
for each row execute function public.set_updated_at();

drop trigger if exists set_rental_sessions_updated_at on public.rental_sessions;
create trigger set_rental_sessions_updated_at
before update on public.rental_sessions
for each row execute function public.set_updated_at();

drop trigger if exists set_wallets_updated_at on public.wallets;
create trigger set_wallets_updated_at
before update on public.wallets
for each row execute function public.set_updated_at();

drop trigger if exists set_payouts_updated_at on public.payouts;
create trigger set_payouts_updated_at
before update on public.payouts
for each row execute function public.set_updated_at();

drop trigger if exists set_disputes_updated_at on public.disputes;
create trigger set_disputes_updated_at
before update on public.disputes
for each row execute function public.set_updated_at();

create or replace function public.handle_auth_user_upsert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (
    supabase_auth_user_id,
    email,
    display_name,
    avatar_url
  )
  values (
    new.id,
    coalesce(new.email, new.raw_user_meta_data ->> 'email'),
    coalesce(new.raw_user_meta_data ->> 'display_name', new.raw_user_meta_data ->> 'full_name'),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (supabase_auth_user_id)
  do update set
    email = excluded.email,
    display_name = coalesce(excluded.display_name, public.users.display_name),
    avatar_url = coalesce(excluded.avatar_url, public.users.avatar_url),
    updated_at = now();

  return new;
end;
$$;

drop trigger if exists on_auth_user_upsert on auth.users;
create trigger on_auth_user_upsert
after insert or update on auth.users
for each row execute function public.handle_auth_user_upsert();

insert into public.users (
  supabase_auth_user_id,
  email,
  display_name,
  avatar_url
)
select
  au.id,
  coalesce(au.email, au.raw_user_meta_data ->> 'email'),
  coalesce(au.raw_user_meta_data ->> 'display_name', au.raw_user_meta_data ->> 'full_name'),
  au.raw_user_meta_data ->> 'avatar_url'
from auth.users au
on conflict (supabase_auth_user_id)
do update set
  email = excluded.email,
  display_name = coalesce(excluded.display_name, public.users.display_name),
  avatar_url = coalesce(excluded.avatar_url, public.users.avatar_url),
  updated_at = now();

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.users u
    where u.supabase_auth_user_id = auth.uid()
      and u.role = 'ADMIN'
      and u.status = 'ACTIVE'
  );
$$;

create or replace view public.marketplace_public_listings as
select
  pl.id,
  pl.slug,
  pl.title,
  pl.description,
  pl.provider_type,
  pl.model_family,
  pl.allowed_models,
  pl.currency_code,
  pl.hourly_price,
  pl.platform_fee_rate,
  pl.provider_revenue_rate,
  pl.request_limit,
  pl.spend_cap,
  pl.concurrency_limit,
  pl.is_featured,
  pl.created_at,
  pl.updated_at,
  pp.display_name as provider_display_name,
  pp.country_code as provider_country_code
from public.provider_listings pl
join public.provider_profiles pp on pp.id = pl.provider_profile_id
where pl.listing_status = 'ACTIVE'
  and pl.visibility_status = 'PUBLIC'
  and pp.status = 'VERIFIED';

alter table public.users enable row level security;
alter table public.provider_profiles enable row level security;
alter table public.provider_credentials enable row level security;
alter table public.provider_listings enable row level security;
alter table public.rentals enable row level security;
alter table public.rental_sessions enable row level security;
alter table public.usage_events enable row level security;
alter table public.wallets enable row level security;
alter table public.ledger_entries enable row level security;
alter table public.payouts enable row level security;
alter table public.disputes enable row level security;
alter table public.audit_logs enable row level security;

drop policy if exists "users_select_self_or_admin" on public.users;
create policy "users_select_self_or_admin"
on public.users
for select
using (supabase_auth_user_id = auth.uid() or public.is_admin());

drop policy if exists "users_update_self_or_admin" on public.users;
create policy "users_update_self_or_admin"
on public.users
for update
using (supabase_auth_user_id = auth.uid() or public.is_admin())
with check (supabase_auth_user_id = auth.uid() or public.is_admin());

drop policy if exists "provider_profiles_select_public_or_owner" on public.provider_profiles;
create policy "provider_profiles_select_public_or_owner"
on public.provider_profiles
for select
using (
  status = 'VERIFIED'
  or user_id in (
    select id from public.users where supabase_auth_user_id = auth.uid()
  )
  or public.is_admin()
);

drop policy if exists "provider_profiles_insert_owner_or_admin" on public.provider_profiles;
create policy "provider_profiles_insert_owner_or_admin"
on public.provider_profiles
for insert
with check (
  user_id in (
    select id from public.users where supabase_auth_user_id = auth.uid()
  )
  or public.is_admin()
);

drop policy if exists "provider_profiles_update_owner_or_admin" on public.provider_profiles;
create policy "provider_profiles_update_owner_or_admin"
on public.provider_profiles
for update
using (
  user_id in (
    select id from public.users where supabase_auth_user_id = auth.uid()
  )
  or public.is_admin()
)
with check (
  user_id in (
    select id from public.users where supabase_auth_user_id = auth.uid()
  )
  or public.is_admin()
);

drop policy if exists "provider_credentials_owner_or_admin" on public.provider_credentials;
create policy "provider_credentials_owner_or_admin"
on public.provider_credentials
for all
using (
  provider_profile_id in (
    select pp.id
    from public.provider_profiles pp
    join public.users u on u.id = pp.user_id
    where u.supabase_auth_user_id = auth.uid()
  )
  or public.is_admin()
)
with check (
  provider_profile_id in (
    select pp.id
    from public.provider_profiles pp
    join public.users u on u.id = pp.user_id
    where u.supabase_auth_user_id = auth.uid()
  )
  or public.is_admin()
);

drop policy if exists "provider_listings_select_public_owner_or_admin" on public.provider_listings;
create policy "provider_listings_select_public_owner_or_admin"
on public.provider_listings
for select
using (
  (listing_status = 'ACTIVE' and visibility_status in ('PUBLIC', 'UNLISTED'))
  or provider_profile_id in (
    select pp.id
    from public.provider_profiles pp
    join public.users u on u.id = pp.user_id
    where u.supabase_auth_user_id = auth.uid()
  )
  or public.is_admin()
);

drop policy if exists "provider_listings_owner_or_admin_write" on public.provider_listings;
create policy "provider_listings_owner_or_admin_write"
on public.provider_listings
for all
using (
  provider_profile_id in (
    select pp.id
    from public.provider_profiles pp
    join public.users u on u.id = pp.user_id
    where u.supabase_auth_user_id = auth.uid()
  )
  or public.is_admin()
)
with check (
  provider_profile_id in (
    select pp.id
    from public.provider_profiles pp
    join public.users u on u.id = pp.user_id
    where u.supabase_auth_user_id = auth.uid()
  )
  or public.is_admin()
);

drop policy if exists "rentals_select_participants_or_admin" on public.rentals;
create policy "rentals_select_participants_or_admin"
on public.rentals
for select
using (
  renter_user_id in (
    select id from public.users where supabase_auth_user_id = auth.uid()
  )
  or provider_profile_id in (
    select pp.id
    from public.provider_profiles pp
    join public.users u on u.id = pp.user_id
    where u.supabase_auth_user_id = auth.uid()
  )
  or public.is_admin()
);

drop policy if exists "rentals_insert_renter_or_admin" on public.rentals;
create policy "rentals_insert_renter_or_admin"
on public.rentals
for insert
with check (
  renter_user_id in (
    select id from public.users where supabase_auth_user_id = auth.uid()
  )
  or public.is_admin()
);

drop policy if exists "rental_sessions_participants_or_admin" on public.rental_sessions;
create policy "rental_sessions_participants_or_admin"
on public.rental_sessions
for select
using (
  rental_id in (
    select r.id
    from public.rentals r
    left join public.provider_profiles pp on pp.id = r.provider_profile_id
    left join public.users renter on renter.id = r.renter_user_id
    left join public.users provider_user on provider_user.id = pp.user_id
    where renter.supabase_auth_user_id = auth.uid()
       or provider_user.supabase_auth_user_id = auth.uid()
  )
  or public.is_admin()
);

drop policy if exists "usage_events_participants_or_admin" on public.usage_events;
create policy "usage_events_participants_or_admin"
on public.usage_events
for select
using (
  rental_id in (
    select r.id
    from public.rentals r
    left join public.provider_profiles pp on pp.id = r.provider_profile_id
    left join public.users renter on renter.id = r.renter_user_id
    left join public.users provider_user on provider_user.id = pp.user_id
    where renter.supabase_auth_user_id = auth.uid()
       or provider_user.supabase_auth_user_id = auth.uid()
  )
  or public.is_admin()
);

drop policy if exists "wallets_self_or_admin" on public.wallets;
create policy "wallets_self_or_admin"
on public.wallets
for select
using (
  user_id in (
    select id from public.users where supabase_auth_user_id = auth.uid()
  )
  or public.is_admin()
);

drop policy if exists "ledger_entries_wallet_owner_or_admin" on public.ledger_entries;
create policy "ledger_entries_wallet_owner_or_admin"
on public.ledger_entries
for select
using (
  wallet_id in (
    select w.id
    from public.wallets w
    join public.users u on u.id = w.user_id
    where u.supabase_auth_user_id = auth.uid()
  )
  or public.is_admin()
);

drop policy if exists "payouts_provider_owner_or_admin" on public.payouts;
create policy "payouts_provider_owner_or_admin"
on public.payouts
for select
using (
  provider_profile_id in (
    select pp.id
    from public.provider_profiles pp
    join public.users u on u.id = pp.user_id
    where u.supabase_auth_user_id = auth.uid()
  )
  or public.is_admin()
);

drop policy if exists "disputes_participants_or_admin" on public.disputes;
create policy "disputes_participants_or_admin"
on public.disputes
for select
using (
  opened_by_user_id in (
    select id from public.users where supabase_auth_user_id = auth.uid()
  )
  or provider_profile_id in (
    select pp.id
    from public.provider_profiles pp
    join public.users u on u.id = pp.user_id
    where u.supabase_auth_user_id = auth.uid()
  )
  or public.is_admin()
);

drop policy if exists "disputes_open_by_self_or_admin" on public.disputes;
create policy "disputes_open_by_self_or_admin"
on public.disputes
for insert
with check (
  opened_by_user_id in (
    select id from public.users where supabase_auth_user_id = auth.uid()
  )
  or public.is_admin()
);

drop policy if exists "audit_logs_admin_only" on public.audit_logs;
create policy "audit_logs_admin_only"
on public.audit_logs
for select
using (public.is_admin());

grant select on public.marketplace_public_listings to anon, authenticated;

commit;
