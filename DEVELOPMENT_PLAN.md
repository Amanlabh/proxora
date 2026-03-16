# AI Rental Platform Development Plan

This document is the working plan for the full development process. We will use it as the source of truth for scope, architecture direction, delivery order, and guardrails.

## 1. Product Goal

Build an AI rental platform where:

- providers connect premium AI access they already pay for
- renters pay for temporary access
- the platform brokers access, usage, billing, and expiry
- access is revoked immediately when the rental ends or abuse is detected

## 2. Core Product Principle

For v1, renters should not receive raw provider API keys.

Instead:

- providers store credentials with the platform
- renters receive temporary platform-controlled access
- all AI traffic is routed through our server-side proxy
- the platform can meter usage, enforce limits, and revoke access instantly

This is the safest and most controllable version of the product.

## 3. v1 Scope

We will build the first version around `API proxy rentals only`.

Included in v1:

- user authentication
- provider onboarding
- secure provider credential storage
- provider listing creation
- renter marketplace browsing
- booking and payment flow
- rental session creation
- AI proxy routing
- usage metering
- automatic expiry and revocation
- provider/renter dashboards
- admin controls

Excluded from v1:

- direct API key delivery to renters
- raw cookie sharing
- browser session sharing
- too many provider integrations
- advanced marketplace mechanics
- referral systems
- deep analytics beyond core operations

## 4. High-Level Roles

### Provider

- connects a paid AI account or key
- creates a rentable listing
- defines pricing and limits
- earns revenue after platform fee

### Renter

- browses listings
- pays for temporary access
- sends prompts through the platform
- loses access immediately when rental expires

### Platform

- stores credentials securely
- verifies provider connectivity
- handles bookings and billing
- proxies requests
- tracks usage
- enforces limits
- revokes access on expiry or abuse

## 5. Recommended v1 Flow

1. Provider signs up.
2. Provider connects AI credential.
3. Platform verifies the credential.
4. Provider creates a listing with pricing and usage limits.
5. Renter browses available listings.
6. Renter books a rental session and pays.
7. Platform creates a rental session with a strict time window and limits.
8. Renter sends prompts to our proxy endpoint.
9. Proxy forwards requests using the provider's stored credential.
10. Platform logs usage and deducts cost.
11. Rental expires automatically at time limit or spend cap.
12. Access is revoked immediately.

## 6. Main System Modules

We will structure the platform around these modules:

### 6.1 Auth and User Management

- signup/login
- role management
- session handling
- verification status

### 6.2 Provider Vault and Verification

- encrypted credential storage
- provider connection checks
- listing eligibility
- provider status management

### 6.3 Rental Engine

- booking creation
- rental session lifecycle
- start/end timing
- concurrency rules
- revoke/suspend logic

### 6.4 AI Proxy Gateway

- receive renter requests
- validate rental session
- apply limits and rate rules
- forward request to provider
- meter token/request usage

### 6.5 Billing and Ledger

- wallet or escrow handling
- commission split
- provider earnings
- payout records
- refund handling

### 6.6 Admin and Audit

- suspensions
- manual overrides
- disputes
- audit logs

## 7. Proposed Data Model

These are the core entities we should design first:

- `users`
- `provider_profiles`
- `provider_credentials`
- `provider_listings`
- `rentals`
- `rental_sessions`
- `usage_events`
- `wallets`
- `ledger_entries`
- `payouts`
- `audit_logs`
- `disputes`

Important fields to include:

- credential encryption metadata
- listing provider type
- listing availability status
- hourly price or usage price
- provider revenue split
- platform commission
- rental start and end timestamps
- rental state: `pending`, `active`, `expired`, `suspended`, `revoked`, `completed`
- spend cap
- request cap
- concurrency limit
- usage totals
- payout status

## 8. Security Requirements

Security is the highest-priority engineering concern.

Mandatory requirements:

- provider credentials must be encrypted at rest
- raw credentials must never be exposed to renters
- renters must use only short-lived platform-issued access
- every request must be authorized against an active rental
- usage caps and rate limits must be enforced server-side
- audit logs must exist for access, billing, and revocations
- access must be revoked automatically on expiry
- platform must support emergency provider/admin suspension

Anti-abuse controls for v1:

- rate limiting
- spend caps
- request caps
- session expiry
- provider manual revoke
- admin manual suspend
- suspicious activity monitoring

## 9. Billing Model

The initial billing model should be simple and controllable.

Recommended approach:

- renters prepay platform credits or booking amount
- platform holds funds during active rental
- usage consumes the reserved balance
- platform deducts commission
- provider receives the net amount
- unused funds are returned according to policy

We should maintain a ledger-based accounting system, not only a balance field.

## 10. Technical Risks

These risks must stay visible during development:

1. Some AI providers may prohibit account sharing or resale.
2. Raw key exposure would break the platform immediately.
3. Usage accounting bugs can create financial loss quickly.
4. Revocation must be reliable and near-instant.
5. Fraud and abuse patterns may appear early.
6. Browser cookie/session rental is significantly riskier than API proxy rental.

## 11. Delivery Phases

### Phase 1: Product Definition

- confirm v1 scope
- confirm allowed providers
- confirm legal/policy constraints
- finalize rental and billing model

### Phase 2: Project Foundation

- set up app structure
- configure database and ORM
- configure auth
- establish environment management
- set coding standards and module boundaries

### Phase 3: Schema and Core Backend

- design database schema
- implement user roles
- implement provider credential vault
- implement provider verification flow

### Phase 4: Listings and Marketplace

- build provider listing creation
- build listing discovery
- build listing detail pages
- define pricing and limits UX

### Phase 5: Booking and Payments

- build booking flow
- implement escrow/prepaid logic
- record ledger entries
- show payment and rental status

### Phase 6: Rental Engine and Proxy

- create rental sessions
- issue short-lived access tokens
- validate active rental on each request
- forward AI requests through proxy
- meter requests, tokens, and costs

### Phase 7: Expiry, Revocation, and Admin Controls

- implement auto-expiry jobs
- suspend or revoke access
- add provider controls
- add admin moderation tools

### Phase 8: Dashboards and Operations

- provider earnings dashboard
- renter usage dashboard
- admin monitoring dashboard
- audit and issue tracking views

### Phase 9: Testing and Launch Readiness

- test billing correctness
- test expiry correctness
- test abuse scenarios
- test provider failure cases
- deploy staging
- run a limited beta

## 12. Build Order

This is the exact execution order we should follow:

1. finalize v1 scope and constraints
2. initialize app architecture
3. design database schema
4. implement auth and roles
5. implement provider credential vault
6. implement listing creation and browsing
7. implement booking and ledger flow
8. implement rental session engine
9. implement AI proxy gateway
10. implement usage metering and expiry
11. implement dashboards
12. implement admin controls
13. test and harden
14. deploy staging

## 13. Non-Negotiable Decisions

These decisions stay fixed unless we explicitly revise this plan:

- v1 will use proxy-based access, not raw key sharing
- v1 will prioritize safety and control over feature breadth
- billing must be ledger-based
- revocation and expiry must be automated
- browser-session rental is not part of the first implementation

## 14. Immediate Next Steps

The next implementation steps should be:

1. choose the application stack for this repository
2. define the initial folder structure
3. design the database schema for all core entities
4. document the API boundaries for auth, listings, rentals, and proxying

## 15. Working Rule

Before building any major feature, we will check it against this document:

- does it fit v1 scope?
- does it expose provider secrets?
- does it preserve platform control over access?
- does it support reliable billing and revocation?

If the answer is no, we do not build it yet.
