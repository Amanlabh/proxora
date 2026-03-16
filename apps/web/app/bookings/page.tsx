import { redirect } from "next/navigation";
import { RentalStatus } from "@/generated/prisma";
import { getCurrentAppContext } from "@/lib/auth/get-current-app-context";
import { listRenterBookings } from "@/lib/payments/service";
import { MetricCard } from "../components/metric-card";
import { BookingActions } from "../wallet/booking-actions";

export const dynamic = "force-dynamic";

function formatMoney(value: number, currencyCode: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 2,
  }).format(value);
}

export default async function BookingsPage() {
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

  const bookings = await listRenterBookings(appUser.id);
  const currencyCode = bookings[0]?.currencyCode ?? "USD";
  const pendingCount = bookings.filter(
    (booking) => booking.status === RentalStatus.PENDING,
  ).length;
  const activeCount = bookings.filter(
    (booking) => booking.status === RentalStatus.ACTIVE,
  ).length;
  const completedCount = bookings.filter(
    (booking) => booking.status === RentalStatus.COMPLETED,
  ).length;
  const totalBookedValue = bookings.reduce(
    (sum, booking) => sum + booking.bookedPrice,
    0,
  );

  return (
    <main className="page-shell">
      <section className="hero-card">
        <p className="eyebrow">Bookings</p>
        <h1>Manage your booked rental sessions</h1>
        <p className="lead">
          Activate pending bookings, open live workspaces, and track booking
          status without going through the wallet page.
        </p>
      </section>

      <section className="status-card">
        <div className="listing-grid">
          <MetricCard title="Pending" value={`${pendingCount}`} />
          <MetricCard title="Active" value={`${activeCount}`} />
          <MetricCard title="Completed" value={`${completedCount}`} />
          <MetricCard
            title="Booked value"
            value={formatMoney(totalBookedValue, currencyCode)}
          />
        </div>

        <div className="provider-section">
          <h2>Your bookings</h2>
          <p className="section-copy">
            Pending bookings can be activated directly from here. Active
            bookings open into the rental workspace.
          </p>
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
                    Booked:{" "}
                    {formatMoney(booking.bookedPrice, booking.currencyCode)}
                  </p>
                  <p className="listing-description">
                    Window: {booking.startsAt ?? "Not started"} to{" "}
                    {booking.endsAt ?? "Not scheduled"}
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
      </section>
    </main>
  );
}
