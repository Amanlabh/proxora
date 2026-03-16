import Link from "next/link";
import { appConfig } from "@/lib/config/app-config";

const footerLinks = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/enterprise", label: "Enterprise Access" },
  { href: "/provider", label: "Provider Console" },
  { href: "/wallet", label: "Wallet Ops" },
  { href: "/auth/sign-in", label: "Session Access" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-grid">
          <section className="footer-brand-panel">
            <p className="footer-kicker">Core Runtime</p>
            <h2>{appConfig.appName}</h2>
            <p className="footer-copy">
              Infrastructure for controlled AI rental sessions, provider-side
              credential isolation, and ledger-backed usage settlement.
            </p>
            <div className="footer-status-row">
              <span className="footer-status-dot" />
              <span>proxy / metering / payout orchestration online</span>
            </div>

            <div className="footer-social-links">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="X (Twitter)"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="none"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="GitHub"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="LinkedIn"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </section>

          <section className="footer-links-panel">
            <p className="footer-kicker">Control Surface</p>
            <div className="footer-link-list">
              {footerLinks.map((link) => (
                <Link className="footer-link" href={link.href} key={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </footer>
  );
}
