"use client";

import { DemoMoment } from "@/components/DemoMoment";
import { AUDIT_TIMELINE, GOLDEN_FILE } from "@/data/mockData";

export function ComplianceAuditView() {
  return (
    <>
      <h1 className="page-title">Compliance, Audit & Explainability</h1>
      <p className="page-subtitle">Full audit trail, AI explanation logs & human override tracking</p>

      <DemoMoment>
        Open approved file and show every event: documents received, AI extraction, risk score, underwriter
        review, conditions, broker communication, compliance checks, and final decision.
      </DemoMoment>

      <div className="grid-2">
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 12 }}>File Audit Trail — {GOLDEN_FILE.fileNumber}</div>
          <div className="timeline">
            {AUDIT_TIMELINE.map((e) => (
              <div key={e.time} className="timeline-item">
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
          <div style={{ fontWeight: 700, marginBottom: 12 }}>AI Explanation Log</div>
          <div className="ai-panel" style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 4 }}>Approval Score: 68% — Jun 29, 08:30</div>
            <p style={{ fontSize: 13, margin: 0, lineHeight: 1.6 }}>
              Score reduced due to: income variance (–12 pts), missing bank statements (–8 pts), LTV at upper
              range (–4 pts). Offset by: strong credit +18, established business +10, complete corp docs +6.
            </p>
          </div>
          <div className="stat-row"><span>Human Override</span><span className="badge badge-amber">Pending</span></div>
          <div className="stat-row"><span>Compliance Checklist</span><span className="badge badge-green">4/5 Pass</span></div>
          <div className="stat-row"><span>Policy Version</span><strong>BFS Guidelines v2.4</strong></div>
          <div className="stat-row"><span>Data Access Events</span><strong>12 logged</strong></div>
          <button type="button" className="btn-secondary" style={{ marginTop: 12, width: "100%" }}>
            Export Audit Package
          </button>
        </div>
      </div>
    </>
  );
}
