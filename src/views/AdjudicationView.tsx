"use client";

import { useMemo, useState } from "react";
import { DemoMoment } from "@/components/DemoMoment";
import { SubmissionFiltersBar } from "@/components/SubmissionFilters";
import { ScoreBadge, SlaBadge, StageBadge, formatCurrency } from "@/components/StatusBadges";
import { useDemoState } from "@/context/DemoStateProvider";
import { ADJUDICATION_BATCH, ALL_SUBMISSIONS } from "@/data/mockData";
import { DEFAULT_FILTERS, filterSubmissions, getUniqueBrokers, getUniqueBrokerages, getUniqueUnderwriters } from "@/lib/filterSubmissions";
import type { SubmissionFilters } from "@/lib/filterSubmissions";

export function AdjudicationView() {
  const [filters, setFilters] = useState<SubmissionFilters>({ ...DEFAULT_FILTERS, quick: "all" });
  const { setUwDecision } = useDemoState();
  const batchSource = ALL_SUBMISSIONS.slice(0, 50);
  const batch = useMemo(() => filterSubmissions(batchSource, filters), [filters]);

  const fastTrack = batch.filter((s) => s.fastTrack);
  const docFollow = batch.filter((s) => s.missingDocs.length > 0 && !s.fastTrack);
  const decline = batch.filter((s) => s.approvalScore < 50);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const liveBatch = {
    newToday: batch.length,
    fastTrack: fastTrack.length,
    docFollowUp: docFollow.length,
    seniorReview: batch.filter((s) => s.approvalScore < 70 && s.approvalScore >= 50).length,
    declineRisk: decline.length,
  };

  return (
    <>
      <h1 className="page-title">AI Adjudication & Approval Prediction</h1>
      <p className="page-subtitle">Live triage — filter batch, review explainable AI, capture override decisions</p>

      <DemoMoment>
        50 new submissions triaged — {ADJUDICATION_BATCH.fastTrack} fast-track, {ADJUDICATION_BATCH.docFollowUp} doc
        follow-up, {ADJUDICATION_BATCH.seniorReview} senior review, {ADJUDICATION_BATCH.declineRisk} decline risk.
        Filters update counts in real time.
      </DemoMoment>

      <SubmissionFiltersBar
        filters={filters}
        onChange={setFilters}
        resultCount={batch.length}
        totalCount={50}
        brokers={getUniqueBrokers(batchSource)}
        brokerages={getUniqueBrokerages(batchSource)}
        underwriters={getUniqueUnderwriters(batchSource)}
      />

      <div className="kpi-grid">
        {[
          ["New (filtered)", liveBatch.newToday],
          ["Fast-Track", liveBatch.fastTrack],
          ["Doc Follow-Up", liveBatch.docFollowUp],
          ["Senior Review", liveBatch.seniorReview],
          ["Decline Risk", liveBatch.declineRisk],
        ].map(([label, val]) => (
          <div key={label as string} className="kpi-card">
            <div className="kpi-label">{label}</div>
            <div className="kpi-value">{val}</div>
          </div>
        ))}
      </div>

      <div className="grid-3">
        <div className="card">
          <div style={{ fontWeight: 700, color: "var(--accent)", marginBottom: 10 }}>Fast-Track ({fastTrack.length})</div>
          {fastTrack.slice(0, 4).map((f) => (
            <div key={f.id} className={`file-card ${selectedFile === f.id ? "selected" : ""}`} onClick={() => setSelectedFile(f.id)}>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{f.fileNumber}</div>
              <ScoreBadge score={f.approvalScore} />
            </div>
          ))}
        </div>
        <div className="card">
          <div style={{ fontWeight: 700, color: "var(--amber-500)", marginBottom: 10 }}>Doc Follow-Up ({docFollow.length})</div>
          {docFollow.slice(0, 4).map((f) => (
            <div key={f.id} className="file-card" onClick={() => setSelectedFile(f.id)}>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>{f.missingDocs.join(", ")}</div>
            </div>
          ))}
        </div>
        <div className="card">
          <div style={{ fontWeight: 700, color: "var(--red-500)", marginBottom: 10 }}>Decline Risk ({decline.length})</div>
          {decline.slice(0, 4).map((f) => (
            <div key={f.id} className="file-card">
              <div style={{ fontSize: 11 }}>Credit {f.creditScore} · GDS {f.gds}%</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 12 }}>Explainable AI — Human Override</div>
        <div className="ai-panel" style={{ marginBottom: 12 }}>
          <strong>HCV-2026-10391 (Prime)</strong> — AI recommends fast-track at <strong>91%</strong>
          <p style={{ fontSize: 13, margin: "8px 0 0" }}>Credit 782, GDS 28%, LTV 72%, all docs verified.</p>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button type="button" className="btn-primary" onClick={() => setUwDecision("approve_conditions")}>Accept AI — Fast-Track</button>
          <button type="button" className="btn-secondary" onClick={() => setUwDecision("more_info")}>Override — Request Docs</button>
          <button type="button" className="btn-secondary" onClick={() => setUwDecision("escalate")}>Override — Senior Review</button>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>File</th>
              <th>Borrower</th>
              <th>Product</th>
              <th>Score</th>
              <th>Credit</th>
              <th>LTV</th>
              <th>AI Route</th>
            </tr>
          </thead>
          <tbody>
            {batch.slice(0, 15).map((f) => (
              <tr key={f.id} onClick={() => setSelectedFile(f.id)} style={{ cursor: "pointer" }}>
                <td>{f.fileNumber}</td>
                <td>{f.borrower}</td>
                <td>{f.product}</td>
                <td><ScoreBadge score={f.approvalScore} /></td>
                <td>{f.creditScore}</td>
                <td>{f.ltv}%</td>
                <td>
                  {f.fastTrack ? <span className="badge badge-green">Fast-Track</span> : f.approvalScore < 50 ? <span className="badge badge-red">Decline</span> : <span className="badge badge-amber">Manual</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
