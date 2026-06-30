"use client";

import { DemoMoment } from "@/components/DemoMoment";
import { ScoreBadge, SlaBadge, StageBadge, formatCurrency } from "@/components/StatusBadges";
import {
  ACTIVE_SUBMISSIONS,
  COMMAND_CENTER_STATS,
  VOLUME_BY_MONTH,
} from "@/data/mockData";
import { STAGE_LABELS } from "@/lib/types";
import type { FileStage } from "@/lib/types";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const STAGE_ORDER: FileStage[] = [
  "new_submission",
  "intake_review",
  "document_pending",
  "underwriting_review",
  "conditional_approval",
  "appraisal_pending",
  "compliance_review",
  "funding_ready",
];

export function CommandCenterView() {
  const pipeline = STAGE_ORDER.map((stage) => ({
    stage,
    count: ACTIVE_SUBMISSIONS.filter((s) => s.stage === stage).length,
  }));

  const atRisk = ACTIVE_SUBMISSIONS.filter((s) => s.slaStatus !== "on_track").slice(0, 8);
  const displayFiles = ACTIVE_SUBMISSIONS.slice(0, 15);

  return (
    <>
      <h1 className="page-title">Mortgage Submission Command Center</h1>
      <p className="page-subtitle">
        Real-time operating view across {COMMAND_CENTER_STATS.activeFiles} active broker submissions
      </p>

      <DemoMoment>
        300 active broker submissions — {COMMAND_CENTER_STATS.fastTrackReady} ready for fast-track,
        {COMMAND_CENTER_STATS.missingIncomeDocs} missing income documents,{" "}
        {COMMAND_CENTER_STATS.appraisalWaiting} waiting on appraisal, and{" "}
        {COMMAND_CENTER_STATS.fundingSlaRisk} high-priority deals at risk of missing funding SLA.
      </DemoMoment>

      <div className="hero-banner">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div className="hero-banner-title" style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>
              {COMMAND_CENTER_STATS.activeFiles} Active Files
            </div>
            <div className="hero-banner-muted" style={{ fontSize: 13, maxWidth: 520 }}>
              Unified pipeline across Prime, Insurable, Alt-A, BFS, transfer & switch products —
              5,000 total submissions in pilot dataset.
            </div>
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            <div style={{ textAlign: "center" }}>
              <div className="hero-banner-accent" style={{ fontSize: 28, fontWeight: 800 }}>45</div>
              <div className="hero-banner-muted" style={{ fontSize: 11 }}>Fast-Track</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "var(--amber-500)", fontSize: 28, fontWeight: 800 }}>18</div>
              <div className="hero-banner-muted" style={{ fontSize: 11 }}>Missing Docs</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "var(--red-500)", fontSize: 28, fontWeight: 800 }}>6</div>
              <div className="hero-banner-muted" style={{ fontSize: 11 }}>SLA Risk</div>
            </div>
          </div>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Total Submissions (12 mo)</div>
          <div className="kpi-value">{COMMAND_CENTER_STATS.totalSubmissions.toLocaleString()}</div>
          <div className="kpi-trend up">↑ 18% vs prior year</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Approved Today</div>
          <div className="kpi-value">{COMMAND_CENTER_STATS.approvedToday}</div>
          <div className="kpi-trend up">Avg decision {COMMAND_CENTER_STATS.avgDecisionHours}h</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Funded This Month</div>
          <div className="kpi-value">{COMMAND_CENTER_STATS.fundedThisMonth}</div>
          <div className="kpi-trend up">↑ 12% MoM</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Condition Clearance</div>
          <div className="kpi-value">{COMMAND_CENTER_STATS.conditionClearanceDays}d</div>
          <div className="kpi-trend up">↓ 0.8 days improved</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 14 }}>Pipeline by Stage</div>
        <div className="pipeline-stage">
          {pipeline.map((p, i) => (
            <div key={p.stage} style={{ display: "flex", alignItems: "center", flex: i < pipeline.length - 1 ? 1 : undefined }}>
              <div className={`pipeline-dot ${p.count > 20 ? "active" : ""}`}>
                <span className="count">{p.count}</span>
                {STAGE_LABELS[p.stage].split(" ")[0]}
              </div>
              {i < pipeline.length - 1 && <div className="pipeline-connector" />}
            </div>
          ))}
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Volume Trend</div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={VOLUME_BY_MONTH}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="var(--muted)" />
              <YAxis tick={{ fontSize: 11 }} stroke="var(--muted)" />
              <Tooltip />
              <Area type="monotone" dataKey="submissions" stroke="var(--accent)" fill="var(--ai-bg)" />
              <Area type="monotone" dataKey="funded" stroke="#055b65" fill="transparent" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Files at Risk</div>
          {atRisk.map((f) => (
            <div key={f.id} className="stat-row">
              <div>
                <div style={{ fontWeight: 600 }}>{f.fileNumber}</div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>{f.borrower} · {f.broker}</div>
              </div>
              <SlaBadge status={f.slaStatus} />
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div style={{ fontWeight: 700, marginBottom: 12 }}>Active Submissions</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>File</th>
              <th>Borrower</th>
              <th>Broker</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Stage</th>
              <th>Score</th>
              <th>SLA</th>
            </tr>
          </thead>
          <tbody>
            {displayFiles.map((f) => (
              <tr key={f.id}>
                <td style={{ fontWeight: 600 }}>{f.fileNumber}</td>
                <td>{f.borrower}</td>
                <td>{f.broker}</td>
                <td>{f.product}</td>
                <td>{formatCurrency(f.amount)}</td>
                <td><StageBadge stage={f.stage} /></td>
                <td><ScoreBadge score={f.approvalScore} /></td>
                <td><SlaBadge status={f.slaStatus} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
