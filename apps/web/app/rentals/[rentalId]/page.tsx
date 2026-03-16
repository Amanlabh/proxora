import Link from "next/link";
import { redirect } from "next/navigation";
import { DisputeForm } from "../../components/dispute-form";
import { getCurrentAppContext } from "@/lib/auth/get-current-app-context";
import { getRenterRentalWorkspace } from "@/lib/payments/service";
import { RentalWorkspace } from "./rental-workspace";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    rentalId: string;
  }>;
};

function formatMoney(value: number, currencyCode: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 2,
  }).format(value);
}

export default async function RentalWorkspacePage({ params }: PageProps) {
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

  const { rentalId } = await params;
  const rental = await getRenterRentalWorkspace(appUser.id, rentalId);

  return (
    <main className="rental-page-shell">
      <section className="rental-app-shell">
        <div className="rental-app-topbar">
          <div className="rental-app-titleblock">
            <p className="eyebrow">Rental Workspace</p>
            <h1>{rental.listing.title}</h1>
            <p className="section-copy">
              Provider: <strong>{rental.providerDisplayName}</strong> | Model
              family: <strong>{rental.listing.modelFamily}</strong>
            </p>
          </div>
          <div className="rental-app-actions">
            <span className="pill">{rental.status}</span>
            <span className="pill muted">
              {formatMoney(rental.totalCost, rental.currencyCode)}
            </span>
            <Link className="action-link" href="/bookings">
              Back to bookings
            </Link>
            <Link
              className="action-link"
              href={`/marketplace/${rental.listing.slug}`}
            >
              View listing
            </Link>
          </div>
        </div>

        <RentalWorkspace rental={rental} />

        <div className="rental-bottom-bar">
          <div className="rental-bottom-stats">
            <div className="workspace-header-stat">
              <span>Booked</span>
              <strong>
                {formatMoney(rental.bookedPrice, rental.currencyCode)}
              </strong>
            </div>
            <div className="workspace-header-stat">
              <span>Requests</span>
              <strong>{rental.totalRequests}</strong>
            </div>
            <div className="workspace-header-stat">
              <span>Tokens</span>
              <strong>
                {rental.totalInputTokens + rental.totalOutputTokens}
              </strong>
            </div>
            <div className="workspace-header-stat">
              <span>Window</span>
              <strong>{rental.endsAt ?? "Not set"}</strong>
            </div>
          </div>
          <div className="rental-dispute-panel">
            <h2>Issue resolution</h2>
            <p className="section-copy">
              Open a dispute if the rental behaved incorrectly or access was
              interrupted unexpectedly.
            </p>
            <DisputeForm rentalId={rental.id} />
          </div>
        </div>
      </section>
    </main>
  );
}
