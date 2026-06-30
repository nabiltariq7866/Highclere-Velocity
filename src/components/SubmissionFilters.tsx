"use client";

import type { SubmissionFilters } from "@/lib/filterSubmissions";
import { DEFAULT_FILTERS } from "@/lib/filterSubmissions";
import { PRODUCTS, PROVINCES, STAGE_LABELS } from "@/lib/types";
import type { FileStage } from "@/lib/types";

const QUICK_FILTERS: { id: SubmissionFilters["quick"]; label: string }[] = [
  { id: "all", label: "All Files" },
  { id: "fast_track", label: "Fast-Track" },
  { id: "missing_docs", label: "Missing Docs" },
  { id: "at_risk", label: "SLA At Risk" },
  { id: "appraisal", label: "Appraisal" },
];

const STAGE_OPTIONS: FileStage[] = [
  "new_submission",
  "intake_review",
  "document_pending",
  "underwriting_review",
  "conditional_approval",
  "appraisal_pending",
  "funding_ready",
];

export function SubmissionFiltersBar({
  filters,
  onChange,
  resultCount,
  totalCount,
  brokers,
}: {
  filters: SubmissionFilters;
  onChange: (f: SubmissionFilters) => void;
  resultCount: number;
  totalCount: number;
  brokers: string[];
}) {
  const set = (partial: Partial<SubmissionFilters>) => onChange({ ...filters, ...partial });

  return (
    <div className="card" style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
        <div style={{ fontWeight: 700, fontSize: 14 }}>Filters</div>
        <div style={{ fontSize: 12, color: "var(--muted)" }}>
          Showing <strong style={{ color: "var(--text)" }}>{resultCount}</strong> of {totalCount} active files
        </div>
      </div>

      <div className="filter-bar">
        {QUICK_FILTERS.map((q) => (
          <button
            key={q.id}
            type="button"
            className={`filter-chip ${filters.quick === q.id ? "active" : ""}`}
            onClick={() => set({ quick: q.id })}
          >
            {q.label}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 10,
          marginTop: 12,
        }}
      >
        <div>
          <label style={{ fontSize: 10, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>Province</label>
          <select
            className="top-bar-search"
            style={{ width: "100%", marginTop: 4 }}
            value={filters.province}
            onChange={(e) => set({ province: e.target.value as SubmissionFilters["province"] })}
          >
            <option value="all">All provinces</option>
            {PROVINCES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={{ fontSize: 10, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>Product</label>
          <select
            className="top-bar-search"
            style={{ width: "100%", marginTop: 4 }}
            value={filters.product}
            onChange={(e) => set({ product: e.target.value as SubmissionFilters["product"] })}
          >
            <option value="all">All products</option>
            {PRODUCTS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={{ fontSize: 10, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>Broker</label>
          <select
            className="top-bar-search"
            style={{ width: "100%", marginTop: 4 }}
            value={filters.broker}
            onChange={(e) => set({ broker: e.target.value })}
          >
            <option value="">All brokers</option>
            {brokers.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={{ fontSize: 10, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>SLA</label>
          <select
            className="top-bar-search"
            style={{ width: "100%", marginTop: 4 }}
            value={filters.slaStatus}
            onChange={(e) => set({ slaStatus: e.target.value as SubmissionFilters["slaStatus"] })}
          >
            <option value="all">All SLA</option>
            <option value="on_track">On Track</option>
            <option value="at_risk">At Risk</option>
            <option value="breached">Breached</option>
          </select>
        </div>
        <div>
          <label style={{ fontSize: 10, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>Stage</label>
          <select
            className="top-bar-search"
            style={{ width: "100%", marginTop: 4 }}
            value={filters.stage}
            onChange={(e) => set({ stage: e.target.value as SubmissionFilters["stage"] })}
          >
            <option value="all">All stages</option>
            {STAGE_OPTIONS.map((s) => (
              <option key={s} value={s}>{STAGE_LABELS[s]}</option>
            ))}
          </select>
        </div>
      </div>

      {(filters.province !== "all" ||
        filters.product !== "all" ||
        filters.broker ||
        filters.slaStatus !== "all" ||
        filters.stage !== "all" ||
        filters.quick !== "all") && (
        <button
          type="button"
          className="btn-secondary"
          style={{ marginTop: 12, padding: "6px 14px", fontSize: 12 }}
          onClick={() => onChange({ ...DEFAULT_FILTERS })}
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}
