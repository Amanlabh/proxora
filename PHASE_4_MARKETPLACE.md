# Phase 4: Listings and Marketplace

This phase starts the first user-facing marketplace slice on top of the Phase 3 schema.

## Initial Phase 4 Scope

The first implementation step for Phase 4 includes:

- provider listing creation API
- public marketplace listing API
- listing detail API
- basic marketplace page
- basic provider listing creation page

## What This Step Does Not Yet Cover

- authenticated provider ownership checks
- full Supabase session integration
- advanced filtering and sorting
- image uploads
- booking flow

## Current Rule

Until auth is wired in, listing creation is treated as backend plumbing and UI scaffolding, not production-safe access control.
