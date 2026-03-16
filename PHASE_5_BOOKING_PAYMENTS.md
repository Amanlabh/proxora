# Phase 5: Booking and Payments

This phase introduces the first commercial flow for renters.

The initial implementation includes:

- renter wallet creation
- manual wallet top-up for development
- ledger-backed balance changes
- booking creation from public listings
- escrow hold at booking time
- renter wallet and booking visibility

This phase does not yet include:

- Stripe checkout
- automatic refunds
- payout execution
- rental session activation
- live usage deduction

The core rule is that money movement must be ledger-backed before we add external payment providers.
