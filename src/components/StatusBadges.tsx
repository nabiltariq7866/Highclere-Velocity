import type { FileStage, SlaStatus } from "@/lib/types";
import { STAGE_LABELS } from "@/lib/types";

export function StageBadge({ stage }: { stage: FileStage }) {
  const label = STAGE_LABELS[stage];
  const cls =
    stage === "funded"
      ? "badge-green"
      : stage === "declined" || stage === "cancelled"
      ? "badge-red"
      : stage === "funding_ready" || stage === "conditional_approval"
      ? "badge-green"
      : stage === "document_pending" || stage === "appraisal_pending"
      ? "badge-amber"
      : "badge-blue";
  return <span className={`badge ${cls}`}>{label}</span>;
}

export function SlaBadge({ status }: { status: SlaStatus }) {
  const cls =
    status === "on_track" ? "badge-green" : status === "at_risk" ? "badge-amber" : "badge-red";
  const label = status === "on_track" ? "On Track" : status === "at_risk" ? "At Risk" : "SLA Breached";
  return <span className={`badge ${cls}`}>{label}</span>;
}

export function ScoreBadge({ score }: { score: number }) {
  const cls = score >= 80 ? "badge-green" : score >= 60 ? "badge-amber" : "badge-red";
  return <span className={`badge ${cls}`}>{score}%</span>;
}

export function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(n);
}
