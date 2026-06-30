"use client";

import { DemoMoment } from "@/components/DemoMoment";

const QUEUES = [
  { stage: "Intake", count: 42, sla: 3, breached: 2, capacity: 85 },
  { stage: "Underwriting", count: 68, sla: 5, breached: 4, capacity: 112 },
  { stage: "Conditions", count: 55, sla: 4, breached: 1, capacity: 78 },
  { stage: "Appraisal", count: 9, sla: 6, breached: 3, capacity: 95 },
  { stage: "Compliance", count: 18, sla: 2, breached: 0, capacity: 62 },
  { stage: "Funding", count: 22, sla: 3, breached: 1, capacity: 70 },
];

const UNDERWRITERS = [
  { name: "Karen Mitchell", load: 14, capacity: 18, sla: 96 },
  { name: "Steve Fontaine", load: 16, capacity: 18, sla: 88 },
  { name: "Diana Cho", load: 11, capacity: 16, sla: 100 },
  { name: "Paul Richards", load: 18, capacity: 18, sla: 72 },
  { name: "Nadia Kowalski", load: 9, capacity: 16, sla: 100 },
];

export function SlaQueueView() {
  return (
    <>
      <h1 className="page-title">SLA, Queue & Capacity Management</h1>
      <p className="page-subtitle">Live queues, aging analysis, workload balancing & bottleneck detection</p>

      <DemoMoment>
        Volume up 40% this week — dashboard predicts underwriting overload, identifies stages that will miss SLA,
        and recommends queue redistribution before service levels break.
      </DemoMoment>

      <div className="alert-banner">
        <strong>Capacity Alert:</strong> Underwriting queue at 112% capacity. 4 files will breach SLA by EOD
        without reassignment. Recommend shifting 6 Prime fast-track files to Diana Cho.
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Volume Change (WoW)</div>
          <div className="kpi-value" style={{ color: "var(--amber-500)" }}>+40%</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">SLA Compliance</div>
          <div className="kpi-value">91.2%</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Bottleneck Stage</div>
          <div className="kpi-value" style={{ fontSize: 18 }}>Underwriting</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Staffing Forecast</div>
          <div className="kpi-value" style={{ color: "var(--red-500)" }}>+2 UW</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 12 }}>Queue by Stage</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Stage</th>
              <th>Files</th>
              <th>SLA (days)</th>
              <th>Breached</th>
              <th>Capacity %</th>
            </tr>
          </thead>
          <tbody>
            {QUEUES.map((q) => (
              <tr key={q.stage}>
                <td style={{ fontWeight: 600 }}>{q.stage}</td>
                <td>{q.count}</td>
                <td>{q.sla}</td>
                <td>
                  <span className={`badge ${q.breached === 0 ? "badge-green" : "badge-red"}`}>
                    {q.breached}
                  </span>
                </td>
                <td>
                  <div className="progress-bar" style={{ width: 100, display: "inline-block", verticalAlign: "middle" }}>
                    <div
                      className={`progress-fill ${q.capacity > 100 ? "red" : q.capacity > 85 ? "amber" : ""}`}
                      style={{ width: `${Math.min(q.capacity, 100)}%` }}
                    />
                  </div>
                  <span style={{ marginLeft: 8, fontSize: 12 }}>{q.capacity}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <div style={{ fontWeight: 700, marginBottom: 12 }}>Underwriter Workload</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Underwriter</th>
              <th>Current Load</th>
              <th>Capacity</th>
              <th>SLA %</th>
              <th>Suggestion</th>
            </tr>
          </thead>
          <tbody>
            {UNDERWRITERS.map((u) => (
              <tr key={u.name}>
                <td>{u.name}</td>
                <td>{u.load}</td>
                <td>{u.capacity}</td>
                <td>
                  <span className={`badge ${u.sla >= 95 ? "badge-green" : u.sla >= 80 ? "badge-amber" : "badge-red"}`}>
                    {u.sla}%
                  </span>
                </td>
                <td style={{ fontSize: 12 }}>
                  {u.load >= u.capacity ? "Reassign incoming" : u.load < 12 ? "Accept overflow" : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
