"use client";

import { DemoMoment } from "@/components/DemoMoment";
import { ExportButton } from "@/components/ExportButton";
import { useDemoState } from "@/context/DemoStateProvider";
import { GOLDEN_FILE } from "@/data/mockData";
import { PRODUCT_EXCEPTIONS } from "@/data/extendedMockData";

export function ComplianceAuditView() {
  const { auditLog, uwDecision, conditions, qualityScore } = useDemoState();

  const auditExport = auditLog
    .map((e) => `${e.time} | ${e.actor} | ${e.event}`)
    .join("\n");

  return (
    <>
      <h1 className="page-title">Compliance, Audit & Explainability</h1>
      <p className="page-subtitle">Live audit trail — updates when decisions, uploads, fraud actions occur</p>

      <DemoMoment>
        Every action across the platform appends here — underwriter decisions, broker uploads, fraud quarantine. Export full package.
      </DemoMoment>

      <div className="grid-2">
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Audit Trail — {GOLDEN_FILE.fileNumber} (live)</div>
          <div className="timeline">
            {auditLog.slice(0, 12).map((e) => (
              <div key={e.id} className="timeline-item">
                <div className="timeline-dot" />
                <div>
                  <div style={{ fontSize: 11, color: "var(--muted)" }}>{e.time} · {e.actor}</div>
                  <div style={{ fontSize: 13 }}>{e.event}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 12 }}>AI Explanation & Overrides</div>
          <div className="ai-panel" style={{ marginBottom: 12, fontSize: 13 }}>
            Approval score 68%: income variance (−12), missing docs (−8), LTV (−4). Offset: credit (+18), business tenure (+10).
          </div>
          <div className="stat-row"><span>Human override</span><span className={`badge ${uwDecision ? "badge-green" : "badge-amber"}`}>{uwDecision ? uwDecision.replace(/_/g, " ") : "Pending"}</span></div>
          <div className="stat-row"><span>Compliance checklist</span><span className="badge badge-green">4/5 Pass</span></div>
          <div className="stat-row"><span>Policy version</span><strong>BFS v2.4</strong></div>
          <div className="stat-row"><span>Intake quality</span><strong>{qualityScore}%</strong></div>
          <div style={{ fontWeight: 700, margin: "16px 0 8px", fontSize: 13 }}>Condition History</div>
          {conditions.map((c) => (
            <div key={c.id} className="stat-row">
              <span style={{ fontSize: 12 }}>{c.item}</span>
              <span className={`badge ${c.status === "received" ? "badge-green" : "badge-amber"}`}>{c.status}</span>
            </div>
          ))}
          <div style={{ marginTop: 16 }}>
            <ExportButton label="Export Audit Package" title={`Audit ${GOLDEN_FILE.fileNumber}`} content={auditExport} />
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 12 }}>Exception Management Workflow</div>
        {PRODUCT_EXCEPTIONS.map((e) => (
          <div key={e.id} className="stat-row">
            <div>
              <div style={{ fontWeight: 600 }}>{e.file}</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>{e.type} · {e.requestedBy}</div>
            </div>
            <span className={`badge ${e.status === "Approved" ? "badge-green" : "badge-amber"}`}>{e.status}</span>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Sensitive Data & RBAC</div>
        <div className="stat-row"><span>PIPEDA retention policy</span><span className="badge badge-green">Active</span></div>
        <div className="stat-row"><span>Borrower data masking (broker views)</span><span className="badge badge-green">Enabled</span></div>
        <div className="stat-row"><span>Document access logging</span><span className="badge badge-green">12 events</span></div>
        <div className="stat-row"><span>Role-based access (5 personas)</span><span className="badge badge-green">Middleware enforced</span></div>
        <p style={{ fontSize: 13, margin: "12px 0 0" }}>
          Regulated lending environment — every AI score, override, and document access is auditable and exportable.
        </p>
      </div>
    </>
  );
}
