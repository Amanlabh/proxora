"use client";

import { useState } from "react";

export function AdminSweepActions() {
  const [message, setMessage] = useState<string | null>(null);
  const [running, setRunning] = useState(false);

  async function runSweep() {
    setRunning(true);
    setMessage(null);

    const response = await fetch("/api/system/rentals/sweep", {
      method: "POST",
    });
    const payload = (await response.json()) as {
      error?: string;
      data?: {
        expiredSessionCount: number;
        settledRentalCount: number;
      };
    };

    setRunning(false);

    if (!response.ok || !payload.data) {
      setMessage(payload.error ?? "Sweep failed.");
      return;
    }

    setMessage(
      `Sweep completed. Expired sessions: ${payload.data.expiredSessionCount}. Settled rentals: ${payload.data.settledRentalCount}. Refresh to see updated totals.`,
    );
  }

  return (
    <div className="booking-actions">
      <button
        className="submit-button"
        disabled={running}
        onClick={() => void runSweep()}
        type="button"
      >
        {running ? "Running sweep..." : "Run rental sweep"}
      </button>
      {message ? <p className="form-message">{message}</p> : null}
    </div>
  );
}
