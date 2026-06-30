"use client";

import { DemoMoment } from "@/components/DemoMoment";
import { GOLDEN_FILE } from "@/data/mockData";

const DOCS = [
  { name: "NOA 2024", type: "Tax", extracted: "$118,400 line 150", confidence: 94, flag: null },
  { name: "T1 General 2024", type: "Tax", extracted: "Pending full parse", confidence: 72, flag: "Missing schedules" },
  { name: "Pay Stub — N/A", type: "Income", extracted: "Self-employed — N/A", confidence: 100, flag: null },
  { name: "Business Bank Stmt (partial)", type: "Bank", extracted: "Deposits avg $9,200/mo", confidence: 81, flag: "Only 45 days received" },
  { name: "Articles of Inc.", type: "Corporate", extracted: "Chen Advisory Inc.", confidence: 99, flag: null },
];

export function DocumentReviewView() {
  return (
    <>
      <h1 className="page-title">Document Review & Income Verification</h1>
      <p className="page-subtitle">AI classification, extraction, consistency checks & underwriter summaries</p>

      <DemoMoment>
        Self-employed package for Sarah Chen — income extracted from multiple documents, compared against
        bank deposits and stated income, one inconsistency flagged, underwriter summary prepared with confidence levels.
      </DemoMoment>

      <div className="grid-2">
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Document Package — {GOLDEN_FILE.fileNumber}</div>
          {DOCS.map((d) => (
            <div key={d.name} className="file-card">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{d.name}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)" }}>{d.type}</div>
                </div>
                <span className={`badge ${d.confidence >= 90 ? "badge-green" : "badge-amber"}`}>
                  {d.confidence}%
                </span>
              </div>
              <div style={{ fontSize: 12, marginTop: 8 }}>Extracted: {d.extracted}</div>
              {d.flag && (
                <div style={{ fontSize: 11, color: "var(--amber-500)", marginTop: 4 }}>⚠ {d.flag}</div>
              )}
            </div>
          ))}
        </div>

        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Income Consistency Analysis</div>
          <div className="stat-row">
            <span>Stated Income (application)</span>
            <strong style={{ color: "var(--amber-500)" }}>$142,000</strong>
          </div>
          <div className="stat-row">
            <span>NOA Line 150</span>
            <strong>$118,400</strong>
          </div>
          <div className="stat-row">
            <span>Bank Deposit Pattern (annualized)</span>
            <strong>$110,400</strong>
          </div>
          <div className="stat-row">
            <span>Variance (stated vs NOA)</span>
            <strong style={{ color: "var(--red-500)" }}>17.3%</strong>
          </div>

          <div className="ai-panel" style={{ marginTop: 16 }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Underwriter Summary</div>
            <p style={{ fontSize: 13, margin: 0, lineHeight: 1.6 }}>
              BFS borrower with 6 years self-employment. Income documents partially complete.
              <strong> Red flag:</strong> stated income exceeds NOA by $23,600. Bank deposits support
              ~$110K annualized — below both stated and NOA. Recommend condition for LOE and complete
              90-day business statements before income approval.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
