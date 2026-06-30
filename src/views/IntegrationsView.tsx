"use client";

import { DemoMoment } from "@/components/DemoMoment";
import { useDemoState } from "@/context/DemoStateProvider";
import { INTEGRATIONS } from "@/data/mockData";
import { DATA_MAPPINGS, EMAIL_INTAKE_QUEUE, PILOT_DATA_STATS, UNIFIED_DATA_LAYERS } from "@/data/extendedMockData";

export function IntegrationsView() {
  const { integrationEvents, simulateIntegration } = useDemoState();

  return (
    <>
      <h1 className="page-title">Integration Layer</h1>
      <p className="page-subtitle">Webhooks, email-to-file, data mapping — run live simulation</p>

      <DemoMoment>
        Click <strong>Simulate Filogix Submission</strong> — watch webhook → documents → credit → appraisal → dashboard events stream live.
      </DemoMoment>

      <div style={{ marginBottom: 16 }}>
        <button type="button" className="btn-primary" onClick={simulateIntegration}>
          Simulate Filogix Submission
        </button>
        <span style={{ fontSize: 12, color: "var(--muted)", marginLeft: 12 }}>
          Pilot: {PILOT_DATA_STATS.totalDocuments.toLocaleString()} documents processed · {PILOT_DATA_STATS.appraisalRecords.toLocaleString()} appraisals synced
        </span>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <table className="data-table">
          <thead>
            <tr><th>System</th><th>Status</th><th>Last Sync</th><th>Events (24h)</th></tr>
          </thead>
          <tbody>
            {INTEGRATIONS.map((i) => (
              <tr key={i.name}>
                <td style={{ fontWeight: 600 }}>{i.name}</td>
                <td><span className={`badge ${i.status === "Connected" ? "badge-green" : "badge-amber"}`}>{i.status}</span></td>
                <td>{i.lastSync}</td>
                <td>{i.events.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid-2">
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Email-to-File Intake</div>
          {EMAIL_INTAKE_QUEUE.map((e) => (
            <div key={e.id} className="stat-row">
              <div>
                <div style={{ fontSize: 12, fontWeight: 600 }}>{e.subject}</div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>{e.from} → {e.file}</div>
              </div>
              <span className={`badge ${e.status === "Processed" ? "badge-green" : "badge-amber"}`}>{e.status}</span>
            </div>
          ))}
        </div>
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Unified Data Model — Field Mapping</div>
          {DATA_MAPPINGS.map((m, i) => (
            <div key={i} className="stat-row">
              <span style={{ fontSize: 12 }}>{m.source}: {m.field}</span>
              <span className={`badge ${m.status === "Mapped" ? "badge-green" : "badge-amber"}`}>{m.status}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 12 }}>Unified Mortgage Data Model — Layers</div>
        {UNIFIED_DATA_LAYERS.map((l) => (
          <div key={l.layer} className="stat-row">
            <div>
              <div style={{ fontWeight: 600 }}>{l.layer}</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>{l.entities}</div>
            </div>
            <span style={{ fontSize: 11 }}>{l.sources}</span>
          </div>
        ))}
      </div>

      <div className="ai-panel" style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Live Event Stream</div>
        {integrationEvents.length === 0 ? (
          <p style={{ fontSize: 13, color: "var(--muted)", margin: 0 }}>No events yet — click Simulate above.</p>
        ) : (
          <div className="timeline">
            {integrationEvents.map((e, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-dot" />
                <div>
                  <div style={{ fontSize: 11, color: "var(--muted)" }}>{e.time} — {e.step}</div>
                  <div style={{ fontSize: 13 }}>{e.msg}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
