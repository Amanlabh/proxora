"use client";

import { useState } from "react";

export function ProviderPayoutForm() {
  const [amount, setAmount] = useState("");
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [beneficiaryEmail, setBeneficiaryEmail] = useState("");
  const [upiId, setUpiId] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    const response = await fetch("/api/provider/payouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount ? Number(amount) : undefined,
        beneficiaryName,
        beneficiaryEmail,
        upiId,
      }),
    });

    const payload = (await response.json()) as { error?: string };
    setMessage(
      response.ok
        ? "Payout request created. Refresh to see it listed."
        : (payload.error ?? "Payout request failed."),
    );
  }

  return (
    <form className="listing-form" onSubmit={handleSubmit}>
      <label>
        Beneficiary name
        <input
          required
          type="text"
          value={beneficiaryName}
          onChange={(event) => setBeneficiaryName(event.target.value)}
        />
      </label>
      <label>
        Beneficiary email
        <input
          type="email"
          value={beneficiaryEmail}
          onChange={(event) => setBeneficiaryEmail(event.target.value)}
        />
      </label>
      <label>
        UPI ID
        <input
          required
          placeholder="name@bank"
          type="text"
          value={upiId}
          onChange={(event) => setUpiId(event.target.value)}
        />
      </label>
      <label>
        Optional payout amount
        <input
          min="0"
          step="0.01"
          type="number"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
      </label>
      <button className="submit-button" type="submit">
        Execute payout
      </button>
      {message ? <p className="form-message">{message}</p> : null}
    </form>
  );
}
