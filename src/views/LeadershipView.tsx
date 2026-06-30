"use client";

import { DemoMoment } from "@/components/DemoMoment";
import { COMMAND_CENTER_STATS, VOLUME_BY_MONTH } from "@/data/mockData";
import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function LeadershipView() {
  return (
    <>
      <h1 className="page-title">AI Leadership Dashboard</h1>
      <p className="page-subtitle">Executive KPIs, forecasts, bottlenecks & weekly operational intelligence</p>

      <DemoMoment>
        Weekly leadership report: volume growth, underwriting bottlenecks, broker quality trends, funded-volume
        forecast, and top operational actions to protect service levels.
      </DemoMoment>

      <div className="hero-banner">
        <div className="hero-banner-title" style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>
          Week of June 23–30, 2026 — Executive Summary
        </div>
        <div className="hero-banner-muted" style={{ fontSize: 13, lineHeight: 1.6 }}>
          Submissions up 18% YoY. Underwriting capacity at 112% — recommend 2 additional underwriters.
          Broker missing-doc rate improved 4%. Alt-A concentration in ON requires review.
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Total Submissions</div>
          <div className="kpi-value">{COMMAND_CENTER_STATS.totalSubmissions.toLocaleString()}</div>
          <div className="kpi-trend up">↑ 18% YoY</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Approval Rate</div>
          <div className="kpi-value">84.2%</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Avg Time to Decision</div>
          <div className="kpi-value">{COMMAND_CENTER_STATS.avgDecisionHours}h</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Avg Time to Funding</div>
          <div className="kpi-value">12.4d</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">File Quality Score</div>
          <div className="kpi-value">74</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Appraisal Delay Rate</div>
          <div className="kpi-value">4.8%</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Approval & Funding Trend</div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={VOLUME_BY_MONTH}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="approvals" stroke="var(--accent)" strokeWidth={2} />
              <Line type="monotone" dataKey="funded" stroke="#055b65" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Top Operational Actions</div>
          {[
            { action: "Add 2 underwriters to Ontario queue", priority: "High" },
            { action: "Broker education — Dominion Lending missing docs", priority: "Medium" },
            { action: "Portfolio review — Alt-A ON concentration", priority: "High" },
            { action: "Appraisal vendor SLA renegotiation", priority: "Medium" },
            { action: "NS province launch — complete 2 compliance tasks", priority: "Low" },
          ].map((a) => (
            <div key={a.action} className="stat-row">
              <span style={{ fontSize: 13 }}>{a.action}</span>
              <span className={`badge ${a.priority === "High" ? "badge-red" : a.priority === "Medium" ? "badge-amber" : "badge-blue"}`}>
                {a.priority}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>AI-Generated Weekly Report (Preview)</div>
        <p style={{ fontSize: 13, lineHeight: 1.7, margin: 0 }}>
          Highclere processed 562 submissions in June (+4.8% MoM) with 472 approvals (84.0% rate).
          Funded volume reached 418 files. Primary bottleneck remains underwriting capacity during
          peak intake (Mon–Wed). Broker quality score improved to 74. Recommend capacity addition
          and targeted broker education to sustain SLA through Q3 volume growth.
        </p>
        <button type="button" className="btn-primary" style={{ marginTop: 12 }}>Export Board Report</button>
      </div>
    </>
  );
}
