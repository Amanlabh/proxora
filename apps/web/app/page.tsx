import Link from "next/link";
import { getSessionUser } from "@/lib/auth/get-session-user";

export default async function HomePage() {
  const user = await getSessionUser();

  return (
    <main className="page-shell">
      <section className="hero-card">
        <p className="eyebrow">Proxora AI</p>
        <h1>Access Premium AI Models on Demand</h1>
        <p className="lead">
          Rent secure, controlled AI sessions from top providers. Pay as you go
          with transparent token-based pricing and real-time usage tracking.
        </p>
        <div className="hero-actions">
          <Link className="action-button primary" href="/marketplace">
            Browse Models
          </Link>
          {!user && (
            <Link className="action-button secondary" href="/provider">
              Become a Provider
            </Link>
          )}
        </div>
      </section>

      <section className="features-grid">
        <div className="feature-card">
          <h3>For Renters</h3>
          <ul>
            <li>Access GPT-4o, Claude, Gemini & more</li>
            <li>Secure proxy-mediated sessions</li>
            <li>Pay only for active usage</li>
            <li>Real-time usage dashboard</li>
          </ul>
        </div>
        <div className="feature-card">
          <h3>For Providers</h3>
          <ul>
            <li>Monetize your API keys safely</li>
            <li>Set your own pricing</li>
            <li>Automatic usage metering</li>
            <li>Instant payouts to your wallet</li>
          </ul>
        </div>
        <div className="feature-card">
          <h3>For Enterprise</h3>
          <ul>
            <li>Pay-as-you-go usage with token-level billing</li>
            <li>Spend caps, rate limits, and session controls</li>
            <li>Ledger-grade audit trails and invoices</li>
            <li>Dedicated onboarding for LLM providers</li>
          </ul>
        </div>
        <div className="feature-card">
          <h3>Platform Features</h3>
          <ul>
            <li>Session timeout enforcement</li>
            <li>Usage limits & spend caps</li>
            <li>Ledger-based billing</li>
            <li>Dispute resolution</li>
          </ul>
        </div>
      </section>

      {!user && (
        <section className="cta-section">
          <h2>Get Started Today</h2>
          <div className="cta-actions">
            <Link className="action-link" href="/auth/sign-up">
              Create Account
            </Link>
            <Link className="action-link" href="/auth/sign-in">
              Sign In
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
