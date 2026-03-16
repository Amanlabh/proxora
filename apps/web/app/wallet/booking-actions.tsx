"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function BookingActions({
  rentalId,
  status,
}: {
  rentalId: string;
  status: string;
}) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [busyAction, setBusyAction] = useState<string | null>(null);

  async function runAction(action: "activate" | "cancel" | "complete") {
    setBusyAction(action);
    setMessage(null);

    const response = await fetch(`/api/bookings/${rentalId}/${action}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: action === "complete" ? JSON.stringify({}) : undefined,
    });

    const payload = (await response.json()) as {
      error?: string;
      data?: {
        sessionToken?: string;
      };
    };
    setBusyAction(null);

    if (!response.ok) {
      setMessage(payload.error ?? "Booking action failed.");
      return;
    }

    if (action === "activate") {
      router.push(`/rentals/${rentalId}`);
      router.refresh();
      return;
    }

    setMessage(
      `Booking ${action}d successfully. Refresh to see updated state.`,
    );
  }

  return (
    <div className="booking-actions">
      {status === "PENDING" ? (
        <>
          <button
            className="submit-button"
            disabled={busyAction !== null}
            onClick={() => runAction("activate")}
            type="button"
          >
            Activate
          </button>
          <button
            className="submit-button secondary"
            disabled={busyAction !== null}
            onClick={() => runAction("cancel")}
            type="button"
          >
            Cancel
          </button>
        </>
      ) : null}
      {status === "ACTIVE" ? (
        <>
          <Link className="action-link" href={`/rentals/${rentalId}`}>
            Open workspace
          </Link>
          <button
            className="submit-button"
            disabled={busyAction !== null}
            onClick={() => runAction("complete")}
            type="button"
          >
            Complete and settle
          </button>
        </>
      ) : null}
      {message ? <p className="form-message">{message}</p> : null}
    </div>
  );
}
