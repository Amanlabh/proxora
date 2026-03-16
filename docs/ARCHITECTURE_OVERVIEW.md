# Architecture Overview

The initial application architecture is a modular monolith.

## Application Modules

- `auth`
- `providers`
- `listings`
- `rentals`
- `proxy`
- `billing`
- `admin`

## Request Direction

1. renter authenticates with the platform
2. renter books a listing
3. platform creates a rental session
4. renter sends AI requests to platform endpoints
5. platform validates rental status and limits
6. platform forwards the request using provider credentials
7. platform records usage and billing events
8. platform revokes access on expiry or suspension

## Principle

Control stays with the platform at every step.
