"use client";

import { DemoMoment } from "@/components/DemoMoment";
import { useDemoState } from "@/context/DemoStateProvider";
import { SLA_AGING_BY_PRODUCT } from "@/data/extendedMockData";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const UNDERWRITERS = [
  { name: "Karen Mitchell", load: 14, capacity: 18, sla: 96, files: ["HCV-2026-10482"] },
  { name: "Steve Fontaine", load: 16, capacity: 18, sla: 88, files: ["HCV-2026-10412"] },
  { name: "Diana Cho", load: 11, capacity: 16, sla: 100, files: [] },
  { name: "Paul Richards", load: 18, capacity: 18, sla: 72, files: ["HCV-2026-10391", "HCV-2026-10405"] },
  { name: "Nadia Kowalski", load: 9, capacity: 16, sla: 100, files: [] },
];

export function SlaQueueView() {
  const { reassignments, reassignFile } = useDemoState();

  return (
    <>
      <h1 className="page-title">SLA, Queue & Capacity Management</h1>
      <p className="page-subtitle">Aging by product, reassignment actions, capacity forecast</p>

      <DemoMoment>
        Volume +40% — reassign files to underwriters with capacity. Aging chart shows BFS slowest stage.
      </DemoMoment>

      <div className="alert-banner">
        <strong>Capacity Alert:</strong> Underwriting 112%. Recommend shifting 6 Prime fast-track files to Diana Cho.
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 12 }}>Aging by Product Type (avg days in queue)</div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={SLA_AGING_BY_PRODUCT}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="product" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar dataKey="avgDays" fill="var(--accent)" name="Avg Days" />
            <Bar dataKey="overSla" fill="var(--red-500)" name="Over SLA" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <div style={{ fontWeight: 700, marginBottom: 12 }}>Underwriter Workload — Reassign</div>
        <table className="data-table">
          <thead>
            <tr><th>Underwriter</th><th>Load</th><th>SLA %</th><th>Reassign incoming</th></tr>
          </thead>
          <tbody>
            {UNDERWRITERS.map((u) => (
              <tr key={u.name}>
                <td>{u.name}</td>
                <td>{u.load}/{u.capacity}</td>
                <td><span className={`badge ${u.sla >= 95 ? "badge-green" : u.sla >= 80 ? "badge-amber" : "badge-red"}`}>{u.sla}%</span></td>
                <td>
                  {u.load >= u.capacity ? (
                    <span style={{ fontSize: 12, color: "var(--red-500)" }}>At capacity</span>
                  ) : u.load < 12 ? (
                    <button type="button" className="btn-secondary" style={{ padding: "4px 10px", fontSize: 11 }} onClick={() => reassignFile("HCV-2026-10391", u.name)}>
                      Accept HCV-10391
                    </button>
                  ) : "—"}
                  {reassignments["HCV-2026-10391"] === u.name && <span className="badge badge-green" style={{ marginLeft: 6 }}>Assigned</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
