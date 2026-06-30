"use client";

import { DemoMoment } from "@/components/DemoMoment";
import { useDemoState } from "@/context/DemoStateProvider";
import { GOLDEN_FILE } from "@/data/mockData";
import { COMM_TEMPLATES, getCommTemplate } from "@/data/extendedMockData";
import type { ProductType } from "@/lib/types";

const TIMELINE = [
  { time: "Jun 28, 09:18", msg: "Missing document request sent to Angela Morrison", type: "system" },
  { time: "Jun 28, 11:42", msg: "T1 General received — partial condition cleared", type: "broker" },
  { time: "Jun 29, 08:00", msg: "Reminder: 3 conditions due within 7 days", type: "system" },
  { time: "Jun 29, 14:15", msg: "Broker replied: bank statements uploading by July 3", type: "broker" },
];

export function CommunicationsView() {
  const { conditions, markConditionReceived, commTemplateProduct, setCommTemplateProduct } = useDemoState();
  const outstanding = conditions.filter((c) => c.status === "outstanding");
  const templatePreview = getCommTemplate(
    commTemplateProduct as ProductType,
    GOLDEN_FILE.fileNumber,
    outstanding.map((c) => c.item).join(", ") || "none",
    "July 5"
  );

  return (
    <>
      <h1 className="page-title">Broker Communication & Conditions</h1>
      <p className="page-subtitle">Product templates, condition tracker, reminders — mark received to update file</p>

      <DemoMoment>
        5 conditional items — switch product template, mark conditions received, view broker timeline and escalation path.
      </DemoMoment>

      <div className="grid-2">
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 12 }}>File {GOLDEN_FILE.fileNumber}</div>
          {conditions.map((c) => (
            <div key={c.id} className="stat-row">
              <div>
                <div style={{ fontSize: 13 }}>{c.item}</div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>Due {c.due}</div>
              </div>
              {c.status === "received" ? (
                <span className="badge badge-green">Received</span>
              ) : (
                <button type="button" className="btn-secondary" style={{ padding: "4px 10px", fontSize: 11 }} onClick={() => markConditionReceived(c.id)}>
                  Mark Received
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Communication Timeline</div>
          <div className="timeline">
            {TIMELINE.map((t) => (
              <div key={t.time} className="timeline-item">
                <div className={`timeline-dot ${t.type === "broker" ? "" : "amber"}`} />
                <div>
                  <div style={{ fontSize: 11, color: "var(--muted)" }}>{t.time}</div>
                  <div style={{ fontSize: 13 }}>{t.msg}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Communication Template by Product</div>
        <select
          className="top-bar-search"
          style={{ width: "100%", marginBottom: 12 }}
          value={commTemplateProduct}
          onChange={(e) => setCommTemplateProduct(e.target.value)}
        >
          {Object.keys(COMM_TEMPLATES).map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <div className="ai-panel" style={{ fontSize: 13 }}>{templatePreview}</div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Internal Summary — Account Rep / Underwriter</div>
        <p style={{ fontSize: 13, margin: 0, lineHeight: 1.6 }}>
          {GOLDEN_FILE.fileNumber}: {outstanding.length} conditions outstanding. Broker Angela Morrison responsive.
          Income variance unresolved. UW recommendation: conditional approval after bank statements. Escalation July 6 if not received.
        </p>
      </div>
    </>
  );
}
