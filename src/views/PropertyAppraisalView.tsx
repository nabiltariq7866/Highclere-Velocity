"use client";

import { DemoMoment } from "@/components/DemoMoment";
import { GOLDEN_FILE } from "@/data/mockData";
import { COLLATERAL_EXPOSURE, PILOT_DATA_STATS } from "@/data/extendedMockData";

const APPRAISALS = [
  { file: "HCV-2026-10412", address: "42 Maple Ave, Toronto ON", ltv: 82, status: "Delayed", risk: "High", days: 12, confidence: 61 },
  { file: "HCV-2026-10398", address: "1188 West Georgia, Vancouver BC", ltv: 75, status: "In Progress", risk: "Medium", days: 5, confidence: 74 },
  { file: "HCV-2026-10401", address: "55 Riverfront SE, Calgary AB", ltv: 68, status: "Complete", risk: "Low", days: 0, confidence: 91 },
  { file: GOLDEN_FILE.fileNumber, address: "890 Birchwood Dr, Markham ON", ltv: 78, status: "Ordered", risk: "Medium", days: 2, confidence: 72 },
];

export function PropertyAppraisalView() {
  return (
    <>
      <h1 className="page-title">Property, Appraisal & Collateral Risk</h1>
      <p className="page-subtitle">Appraisal tracking, collateral exposure, approval confidence impact</p>

      <DemoMoment>
        High LTV + appraisal delay reduces approval confidence. Portfolio collateral exposure by region and LTV band.
      </DemoMoment>

      <div className="kpi-grid">
        <div className="kpi-card"><div className="kpi-label">Appraisal Records</div><div className="kpi-value">{PILOT_DATA_STATS.appraisalRecords.toLocaleString()}</div></div>
        <div className="kpi-card"><div className="kpi-label">Pending</div><div className="kpi-value" style={{ color: "var(--amber-500)" }}>9</div></div>
        <div className="kpi-card"><div className="kpi-label">Valuation Exceptions</div><div className="kpi-value" style={{ color: "var(--red-500)" }}>3</div></div>
      </div>

      <div className="alert-banner danger">
        <strong>HCV-2026-10412</strong> — LTV 82%, appraisal delayed 12 days. Approval confidence 78% → 61%. Broker auto-notified.
      </div>

      <div className="card">
        <table className="data-table">
          <thead>
            <tr><th>File</th><th>Property</th><th>LTV</th><th>Appraisal</th><th>Days</th><th>Risk</th><th>Approval Impact</th></tr>
          </thead>
          <tbody>
            {APPRAISALS.map((a) => (
              <tr key={a.file}>
                <td style={{ fontWeight: 600 }}>{a.file}</td>
                <td style={{ fontSize: 12 }}>{a.address}</td>
                <td>{a.ltv}%</td>
                <td><span className={`badge ${a.status === "Complete" ? "badge-green" : a.status === "Delayed" ? "badge-red" : "badge-amber"}`}>{a.status}</span></td>
                <td>{a.days}</td>
                <td><span className={`badge ${a.risk === "Low" ? "badge-green" : a.risk === "Medium" ? "badge-amber" : "badge-red"}`}>{a.risk}</span></td>
                <td>{a.confidence}% conf.</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 12 }}>Portfolio Collateral Exposure</div>
        <table className="data-table">
          <thead>
            <tr><th>Region</th><th>LTV Band</th><th>Exposure</th><th>Risk</th></tr>
          </thead>
          <tbody>
            {COLLATERAL_EXPOSURE.map((c) => (
              <tr key={c.region}>
                <td>{c.region}</td>
                <td>{c.ltvBand}</td>
                <td>{c.exposure}</td>
                <td><span className={`badge ${c.risk === "Low" ? "badge-green" : c.risk === "Medium" ? "badge-amber" : "badge-red"}`}>{c.risk}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
