import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentProviderContext } from "@/lib/providers/get-current-provider";
import {
  getProviderFinanceSummary,
  getProviderOperationsSummary,
  getProviderPerformanceSummary,
} from "@/lib/payments/service";
import { ProviderPayoutForm } from "./provider-payout-form";
import { RentalControlActions } from "../components/rental-control-actions";

export const dynamic = "force-dynamic";

export default async function ProviderPage() {
  const { sessionUser, appUser, providerProfile } =
    await getCurrentProviderContext();

  if (!sessionUser) {
    redirect("/auth/sign-in");
  }

  const credentials = providerProfile?.credentials ?? [];
  const listings = providerProfile?.listings ?? [];
  const finance =
    appUser && providerProfile
      ? await getProviderFinanceSummary(appUser.id, providerProfile.id)
      : null;
  const operations =
    providerProfile != null
      ? await getProviderOperationsSummary(providerProfile.id)
      : null;
  const performance =
    providerProfile != null
      ? await getProviderPerformanceSummary(providerProfile.id)
      : null;
  const providerMetadata =
    providerProfile?.metadata &&
    typeof providerProfile.metadata === "object" &&
    !Array.isArray(providerProfile.metadata)
      ? (providerProfile.metadata as {
          businessType?: string | null;
          websiteUrl?: string | null;
          supportEmail?: string | null;
          supportChannel?: string | null;
        })
      : null;

  return (
    <main className="page-shell">
      <section className="hero-card">
        <p className="eyebrow">Provider Console</p>
        <h1>Manage your provider workspace</h1>
        <p className="lead">
          Phase 4 now includes provider onboarding, credential setup, owned
          listings, and public marketplace publishing.
        </p>
      </section>

      <section className="status-card">
        {!appUser ? (
          <div className="empty-state">
            <p>No app user record was found for this signed-in account.</p>
            <p>
              Refresh the page once your first authenticated request completes.
            </p>
          </div>
        ) : !providerProfile ? (
          <>
            <h2>Get started</h2>
            <p className="section-copy">
              Create your provider profile before adding credentials or
              listings.
            </p>
            <Link className="action-link" href="/provider/onboarding">
              Start provider onboarding
            </Link>
          </>
        ) : (
          <>
            <div className="section-head">
              <div>
                <h2>{providerProfile.displayName}</h2>
                <p className="section-copy">
                  Status: <strong>{providerProfile.status}</strong>
                </p>
              </div>
              <div className="home-actions">
                <Link className="action-link" href="/provider/onboarding">
                  Manage profile
                </Link>
                <Link className="action-link" href="/provider/listings/new">
                  New listing
                </Link>
              </div>
            </div>

            <div className="detail-grid provider-stats">
              <div className="listing-card">
                <h3>Credentials</h3>
                <p className="listing-provider">{credentials.length} total</p>
              </div>
              <div className="listing-card">
                <h3>Listings</h3>
                <p className="listing-provider">{listings.length} total</p>
              </div>
              <div className="listing-card">
                <h3>Wallet balance</h3>
                <p className="listing-provider">
                  {finance ? finance.walletBalance.toFixed(2) : "0.00"}
                </p>
              </div>
              <div className="listing-card">
                <h3>Provider class</h3>
                <p className="listing-provider">
                  {providerMetadata?.businessType ?? "Not set"}
                </p>
              </div>
            </div>

            <div className="provider-section">
              <div className="section-head">
                <div>
                  <h2>Provider readiness</h2>
                  <p className="section-copy">
                    Business and support information used to evaluate
                    marketplace readiness.
                  </p>
                </div>
                <Link className="action-link" href="/provider/onboarding">
                  Update provider data
                </Link>
              </div>
              <div className="listing-grid">
                <article className="listing-card">
                  <h3>Support</h3>
                  <p className="listing-provider">
                    {providerMetadata?.supportEmail ?? "No support email"}
                  </p>
                  <p className="listing-description">
                    {providerMetadata?.supportChannel ?? "No support channel"}
                  </p>
                </article>
                <article className="listing-card">
                  <h3>Website / docs</h3>
                  <p className="listing-provider">
                    {providerMetadata?.websiteUrl ?? "No website set"}
                  </p>
                  <p className="listing-description">
                    Support channel:{" "}
                    {providerMetadata?.supportChannel ?? "Not set"}
                  </p>
                </article>
              </div>
            </div>

            <div className="provider-section">
              <div className="section-head">
                <div>
                  <h2>Credentials</h2>
                  <p className="section-copy">Your connected provider keys.</p>
                </div>
                <Link className="action-link" href="/provider/onboarding">
                  Add credential
                </Link>
              </div>
              {credentials.length === 0 ? (
                <div className="empty-state">
                  <p>No provider credentials yet.</p>
                </div>
              ) : (
                <div className="listing-grid">
                  {credentials.map((credential) => (
                    <article className="listing-card" key={credential.id}>
                      <div className="listing-topline">
                        <span className="pill">{credential.providerType}</span>
                        <span className="pill muted">{credential.status}</span>
                      </div>
                      <h3>{credential.label}</h3>
                      <p className="listing-provider">
                        Models:{" "}
                        {credential.supportedModels.length > 0
                          ? credential.supportedModels.join(", ")
                          : "Not set"}
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </div>

            <div className="provider-section">
              <div className="section-head">
                <div>
                  <h2>Owned listings</h2>
                  <p className="section-copy">
                    Everything created under this provider.
                  </p>
                </div>
              </div>
              {listings.length === 0 ? (
                <div className="empty-state">
                  <p>No listings yet.</p>
                </div>
              ) : (
                <div className="listing-grid">
                  {listings.map((listing) => (
                    <article className="listing-card" key={listing.id}>
                      <div className="listing-topline">
                        <span className="pill">{listing.providerType}</span>
                        <span className="pill muted">
                          {listing.listingStatus}
                        </span>
                      </div>
                      <h3>{listing.title}</h3>
                      <p className="listing-provider">{listing.modelFamily}</p>
                      <p className="listing-description">
                        {listing.description ?? "No description provided."}
                      </p>
                      <Link
                        className="action-link"
                        href={`/marketplace/${listing.slug}`}
                      >
                        View public page
                      </Link>
                    </article>
                  ))}
                </div>
              )}
            </div>

            <div className="provider-section">
              <div className="section-head">
                <div>
                  <h2>Performance</h2>
                  <p className="section-copy">
                    Revenue and dispute visibility by provider activity.
                  </p>
                </div>
              </div>
              {performance ? (
                <>
                  <div className="listing-grid">
                    <article className="listing-card">
                      <h3>Total rentals</h3>
                      <p className="listing-provider">
                        {performance.totalRentalCount}
                      </p>
                    </article>
                    <article className="listing-card">
                      <h3>Active rentals</h3>
                      <p className="listing-provider">
                        {performance.activeRentalCount}
                      </p>
                    </article>
                    <article className="listing-card">
                      <h3>Disputes</h3>
                      <p className="listing-provider">
                        {performance.disputeCount}
                      </p>
                    </article>
                  </div>
                  {performance.listingPerformance.length > 0 ? (
                    <div className="listing-grid">
                      {performance.listingPerformance.map((listing) => (
                        <article className="listing-card" key={listing.title}>
                          <h3>{listing.title}</h3>
                          <p className="listing-provider">
                            Revenue: {listing.revenue.toFixed(2)}
                          </p>
                          <p className="listing-description">
                            {listing.rentals} rentals / {listing.requests}{" "}
                            requests
                          </p>
                        </article>
                      ))}
                    </div>
                  ) : null}
                </>
              ) : null}
            </div>

            <div className="provider-section">
              <div className="section-head">
                <div>
                  <h2>Live rental sessions</h2>
                  <p className="section-copy">
                    Active renter sessions and usage as of the latest page
                    render.
                  </p>
                </div>
              </div>
              {operations && operations.activeRentals.length > 0 ? (
                <div className="listing-grid">
                  {operations.activeRentals.map((rental) => (
                    <article className="listing-card" key={rental.id}>
                      <div className="listing-topline">
                        <span className="pill">{rental.status}</span>
                        <span className="pill muted">{rental.modelFamily}</span>
                      </div>
                      <h3>{rental.listingTitle}</h3>
                      <p className="listing-provider">
                        Renter: {rental.renterLabel}
                      </p>
                      <p className="listing-description">
                        Requests: {rental.totalRequests} | Cost:{" "}
                        {rental.totalCost.toFixed(4)} {rental.currencyCode}
                      </p>
                      <p className="listing-description">
                        Rental ends: {rental.endsAt ?? "Not set"}
                      </p>
                      {rental.liveSession ? (
                        <p className="listing-description">
                          Live session expiry: {rental.liveSession.expiresAt}
                        </p>
                      ) : (
                        <p className="listing-description">
                          No live session currently issued.
                        </p>
                      )}
                      <RentalControlActions
                        actions={[
                          {
                            label: "Revoke access",
                            endpoint: `/api/provider/rentals/${rental.id}/revoke`,
                            tone: "secondary",
                          },
                        ]}
                      />
                      <Link
                        className="action-link"
                        href={`/marketplace/${rental.listingSlug}`}
                      >
                        Open listing
                      </Link>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>No active rental sessions right now.</p>
                </div>
              )}
            </div>

            <div className="provider-section">
              <div className="section-head">
                <div>
                  <h2>Dispute queue</h2>
                  <p className="section-copy">
                    Recent disputes that involve this provider profile.
                  </p>
                </div>
              </div>
              {performance && performance.disputes.length > 0 ? (
                <div className="listing-grid">
                  {performance.disputes.map((dispute) => (
                    <article className="listing-card" key={dispute.id}>
                      <div className="listing-topline">
                        <span className="pill">{dispute.status}</span>
                      </div>
                      <h3>{dispute.reason}</h3>
                      <p className="listing-description">
                        Opened: {dispute.createdAt}
                      </p>
                      {dispute.resolvedAt ? (
                        <p className="listing-description">
                          Resolved: {dispute.resolvedAt}
                        </p>
                      ) : null}
                    </article>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>No disputes in the queue.</p>
                </div>
              )}
            </div>

            <div className="provider-section">
              <div className="section-head">
                <div>
                  <h2>Earnings and payouts</h2>
                  <p className="section-copy">
                    Provider earnings are credited when rentals are settled and
                    can be sent out through RazorpayX UPI payouts.
                  </p>
                </div>
              </div>
              {finance ? (
                <>
                  <p className="section-copy">
                    Recent provider earnings:{" "}
                    <strong>{finance.totalRecentEarnings.toFixed(2)}</strong>
                  </p>
                  <ProviderPayoutForm />
                  <div className="listing-grid">
                    {finance.earningsEntries.map((entry) => (
                      <article className="listing-card" key={entry.id}>
                        <div className="listing-topline">
                          <span className="pill">PROVIDER_EARNING</span>
                        </div>
                        <h3>{entry.amount.toFixed(2)}</h3>
                        <p className="listing-provider">{entry.description}</p>
                      </article>
                    ))}
                    {finance.payouts.map((payout) => (
                      <article className="listing-card" key={payout.id}>
                        <div className="listing-topline">
                          <span className="pill">PAYOUT</span>
                          <span className="pill muted">{payout.status}</span>
                        </div>
                        <h3>{payout.amount.toFixed(2)}</h3>
                        <p className="listing-provider">{payout.requestedAt}</p>
                        {payout.processedAt ? (
                          <p className="listing-description">
                            Processed: {payout.processedAt}
                          </p>
                        ) : null}
                        {payout.externalReference ? (
                          <p className="listing-description">
                            Ref: {payout.externalReference}
                          </p>
                        ) : null}
                        {payout.failureReason ? (
                          <p className="listing-description">
                            Failure: {payout.failureReason}
                          </p>
                        ) : null}
                      </article>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
