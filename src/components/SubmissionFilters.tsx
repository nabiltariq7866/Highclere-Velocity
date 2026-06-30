"use client";

import { CustomDropdown } from "@/components/CustomDropdown";
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

const BORROWER_TYPE_OPTIONS = [
  { value: "all", label: "All types" },
  { value: "salaried", label: "Salaried" },
  { value: "self_employed", label: "Self-Employed / BFS" },
  { value: "other", label: "Other income" },
];

const DEAL_SIZE_OPTIONS = [
  { value: "all", label: "All sizes" },
  { value: "under_500k", label: "Under $500K" },
  { value: "500k_750k", label: "$500K – $750K" },
  { value: "over_750k", label: "Over $750K" },
];

const SLA_OPTIONS = [
  { value: "all", label: "All SLA" },
  { value: "on_track", label: "On Track" },
  { value: "at_risk", label: "At Risk" },
  { value: "breached", label: "Breached" },
];

export function SubmissionFiltersBar({
  filters,
  onChange,
  resultCount,
  totalCount,
  brokers,
  brokerages = [],
  underwriters = [],
}: {
  filters: SubmissionFilters;
  onChange: (f: SubmissionFilters) => void;
  resultCount: number;
  totalCount: number;
  brokers: string[];
  brokerages?: string[];
  underwriters?: string[];
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
        <CustomDropdown
          label="Province"
          value={filters.province}
          onChange={(v) => set({ province: v as SubmissionFilters["province"] })}
          options={[{ value: "all", label: "All provinces" }, ...PROVINCES.map((p) => ({ value: p, label: p }))]}
        />
        <CustomDropdown
          label="Product"
          value={filters.product}
          onChange={(v) => set({ product: v as SubmissionFilters["product"] })}
          options={[{ value: "all", label: "All products" }, ...PRODUCTS.map((p) => ({ value: p, label: p }))]}
        />
        <CustomDropdown
          label="Broker"
          value={filters.broker}
          onChange={(v) => set({ broker: v })}
          placeholder="All brokers"
          options={[{ value: "", label: "All brokers" }, ...brokers.map((b) => ({ value: b, label: b }))]}
        />
        <CustomDropdown
          label="Brokerage"
          value={filters.brokerage}
          onChange={(v) => set({ brokerage: v })}
          placeholder="All brokerages"
          options={[{ value: "", label: "All brokerages" }, ...brokerages.map((b) => ({ value: b, label: b }))]}
        />
        <CustomDropdown
          label="Underwriter"
          value={filters.underwriter}
          onChange={(v) => set({ underwriter: v })}
          placeholder="All underwriters"
          options={[{ value: "", label: "All underwriters" }, ...underwriters.map((u) => ({ value: u, label: u }))]}
        />
        <CustomDropdown
          label="Borrower Type"
          value={filters.borrowerType}
          onChange={(v) => set({ borrowerType: v as SubmissionFilters["borrowerType"] })}
          options={BORROWER_TYPE_OPTIONS}
        />
        <CustomDropdown
          label="Deal Size"
          value={filters.dealSize}
          onChange={(v) => set({ dealSize: v as SubmissionFilters["dealSize"] })}
          options={DEAL_SIZE_OPTIONS}
        />
        <CustomDropdown
          label="SLA"
          value={filters.slaStatus}
          onChange={(v) => set({ slaStatus: v as SubmissionFilters["slaStatus"] })}
          options={SLA_OPTIONS}
        />
        <CustomDropdown
          label="Stage"
          value={filters.stage}
          onChange={(v) => set({ stage: v as SubmissionFilters["stage"] })}
          options={[
            { value: "all", label: "All stages" },
            ...STAGE_OPTIONS.map((s) => ({ value: s, label: STAGE_LABELS[s] })),
          ]}
        />
      </div>

      {(filters.province !== "all" ||
        filters.product !== "all" ||
        filters.broker ||
        filters.brokerage ||
        filters.underwriter ||
        filters.borrowerType !== "all" ||
        filters.dealSize !== "all" ||
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
