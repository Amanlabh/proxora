import Link from "next/link";
import { appConfig } from "@/lib/config/app-config";

const integrationTracks = [
  {
    title: "Direct API routing",
    copy: "Expose your LLM through a Proxora-managed proxy path so renters never touch raw provider secrets.",
  },
  {
    title: "Metered settlement",
    copy: "Track requests, tokens, and spend in real time with ledger-backed usage accounting and payout controls.",
  },
  {
    title: "Access controls",
    copy: "Define rental windows, concurrency rules, session revocation, and operational guardrails before you publish capacity.",
  },
];

const onboardingFlow = [
  "Create a provider account and complete business profile details.",
  "Add your API credential, supported models, pricing metadata, and routing base URL.",
  "Configure listings for the models or capacity you want to rent out.",
  "Work with us on validation, operating limits, and production rollout.",
];

const providerFit = [
  "Foundation model labs with public or partner API access",
  "Inference providers exposing OpenAI-compatible endpoints",
  "Specialized model owners offering private premium capacity",
  "Teams that want controlled rental access without exposing raw keys",
];

const requiredDocuments = [
  "Company registration certificate or legal entity proof",
  "Authorized signatory or primary business contact details",
  "Tax registration or GST/VAT documentation where applicable",
  "Provider website, API docs, or technical product overview",
  "Support contact information and escalation channel",
  "Banking or payout details for commercial settlement",
];

export default function EnterprisePage() {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <p className="eyebrow">Enterprise Access</p>
        <h1>Access Premium AI Models on Demand</h1>
        <p className="lead">
          Rent secure, controlled AI sessions from top providers. Pay as you go
          with transparent token-based pricing, real-time usage tracking, and
          clear spend controls.
        </p>
        <div className="detail-grid enterprise-hero-grid">
          <article className="listing-card enterprise-hero-card">
            <p className="enterprise-fit-label">Pay as you go</p>
            <h3>Enterprise usage is metered, not prepaid</h3>
            <p className="listing-description enterprise-copy">
              You only pay for tokens and requests actually consumed. We track
              every usage event, enforce spend caps, and produce invoice-ready
              summaries automatically.
            </p>
          </article>
          <article className="listing-card enterprise-hero-card">
            <p className="enterprise-fit-label">Control surfaces</p>
            <h3>Real-time spend and session controls</h3>
            <p className="listing-description enterprise-copy">
              Set caps per rental, per model, or per provider. Sessions can be
              revoked instantly and usage is visible in real time.
            </p>
          </article>
          <article className="listing-card enterprise-hero-card">
            <p className="enterprise-fit-label">Settlement</p>
            <h3>Transparent ledger and payouts</h3>
            <p className="listing-description enterprise-copy">
              Every rental writes to a ledger with provider earnings and
              platform fees clearly itemized for finance teams.
            </p>
          </article>
        </div>
        <div className="home-actions">
          <Link className="action-link" href="/provider/onboarding">
            Start provider onboarding
          </Link>
          <a
            className="action-link"
            href={`mailto:${appConfig.enterpriseContactEmail}?subject=Proxora%20AI%20enterprise%20provider`}
          >
            Connect with us
          </a>
        </div>
      </section>

      <section className="status-card">
        <div className="section-head">
          <div>
            <h2>How it works</h2>
            <p className="section-copy">
              We do not hand renter traffic your raw credential. Access stays
              brokered through the platform so model owners keep operational
              control.
            </p>
          </div>
        </div>

        <div className="listing-grid enterprise-grid">
          {integrationTracks.map((item) => (
            <article className="listing-card" key={item.title}>
              <div className="listing-topline">
                <span className="pill">ENTERPRISE</span>
              </div>
              <h3>{item.title}</h3>
              <p className="listing-description enterprise-copy">{item.copy}</p>
            </article>
          ))}
        </div>

        <div className="provider-section">
          <div className="section-head">
            <div>
              <h2>Who this is for</h2>
              <p className="section-copy">
                Proxora AI is designed for providers that want distribution with
                stronger control than simple key resale.
              </p>
            </div>
          </div>
          <div className="detail-grid enterprise-fit-grid">
            {providerFit.map((item) => (
              <div className="listing-card" key={item}>
                <p className="enterprise-fit-label">Provider profile</p>
                <p className="listing-provider">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="provider-section">
          <div className="section-head">
            <div>
              <h2>Provider onboarding path</h2>
              <p className="section-copy">
                The current platform already supports provider profiles,
                credential registration, listing creation, and usage settlement.
              </p>
            </div>
          </div>
          <div className="enterprise-flow">
            {onboardingFlow.map((item, index) => (
              <article className="listing-card enterprise-step-card" key={item}>
                <p className="enterprise-step-index">0{index + 1}</p>
                <p className="listing-provider">{item}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="provider-section">
          <div className="section-head">
            <div>
              <h2>What we need from providers</h2>
              <p className="section-copy">
                To make the rollout smooth, come ready with your model catalog,
                endpoint format, pricing assumptions, and operating limits.
              </p>
            </div>
          </div>
          <div className="detail-grid enterprise-requirements-grid">
            <div className="listing-card">
              <h3>API readiness</h3>
              <p className="listing-provider">
                Base URL, auth method, supported models, and request format.
              </p>
            </div>
            <div className="listing-card">
              <h3>Commercial inputs</h3>
              <p className="listing-provider">
                Input/output token pricing, billing logic, and rental economics.
              </p>
            </div>
            <div className="listing-card">
              <h3>Operations</h3>
              <p className="listing-provider">
                Rate limits, concurrency limits, support contact, and uptime
                expectations.
              </p>
            </div>
          </div>
        </div>

        <div className="provider-section">
          <div className="section-head">
            <div>
              <h2>Documents required</h2>
              <p className="section-copy">
                Before approval, we expect providers to share the business and
                operational documents needed for basic verification and payout
                setup.
              </p>
            </div>
          </div>
          <div className="listing-grid enterprise-grid">
            {requiredDocuments.map((item) => (
              <article className="listing-card" key={item}>
                <p className="enterprise-fit-label">Required</p>
                <p className="listing-provider">{item}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="provider-section">
          <div className="section-head">
            <div>
              <h2>Connect with us</h2>
              <p className="section-copy">
                If you already run an LLM API and want to explore listing it on
                Proxora AI, reach out and we’ll work through routing,
                validation, and launch shape together.
              </p>
            </div>
          </div>
          <div className="listing-card enterprise-contact-card">
            <p className="enterprise-fit-label">Enterprise contact</p>
            <h3>{appConfig.enterpriseContactEmail}</h3>
            <p className="listing-provider">
              Send your company name, model lineup, API style, and expected
              rental model.
            </p>
            <div className="home-actions">
              <a
                className="action-link"
                href={`mailto:${appConfig.enterpriseContactEmail}?subject=Proxora%20AI%20enterprise%20provider`}
              >
                Email partnerships
              </a>
              <Link className="action-link" href="/provider/onboarding">
                Open provider onboarding
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
