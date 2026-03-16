"use client";

import { useState } from "react";

type ExistingProfile = {
  displayName: string;
  legalName: string;
  bio: string;
  countryCode: string;
  status: string;
  metadata: {
    businessType?: string | null;
    websiteUrl?: string | null;
    supportEmail?: string | null;
    supportChannel?: string | null;
    companyRegistrationNumber?: string | null;
    taxId?: string | null;
    billingContact?: {
      name?: string | null;
      email?: string | null;
    } | null;
    technicalContact?: {
      name?: string | null;
      email?: string | null;
    } | null;
  } | null;
} | null;

type ProfileFormProps = {
  existingProfile: ExistingProfile;
};

export function ProfileForm({ existingProfile }: ProfileFormProps) {
  const [formState, setFormState] = useState({
    displayName: existingProfile?.displayName ?? "",
    legalName: existingProfile?.legalName ?? "",
    bio: existingProfile?.bio ?? "",
    countryCode: existingProfile?.countryCode ?? "",
    businessType: existingProfile?.metadata?.businessType ?? "BUSINESS",
    websiteUrl: existingProfile?.metadata?.websiteUrl ?? "",
    supportEmail: existingProfile?.metadata?.supportEmail ?? "",
    supportChannel: existingProfile?.metadata?.supportChannel ?? "",
    companyRegistrationNumber:
      existingProfile?.metadata?.companyRegistrationNumber ?? "",
    taxId: existingProfile?.metadata?.taxId ?? "",
    billingContactName: existingProfile?.metadata?.billingContact?.name ?? "",
    billingContactEmail: existingProfile?.metadata?.billingContact?.email ?? "",
    technicalContactName:
      existingProfile?.metadata?.technicalContact?.name ?? "",
    technicalContactEmail:
      existingProfile?.metadata?.technicalContact?.email ?? "",
  });
  const [submissionState, setSubmissionState] = useState<{
    status: "idle" | "submitting" | "success" | "error";
    message?: string;
  }>({ status: "idle" });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmissionState({ status: "submitting" });

    const response = await fetch("/api/provider/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formState,
      }),
    });

    const payload = (await response.json()) as { error?: string };

    if (!response.ok) {
      setSubmissionState({
        status: "error",
        message: payload.error ?? "Provider profile creation failed.",
      });
      return;
    }

    setSubmissionState({
      status: "success",
      message: existingProfile
        ? "Provider profile updated successfully."
        : "Provider profile created. Refresh the page to load credentials setup.",
    });
  }

  return (
    <form className="listing-form" onSubmit={handleSubmit}>
      <label>
        Display name
        <input
          required
          value={formState.displayName}
          onChange={(event) =>
            setFormState((current) => ({
              ...current,
              displayName: event.target.value,
            }))
          }
        />
      </label>
      <label>
        Legal name
        <input
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
        Provider class
        <select
          value={formState.businessType}
          onChange={(event) =>
            setFormState((current) => ({
              ...current,
              businessType: event.target.value,
            }))
          }
        >
          <option value="INDIVIDUAL">Individual provider</option>
          <option value="BUSINESS">Business / studio</option>
        </select>
      </label>
      <label>
        Country code
        <input
          maxLength={2}
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
        Website URL
        <input
          placeholder="https://your-company.com"
          value={formState.websiteUrl}
          onChange={(event) =>
            setFormState((current) => ({
              ...current,
              websiteUrl: event.target.value,
            }))
          }
        />
      </label>
      <div className="form-row">
        <label>
          Support email
          <input
            type="email"
            value={formState.supportEmail}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                supportEmail: event.target.value,
              }))
            }
          />
        </label>
        <label>
          Support channel
          <input
            placeholder="Slack, Zendesk, support portal"
            value={formState.supportChannel}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                supportChannel: event.target.value,
              }))
            }
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          Company registration number
          <input
            value={formState.companyRegistrationNumber}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                companyRegistrationNumber: event.target.value,
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
          Billing contact name
          <input
            value={formState.billingContactName}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                billingContactName: event.target.value,
              }))
            }
          />
        </label>
        <label>
          Billing contact email
          <input
            type="email"
            value={formState.billingContactEmail}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                billingContactEmail: event.target.value,
              }))
            }
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          Technical contact name
          <input
            value={formState.technicalContactName}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                technicalContactName: event.target.value,
              }))
            }
          />
        </label>
        <label>
          Technical contact email
          <input
            type="email"
            value={formState.technicalContactEmail}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                technicalContactEmail: event.target.value,
              }))
            }
          />
        </label>
      </div>
      <label>
        Bio
        <textarea
          rows={4}
          value={formState.bio}
          onChange={(event) =>
            setFormState((current) => ({
              ...current,
              bio: event.target.value,
            }))
          }
        />
      </label>
      <button
        className="submit-button"
        disabled={submissionState.status === "submitting"}
      >
        {submissionState.status === "submitting"
          ? existingProfile
            ? "Updating profile..."
            : "Creating profile..."
          : existingProfile
            ? "Update provider profile"
            : "Create provider profile"}
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
      ) : existingProfile ? (
        <p className="form-message">
          Existing profile status: <strong>{existingProfile.status}</strong>
        </p>
      ) : null}
    </form>
  );
}
