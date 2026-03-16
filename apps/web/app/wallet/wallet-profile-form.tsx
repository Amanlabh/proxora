"use client";

import { useState } from "react";

type WalletProfile = {
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
} | null;

type WalletProfileFormProps = {
  existingProfile: WalletProfile;
};

export function WalletProfileForm({ existingProfile }: WalletProfileFormProps) {
  const [formState, setFormState] = useState({
    legalName: existingProfile?.legalName ?? "",
    billingEmail: existingProfile?.billingEmail ?? "",
    companyName: existingProfile?.companyName ?? "",
    taxId: existingProfile?.taxId ?? "",
    countryCode: existingProfile?.countryCode ?? "",
    addressLine1: existingProfile?.addressLine1 ?? "",
    addressLine2: existingProfile?.addressLine2 ?? "",
    city: existingProfile?.city ?? "",
    stateRegion: existingProfile?.stateRegion ?? "",
    postalCode: existingProfile?.postalCode ?? "",
    usageAlertEmail: existingProfile?.usageAlertEmail ?? "",
    invoiceNotes: existingProfile?.invoiceNotes ?? "",
    purchaseOrderReference: existingProfile?.purchaseOrderReference ?? "",
  });
  const [submissionState, setSubmissionState] = useState<{
    status: "idle" | "submitting" | "success" | "error";
    message?: string;
  }>({ status: "idle" });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmissionState({ status: "submitting" });

    const response = await fetch("/api/wallet/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formState,
        countryCode: formState.countryCode.toUpperCase(),
      }),
    });

    const payload = (await response.json()) as { error?: string };

    if (!response.ok) {
      setSubmissionState({
        status: "error",
        message: payload.error ?? "Wallet profile update failed.",
      });
      return;
    }

    setSubmissionState({
      status: "success",
      message: "Billing and wallet profile updated successfully.",
    });
  }

  return (
    <form className="listing-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>
          Legal name
          <input
            required
            value={formState.legalName}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                legalName: event.target.value,
              }))
            }
          />
        </label>
        <label>
          Billing email
          <input
            required
            type="email"
            value={formState.billingEmail}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                billingEmail: event.target.value,
              }))
            }
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          Company name
          <input
            value={formState.companyName}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                companyName: event.target.value,
              }))
            }
          />
        </label>
        <label>
          Tax ID
          <input
            value={formState.taxId}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                taxId: event.target.value,
              }))
            }
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          Country code
          <input
            maxLength={2}
            required
            value={formState.countryCode}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                countryCode: event.target.value.toUpperCase(),
              }))
            }
          />
        </label>
        <label>
          Purchase order reference
          <input
            value={formState.purchaseOrderReference}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                purchaseOrderReference: event.target.value,
              }))
            }
          />
        </label>
      </div>
      <label>
        Address line 1
        <input
          required
          value={formState.addressLine1}
          onChange={(event) =>
            setFormState((current) => ({
              ...current,
              addressLine1: event.target.value,
            }))
          }
        />
      </label>
      <label>
        Address line 2
        <input
          value={formState.addressLine2}
          onChange={(event) =>
            setFormState((current) => ({
              ...current,
              addressLine2: event.target.value,
            }))
          }
        />
      </label>
      <div className="form-row">
        <label>
          City
          <input
            required
            value={formState.city}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                city: event.target.value,
              }))
            }
          />
        </label>
        <label>
          State / Region
          <input
            required
            value={formState.stateRegion}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                stateRegion: event.target.value,
              }))
            }
          />
        </label>
        <label>
          Postal code
          <input
            required
            value={formState.postalCode}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                postalCode: event.target.value,
              }))
            }
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          Usage alert email
          <input
            type="email"
            value={formState.usageAlertEmail}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                usageAlertEmail: event.target.value,
              }))
            }
          />
        </label>
      </div>
      <label>
        Invoice notes
        <textarea
          rows={3}
          value={formState.invoiceNotes}
          onChange={(event) =>
            setFormState((current) => ({
              ...current,
              invoiceNotes: event.target.value,
            }))
          }
        />
      </label>
      <button
        className="submit-button"
        disabled={submissionState.status === "submitting"}
      >
        {submissionState.status === "submitting"
          ? "Saving wallet profile..."
          : "Save wallet profile"}
      </button>
      {submissionState.message ? (
        <p
          className={
            submissionState.status === "error"
              ? "form-message error"
              : "form-message"
          }
        >
          {submissionState.message}
        </p>
      ) : null}
    </form>
  );
}
