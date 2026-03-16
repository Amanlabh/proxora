import Link from "next/link";
import { redirect } from "next/navigation";
import { PlatformRole } from "@/generated/prisma";
import { getCurrentAppContext } from "@/lib/auth/get-current-app-context";
import {
  getAdminAuditSummary,
  getSystemOperationsSummary,
  getWalletSummary,
} from "@/lib/payments/service";
import { AdminInsightsPanel } from "../components/admin-insights-panel";
import { MetricCard } from "../components/metric-card";
import { AdminActivityPanel } from "../components/admin-activity-panel";
import { AdminSweepActions } from "./admin-actions";
import { RentalControlActions } from "../components/rental-control-actions";

export const dynamic = "force-dynamic";

function formatMoney(value: number, currencyCode: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 2,
  }).format(value);
}

export default async function AdminPage() {
  const { sessionUser, appUser } = await getCurrentAppContext();

  if (!sessionUser) {
    redirect("/auth/sign-in");
  }

  if (!appUser || appUser.role !== PlatformRole.ADMIN) {
    return (
      <main className="admin-page-shell">
        <section className="status-card">
          <div className="empty-state">
            <p>Admin access is required for this page.</p>
          </div>
        </section>
      </main>
    );
  }

  const [summary, adminWallet] = await Promise.all([
    getSystemOperationsSummary(),
    getWalletSummary(appUser.id),
  ]);
  const audit = await getAdminAuditSummary();

  return (
    <main className="admin-page-shell">
      <section className="hero-card">
        <p className="eyebrow">Admin Console</p>
        <h1>Operate rental lifecycle controls</h1>
        <p className="lead">
          Monitor active rentals, expiring sessions, and payout health. Manual
          sweep control remains available even when scheduled automation is not
          configured yet.
        </p>
      </section>

      <section className="status-card admin-dashboard-card">
        <div className="detail-grid provider-stats admin-metric-grid">
          <MetricCard
            title="Active rentals"
            value={`${summary.activeRentalCount}`}
          />
          <MetricCard
            title="Active sessions"
            value={`${summary.activeSessionCount}`}
          />
          <MetricCard
            title="Admin wallet"
            value={formatMoney(adminWallet.balance, adminWallet.currencyCode)}
          />
          <MetricCard
            title="Pending rentals"
            value={`${summary.pendingRentalCount}`}
          />
          <MetricCard
            title="Suspended rentals"
            value={`${summary.suspendedRentalCount}`}
          />
          <MetricCard
            title="Open disputes"
            value={`${summary.openDisputeCount}`}
          />
        </div>

        <AdminInsightsPanel
          currencyCode={adminWallet.currencyCode}
          dailyOperations={summary.dailyOperations}
          topModels={summary.topModels}
          topProviders={summary.topProviders}
        />

        <div className="provider-section">
          <div className="section-head">
            <div>
              <h2>Lifecycle sweep</h2>
              <p className="section-copy">
                Expires stale sessions and settles rentals that have passed
                their end time.
              </p>
            </div>
          </div>
          <AdminSweepActions />
        </div>

        <div className="provider-section">
          <div className="section-head">
            <div>
              <h2>Rentals ending soon</h2>
              <p className="section-copy">
                Active rentals that are within the next 15 minutes of expiry.
              </p>
            </div>
          </div>
          {summary.rentalsEndingSoon.length === 0 ? (
            <div className="empty-state">
              <p>No rentals are nearing expiry right now.</p>
            </div>
          ) : (
            <div className="listing-grid admin-listing-grid">
              {summary.rentalsEndingSoon.map((rental) => (
                <article className="listing-card" key={rental.id}>
                  <div className="listing-topline">
                    <span className="pill">ACTIVE</span>
                    <span className="pill muted">{rental.endsAt}</span>
                  </div>
                  <h3>{rental.listingTitle}</h3>
                  <p className="listing-provider">
                    Provider: {rental.providerDisplayName}
                  </p>
                  <p className="listing-description">
                    Renter: {rental.renterLabel}
                  </p>
                  <p className="listing-description">
                    Requests: {rental.totalRequests} | Cost:{" "}
                    {formatMoney(rental.totalCost, rental.currencyCode)}
                  </p>
                  <RentalControlActions
                    actions={[
                      {
                        label: "Suspend",
                        endpoint: `/api/admin/rentals/${rental.id}/suspend`,
                        tone: "secondary",
                      },
                      {
                        label: "Revoke",
                        endpoint: `/api/admin/rentals/${rental.id}/revoke`,
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
          )}
        </div>

        <div className="provider-section">
          <div className="section-head">
            <div>
              <h2>Recent payout health</h2>
              <p className="section-copy">
                Latest provider payouts and failure visibility.
              </p>
            </div>
          </div>
          {summary.recentPayouts.length === 0 ? (
            <div className="empty-state">
              <p>No payouts yet.</p>
            </div>
          ) : (
            <div className="listing-grid admin-listing-grid">
              {summary.recentPayouts.map((payout) => (
                <article className="listing-card" key={payout.id}>
                  <div className="listing-topline">
                    <span className="pill">{payout.status}</span>
                    <span className="pill muted">
                      {payout.providerDisplayName}
                    </span>
                  </div>
                  <h3>{formatMoney(payout.amount, payout.currencyCode)}</h3>
                  <p className="listing-provider">{payout.requestedAt}</p>
                  {payout.failureReason ? (
                    <p className="listing-description">
                      Failure: {payout.failureReason}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          )}
        </div>

        <AdminActivityPanel
          auditLogs={audit.recentAuditLogs}
          disputes={audit.disputes}
        />
      </section>
    </main>
  );
}
