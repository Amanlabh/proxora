# Phase 3: Schema and Core Backend

This document defines the first database design for the platform.

The schema is designed around three constraints:

- Supabase Auth is the identity source
- Prisma manages application data in the `public` schema
- rentals, billing, and revocation must be auditable

## 1. Identity Model

Supabase Auth owns authentication.

Application data uses a `User` record in the `public` schema with:

- an internal primary key
- a unique `supabaseAuthUserId`
- platform role and state fields

This avoids coupling the full application schema directly to the managed `auth` schema while still letting us map every app user to a Supabase identity.

## 2. Core Entities

The first schema includes:

- `User`
- `ProviderProfile`
- `ProviderCredential`
- `ProviderListing`
- `Rental`
- `RentalSession`
- `UsageEvent`
- `Wallet`
- `LedgerEntry`
- `Payout`
- `Dispute`
- `AuditLog`

## 3. Key Design Decisions

### Users

- users can be renters, providers, or admins
- provider-specific data lives in `ProviderProfile`
- wallet data stays separate from the user record

### Provider Credentials

- provider secrets are never stored in plain text
- encrypted credential fields store ciphertext metadata only
- a listing points to the credential it uses

### Listings

- listings define provider type, visibility, pricing, and limits
- rentals copy pricing and limits into locked fields so later edits do not rewrite history

### Rentals and Sessions

- `Rental` stores the booked commercial agreement
- `RentalSession` stores short-lived access control state
- rentals and sessions can be suspended, revoked, expired, or completed independently

### Billing

- each user has a wallet
- balances are derived from ledger entries, not trusted as standalone source of truth
- payouts are separate from ledger activity

### Auditability

- usage, billing, and admin actions must be reconstructable
- audit logs exist even where business entities already store status

## 4. Next Step After This Schema

After the schema is accepted, the next implementation work should be:

1. generate Prisma client
2. create the initial migration
3. implement user sync from Supabase Auth to `public.users`
4. build provider onboarding flows
