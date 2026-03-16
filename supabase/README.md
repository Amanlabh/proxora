# Supabase SQL

`001_initial_schema.sql` is the bootstrap SQL for the current platform model.

It includes:

- enum types
- application tables in `public`
- `auth.users` to `public.users` sync trigger
- indexes
- updated-at triggers
- row level security
- initial provider/renter/admin policies
- a public marketplace view

## How It Maps To The App

- Supabase Auth remains the identity source
- `public.users.supabase_auth_user_id` links app users to `auth.users`
- Prisma can still target the same tables in `public`
- provider ownership is enforced through `provider_profiles.user_id`

## Recommended Next Step

After running this SQL in Supabase:

1. introspect or align Prisma migrations against the live schema
2. build the user-sync and provider onboarding routes in the app
3. test RLS with authenticated and anonymous sessions
