# Phase 2 Hardening

This document records the hardening decisions added after the initial scaffold.

## 1. Auth Choice

The project will use `Supabase Auth` for the first implementation.

Why:

- it keeps authentication close to the database platform we selected
- it simplifies managed auth flows for an early product
- it still works cleanly with Prisma for application data access
- it reduces custom auth infrastructure in the first release

## 2. Environment Strategy

Environment variables should be read through one validated server module.

Rules:

- do not spread raw `process.env` access through the codebase
- validate server variables with a schema
- import the validated object from one place

## 3. Database Convention

The `prisma/` directory is now the reserved home for:

- `schema.prisma`
- migrations
- seed entrypoints if needed later

## 4. Formatting Baseline

The repository now uses a shared Prettier configuration and root formatting scripts.

## 5. Remaining Nice-To-Haves

These are useful later, but not blockers for Phase 3:

- CI workflow
- pre-commit hooks
- test runner setup
