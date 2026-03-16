begin;

alter table public.provider_profiles
  add column if not exists metadata jsonb;

alter table public.wallets
  add column if not exists metadata jsonb;

commit;
