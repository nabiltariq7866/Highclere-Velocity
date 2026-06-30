"use client";

import { DemoMoment } from "@/components/DemoMoment";
import { FRAUD_ALERTS } from "@/data/mockData";

export function FraudView() {
  return (
    <>
      <h1 className="page-title">Fraud, Misrepresentation & Document Integrity</h1>
      <p className="page-subtitle">Early detection of fraud signals, tampering & suspicious patterns</p>

      <DemoMoment>
        Same income document format appears across multiple unrelated applications with inconsistent employer
        details — pattern flagged, files routed to fraud review, underwriting queue protected.
      </DemoMoment>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Active Fraud Reviews</div>
          <div className="kpi-value" style={{ color: "var(--red-500)" }}>7</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Patterns Detected (30d)</div>
          <div className="kpi-value">14</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">False Positive Rate</div>
          <div className="kpi-value">8.2%</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Prevented Loss (est.)</div>
          <div className="kpi-value">$2.4M</div>
        </div>
      </div>

      <div className="card">
        <div style={{ fontWeight: 700, marginBottom: 12 }}>Fraud Alert Queue</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Alert Type</th>
              <th>Severity</th>
              <th>Files Affected</th>
              <th>Detail</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {FRAUD_ALERTS.map((a) => (
              <tr key={a.id}>
                <td style={{ fontWeight: 600 }}>{a.type}</td>
                <td>
                  <span className={`badge ${a.severity === "High" ? "badge-red" : "badge-amber"}`}>
                    {a.severity}
                  </span>
                </td>
                <td>{a.files}</td>
                <td style={{ fontSize: 12 }}>{a.detail}</td>
                <td><button type="button" className="btn-secondary" style={{ padding: "4px 10px", fontSize: 11 }}>Review</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="ai-panel" style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Cross-File Pattern Analysis</div>
        <p style={{ fontSize: 13, margin: 0, lineHeight: 1.6 }}>
          <strong>Pattern #FP-2026-044:</strong> Identical pay stub template (font, layout, metadata) found on
          4 applications with different employers (TechCorp, GlobalFin, Apex Ltd, Summit Inc). Employer phone
          numbers route to same VOIP block. Files HCV-10455, HCV-10461, HCV-10472, HCV-10480 quarantined.
          Escalated to fraud review — underwriting blocked pending investigation.
        </p>
      </div>
    </>
  );
}
