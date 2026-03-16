# Proxora AI

Managed AI rental platform.

## Current Phase

The repository is currently set up for:

- Phase 1 product definition
- Phase 2 technical foundation

Core planning documents:

- `DEVELOPMENT_PLAN.md`
- `PHASE_1_PRODUCT_DEFINITION.md`
- `PHASE_1_CHECKLIST.md`
- `PHASE_2_FOUNDATION.md`
- `PHASE_2_HARDENING.md`

## Stack

- Next.js
- TypeScript
- Supabase Postgres
- Prisma
- Supabase Auth
- pnpm workspace

## Initial Structure

- `apps/web` - product application
- `apps/web/src` - reusable application code
- `packages/config-typescript` - shared TypeScript config
- `prisma` - database schema and migrations
- `docs` - additional architecture notes

## Local Setup

1. Install dependencies with `pnpm install`
2. Copy `.env.example` to `.env.local`
3. Configure Supabase project credentials
4. Run `pnpm dev`

Public Supabase browser config uses:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`

## Notes

Version 1 is planned as a proxy-based AI rental platform. Raw provider credentials are not intended to be exposed to renters.

Authentication is planned around Supabase Auth, and server environment access should go through a typed validation module.

## Contributing

We love our contributors! Please see our [Contributing Guidelines](CONTRIBUTING.md) to get started with creating issues, proposing features, and submitting Pull Requests.

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## License

This project is licensed under the [MIT License](LICENSE).
