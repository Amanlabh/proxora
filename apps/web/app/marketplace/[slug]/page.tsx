import Link from "next/link";
import { notFound } from "next/navigation";
import { getCurrentAppContext } from "@/lib/auth/get-current-app-context";
import { getWalletSummary } from "@/lib/payments/service";
import { getPublicListingBySlug } from "@/lib/listings/service";
import { BookingPanel } from "./booking-panel";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatMoney(value: number, currencyCode: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 2,
  }).format(value);
}

export default async function ListingDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const listing = await getPublicListingBySlug(slug).catch(() => null);
  const { sessionUser, appUser } = await getCurrentAppContext();

  if (!listing) {
    notFound();
  }

  const wallet = appUser ? await getWalletSummary(appUser.id) : null;

  return (
    <main className="page-shell">
      <section className="hero-card">
        <p className="eyebrow">Listing Detail</p>
        <h1>{listing.title}</h1>
        <p className="lead">
          {listing.description ??
            "No description has been added to this listing yet."}
        </p>
      </section>

      <section className="status-card detail-card">
        <div className="detail-grid">
          <div>
            <h2>Overview</h2>
            <ul>
              <li>
                Provider: {listing.providerDisplayName ?? "Unknown provider"}
              </li>
              <li>Provider type: {listing.providerType}</li>
              <li>Model family: {listing.modelFamily}</li>
              <li>Allowed models: {listing.allowedModels.join(", ")}</li>
              {listing.freeTier?.enabled ? <li>Free tier: Enabled</li> : null}
            </ul>
          </div>
          <div>
            <h2>Limits</h2>
            <ul>
              <li>
                Price: {formatMoney(listing.hourlyPrice, listing.currencyCode)}
                /hour
              </li>
              <li>Concurrency limit: {listing.concurrencyLimit}</li>
              <li>
                Request limit:{" "}
                {listing.requestLimit
                  ? `${listing.requestLimit} requests`
                  : "Not set"}
              </li>
              <li>
                Spend cap:{" "}
                {listing.spendCap
                  ? formatMoney(listing.spendCap, listing.currencyCode)
                  : "Not set"}
              </li>
              {listing.freeTier?.tokenCap ? (
                <li>Free token cap: {listing.freeTier.tokenCap}</li>
              ) : null}
              {listing.freeTier?.requestCap ? (
                <li>Free request cap: {listing.freeTier.requestCap}</li>
              ) : null}
            </ul>
          </div>
        </div>
        <div className="provider-section">
          <h2>Book this listing</h2>
          {!sessionUser ? (
            <div className="empty-state">
              <p>Sign in to create a booking.</p>
            </div>
          ) : !wallet ? (
            <div className="empty-state">
              <p>Wallet setup is not ready yet for this user.</p>
            </div>
          ) : (
            <>
              <p className="section-copy">
                Wallet available balance:{" "}
                <strong>
                  {formatMoney(wallet.availableBalance, wallet.currencyCode)}
                </strong>
              </p>
              <p className="section-copy">
                Need credits first? Visit your{" "}
                <Link href="/wallet">wallet</Link>.
              </p>
              <BookingPanel
                currencyCode={listing.currencyCode}
                listingId={listing.id}
                title={listing.title}
                freeTier={listing.freeTier}
              />
            </>
          )}
        </div>
        <Link className="action-link" href="/marketplace">
          Back to marketplace
        </Link>
      </section>
    </main>
  );
}
