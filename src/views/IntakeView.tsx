"use client";

import { DemoMoment } from "@/components/DemoMoment";
import { ScoreBadge } from "@/components/StatusBadges";
import { GOLDEN_FILE } from "@/data/mockData";

const EXTRACTED = [
  { field: "Stated Annual Income", value: "$142,000", confidence: 96 },
  { field: "NOA Line 150", value: "$118,400", confidence: 94 },
  { field: "Business Type", value: "Consulting — Chen Advisory Inc.", confidence: 91 },
  { field: "Employment / Self-Employed Since", value: "2019", confidence: 88 },
  { field: "Property Value", value: "$795,000", confidence: 99 },
];

const CHECKLIST = [
  { item: "Signed mortgage application", done: true },
  { item: "Government-issued ID", done: true },
  { item: "NOA 2024", done: true },
  { item: "T1 General 2024", done: false },
  { item: "Business bank statements (90 days)", done: false },
  { item: "Articles of incorporation", done: true },
  { item: "Purchase agreement", done: true },
  { item: "Credit report", done: true },
];

export function IntakeView() {
  return (
    <>
      <h1 className="page-title">AI Submission Intake & File Quality</h1>
      <p className="page-subtitle">Automated document reading, completeness scoring & broker routing</p>

      <DemoMoment>
        Business-for-Self file for Sarah Chen — system extracted income, detected missing bank statements,
        identified income mismatch between stated and NOA, and sent precise missing-document request to
        broker Angela Morrison before an underwriter touched the file.
      </DemoMoment>

      <div className="grid-2">
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: 16 }}>{GOLDEN_FILE.fileNumber}</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>{GOLDEN_FILE.borrower} · {GOLDEN_FILE.product}</div>
            </div>
            <div className="score-ring amber">{GOLDEN_FILE.approvalScore}%</div>
          </div>

          <div className="alert-banner">
            <strong>Income mismatch detected</strong> — Stated $142,000 vs NOA $118,400 (17% variance).
            Broker auto-notified at 09:18 AM.
          </div>

          <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>AI Extraction Results</div>
          {EXTRACTED.map((e) => (
            <div key={e.field} className="stat-row">
              <span>{e.field}</span>
              <span>
                <strong>{e.value}</strong>
                <span style={{ fontSize: 11, color: "var(--muted)", marginLeft: 8 }}>{e.confidence}% conf.</span>
              </span>
            </div>
          ))}
        </div>

        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Pre-Underwriting Checklist — BFS</div>
          {CHECKLIST.map((c) => (
            <div key={c.item} className="stat-row">
              <span style={{ color: c.done ? "var(--text)" : "var(--amber-500)" }}>{c.item}</span>
              <span className={`badge ${c.done ? "badge-green" : "badge-amber"}`}>
                {c.done ? "Received" : "Missing"}
              </span>
            </div>
          ))}
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 6 }}>Broker submission quality score</div>
            <div className="progress-bar">
              <div className="progress-fill amber" style={{ width: "62%" }} />
            </div>
            <div style={{ fontSize: 12, marginTop: 4 }}>62/100 — Missing critical BFS documents</div>
          </div>
        </div>
      </div>

      <div className="ai-panel" style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Auto-Generated Broker Request</div>
        <p style={{ fontSize: 13, margin: 0, lineHeight: 1.6 }}>
          Hi Angela, for file {GOLDEN_FILE.fileNumber} (Sarah Chen — BFS purchase Ontario), we still need:
          <strong> Business bank statements (90 days)</strong> and <strong>T1 General 2024</strong>.
          We also noted stated income ($142,000) differs from NOA ($118,400) — please provide explanation
          or updated documentation. File held at intake — no underwriter assignment until resolved.
        </p>
        <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
          <button type="button" className="btn-primary">Send to Broker</button>
          <button type="button" className="btn-secondary">Edit Message</button>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 12 }}>Intake Queue — Today</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>File</th>
              <th>Product</th>
              <th>Quality Score</th>
              <th>Missing Items</th>
              <th>Routing</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{GOLDEN_FILE.fileNumber}</td>
              <td>Business-for-Self</td>
              <td><ScoreBadge score={62} /></td>
              <td>2 documents</td>
              <td><span className="badge badge-amber">Hold — Broker</span></td>
            </tr>
            <tr>
              <td>HCV-2026-10391</td>
              <td>Prime</td>
              <td><ScoreBadge score={94} /></td>
              <td>0</td>
              <td><span className="badge badge-green">Fast-Track UW</span></td>
            </tr>
            <tr>
              <td>HCV-2026-10405</td>
              <td>Alt-A</td>
              <td><ScoreBadge score={71} /></td>
              <td>1 document</td>
              <td><span className="badge badge-amber">Standard Intake</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
