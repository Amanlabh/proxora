import Link from "next/link";
import { listPublicListings } from "@/lib/listings/service";

export const revalidate = 60;

type PageProps = {
  searchParams?: Promise<{
    free?: string;
  }>;
};

function formatMoney(value: number, currencyCode: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 2,
  }).format(value);
}

export default async function MarketplacePage({ searchParams }: PageProps) {
  const params = searchParams ? await searchParams : undefined;
  const showFreeOnly = params?.free === "true";
  const listings = await listPublicListings().catch(() => []);
  const visibleListings = showFreeOnly
    ? listings.filter((listing) => listing.freeTier?.enabled)
    : listings;

  return (
    <main className="page-shell">
      <section className="hero-card">
        <p className="eyebrow">Marketplace</p>
        <h1>Browse rentable AI listings</h1>
        <p className="lead">
          Public listings appear here once providers publish them with active
          credentials and a visible marketplace status.
        </p>
      </section>

      <section className="status-card">
        <div className="section-head">
          <div>
            <h2>Available listings</h2>
            <p className="section-copy">
              The current implementation exposes public active listings only.
              {showFreeOnly ? " Showing free-tier listings only." : ""}
            </p>
          </div>
          <div className="home-actions">
            <Link
              className={
                showFreeOnly ? "action-link" : "submit-button secondary"
              }
              href="/marketplace"
            >
              All listings
            </Link>
            <Link
              className={
                showFreeOnly ? "submit-button secondary" : "action-link"
              }
              href="/marketplace?free=true"
            >
              Free tier
            </Link>
            <Link className="action-link" href="/provider/listings/new">
              Create listing
            </Link>
          </div>
        </div>

        {visibleListings.length === 0 ? (
          <div className="empty-state">
            <p>
              {showFreeOnly
                ? "No free-tier listings yet."
                : "No public listings yet."}
            </p>
            <p>
              Phase 4 currently provides the creation and read layer. Once
              credentials and auth are wired end-to-end, providers can publish
              live inventory here.
            </p>
          </div>
        ) : (
          <div className="listing-grid">
            {visibleListings.map((listing) => (
              <article className="listing-card" key={listing.id}>
                <div className="listing-topline">
                  <span className="pill">{listing.providerType}</span>
                  {listing.freeTier?.enabled ? (
                    <span className="pill free-tier">FREE</span>
                  ) : null}
                  <span className="pill muted">{listing.modelFamily}</span>
                </div>
                <h3>{listing.title}</h3>
                <p className="listing-provider">
                  {listing.providerDisplayName ?? "Unknown provider"}
                </p>
                <p className="listing-description">
                  {listing.description ?? "No description provided yet."}
                </p>
                <div className="listing-meta">
                  <strong>
                    {formatMoney(listing.hourlyPrice, listing.currencyCode)}
                    /hour
                  </strong>
                  <span>{listing.allowedModels.join(", ")}</span>
                </div>
                <Link
                  className="action-link"
                  href={`/marketplace/${listing.slug}`}
                >
                  View details
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
