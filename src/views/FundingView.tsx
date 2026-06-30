"use client";

import { DemoMoment } from "@/components/DemoMoment";
import { FUNDING_QUEUE } from "@/data/mockData";

export function FundingView() {
  return (
    <>
      <h1 className="page-title">Funding Readiness & Closing Operations</h1>
      <p className="page-subtitle">Ready-to-fund queue, closing checklists & last-mile friction reduction</p>

      <DemoMoment>
        60 conditionally approved deals — 22 ready for funding, 17 blocked by solicitor documents, 9 waiting
        on appraisal, 12 needing broker follow-up.
      </DemoMoment>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Conditionally Approved</div>
          <div className="kpi-value">{FUNDING_QUEUE.conditionalApproved}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Ready to Fund</div>
          <div className="kpi-value" style={{ color: "var(--accent)" }}>{FUNDING_QUEUE.readyToFund}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Blocked — Solicitor</div>
          <div className="kpi-value" style={{ color: "var(--amber-500)" }}>{FUNDING_QUEUE.blockedSolicitor}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Waiting Appraisal</div>
          <div className="kpi-value">{FUNDING_QUEUE.waitingAppraisal}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Broker Follow-Up</div>
          <div className="kpi-value">{FUNDING_QUEUE.brokerFollowUp}</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Ready-to-Fund Queue (Today)</div>
          {["HCV-2026-10321", "HCV-2026-10345", "HCV-2026-10367", "HCV-2026-10389", "HCV-2026-10402"].map((f) => (
            <div key={f} className="file-card">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 600 }}>{f}</span>
                <span className="badge badge-green">Funding Ready</span>
              </div>
              <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>All conditions cleared · Compliance OK</div>
            </div>
          ))}
        </div>

        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Closing Checklist — Prime Purchase</div>
          {[
            { item: "All conditions cleared", done: true },
            { item: "Appraisal complete & accepted", done: true },
            { item: "Solicitor commitment received", done: false },
            { item: "Title insurance ordered", done: false },
            { item: "Compliance sign-off", done: true },
            { item: "Fire insurance binder", done: true },
            { item: "Final underwriting review", done: true },
          ].map((c) => (
            <div key={c.item} className="stat-row">
              <span>{c.item}</span>
              <span className={`badge ${c.done ? "badge-green" : "badge-amber"}`}>
                {c.done ? "Done" : "Pending"}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Funded Volume Forecast</div>
        <div className="stat-row"><span>This Week</span><strong>48 files · $28.4M</strong></div>
        <div className="stat-row"><span>Next Week</span><strong>52 files · $31.2M</strong></div>
        <div className="stat-row"><span>Month End</span><strong>187 files · $112M</strong></div>
      </div>
    </>
  );
}
