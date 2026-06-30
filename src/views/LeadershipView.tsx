"use client";

import { DemoMoment } from "@/components/DemoMoment";
import { ExportButton } from "@/components/ExportButton";
import { COMMAND_CENTER_STATS, VOLUME_BY_MONTH } from "@/data/mockData";
import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const BOARD_REPORT = `HIGHCLERE VELOCITY — WEEKLY EXECUTIVE REPORT
Week of June 23–30, 2026

VOLUME & CONVERSION
- Total submissions (12 mo): ${COMMAND_CENTER_STATS.totalSubmissions.toLocaleString()}
- Approval rate: 84.2%
- Funded this month: ${COMMAND_CENTER_STATS.fundedThisMonth}
- Broker conversion: 78.4%
- Avg time to decision: ${COMMAND_CENTER_STATS.avgDecisionHours}h
- Avg time to funding: 12.4d

BOTTLENECKS
- Underwriting capacity at 112% — recommend +2 underwriters
- Appraisal delay rate: 4.8%
- Alt-A concentration Ontario: +24% MoM

TOP ACTIONS
1. Add underwriters to Ontario queue
2. Broker education — Dominion Lending missing docs
3. Portfolio review — Alt-A ON concentration
4. Appraisal vendor SLA renegotiation
5. NS province launch — 2 compliance tasks

FUNDING FORECAST
- Next week: $31.2M · Month end: $112M pipeline`;

export function LeadershipView() {
  return (
    <>
      <h1 className="page-title">AI Leadership Dashboard</h1>
      <p className="page-subtitle">Executive KPIs, broker conversion, exportable board report</p>

      <DemoMoment>
        Weekly leadership intelligence — export generates downloadable board report (demo).
      </DemoMoment>

      <div className="hero-banner">
        <div className="hero-banner-title" style={{ fontSize: 20, fontWeight: 800 }}>Week of June 23–30, 2026</div>
        <div className="hero-banner-muted" style={{ fontSize: 13 }}>Volume up 18% YoY · Underwriting at capacity · Alt-A ON review required</div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card"><div className="kpi-label">Total Submissions</div><div className="kpi-value">{COMMAND_CENTER_STATS.totalSubmissions.toLocaleString()}</div></div>
        <div className="kpi-card"><div className="kpi-label">Approval Rate</div><div className="kpi-value">84.2%</div></div>
        <div className="kpi-card"><div className="kpi-label">Broker Conversion</div><div className="kpi-value">78.4%</div></div>
        <div className="kpi-card"><div className="kpi-label">File Quality Score</div><div className="kpi-value">74</div></div>
        <div className="kpi-card"><div className="kpi-label">Time to Decision</div><div className="kpi-value">{COMMAND_CENTER_STATS.avgDecisionHours}h</div></div>
        <div className="kpi-card"><div className="kpi-label">Appraisal Delay Rate</div><div className="kpi-value">4.8%</div></div>
      </div>

      <div className="grid-2">
        <div className="card">
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
          {["Add 2 underwriters Ontario", "Broker education Dominion Lending", "Portfolio review Alt-A ON", "Appraisal vendor SLA", "NS expansion compliance"].map((a, i) => (
            <div key={i} className="stat-row"><span>{a}</span><span className={`badge ${i < 2 ? "badge-red" : "badge-amber"}`}>{i < 2 ? "High" : "Medium"}</span></div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>AI Weekly Report</div>
        <p style={{ fontSize: 13, lineHeight: 1.7, margin: "0 0 12px" }}>{BOARD_REPORT.split("\n").slice(0, 8).join(" ")}</p>
        <ExportButton label="Export Board Report" title="Highclere Weekly Executive Report" content={BOARD_REPORT} />
      </div>
    </>
  );
}
