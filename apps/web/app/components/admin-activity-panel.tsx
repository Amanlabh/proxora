"use client";

import { useMemo, useState } from "react";

type AdminDispute = {
  id: string;
  status: string;
  reason: string;
  openedByLabel: string;
  providerDisplayName: string | null;
  createdAt: string;
  resolvedAt: string | null;
};

type AdminAuditLog = {
  id: string;
  action: string;
  targetType: string;
  targetId: string | null;
  actorLabel: string;
  createdAt: string;
};

type AdminActivityPanelProps = {
  disputes: AdminDispute[];
  auditLogs: AdminAuditLog[];
};

export function AdminActivityPanel({
  disputes,
  auditLogs,
}: AdminActivityPanelProps) {
  const [query, setQuery] = useState("");
  const [disputeStatus, setDisputeStatus] = useState("ALL");

  const filteredDisputes = useMemo(() => {
    return disputes.filter((dispute) => {
      const matchesStatus =
        disputeStatus === "ALL" || dispute.status === disputeStatus;
      const haystack = [
        dispute.reason,
        dispute.openedByLabel,
        dispute.providerDisplayName ?? "",
      ]
        .join(" ")
        .toLowerCase();

      return matchesStatus && haystack.includes(query.toLowerCase());
    });
  }, [disputeStatus, disputes, query]);

  const filteredAuditLogs = useMemo(() => {
    return auditLogs.filter((log) => {
      const haystack = [
        log.action,
        log.targetType,
        log.targetId ?? "",
        log.actorLabel,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(query.toLowerCase());
    });
  }, [auditLogs, query]);

  return (
    <div className="provider-stack">
      <div className="filter-bar">
        <label>
          Search activity
          <input
            placeholder="Search disputes, actors, actions"
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <label>
          Dispute status
          <select
            value={disputeStatus}
            onChange={(event) => setDisputeStatus(event.target.value)}
          >
            <option value="ALL">ALL</option>
            <option value="OPEN">OPEN</option>
            <option value="IN_REVIEW">IN_REVIEW</option>
            <option value="RESOLVED">RESOLVED</option>
            <option value="REJECTED">REJECTED</option>
          </select>
        </label>
      </div>

      <div className="provider-section">
        <div className="section-head">
          <div>
            <h2>Disputes</h2>
            <p className="section-copy">
              Filtered issue tracking records across the platform.
            </p>
          </div>
        </div>
        {filteredDisputes.length === 0 ? (
          <div className="empty-state">
            <p>No disputes match the current filters.</p>
          </div>
        ) : (
          <div className="listing-grid">
            {filteredDisputes.map((dispute) => (
              <article className="listing-card" key={dispute.id}>
                <div className="listing-topline">
                  <span className="pill">{dispute.status}</span>
                  {dispute.providerDisplayName ? (
                    <span className="pill muted">
                      {dispute.providerDisplayName}
                    </span>
                  ) : null}
                </div>
                <h3>{dispute.reason}</h3>
                <p className="listing-provider">
                  Opened by: {dispute.openedByLabel}
                </p>
                <p className="listing-description">{dispute.createdAt}</p>
                {dispute.resolvedAt ? (
                  <p className="listing-description">
                    Resolved: {dispute.resolvedAt}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </div>

      <div className="provider-section">
        <div className="section-head">
          <div>
            <h2>Audit trail</h2>
            <p className="section-copy">
              Filtered moderation and lifecycle actions.
            </p>
          </div>
        </div>
        {filteredAuditLogs.length === 0 ? (
          <div className="empty-state">
            <p>No audit logs match the current filters.</p>
          </div>
        ) : (
          <div className="listing-grid">
            {filteredAuditLogs.map((log) => (
              <article className="listing-card" key={log.id}>
                <div className="listing-topline">
                  <span className="pill">{log.action}</span>
                  <span className="pill muted">{log.targetType}</span>
                </div>
                <h3>{log.actorLabel}</h3>
                <p className="listing-provider">
                  Target: {log.targetId ?? "n/a"}
                </p>
                <p className="listing-description">{log.createdAt}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
