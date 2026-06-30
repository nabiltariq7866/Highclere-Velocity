"use client";

import { DemoMoment } from "@/components/DemoMoment";

const APPRAISALS = [
  { file: "HCV-2026-10412", address: "42 Maple Ave, Toronto ON", ltv: 82, status: "Delayed", risk: "High", days: 12 },
  { file: "HCV-2026-10398", address: "1188 West Georgia, Vancouver BC", ltv: 75, status: "In Progress", risk: "Medium", days: 5 },
  { file: "HCV-2026-10401", address: "55 Riverfront SE, Calgary AB", ltv: 68, status: "Complete", risk: "Low", days: 0 },
  { file: "HCV-2026-10422", address: "890 Rue Sherbrooke, Montreal QC", ltv: 79, status: "Ordered", risk: "Medium", days: 2 },
];

export function PropertyAppraisalView() {
  return (
    <>
      <h1 className="page-title">Property, Appraisal & Collateral Risk</h1>
      <p className="page-subtitle">Appraisal tracking, property risk scoring & funding impact analysis</p>

      <DemoMoment>
        High LTV deal with appraisal delay — system predicts funding risk, alerts underwriting, updates broker,
        and shows how collateral risk affects approval confidence.
      </DemoMoment>

      <div className="alert-banner danger">
        <strong>HCV-2026-10412</strong> — LTV 82%, appraisal delayed 12 days. Funding SLA at risk.
        Approval confidence reduced from 78% to 61%. Broker notified automatically.
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Appraisals Active</div>
          <div className="kpi-value">2,000</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Pending</div>
          <div className="kpi-value" style={{ color: "var(--amber-500)" }}>9</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Avg Turnaround</div>
          <div className="kpi-value">4.2d</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Valuation Exceptions</div>
          <div className="kpi-value" style={{ color: "var(--red-500)" }}>3</div>
        </div>
      </div>

      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>File</th>
              <th>Property</th>
              <th>LTV</th>
              <th>Appraisal Status</th>
              <th>Days Waiting</th>
              <th>Collateral Risk</th>
            </tr>
          </thead>
          <tbody>
            {APPRAISALS.map((a) => (
              <tr key={a.file}>
                <td style={{ fontWeight: 600 }}>{a.file}</td>
                <td style={{ fontSize: 12 }}>{a.address}</td>
                <td>{a.ltv}%</td>
                <td>
                  <span className={`badge ${a.status === "Complete" ? "badge-green" : a.status === "Delayed" ? "badge-red" : "badge-amber"}`}>
                    {a.status}
                  </span>
                </td>
                <td>{a.days}</td>
                <td>
                  <span className={`badge ${a.risk === "Low" ? "badge-green" : a.risk === "Medium" ? "badge-amber" : "badge-red"}`}>
                    {a.risk}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid-2" style={{ marginTop: 16 }}>
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Risk Factors — HCV-2026-10412</div>
          <ul style={{ fontSize: 13, lineHeight: 1.8, margin: 0, paddingLeft: 20 }}>
            <li>LTV 82% — above standard insurable threshold</li>
            <li>Appraisal vendor delay — 12 days vs 5-day SLA</li>
            <li>Market movement: comparable sales down 3% in postal code</li>
            <li>Estimated value variance: pending vs purchase +8%</li>
          </ul>
        </div>
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Automated Broker Update</div>
          <p style={{ fontSize: 13, lineHeight: 1.6, margin: 0 }}>
            Appraisal for 42 Maple Ave is delayed. Expected completion July 2. This may impact closing
            date of July 18 — please confirm borrower flexibility. Highclere ops team monitoring daily.
          </p>
        </div>
      </div>
    </>
  );
}
