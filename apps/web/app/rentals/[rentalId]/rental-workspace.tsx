"use client";

import { useMemo, useState } from "react";

type WorkspaceRental = {
  id: string;
  status: string;
  duration: string;
  currencyCode: string;
  bookedPrice: number;
  totalCost: number;
  totalRequests: number;
  totalInputTokens: number;
  totalOutputTokens: number;
  startsAt: string | null;
  endsAt: string | null;
  listing: {
    id: string;
    title: string;
    slug: string;
    modelFamily: string;
    allowedModels: string[];
  };
  providerDisplayName: string;
  latestSession: {
    id: string;
    status: string;
    expiresAt: string;
    requestCount: number;
    lastUsedAt: string | null;
  } | null;
  usageEvents: Array<{
    id: string;
    eventType: string;
    model: string;
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
    costAmount: number;
    statusCode: number | null;
    latencyMs: number | null;
    createdAt: string;
  }>;
  chatMessages: Array<{
    id: string;
    role: "system" | "user" | "assistant";
    content: string;
    model: string | null;
    createdAt: string;
  }>;
};

type WorkspaceProps = {
  rental: WorkspaceRental;
};

type ChatMessage = {
  id: string;
  role: "system" | "user" | "assistant";
  content: string;
  model?: string | null;
  createdAt?: string;
};

export function RentalWorkspace({ rental }: WorkspaceProps) {
  const availableModels = useMemo(
    () => rental.listing.allowedModels.filter(Boolean),
    [rental.listing.allowedModels],
  );
  const [sessionMessage, setSessionMessage] = useState<string | null>(null);
  const [chatBusy, setChatBusy] = useState(false);
  const [selectedModel, setSelectedModel] = useState(availableModels[0] ?? "");
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(rental.chatMessages);

  async function sendPrompt(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setChatBusy(true);

    const response = await fetch(`/api/rentals/${rental.id}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: selectedModel,
        prompt,
      }),
    });

    const payload = (await response.json()) as {
      error?: string;
      data?: {
        userMessage: ChatMessage;
        assistantMessage: ChatMessage;
      };
    };

    setChatBusy(false);

    if (!response.ok || !payload.data) {
      setSessionMessage(payload.error ?? "Chat request failed.");
      return;
    }

    const { userMessage, assistantMessage } = payload.data;

    setMessages((current) => [...current, userMessage, assistantMessage]);
    setPrompt("");
    setSessionMessage("Message sent through secure rental proxy.");
  }

  return (
    <div className="provider-section rental-workspace">
      <div className="workspace-shell">
        <aside className="workspace-sidebar">
          <div className="workspace-sidebar-section">
            <p className="workspace-label">Session runtime</p>
            <div className="workspace-runtime-card">
              <div className="workspace-runtime-row">
                <span>Status</span>
                <strong>{rental.latestSession?.status ?? "Not issued"}</strong>
              </div>
              <div className="workspace-runtime-row">
                <span>Rental</span>
                <strong>{rental.status}</strong>
              </div>
              <div className="workspace-runtime-row">
                <span>Expires</span>
                <strong>
                  {rental.latestSession?.expiresAt ?? "Not issued"}
                </strong>
              </div>
              <div className="workspace-runtime-row">
                <span>Requests</span>
                <strong>{rental.totalRequests}</strong>
              </div>
            </div>
            {sessionMessage ? (
              <p className="form-message">{sessionMessage}</p>
            ) : null}
          </div>

          <div className="workspace-sidebar-section">
            <p className="workspace-label">Model access</p>
            <div className="workspace-chip-stack">
              {availableModels.map((model) => (
                <button
                  className={
                    model === selectedModel
                      ? "workspace-chip workspace-chip-active"
                      : "workspace-chip"
                  }
                  disabled={rental.status !== "ACTIVE" || chatBusy}
                  key={model}
                  onClick={() => setSelectedModel(model)}
                  type="button"
                >
                  {model}
                </button>
              ))}
            </div>
          </div>

          <div className="workspace-sidebar-section">
            <p className="workspace-label">Live metering</p>
            {rental.usageEvents.length === 0 ? (
              <div className="workspace-empty-panel">
                <p>No usage events yet.</p>
              </div>
            ) : (
              <div className="workspace-usage-list">
                {rental.usageEvents.map((event) => (
                  <article className="workspace-usage-item" key={event.id}>
                    <div className="workspace-usage-topline">
                      <strong>{event.model}</strong>
                      <span>{event.eventType}</span>
                    </div>
                    <p>
                      {event.totalTokens} tokens | {event.costAmount.toFixed(4)}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </div>
        </aside>

        <section className="workspace-main">
          <div className="workspace-main-header">
            <div>
              <p className="workspace-label">Secure conversation</p>
              <h2>{rental.listing.title}</h2>
              <p className="section-copy">
                Provider credentials stay server-side. Every prompt is proxied,
                metered, and attached to this rental session.
              </p>
            </div>
            <div className="workspace-header-stats">
              <div className="workspace-header-stat">
                <span>Provider</span>
                <strong>{rental.providerDisplayName}</strong>
              </div>
              <div className="workspace-header-stat">
                <span>Cost</span>
                <strong>
                  {rental.totalCost.toFixed(4)} {rental.currencyCode}
                </strong>
              </div>
            </div>
          </div>

          <div className="workspace-transcript-panel">
            {messages.length === 0 ? (
              <div className="workspace-empty-state">
                <p>Start the conversation with a concrete task.</p>
                <p>
                  Example: draft a function, review code, compare approaches, or
                  summarize a design decision.
                </p>
              </div>
            ) : (
              <div className="chat-transcript workspace-transcript">
                {messages.map((message) => (
                  <article
                    className={`chat-message chat-message-${message.role}`}
                    key={message.id}
                  >
                    <div className="workspace-message-head">
                      <p className="eyebrow">{message.role}</p>
                      {message.model ? (
                        <span className="workspace-message-model">
                          {message.model}
                        </span>
                      ) : null}
                    </div>
                    <p>{message.content}</p>
                  </article>
                ))}
              </div>
            )}
          </div>

          <form className="chat-form workspace-composer" onSubmit={sendPrompt}>
            <div className="workspace-composer-head">
              <label>
                Active model
                <select
                  disabled={rental.status !== "ACTIVE" || chatBusy}
                  value={selectedModel}
                  onChange={(event) => setSelectedModel(event.target.value)}
                >
                  {availableModels.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
              </label>
              <div className="workspace-composer-meta">
                <span>{rental.listing.modelFamily}</span>
                <span>
                  {rental.totalInputTokens + rental.totalOutputTokens} tokens
                  used
                </span>
              </div>
            </div>
            <label className="workspace-prompt-field">
              Prompt
              <textarea
                disabled={rental.status !== "ACTIVE" || chatBusy}
                placeholder="Ask for code, explain a bug, rewrite a function, or run a design critique."
                rows={8}
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
              />
            </label>
            <div className="workspace-composer-actions">
              <p className="section-copy">
                Routed through the Proxora AI proxy with live rental metering.
              </p>
              <button
                className="submit-button"
                disabled={
                  rental.status !== "ACTIVE" ||
                  chatBusy ||
                  prompt.trim().length === 0
                }
                type="submit"
              >
                {chatBusy ? "Thinking..." : "Send prompt"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
