begin;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'chat_message_role') then
    create type public.chat_message_role as enum ('SYSTEM', 'USER', 'ASSISTANT');
  end if;
end
$$;

create table if not exists public.rental_chat_messages (
  id uuid primary key default gen_random_uuid(),
  rental_id uuid not null references public.rentals(id) on delete cascade,
  rental_session_id uuid references public.rental_sessions(id) on delete set null,
  role public.chat_message_role not null,
  model text,
  content text not null,
  request_id text,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create index if not exists rental_chat_messages_rental_id_created_at_idx
  on public.rental_chat_messages (rental_id, created_at);

create index if not exists rental_chat_messages_rental_session_id_idx
  on public.rental_chat_messages (rental_session_id);

alter table public.rental_chat_messages enable row level security;

drop policy if exists "renters can read their chat messages" on public.rental_chat_messages;
create policy "renters can read their chat messages"
on public.rental_chat_messages
for select
using (
  exists (
    select 1
    from public.rentals
    join public.users on public.users.id = public.rentals.renter_user_id
    where public.rentals.id = rental_chat_messages.rental_id
      and public.users.supabase_auth_user_id = auth.uid()
  )
);

drop policy if exists "service role manages chat messages" on public.rental_chat_messages;
create policy "service role manages chat messages"
on public.rental_chat_messages
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

commit;
