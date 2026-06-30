"use client";

import { DemoMoment } from "@/components/DemoMoment";
import { useDemoState } from "@/context/DemoStateProvider";
import { FUNDING_QUEUE } from "@/data/mockData";
import { FUNDING_FILES, LATE_FUNDING_DELAYS } from "@/data/extendedMockData";

export function FundingView() {
  const { fundingReminders, sendFundingReminder } = useDemoState();

  return (
    <>
      <h1 className="page-title">Funding Readiness & Closing Operations</h1>
      <p className="page-subtitle">Readiness scores per file — send closing reminders (demo)</p>

      <DemoMoment>
        60 conditional — 22 ready, 17 solicitor block, 9 appraisal, 12 broker follow-up. Each file has funding readiness %.
      </DemoMoment>

      <div className="kpi-grid">
        <div className="kpi-card"><div className="kpi-label">Conditionally Approved</div><div className="kpi-value">{FUNDING_QUEUE.conditionalApproved}</div></div>
        <div className="kpi-card"><div className="kpi-label">Ready to Fund</div><div className="kpi-value" style={{ color: "var(--accent)" }}>{FUNDING_QUEUE.readyToFund}</div></div>
        <div className="kpi-card"><div className="kpi-label">Blocked — Solicitor</div><div className="kpi-value" style={{ color: "var(--amber-500)" }}>{FUNDING_QUEUE.blockedSolicitor}</div></div>
        <div className="kpi-card"><div className="kpi-label">Waiting Appraisal</div><div className="kpi-value">{FUNDING_QUEUE.waitingAppraisal}</div></div>
        <div className="kpi-card"><div className="kpi-label">Broker Follow-Up</div><div className="kpi-value" style={{ color: "var(--amber-500)" }}>{FUNDING_QUEUE.brokerFollowUp ?? 12}</div></div>
      </div>

      <div className="alert-banner danger" style={{ marginBottom: 16 }}>
        <strong>Late-Stage Funding Delay Flags:</strong> {LATE_FUNDING_DELAYS.length} deals at risk of missing closing — solicitor, appraisal, or broker blockers.
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 12 }}>Late-Stage Delay Risk</div>
        {LATE_FUNDING_DELAYS.map((d) => (
          <div key={d.file} className="stat-row">
            <div>
              <div style={{ fontWeight: 600 }}>{d.file} — {d.borrower}</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>Closing {d.closing} · {d.reason}</div>
            </div>
            <span className={`badge ${d.risk === "High" ? "badge-red" : "badge-amber"}`}>{d.risk}</span>
          </div>
        ))}
      </div>

      <div className="card">
        <div style={{ fontWeight: 700, marginBottom: 12 }}>Funding Readiness Queue</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>File</th>
              <th>Borrower</th>
              <th>Readiness</th>
              <th>Blocker</th>
              <th>Closing</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {FUNDING_FILES.map((f) => (
              <tr key={f.file}>
                <td style={{ fontWeight: 600 }}>{f.file}</td>
                <td>{f.borrower}</td>
                <td>
                  <div className="progress-bar" style={{ width: 80, display: "inline-block" }}>
                    <div className={`progress-fill ${f.readiness < 75 ? "amber" : ""}`} style={{ width: `${f.readiness}%` }} />
                  </div>
                  <span style={{ marginLeft: 6, fontSize: 12 }}>{f.readiness}%</span>
                </td>
                <td style={{ fontSize: 12 }}>{f.blocker ?? "—"}</td>
                <td>{f.closing}</td>
                <td>
                  {f.blocker && !fundingReminders.includes(f.file) ? (
                    <button type="button" className="btn-secondary" style={{ padding: "4px 10px", fontSize: 11 }} onClick={() => sendFundingReminder(f.file)}>
                      Send Reminder
                    </button>
                  ) : fundingReminders.includes(f.file) ? (
                    <span className="badge badge-green">Reminded</span>
                  ) : (
                    <span className="badge badge-green">Ready</span>
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
