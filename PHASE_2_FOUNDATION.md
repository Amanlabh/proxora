# Phase 2: Technical Foundation

This document defines the initial engineering foundation for the project.

Phase 2 exists to answer four questions before deeper implementation begins:

1. what stack are we using?
2. how is the repository structured?
3. what are the initial module boundaries?
4. what environment setup rules do we follow?

## 1. Chosen Stack

The initial stack for this repository is:

- frontend and server entrypoint: Next.js
- language: TypeScript
- database: Supabase Postgres
- ORM: Prisma
- authentication: Supabase Auth
- payments: Stripe later
- jobs/queues: Redis + BullMQ later
- runtime package manager: pnpm

## 2. Repository Shape

We will use a small monorepo structure from the start.

- `apps/web`
  - main product app
  - renter, provider, and admin UI can start here
  - API routes can live here initially
- `apps/web/src`
  - reusable application code
  - config, env, and shared server utilities should live here
- `packages/config-typescript`
  - shared TypeScript configuration
- `prisma`
  - schema and future migrations
- `docs`
  - architecture and planning artifacts

This keeps the repo simple now while leaving space for future extraction into separate packages or services.

## 3. Initial Service Boundaries

In the first implementation, we will keep a modular monolith.

That means:

- one deployable web app
- one database
- clear internal modules
- no premature microservices

Internal modules to preserve from the beginning:

- auth
- providers
- listings
- rentals
- proxy
- billing
- admin

## 4. Environment Rules

We need a clean environment convention before writing application logic.

Rules:

- all secrets must live in `.env.local` during local development
- committed examples belong in `.env.example`
- no real provider keys in the repository
- no production credentials in local docs
- application code reads environment through a single typed config layer

## 5. Local Development Standard

Local development should eventually require only:

1. install dependencies
2. copy `.env.example` to `.env.local`
3. connect Supabase or run a local database workflow later
4. run the app

## 6. Immediate Output of Phase 2

Phase 2 should produce:

- clean repository scaffold
- package manager setup
- base TypeScript configuration
- base Next.js application shell
- environment example file
- typed environment validation module
- Prisma directory convention
- root scripts for development

## 7. Next Step After Phase 2

Phase 3 will define the database schema and implement core backend entities.
