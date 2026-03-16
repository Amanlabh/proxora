"use client";

import { useState } from "react";

type ListingCreationFormProps = {
  activeCredentials: Array<{
    id: string;
    label: string;
    providerType: string;
  }>;
  providerOptions: string[];
};

const initialFormState = {
  providerCredentialId: "",
  title: "",
  description: "",
  providerType: "OPENAI_COMPATIBLE",
  modelFamily: "",
  allowedModels: "",
  currencyCode: "USD",
  hourlyPrice: "10",
  platformFeeRate: "0.2",
  providerRevenueRate: "0.8",
  requestLimit: "",
  spendCap: "",
  concurrencyLimit: "1",
  listingStatus: "DRAFT",
  visibilityStatus: "PRIVATE",
  freeTierEnabled: false,
  freeTokenCap: "30000",
  freeRequestCap: "100",
  freeMaxDurationHours: "1",
};

export function ListingCreationForm({
  activeCredentials,
  providerOptions,
}: ListingCreationFormProps) {
  const [formState, setFormState] = useState({
    ...initialFormState,
    providerCredentialId: activeCredentials[0]?.id ?? "",
    providerType:
      activeCredentials[0]?.providerType ?? initialFormState.providerType,
  });
  const [submissionState, setSubmissionState] = useState<{
    status: "idle" | "submitting" | "success" | "error";
    message?: string;
  }>({
    status: "idle",
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmissionState({ status: "submitting" });

    const response = await fetch("/api/provider/listings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        providerCredentialId: formState.providerCredentialId,
        title: formState.title,
        description: formState.description || undefined,
        providerType: formState.providerType,
        modelFamily: formState.modelFamily,
        allowedModels: formState.allowedModels
          .split(",")
          .map((model) => model.trim())
          .filter(Boolean),
        currencyCode: formState.currencyCode,
        hourlyPrice: formState.hourlyPrice,
        platformFeeRate: formState.platformFeeRate,
        providerRevenueRate: formState.providerRevenueRate,
        requestLimit: formState.requestLimit || undefined,
        spendCap: formState.spendCap || undefined,
        concurrencyLimit: formState.concurrencyLimit,
        listingStatus: formState.listingStatus,
        visibilityStatus: formState.visibilityStatus,
        freeTierEnabled: formState.freeTierEnabled,
        freeTokenCap: formState.freeTokenCap
          ? Number(formState.freeTokenCap)
          : undefined,
        freeRequestCap: formState.freeRequestCap
          ? Number(formState.freeRequestCap)
          : undefined,
        freeMaxDurationHours: formState.freeMaxDurationHours
          ? Number(formState.freeMaxDurationHours)
          : undefined,
      }),
    });

    const payload = (await response.json()) as {
      data?: { slug: string };
      error?: string;
    };

    if (!response.ok) {
      setSubmissionState({
        status: "error",
        message: payload.error ?? "Listing creation failed.",
      });
      return;
    }

    setSubmissionState({
      status: "success",
      message: `Listing created successfully with slug "${payload.data?.slug}".`,
    });
    setFormState({
      ...initialFormState,
      providerCredentialId: activeCredentials[0]?.id ?? "",
      providerType:
        activeCredentials[0]?.providerType ?? initialFormState.providerType,
    });
  }

  function updateField(name: string, value: string) {
    setFormState((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function applyFreeTierPreset() {
    setFormState((current) => ({
      ...current,
      hourlyPrice: "0",
      listingStatus: "ACTIVE",
      visibilityStatus: "PUBLIC",
      freeTierEnabled: true,
    }));
  }

  function clearFreeTierPreset() {
    setFormState((current) => ({
      ...current,
      freeTierEnabled: false,
      freeTokenCap: "",
      freeRequestCap: "",
      freeMaxDurationHours: "1",
    }));
  }

  return (
    <form className="listing-form" onSubmit={handleSubmit}>
      <label>
        Provider credential ID
        <select
          disabled={activeCredentials.length === 0}
          value={formState.providerCredentialId}
          onChange={(event) =>
            updateField("providerCredentialId", event.target.value)
          }
        >
          {activeCredentials.length === 0 ? (
            <option value="">No active credentials available</option>
          ) : (
            activeCredentials.map((credential) => (
              <option key={credential.id} value={credential.id}>
                {credential.label} ({credential.providerType})
              </option>
            ))
          )}
        </select>
      </label>
      <label>
        Title
        <input
          required
          value={formState.title}
          onChange={(event) => updateField("title", event.target.value)}
        />
      </label>
      <label>
        Description
        <textarea
          rows={5}
          value={formState.description}
          onChange={(event) => updateField("description", event.target.value)}
        />
      </label>
      <label>
        Provider type
        <select
          disabled={activeCredentials.length > 0}
          value={formState.providerType}
          onChange={(event) => updateField("providerType", event.target.value)}
        >
          {providerOptions.map((providerType) => (
            <option key={providerType} value={providerType}>
              {providerType}
            </option>
          ))}
        </select>
      </label>
      <label>
        Model family
        <input
          required
          placeholder="gpt-4"
          value={formState.modelFamily}
          onChange={(event) => updateField("modelFamily", event.target.value)}
        />
      </label>
      <label>
        Allowed models
        <input
          required
          placeholder="gpt-4o, gpt-4.1"
          value={formState.allowedModels}
          onChange={(event) => updateField("allowedModels", event.target.value)}
        />
      </label>
      <div className="form-row">
        <label>
          Currency
          <input
            maxLength={3}
            value={formState.currencyCode}
            onChange={(event) =>
              updateField("currencyCode", event.target.value)
            }
          />
        </label>
        <label>
          Hourly price
          <input
            min="0"
            required
            step="0.01"
            type="number"
            value={formState.hourlyPrice}
            onChange={(event) => updateField("hourlyPrice", event.target.value)}
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          Platform fee rate
          <input
            min="0"
            max="1"
            required
            step="0.01"
            type="number"
            value={formState.platformFeeRate}
            onChange={(event) =>
              updateField("platformFeeRate", event.target.value)
            }
          />
        </label>
        <label>
          Provider revenue rate
          <input
            min="0"
            max="1"
            required
            step="0.01"
            type="number"
            value={formState.providerRevenueRate}
            onChange={(event) =>
              updateField("providerRevenueRate", event.target.value)
            }
          />
        </label>
      </div>
      <div className="listing-divider" />
      <label className="checkbox-field">
        <input
          type="checkbox"
          checked={formState.freeTierEnabled}
          onChange={(event) =>
            setFormState((current) => ({
              ...current,
              freeTierEnabled: event.target.checked,
            }))
          }
        />
        Enable Free Tier limits
      </label>
      <div className="home-actions">
        <button
          className="submit-button secondary"
          type="button"
          onClick={applyFreeTierPreset}
        >
          Apply Free Tier Preset
        </button>
        <button
          className="submit-button secondary"
          type="button"
          onClick={clearFreeTierPreset}
        >
          Clear Free Tier
        </button>
      </div>
      <div className="form-row">
        <label>
          Free token cap
          <input
            min="1"
            step="1"
            type="number"
            value={formState.freeTokenCap}
            onChange={(event) =>
              updateField("freeTokenCap", event.target.value)
            }
          />
        </label>
        <label>
          Free request cap
          <input
            min="1"
            step="1"
            type="number"
            value={formState.freeRequestCap}
            onChange={(event) =>
              updateField("freeRequestCap", event.target.value)
            }
          />
        </label>
      </div>
      <label>
        Max free duration (hours)
        <input
          min="1"
          step="1"
          type="number"
          value={formState.freeMaxDurationHours}
          onChange={(event) =>
            updateField("freeMaxDurationHours", event.target.value)
          }
        />
      </label>
      <div className="form-row">
        <label>
          Request limit
          <input
            min="1"
            step="1"
            type="number"
            value={formState.requestLimit}
            onChange={(event) =>
              updateField("requestLimit", event.target.value)
            }
          />
        </label>
        <label>
          Spend cap
          <input
            min="0"
            step="0.01"
            type="number"
            value={formState.spendCap}
            onChange={(event) => updateField("spendCap", event.target.value)}
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          Concurrency limit
          <input
            min="1"
            step="1"
            type="number"
            value={formState.concurrencyLimit}
            onChange={(event) =>
              updateField("concurrencyLimit", event.target.value)
            }
          />
        </label>
        <label>
          Listing status
          <select
            value={formState.listingStatus}
            onChange={(event) =>
              updateField("listingStatus", event.target.value)
            }
          >
            <option value="DRAFT">DRAFT</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="PAUSED">PAUSED</option>
          </select>
        </label>
      </div>
      <label>
        Visibility
        <select
          value={formState.visibilityStatus}
          onChange={(event) =>
            updateField("visibilityStatus", event.target.value)
          }
        >
          <option value="PRIVATE">PRIVATE</option>
          <option value="PUBLIC">PUBLIC</option>
          <option value="UNLISTED">UNLISTED</option>
        </select>
      </label>
      <button
        className="submit-button"
        disabled={submissionState.status === "submitting"}
      >
        {submissionState.status === "submitting"
          ? "Creating..."
          : "Create listing"}
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
