"use client";

import { DemoMoment } from "@/components/DemoMoment";
import { INTEGRATIONS } from "@/data/mockData";

export function IntegrationsView() {
  return (
    <>
      <h1 className="page-title">Integration Layer</h1>
      <p className="page-subtitle">Broker platforms, appraisal, credit, CRM & document pipeline connectivity</p>

      <DemoMoment>
        Broker submission enters from Filogix — documents extracted, appraisal syncs, conditions created,
        broker communication triggered, executive dashboard updates automatically.
      </DemoMoment>

      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 12 }}>Live Integration Status</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>System</th>
              <th>Status</th>
              <th>Last Sync</th>
              <th>Events (24h)</th>
            </tr>
          </thead>
          <tbody>
            {INTEGRATIONS.map((i) => (
              <tr key={i.name}>
                <td style={{ fontWeight: 600 }}>{i.name}</td>
                <td>
                  <span className={`badge ${i.status === "Connected" ? "badge-green" : "badge-amber"}`}>
                    {i.status}
                  </span>
                </td>
                <td>{i.lastSync}</td>
                <td>{i.events.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="ai-panel">
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Event Flow — Live Simulation</div>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-dot" />
            <div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>10:42:01 — Filogix webhook</div>
              <div style={{ fontSize: 13 }}>New submission HCV-2026-10501 received from Dominion Lending</div>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot" />
            <div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>10:42:03 — Document pipeline</div>
              <div style={{ fontSize: 13 }}>12 documents ingested to S3 · AI extraction started</div>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot amber" />
            <div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>10:42:08 — Equifax</div>
              <div style={{ fontSize: 13 }}>Credit pull complete · Score 756 · GDS/TDS calculated</div>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot" />
            <div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>10:42:12 — Appraisal API</div>
              <div style={{ fontSize: 13 }}>Appraisal order placed · ETA 4 business days</div>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot" />
            <div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>10:42:15 — Command Center</div>
              <div style={{ fontSize: 13 }}>Dashboard updated · File routed to intake queue · Broker notified</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
