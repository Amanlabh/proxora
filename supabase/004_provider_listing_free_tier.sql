begin;

alter table public.provider_listings
  add column if not exists metadata jsonb;

alter table public.provider_listings
  drop constraint if exists provider_listings_hourly_price_positive;

alter table public.provider_listings
  add constraint provider_listings_hourly_price_non_negative
  check (hourly_price >= 0);

commit;
