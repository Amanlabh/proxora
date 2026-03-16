"use client";

import { useState } from "react";

type ExistingCredential = {
  id: string;
  label: string;
  providerType: string;
  status: string;
  supportedModels: string[];
  metadata?: {
    docsUrl?: string | null;
    consoleUrl?: string | null;
    rateLimits?: {
      requestsPerMinuteLimit?: number | null;
      tokensPerMinuteLimit?: number | null;
    } | null;
  } | null;
};

type CredentialFormProps = {
  disabled: boolean;
  existingCredentials: ExistingCredential[];
};

const initialCredentialState = {
  label: "",
  providerType: "OPENAI_COMPATIBLE",
  secret: "",
  supportedModels: "",
  baseUrl: "https://api.openai.com/v1",
  docsUrl: "",
  consoleUrl: "",
  inputCostPer1kTokens: "",
  outputCostPer1kTokens: "",
  requestsPerMinuteLimit: "",
  tokensPerMinuteLimit: "",
};

export function CredentialForm({
  disabled,
  existingCredentials,
}: CredentialFormProps) {
  const [formState, setFormState] = useState(initialCredentialState);
  const [submissionState, setSubmissionState] = useState<{
    status: "idle" | "submitting" | "success" | "error";
    message?: string;
  }>({ status: "idle" });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (disabled) {
      return;
    }

    setSubmissionState({ status: "submitting" });

    const response = await fetch("/api/provider/credentials", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        label: formState.label,
        providerType: formState.providerType,
        secret: formState.secret,
        supportedModels: formState.supportedModels
          .split(",")
          .map((value) => value.trim())
          .filter(Boolean),
        baseUrl: formState.baseUrl,
        docsUrl: formState.docsUrl,
        consoleUrl: formState.consoleUrl,
        inputCostPer1kTokens: formState.inputCostPer1kTokens
          ? Number(formState.inputCostPer1kTokens)
          : undefined,
        outputCostPer1kTokens: formState.outputCostPer1kTokens
          ? Number(formState.outputCostPer1kTokens)
          : undefined,
        requestsPerMinuteLimit: formState.requestsPerMinuteLimit
          ? Number(formState.requestsPerMinuteLimit)
          : undefined,
        tokensPerMinuteLimit: formState.tokensPerMinuteLimit
          ? Number(formState.tokensPerMinuteLimit)
          : undefined,
      }),
    });

    const payload = (await response.json()) as { error?: string };

    if (!response.ok) {
      setSubmissionState({
        status: "error",
        message: payload.error ?? "Credential creation failed.",
      });
      return;
    }

    setSubmissionState({
      status: "success",
      message:
        "Credential validated and created successfully. Refresh to load it into listings.",
    });
    setFormState(initialCredentialState);
  }

  return (
    <div className="provider-stack">
      <form className="listing-form" onSubmit={handleSubmit}>
        <label>
          Label
          <input
            disabled={disabled}
            required
            value={formState.label}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                label: event.target.value,
              }))
            }
          />
        </label>
        <label>
          Provider type
          <select
            disabled={disabled}
            value={formState.providerType}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                providerType: event.target.value,
              }))
            }
          >
            <option value="OPENAI_COMPATIBLE">OPENAI_COMPATIBLE</option>
            <option value="ANTHROPIC">ANTHROPIC</option>
            <option value="GOOGLE">GOOGLE</option>
            <option value="OTHER">OTHER</option>
          </select>
        </label>
        <label>
          Secret
          <input
            disabled={disabled}
            required
            type="password"
            value={formState.secret}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                secret: event.target.value,
              }))
            }
          />
        </label>
        <label>
          Supported models
          <input
            disabled={disabled}
            required
            placeholder="gpt-4o, gpt-4.1"
            value={formState.supportedModels}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                supportedModels: event.target.value,
              }))
            }
          />
        </label>
        <label>
          Base URL
          <input
            disabled={disabled}
            placeholder="https://api.openai.com/v1"
            value={formState.baseUrl}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                baseUrl: event.target.value,
              }))
            }
          />
        </label>
        <div className="form-row">
          <label>
            Docs URL
            <input
              disabled={disabled}
              placeholder="https://docs.provider.com"
              value={formState.docsUrl}
              onChange={(event) =>
                setFormState((current) => ({
                  ...current,
                  docsUrl: event.target.value,
                }))
              }
            />
          </label>
          <label>
            Console URL
            <input
              disabled={disabled}
              placeholder="https://console.provider.com"
              value={formState.consoleUrl}
              onChange={(event) =>
                setFormState((current) => ({
                  ...current,
                  consoleUrl: event.target.value,
                }))
              }
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Input cost / 1k tokens
            <input
              disabled={disabled}
              min="0"
              step="0.000001"
              type="number"
              value={formState.inputCostPer1kTokens}
              onChange={(event) =>
                setFormState((current) => ({
                  ...current,
                  inputCostPer1kTokens: event.target.value,
                }))
              }
            />
          </label>
          <label>
            Output cost / 1k tokens
            <input
              disabled={disabled}
              min="0"
              step="0.000001"
              type="number"
              value={formState.outputCostPer1kTokens}
              onChange={(event) =>
                setFormState((current) => ({
                  ...current,
                  outputCostPer1kTokens: event.target.value,
                }))
              }
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Request limit / minute
            <input
              disabled={disabled}
              min="0"
              step="1"
              type="number"
              value={formState.requestsPerMinuteLimit}
              onChange={(event) =>
                setFormState((current) => ({
                  ...current,
                  requestsPerMinuteLimit: event.target.value,
                }))
              }
            />
          </label>
          <label>
            Token limit / minute
            <input
              disabled={disabled}
              min="0"
              step="1"
              type="number"
              value={formState.tokensPerMinuteLimit}
              onChange={(event) =>
                setFormState((current) => ({
                  ...current,
                  tokensPerMinuteLimit: event.target.value,
                }))
              }
            />
          </label>
        </div>
        <button
          className="submit-button"
          disabled={disabled || submissionState.status === "submitting"}
        >
          {disabled
            ? "Create provider profile first"
            : submissionState.status === "submitting"
              ? "Creating credential..."
              : "Create credential"}
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

      <div className="credential-list">
        {existingCredentials.length === 0 ? (
          <div className="empty-state">
            <p>No credentials added yet.</p>
          </div>
        ) : (
          <div className="listing-grid">
            {existingCredentials.map((credential) => (
              <article className="listing-card" key={credential.id}>
                <div className="listing-topline">
                  <span className="pill">{credential.providerType}</span>
                  <span className="pill muted">{credential.status}</span>
                </div>
                <h3>{credential.label}</h3>
                <p className="listing-provider">
                  {credential.supportedModels.join(", ")}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
