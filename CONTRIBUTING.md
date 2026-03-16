# Contributing to Proxora AI

First off, thank you for considering contributing to Proxora AI! It's people like you that make Proxora AI such a great tool.

## How Can I Contribute?

### Reporting Bugs
This section guides you through submitting a bug report for Proxora AI. Following these guidelines helps maintainers and the community understand your report, reproduce the behavior, and find related reports.

* Use a clear and descriptive title for the issue to identify the problem.
* Describe the exact steps which reproduce the problem in as many details as possible.
* Provide specific examples to demonstrate the steps.

### Suggesting Enhancements
This section guides you through submitting an enhancement suggestion for Proxora AI, including completely new features and minor improvements to existing functionality.

* Use a clear and descriptive title for the issue to identify the suggestion.
* Provide a step-by-step description of the suggested enhancement in as many details as possible.
* Explain why this enhancement would be useful to most Proxora AI users.

### Pull Requests
The process described here has several goals:
* Maintain Proxora AI's quality
* Fix problems that are important to users
* Engage the community in working toward the best possible Proxora AI

**Steps to Contribute:**
1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## Local Development Setup

To test your changes locally:

1. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/agent-collect.git
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   *Note: You may need to supply your own test Supabase keys.*
4. Run the development server:
   ```bash
   pnpm dev
   ```

## Development Workflow
Proxora AI uses a monorepo setup managed by `pnpm workspace`. The main Next.js web application lives inside `apps/web/`. Shared logic or packages should be created in the `packages/` directory if they are completely agnostic to the app UI.

We use ESLint and Prettier for code formatting. Always run `pnpm run lint` and `npm run typecheck` inside `apps/web/` before making a Pull Request.
