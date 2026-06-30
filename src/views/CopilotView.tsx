"use client";

import { DemoMoment } from "@/components/DemoMoment";
import { ScoreBadge } from "@/components/StatusBadges";
import { GOLDEN_FILE } from "@/data/mockData";

export function CopilotView() {
  return (
    <>
      <h1 className="page-title">Underwriter Copilot</h1>
      <p className="page-subtitle">AI summaries, risk explanations & exception-only review workspace</p>

      <DemoMoment>
        Underwriter opens complex file and immediately sees one-page AI summary: borrower profile, product fit,
        income evidence, risk flags, missing documents, recommended conditions, and approval likelihood.
      </DemoMoment>

      <div className="grid-2">
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: 18 }}>{GOLDEN_FILE.fileNumber}</div>
              <div style={{ color: "var(--muted)", fontSize: 13 }}>{GOLDEN_FILE.borrower} · {GOLDEN_FILE.product}</div>
            </div>
            <ScoreBadge score={GOLDEN_FILE.approvalScore} />
          </div>

          <div className="ai-panel">
            <div style={{ fontWeight: 700, marginBottom: 12 }}>AI File Summary</div>

            <div style={{ fontSize: 13, lineHeight: 1.7 }}>
              <p style={{ margin: "0 0 12px" }}><strong>Borrower:</strong> Self-employed consultant, 6+ years.
              Credit {GOLDEN_FILE.creditScore}. Purchase Ontario, ${GOLDEN_FILE.amount.toLocaleString()} @ {GOLDEN_FILE.ltv}% LTV.</p>

              <p style={{ margin: "0 0 12px" }}><strong>Product Fit:</strong> Business-for-Self (88% confidence).
              Alt-A fallback if income docs not resolved.</p>

              <p style={{ margin: "0 0 12px" }}><strong>Income:</strong> Stated $142K vs NOA $118K — 17% variance.
              Bank deposits annualize ~$110K. <span className="badge badge-amber">Verification incomplete</span></p>

              <p style={{ margin: "0 0 12px" }}><strong>Strengths:</strong> Strong credit, established business, complete corp docs.</p>

              <p style={{ margin: "0 0 12px" }}><strong>Risks:</strong> Income mismatch, missing bank statements, LTV at upper BFS range.</p>

              <p style={{ margin: 0 }}><strong>Recommended:</strong> Conditional approval pending income LOE + 90-day business statements.
              Do not fast-track.</p>
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            <button type="button" className="btn-primary">Approve with Conditions</button>
            <button type="button" className="btn-secondary">Request More Info</button>
            <button type="button" className="btn-secondary">Escalate</button>
          </div>
        </div>

        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Ask Copilot</div>
          <div className="chat-bubble user">What income should I use for GDS/TDS calculation?</div>
          <div className="chat-bubble ai">
            Based on document confidence, use <strong>NOA line 150 ($118,400)</strong> until business bank
            statements are received. Stated $142K is unsupported. If deposits confirm higher, recalculate
            with underwriter discretion per BFS guideline §4.2.
          </div>
          <div className="chat-bubble user">List recommended conditions.</div>
          <div className="chat-bubble ai">
            1) 90-day business bank statements 2) T1 General all schedules 3) Signed LOE for income variance
            4) Fire insurance binder 5) Solicitor commitment received
          </div>
          <input
            type="text"
            placeholder="Ask about this file..."
            className="top-bar-search"
            style={{ width: "100%", marginTop: 8 }}
          />
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 12 }}>Exception-Only Review Queue</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>File</th>
              <th>Reason</th>
              <th>Priority</th>
              <th>Assigned</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{GOLDEN_FILE.fileNumber}</td>
              <td>Income mismatch + missing docs</td>
              <td><span className="badge badge-amber">High</span></td>
              <td>Karen Mitchell</td>
            </tr>
            <tr>
              <td>HCV-2026-10412</td>
              <td>Appraisal delay + high LTV</td>
              <td><span className="badge badge-red">Urgent</span></td>
              <td>Steve Fontaine</td>
            </tr>
            <tr>
              <td>HCV-2026-10455</td>
              <td>Fraud pattern flagged</td>
              <td><span className="badge badge-red">Urgent</span></td>
              <td>Fraud Review</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
