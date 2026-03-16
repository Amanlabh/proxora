"use client";

import { useState } from "react";

type ActionConfig = {
  label: string;
  endpoint: string;
  tone?: "primary" | "secondary";
};

export function RentalControlActions({ actions }: { actions: ActionConfig[] }) {
  const [busyLabel, setBusyLabel] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function runAction(action: ActionConfig) {
    const reason = window.prompt(
      `Optional reason for "${action.label.toLowerCase()}"`,
      "",
    );

    setBusyLabel(action.label);
    setMessage(null);

    const response = await fetch(action.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reason: reason || undefined,
      }),
    });

    const payload = (await response.json()) as { error?: string };
    setBusyLabel(null);

    if (!response.ok) {
      setMessage(payload.error ?? `${action.label} failed.`);
      return;
    }

    setMessage(`${action.label} completed. Refresh to see the updated state.`);
  }

  return (
    <div className="booking-actions">
      {actions.map((action) => (
        <button
          key={action.label}
          className={
            action.tone === "secondary"
              ? "submit-button secondary"
              : "submit-button"
          }
          disabled={busyLabel !== null}
          onClick={() => void runAction(action)}
          type="button"
        >
          {busyLabel === action.label ? `${action.label}...` : action.label}
        </button>
      ))}
      {message ? <p className="form-message">{message}</p> : null}
    </div>
  );
}
