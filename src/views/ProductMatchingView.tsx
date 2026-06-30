"use client";

import { useState } from "react";
import { DemoMoment } from "@/components/DemoMoment";
import { ScoreBadge } from "@/components/StatusBadges";
import { useDemoState } from "@/context/DemoStateProvider";
import { GOLDEN_FILE } from "@/data/mockData";
import { PRODUCT_EXCEPTIONS, PRODUCT_RULE_VERSIONS } from "@/data/extendedMockData";

export function ProductMatchingView() {
  const { qualityScore } = useDemoState();
  const [exceptionNote, setExceptionNote] = useState("");

  return (
    <>
      <h1 className="page-title">Product Matching Engine</h1>
      <p className="page-subtitle">Rules engine, policy-fit scoring, exceptions & guideline versioning</p>

      <DemoMoment>
        Self-employed Sarah Chen — BFS recommended at 88% fit. Product exception workflow and rule v2.4 active.
        Quality score from intake: {qualityScore}/100.
      </DemoMoment>

      <div className="grid-2">
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Scenario: {GOLDEN_FILE.borrower}</div>
          <div className="stat-row"><span>Income Type</span><strong>Self-Employed (BFS)</strong></div>
          <div className="stat-row"><span>Credit Score</span><strong>{GOLDEN_FILE.creditScore}</strong></div>
          <div className="stat-row"><span>LTV</span><strong>{GOLDEN_FILE.ltv}%</strong></div>
          <div className="stat-row"><span>Intake Quality</span><strong>{qualityScore}/100</strong></div>
        </div>
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Product Rules Engine — Active Guidelines</div>
          {PRODUCT_RULE_VERSIONS.map((r) => (
            <div key={r.product} className="stat-row">
              <span>{r.product} <span style={{ fontSize: 11, color: "var(--muted)" }}>{r.version}</span></span>
              <span style={{ fontSize: 11 }}>{r.changes}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 12 }}>Product Exception Workflow</div>
        <table className="data-table">
          <thead>
            <tr><th>File</th><th>Exception</th><th>Status</th><th>Requested By</th></tr>
          </thead>
          <tbody>
            {PRODUCT_EXCEPTIONS.map((e) => (
              <tr key={e.id}>
                <td>{e.file}</td>
                <td>{e.type}</td>
                <td><span className={`badge ${e.status === "Approved" ? "badge-green" : "badge-amber"}`}>{e.status}</span></td>
                <td>{e.requestedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
          <input
            className="top-bar-search"
            style={{ flex: 1 }}
            placeholder="Request new exception (demo)..."
            value={exceptionNote}
            onChange={(e) => setExceptionNote(e.target.value)}
          />
          <button type="button" className="btn-secondary" onClick={() => setExceptionNote("")}>Submit Request</button>
        </div>
      </div>

      <div className="ai-panel" style={{ marginTop: 16 }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: "var(--accent)" }}>Business-for-Self — 88% policy fit</div>
        <p style={{ fontSize: 13, margin: "8px 0 0" }}>Per BFS v2.4: 2+ years SE, credit ≥620, LTV ≤80%. Missing bank statements block underwriting path.</p>
      </div>
    </>
  );
}
