import { redirect } from "next/navigation";
import { clientEnv } from "@/env/client";
import { getCurrentAppContext } from "@/lib/auth/get-current-app-context";
import {
  getRenterDashboardSummary,
  getWalletSummary,
  listRenterBookings,
  listUserDisputes,
} from "@/lib/payments/service";
import { BookingActions } from "./booking-actions";
import { RenterOverview } from "./renter-overview";
import { WalletProfileForm } from "./wallet-profile-form";
import { WalletTopUpForm } from "./wallet-top-up-form";

export const dynamic = "force-dynamic";

function formatMoney(value: number, currencyCode: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 2,
  }).format(value);
}

export default async function WalletPage() {
  const { sessionUser, appUser } = await getCurrentAppContext();

  if (!sessionUser) {
    redirect("/auth/sign-in");
  }

  if (!appUser) {
    return (
      <main className="page-shell">
        <section className="status-card">
          <div className="empty-state">
            <p>No app user record is available for this session yet.</p>
          </div>
        </section>
      </main>
    );
  }

  const wallet = await getWalletSummary(appUser.id);
  const bookings = await listRenterBookings(appUser.id);
  const dashboard = await getRenterDashboardSummary(appUser.id);
  const disputes = await listUserDisputes(appUser.id, appUser.role);

  return (
    <main className="page-shell">
      <section className="hero-card">
        <p className="eyebrow">Wallet</p>
        <h1>Manage renter credits and bookings</h1>
        <p className="lead">
          Phase 5 uses a prepaid wallet and ledger-backed escrow holds so
          booking logic exists before external checkout providers are added.
        </p>
      </section>

      <section className="status-card">
        <div className="detail-grid provider-stats">
          <div className="listing-card">
            <h3>Balance</h3>
            <p className="listing-provider">
              {formatMoney(wallet.balance, wallet.currencyCode)}
            </p>
          </div>
          <div className="listing-card">
            <h3>Held</h3>
            <p className="listing-provider">
              {formatMoney(wallet.heldBalance, wallet.currencyCode)}
            </p>
          </div>
          <div className="listing-card">
            <h3>Available</h3>
            <p className="listing-provider">
              {formatMoney(wallet.availableBalance, wallet.currencyCode)}
            </p>
          </div>
        </div>
        <RenterOverview
          activeRentalCount={dashboard.activeRentalCount}
          completedRentalCount={dashboard.completedRentalCount}
          openDisputeCount={dashboard.openDisputeCount}
          topModels={dashboard.topModels}
          totalCharged={formatMoney(
            dashboard.totalCharged,
            dashboard.currencyCode,
          )}
          totalRequests={dashboard.totalRequests}
          totalTokens={dashboard.totalTokens}
        />

        <div className="provider-section">
          <h2>Billing and wallet profile</h2>
          <p className="section-copy">
            Store the billing identity and invoice details required for wallet
            operations and finance reconciliation.
          </p>
          <WalletProfileForm
            existingProfile={
              wallet.profile &&
              typeof wallet.profile === "object" &&
              !Array.isArray(wallet.profile)
                ? (wallet.profile as {
                    legalName?: string | null;
                    billingEmail?: string | null;
                    companyName?: string | null;
                    taxId?: string | null;
                    countryCode?: string | null;
                    addressLine1?: string | null;
                    addressLine2?: string | null;
                    city?: string | null;
                    stateRegion?: string | null;
                    postalCode?: string | null;
                    usageAlertEmail?: string | null;
                    invoiceNotes?: string | null;
                    purchaseOrderReference?: string | null;
                  })
                : null
            }
          />
        </div>

        <div className="provider-section">
          <h2>Top up wallet</h2>
          <p className="section-copy">
            Wallet funding now uses Razorpay test checkout.
          </p>
          <WalletTopUpForm
            razorpayKeyId={clientEnv.NEXT_PUBLIC_RAZORPAY_KEY_ID}
          />
        </div>

        <div className="provider-section">
          <h2>Recent ledger entries</h2>
          {wallet.recentEntries.length === 0 ? (
            <div className="empty-state">
              <p>No ledger entries yet.</p>
            </div>
          ) : (
            <div className="listing-grid">
              {wallet.recentEntries.map((entry) => (
                <article className="listing-card" key={entry.id}>
                  <div className="listing-topline">
                    <span className="pill">{entry.entryType}</span>
                    <span className="pill muted">{entry.direction}</span>
                  </div>
                  <h3>{formatMoney(entry.amount, entry.currencyCode)}</h3>
                  <p className="listing-provider">
                    {entry.description ?? "Ledger movement"}
                  </p>
                  <p className="listing-description">{entry.createdAt}</p>
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="provider-section">
          <h2>Bookings</h2>
          {bookings.length === 0 ? (
            <div className="empty-state">
              <p>No bookings yet.</p>
            </div>
          ) : (
            <div className="listing-grid">
              {bookings.map((booking) => (
                <article className="listing-card" key={booking.id}>
                  <div className="listing-topline">
                    <span className="pill">{booking.status}</span>
                    <span className="pill muted">{booking.duration}</span>
                  </div>
                  <h3>{booking.listing.title}</h3>
                  <p className="listing-provider">
                    Provider: {booking.providerDisplayName}
                  </p>
                  <p className="listing-description">
                    {formatMoney(booking.bookedPrice, booking.currencyCode)}
                  </p>
                  <p className="listing-description">
                    Requests: {booking.totalRequests} | Tokens:{" "}
                    {booking.totalInputTokens + booking.totalOutputTokens} |
                    Metered cost:{" "}
                    {formatMoney(booking.totalCost, booking.currencyCode)}
                  </p>
                  <BookingActions
                    rentalId={booking.id}
                    status={booking.status}
                  />
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="provider-section">
          <h2>Issue tracking</h2>
          {disputes.length === 0 ? (
            <div className="empty-state">
              <p>No disputes opened yet.</p>
            </div>
          ) : (
            <div className="listing-grid">
              {disputes.map((dispute) => (
                <article className="listing-card" key={dispute.id}>
                  <div className="listing-topline">
                    <span className="pill">{dispute.status}</span>
                  </div>
                  <h3>{dispute.reason}</h3>
                  <p className="listing-description">
                    {dispute.createdAt.toISOString()}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
