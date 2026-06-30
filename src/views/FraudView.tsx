"use client";

import { useState } from "react";
import { DemoMoment } from "@/components/DemoMoment";
import { useDemoState } from "@/context/DemoStateProvider";
import { FRAUD_ALERTS } from "@/data/mockData";
import { FRAUD_FILE_DETAILS } from "@/data/extendedMockData";

export function FraudView() {
  const { fraudStatuses, setFraudStatus } = useDemoState();
  const [expanded, setExpanded] = useState<number | null>(1);

  return (
    <>
      <h1 className="page-title">Fraud, Misrepresentation & Document Integrity</h1>
      <p className="page-subtitle">Authenticity checks, cross-file patterns — quarantine or clear alerts (updates audit)</p>

      <DemoMoment>
        Pattern FP-2026-044 — quarantine suspicious files or clear false positives. Document authenticity panel per file.
      </DemoMoment>

      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Alert</th>
              <th>Severity</th>
              <th>Files</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {FRAUD_ALERTS.map((a) => (
              <tr key={a.id}>
                <td style={{ fontWeight: 600 }}>{a.type}</td>
                <td><span className={`badge ${a.severity === "High" ? "badge-red" : "badge-amber"}`}>{a.severity}</span></td>
                <td>{a.files}</td>
                <td>
                  <span className={`badge ${fraudStatuses[a.id] === "cleared" ? "badge-green" : fraudStatuses[a.id] === "quarantined" ? "badge-red" : "badge-amber"}`}>
                    {fraudStatuses[a.id] ?? "pending"}
                  </span>
                </td>
                <td>
                  <button type="button" className="btn-secondary" style={{ padding: "4px 8px", fontSize: 11, marginRight: 4 }} onClick={() => setFraudStatus(a.id, "quarantined")}>Quarantine</button>
                  <button type="button" className="btn-secondary" style={{ padding: "4px 8px", fontSize: 11 }} onClick={() => setFraudStatus(a.id, "cleared")}>Clear</button>
                  <button type="button" className="btn-secondary" style={{ padding: "4px 8px", fontSize: 11, marginLeft: 4 }} onClick={() => setExpanded(expanded === a.id ? null : a.id)}>Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {expanded && (
        <div className="card" style={{ marginTop: 16 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Document Authenticity — Pattern Files</div>
          {FRAUD_FILE_DETAILS.map((f) => (
            <div key={f.file} className="stat-row">
              <div>
                <div style={{ fontWeight: 600 }}>{f.file}</div>
                <div style={{ fontSize: 11 }}>{f.check}: {f.detail}</div>
              </div>
              <span className={`badge ${f.result === "Failed" ? "badge-red" : "badge-amber"}`}>{f.result}</span>
            </div>
          ))}
        </div>
      )}

      <div className="ai-panel" style={{ marginTop: 16 }}>
        <strong>Cross-File Pattern #FP-2026-044</strong> — Identical pay stub template on 4 applications.
        Files HCV-10455, HCV-10461, HCV-10472, HCV-10480 {fraudStatuses[1] === "quarantined" ? "QUARANTINED — underwriting blocked" : "awaiting review"}.
      </div>
    </>
  );
}
