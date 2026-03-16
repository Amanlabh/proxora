"use client";

import { useState } from "react";

export function DisputeForm({ rentalId }: { rentalId: string }) {
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage(null);

    const response = await fetch("/api/disputes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rentalId,
        reason,
      }),
    });

    const payload = (await response.json()) as { error?: string };
    setSubmitting(false);

    if (!response.ok) {
      setMessage(payload.error ?? "Failed to open dispute.");
      return;
    }

    setReason("");
    setMessage("Dispute opened. Refresh the dashboard to see it listed.");
  }

  return (
    <form className="listing-form" onSubmit={handleSubmit}>
      <label>
        Report an issue
        <textarea
          minLength={10}
          required
          rows={4}
          value={reason}
          onChange={(event) => setReason(event.target.value)}
        />
      </label>
      <button
        className="submit-button secondary"
        disabled={submitting}
        type="submit"
      >
        {submitting ? "Submitting..." : "Open dispute"}
      </button>
      {message ? <p className="form-message">{message}</p> : null}
    </form>
  );
}
