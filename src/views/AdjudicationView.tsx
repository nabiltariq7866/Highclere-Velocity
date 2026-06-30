"use client";

import { DemoMoment } from "@/components/DemoMoment";
import { ScoreBadge, StageBadge, formatCurrency } from "@/components/StatusBadges";
import { ADJUDICATION_BATCH, ALL_SUBMISSIONS } from "@/data/mockData";

export function AdjudicationView() {
  const batch = ALL_SUBMISSIONS.slice(0, 50);
  const fastTrack = batch.filter((s) => s.fastTrack);
  const docFollow = batch.filter((s) => s.missingDocs.length > 0 && !s.fastTrack);
  const senior = batch.filter((s) => s.approvalScore < 70 && s.approvalScore >= 50);
  const decline = batch.filter((s) => s.approvalScore < 50);

  return (
    <>
      <h1 className="page-title">AI Adjudication & Approval Prediction</h1>
      <p className="page-subtitle">Prioritize files, predict approval probability, route by exception</p>

      <DemoMoment>
        50 new submissions instantly triaged — {ADJUDICATION_BATCH.fastTrack} likely fast-track approvals,{" "}
        {ADJUDICATION_BATCH.docFollowUp} need document follow-up, {ADJUDICATION_BATCH.seniorReview} require
        senior underwriter review, and {ADJUDICATION_BATCH.declineRisk} are high decline-risk.
      </DemoMoment>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">New Today</div>
          <div className="kpi-value">{ADJUDICATION_BATCH.newToday}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Fast-Track</div>
          <div className="kpi-value" style={{ color: "var(--accent)" }}>{ADJUDICATION_BATCH.fastTrack}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Doc Follow-Up</div>
          <div className="kpi-value" style={{ color: "var(--amber-500)" }}>{ADJUDICATION_BATCH.docFollowUp}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Senior Review</div>
          <div className="kpi-value">{ADJUDICATION_BATCH.seniorReview}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Decline Risk</div>
          <div className="kpi-value" style={{ color: "var(--red-500)" }}>{ADJUDICATION_BATCH.declineRisk}</div>
        </div>
      </div>

      <div className="grid-3">
        <div className="card">
          <div style={{ fontWeight: 700, color: "var(--accent)", marginBottom: 10 }}>Fast-Track Queue ({fastTrack.length})</div>
          {fastTrack.slice(0, 5).map((f) => (
            <div key={f.id} className="file-card">
              <div style={{ fontWeight: 600, fontSize: 13 }}>{f.fileNumber}</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>{f.borrower} · {f.product}</div>
              <div style={{ marginTop: 6 }}><ScoreBadge score={f.approvalScore} /></div>
            </div>
          ))}
        </div>
        <div className="card">
          <div style={{ fontWeight: 700, color: "var(--amber-500)", marginBottom: 10 }}>Document Follow-Up ({docFollow.length})</div>
          {docFollow.slice(0, 5).map((f) => (
            <div key={f.id} className="file-card">
              <div style={{ fontWeight: 600, fontSize: 13 }}>{f.fileNumber}</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>{f.missingDocs.join(", ")}</div>
            </div>
          ))}
        </div>
        <div className="card">
          <div style={{ fontWeight: 700, color: "var(--red-500)", marginBottom: 10 }}>Decline Risk ({decline.length})</div>
          {decline.slice(0, 5).map((f) => (
            <div key={f.id} className="file-card">
              <div style={{ fontWeight: 600, fontSize: 13 }}>{f.fileNumber}</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>GDS {f.gds}% · TDS {f.tds}% · Credit {f.creditScore}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 12 }}>Explainable AI — Sample Rationale</div>
        <div className="ai-panel">
          <strong>HCV-2026-10391 (Prime)</strong> — Approval likelihood <strong>91%</strong>
          <ul style={{ fontSize: 13, margin: "8px 0 0", paddingLeft: 18, lineHeight: 1.7 }}>
            <li>Credit score 782 — exceeds Prime threshold (680)</li>
            <li>GDS 28% / TDS 36% — within guidelines</li>
            <li>LTV 72% — insurable range</li>
            <li>All income documents verified with 96%+ confidence</li>
            <li>Recommendation: <span className="badge badge-green">Fast-track approval</span></li>
          </ul>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>File</th>
              <th>Borrower</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Score</th>
              <th>Stage</th>
              <th>AI Route</th>
            </tr>
          </thead>
          <tbody>
            {batch.slice(0, 12).map((f) => (
              <tr key={f.id}>
                <td>{f.fileNumber}</td>
                <td>{f.borrower}</td>
                <td>{f.product}</td>
                <td>{formatCurrency(f.amount)}</td>
                <td><ScoreBadge score={f.approvalScore} /></td>
                <td><StageBadge stage={f.stage} /></td>
                <td>
                  {f.fastTrack ? (
                    <span className="badge badge-green">Fast-Track</span>
                  ) : f.approvalScore < 50 ? (
                    <span className="badge badge-red">Decline Review</span>
                  ) : (
                    <span className="badge badge-amber">Manual</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
