"use client";

import { useMemo, useState } from "react";
import { DemoMoment } from "@/components/DemoMoment";
import { SubmissionFiltersBar } from "@/components/SubmissionFilters";
import { ScoreBadge, SlaBadge, StageBadge, formatCurrency } from "@/components/StatusBadges";
import {
  ACTIVE_SUBMISSIONS,
  COMMAND_CENTER_STATS,
  VOLUME_BY_MONTH,
} from "@/data/mockData";
import { DEFAULT_FILTERS, filterSubmissions, getUniqueBrokers, getUniqueBrokerages, getUniqueUnderwriters } from "@/lib/filterSubmissions";
import type { SubmissionFilters } from "@/lib/filterSubmissions";
import { STAGE_LABELS } from "@/lib/types";
import type { FileStage } from "@/lib/types";
import {
  Area,
  AreaChart,
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
  const [filters, setFilters] = useState<SubmissionFilters>({ ...DEFAULT_FILTERS });
  const brokers = useMemo(() => getUniqueBrokers(ACTIVE_SUBMISSIONS), []);
  const brokerages = useMemo(() => getUniqueBrokerages(ACTIVE_SUBMISSIONS), []);
  const underwriters = useMemo(() => getUniqueUnderwriters(ACTIVE_SUBMISSIONS), []);

  const filtered = useMemo(
    () => filterSubmissions(ACTIVE_SUBMISSIONS, filters),
    [filters]
  );

  const pipeline = STAGE_ORDER.map((stage) => ({
    stage,
    count: filtered.filter((s) => s.stage === stage).length,
  }));

  const atRisk = filtered.filter((s) => s.slaStatus !== "on_track").slice(0, 8);
  const displayFiles = filtered.slice(0, 25);

  const liveStats = useMemo(
    () => ({
      fastTrack: filtered.filter((s) => s.fastTrack).length,
      missingDocs: filtered.filter((s) => s.missingDocs.length > 0).length,
      appraisal: filtered.filter(
        (s) => s.stage === "appraisal_pending" || s.flags.some((f) => f.toLowerCase().includes("appraisal"))
      ).length,
      slaRisk: filtered.filter((s) => s.slaStatus !== "on_track").length,
    }),
    [filtered]
  );

  return (
    <>
      <h1 className="page-title">Mortgage Submission Command Center</h1>
      <p className="page-subtitle">
        Real-time operating view — use filters to drill down by broker, product, province, SLA & stage
      </p>

      <DemoMoment>
        300 active broker submissions — {COMMAND_CENTER_STATS.fastTrackReady} ready for fast-track,
        {COMMAND_CENTER_STATS.missingIncomeDocs} missing income documents,{" "}
        {COMMAND_CENTER_STATS.appraisalWaiting} waiting on appraisal, and{" "}
        {COMMAND_CENTER_STATS.fundingSlaRisk} high-priority deals at risk of missing funding SLA.
        <em style={{ display: "block", marginTop: 6, fontStyle: "normal", opacity: 0.9 }}>
          Try quick filters: Fast-Track, Missing Docs, or select province ON + product Business-for-Self.
        </em>
      </DemoMoment>

      <SubmissionFiltersBar
        filters={filters}
        onChange={setFilters}
        resultCount={filtered.length}
        totalCount={ACTIVE_SUBMISSIONS.length}
        brokers={brokers}
        brokerages={brokerages}
        underwriters={underwriters}
      />

      <div className="hero-banner">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div className="hero-banner-title" style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>
              {filtered.length} Active Files
              {filtered.length !== ACTIVE_SUBMISSIONS.length && (
                <span style={{ fontSize: 14, fontWeight: 600, opacity: 0.85 }}> (filtered)</span>
              )}
            </div>
            <div className="hero-banner-muted" style={{ fontSize: 13, maxWidth: 520 }}>
              Unified pipeline across Prime, Insurable, Alt-A, BFS, transfer & switch products —
              5,000 total submissions in pilot dataset.
            </div>
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            <div style={{ textAlign: "center" }}>
              <div className="hero-banner-accent" style={{ fontSize: 28, fontWeight: 800 }}>{liveStats.fastTrack}</div>
              <div className="hero-banner-muted" style={{ fontSize: 11 }}>Fast-Track</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "var(--amber-500)", fontSize: 28, fontWeight: 800 }}>{liveStats.missingDocs}</div>
              <div className="hero-banner-muted" style={{ fontSize: 11 }}>Missing Docs</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "var(--red-500)", fontSize: 28, fontWeight: 800 }}>{liveStats.slaRisk}</div>
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
          <div className="kpi-label">Declines Today</div>
          <div className="kpi-value">{COMMAND_CENTER_STATS.declinesToday}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Conditions Outstanding</div>
          <div className="kpi-value">{COMMAND_CENTER_STATS.conditionsOutstanding}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Appraisal Waiting (filtered)</div>
          <div className="kpi-value">{liveStats.appraisal}</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 14 }}>Pipeline by Stage (filtered)</div>
        <div className="pipeline-stage">
          {pipeline.map((p, i) => (
            <div key={p.stage} style={{ display: "flex", alignItems: "center", flex: i < pipeline.length - 1 ? 1 : undefined }}>
              <div className={`pipeline-dot ${p.count > 0 ? "active" : ""}`}>
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
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Files at Risk (filtered)</div>
          {atRisk.length === 0 ? (
            <p style={{ fontSize: 13, color: "var(--muted)" }}>No at-risk files match current filters.</p>
          ) : (
            atRisk.map((f) => (
              <div key={f.id} className="stat-row">
                <div>
                  <div style={{ fontWeight: 600 }}>{f.fileNumber}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)" }}>{f.borrower} · {f.broker}</div>
                </div>
                <SlaBadge status={f.slaStatus} />
              </div>
            ))
          )}
        </div>
      </div>

      <div className="card">
        <div style={{ fontWeight: 700, marginBottom: 12 }}>Active Submissions</div>
        {displayFiles.length === 0 ? (
          <p style={{ fontSize: 13, color: "var(--muted)" }}>No files match — try clearing filters.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>File</th>
                <th>Borrower</th>
                <th>Broker</th>
                <th>Brokerage</th>
                <th>Product</th>
                <th>Province</th>
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
                  <td style={{ fontSize: 12 }}>{f.brokerage}</td>
                  <td>{f.product}</td>
                  <td>{f.province}</td>
                  <td>{formatCurrency(f.amount)}</td>
                  <td><StageBadge stage={f.stage} /></td>
                  <td><ScoreBadge score={f.approvalScore} /></td>
                  <td><SlaBadge status={f.slaStatus} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
