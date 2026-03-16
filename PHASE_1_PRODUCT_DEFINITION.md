# Phase 1: Product Definition

This document finalizes the first implementation scope and the product rules for v1.

It exists to prevent the project from drifting into risky or unclear features before the core model is stable.

## 1. Phase 1 Goal

Define exactly what we are building in version 1, what we are not building, and the constraints that will govern every later engineering decision.

## 2. Product Summary

The platform is a managed AI access marketplace.

- providers connect premium AI access they already pay for
- renters pay for temporary access
- the platform brokers access through its own backend
- the platform meters usage and enforces expiry
- access is revoked automatically when the rental ends

## 3. v1 Product Decision

Version 1 will support `managed proxy access only`.

That means:

- renters interact with our platform endpoint
- our server forwards requests to the underlying AI provider
- providers do not expose raw API keys directly to renters
- access is controlled through time-limited rental sessions

## 4. What v1 Includes

The first version includes:

- provider registration and identity
- secure provider credential connection
- provider listing creation
- pricing configuration
- renter booking flow
- prepaid or escrow-style payment handling
- rental session lifecycle
- request forwarding through platform proxy
- usage metering
- auto-expiry and revocation
- provider and renter dashboards
- admin oversight tools

## 5. What v1 Excludes

The first version does not include:

- direct API key downloads
- direct cookie/session sharing
- unmanaged credential handoff
- broad multi-provider support at launch
- browser automation rentals
- advanced ranking and recommendation systems
- enterprise contracts
- affiliate or referral systems

## 6. User Roles

### Provider

The provider:

- creates an account
- connects an AI credential
- creates one or more rental listings
- receives earnings after fees
- can pause or revoke listings

### Renter

The renter:

- browses available listings
- books a rental
- receives temporary controlled access
- sends prompts through our product
- loses access when the rental ends

### Admin

The admin:

- reviews suspicious activity
- resolves disputes
- suspends users or listings
- audits billing and usage activity

## 7. Rental Model for v1

The rental model will be platform-controlled, not credential-controlled.

### Access Model

- renter never receives provider secret directly
- renter receives access through our platform
- each rental maps to a temporary platform session

### Duration Model

Supported v1 durations:

- 1 hour
- 2 hours
- 6 hours
- 24 hours

These can be revised later, but fixed durations simplify the first release.

### Usage Controls

Every rental should support:

- time limit
- request limit
- spend cap
- optional model restriction

## 8. Payment Model for v1

The first version should use a prepaid booking approach.

Flow:

1. renter pays booking amount before access starts
2. platform reserves the funds
3. rental becomes active
4. usage is metered during the active window
5. platform deducts commission
6. provider receives net earnings
7. unused amount is handled by policy

## 9. Provider Listing Model

Each listing should define:

- provider name
- supported model or model family
- listing title and description
- price per duration or usage package
- availability status
- limits and restrictions
- visibility status

Examples:

- GPT-4 tier listing for 1 hour managed access
- Claude tier listing with capped request count

## 10. Provider Constraints

We must treat provider support conservatively.

For each provider we consider, we need to answer:

- does the provider permit this resale or shared-access model?
- can requests be safely proxied?
- can we meter cost accurately?
- can we suspend access instantly?

### Initial Recommendation

For implementation planning, assume v1 starts with a single provider integration pattern:

- OpenAI-compatible API proxying

This keeps architecture simpler and avoids mixing browser-session logic into the first release.

## 11. Trust and Safety Constraints

The platform only works if control remains server-side.

Mandatory rules:

- providers secrets are encrypted at rest
- raw secrets never leave the backend
- every renter request must be checked against an active rental
- requests must be rate-limited
- expired rentals must stop immediately
- admin can suspend access at any time
- provider can revoke their listing at any time

## 12. Legal and Policy Constraint

This business model may violate the terms of some AI providers if implemented as account resale or shared subscription access.

Because of that, Phase 1 includes a policy review gate:

- every supported provider must be reviewed before launch
- unsupported providers must not be listed
- if a provider forbids this model, we exclude it from v1

This is a product gate, not an optional note.

## 13. Success Criteria for v1

The first version is successful if:

- providers can connect and list access
- renters can discover and book a listing
- prompts route through our proxy successfully
- usage is billed correctly
- access expires correctly
- providers are paid correctly
- renters cannot continue after expiry

## 14. Failure Conditions We Must Avoid

The first version fails if:

- a renter sees or extracts a provider API key
- rental expiry does not stop usage immediately
- billing cannot be reconstructed from a ledger
- providers are charged for renter abuse without controls
- unsupported provider models are allowed into the marketplace

## 15. Phase 1 Decisions Locked In

These decisions are now fixed for the start of development:

- v1 is a managed proxy product
- v1 does not distribute raw provider credentials
- v1 does not support cookie-sharing rentals
- v1 starts with one provider integration pattern
- v1 uses fixed rental durations
- v1 uses prepaid booking logic

## 16. Output of Phase 1

At the end of Phase 1, we should have:

- a stable product definition
- a fixed v1 scope
- a risk-aware provider strategy
- a clear billing model
- a clear access-control model

## 17. Next Step After Phase 1

Once this document is accepted, Phase 2 will define:

- project stack
- repository structure
- service boundaries
- database and backend foundation
