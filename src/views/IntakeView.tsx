"use client";

import { DemoMoment } from "@/components/DemoMoment";
import { ScoreBadge } from "@/components/StatusBadges";
import { useDemoState } from "@/context/DemoStateProvider";
import { GOLDEN_FILE } from "@/data/mockData";

const EXTRACTED = [
  { field: "Stated Annual Income", value: "$142,000", confidence: 96 },
  { field: "NOA Line 150", value: "$118,400", confidence: 94 },
  { field: "Business Type", value: "Consulting — Chen Advisory Inc.", confidence: 91 },
  { field: "Employment / Self-Employed Since", value: "2019", confidence: 88 },
  { field: "Property Value", value: "$795,000", confidence: 99 },
];

const INTAKE_CHANNELS = [
  { channel: "Filogix / Velocity", file: GOLDEN_FILE.fileNumber, time: "Jun 28 09:14", status: "Processed" },
  { channel: "Broker Portal Upload", file: "HCV-2026-10391", time: "Jun 28 10:22", status: "Fast-track" },
  { channel: "Email-to-File", file: "HCV-2026-10412", time: "Jun 28 11:05", status: "Processing" },
];

export function IntakeView() {
  const { goldenFileChecklist, qualityScore, brokerMessageSent, sendBrokerMessage } = useDemoState();

  return (
    <>
      <h1 className="page-title">AI Submission Intake & File Quality</h1>
      <p className="page-subtitle">Multi-channel intake, duplicate detection, live checklist from broker uploads</p>

      <DemoMoment>
        Filogix + portal + email channels. Duplicate pay stub template flagged cross-file. Checklist syncs when broker uploads.
      </DemoMoment>

      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 12 }}>Intake Channels — Today</div>
        {INTAKE_CHANNELS.map((c) => (
          <div key={c.file} className="stat-row">
            <div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{c.channel}</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>{c.file} · {c.time}</div>
            </div>
            <span className={`badge ${c.status === "Fast-track" ? "badge-green" : "badge-amber"}`}>{c.status}</span>
          </div>
        ))}
      </div>

      <div className="alert-banner danger" style={{ marginBottom: 16 }}>
        <strong>Duplicate document alert:</strong> Pay stub template on HCV-10455 matches pattern FP-2026-044 — routed to fraud review, not underwriting.
      </div>

      <div className="grid-2">
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: 16 }}>{GOLDEN_FILE.fileNumber}</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>{GOLDEN_FILE.borrower} · via Filogix</div>
            </div>
            <div className={`score-ring ${qualityScore >= 80 ? "" : "amber"}`}>{qualityScore}%</div>
          </div>
          <div className="alert-banner">
            <strong>Income mismatch</strong> — Stated $142,000 vs NOA $118,400 (17%).
          </div>
          {EXTRACTED.map((e) => (
            <div key={e.field} className="stat-row">
              <span>{e.field}</span>
              <span><strong>{e.value}</strong> <span style={{ fontSize: 11, color: "var(--muted)" }}>{e.confidence}%</span></span>
            </div>
          ))}
        </div>
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Pre-Underwriting Checklist (live)</div>
          {goldenFileChecklist.map((c) => (
            <div key={c.id} className="stat-row">
              <span style={{ color: c.done ? "var(--text)" : "var(--amber-500)" }}>{c.item}</span>
              <span className={`badge ${c.done ? "badge-green" : "badge-amber"}`}>{c.done ? "Received" : "Missing"}</span>
            </div>
          ))}
          <div className="progress-bar" style={{ marginTop: 12 }}>
            <div className={`progress-fill ${qualityScore >= 75 ? "" : "amber"}`} style={{ width: `${qualityScore}%` }} />
          </div>
          <div style={{ fontSize: 12, marginTop: 4 }}>{qualityScore}/100 quality score</div>
        </div>
      </div>

      <div className="ai-panel" style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Auto-Generated Broker Request</div>
        <p style={{ fontSize: 13, margin: "0 0 12px" }}>
          Missing: {goldenFileChecklist.filter((c) => !c.done).map((c) => c.item).join(", ") || "none"}.
        </p>
        <button type="button" className="btn-primary" onClick={sendBrokerMessage} disabled={brokerMessageSent}>
          {brokerMessageSent ? "Sent to Broker ✓" : "Send to Broker"}
        </button>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <table className="data-table">
          <thead>
            <tr><th>File</th><th>Channel</th><th>Quality</th><th>Routing</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>{GOLDEN_FILE.fileNumber}</td>
              <td>Filogix</td>
              <td><ScoreBadge score={qualityScore} /></td>
              <td><span className="badge badge-amber">Hold — Broker</span></td>
            </tr>
            <tr>
              <td>HCV-2026-10391</td>
              <td>Portal</td>
              <td><ScoreBadge score={94} /></td>
              <td><span className="badge badge-green">Fast-Track</span></td>
            </tr>
            <tr>
              <td>HCV-2026-10455</td>
              <td>Email</td>
              <td><ScoreBadge score={41} /></td>
              <td><span className="badge badge-red">Fraud Review</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
