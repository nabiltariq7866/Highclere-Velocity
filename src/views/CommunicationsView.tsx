"use client";

import { DemoMoment } from "@/components/DemoMoment";
import { GOLDEN_FILE } from "@/data/mockData";

const CONDITIONS = [
  { id: 1, item: "Updated business bank statements (90 days)", due: "2026-07-05", status: "Outstanding" },
  { id: 2, item: "T1 General 2024 — all schedules", due: "2026-07-05", status: "Outstanding" },
  { id: 3, item: "Letter of explanation — income variance", due: "2026-07-08", status: "Outstanding" },
  { id: 4, item: "Signed disclosure statement", due: "2026-07-02", status: "Received" },
  { id: 5, item: "Fire insurance binder", due: "2026-07-12", status: "Outstanding" },
];

const TIMELINE = [
  { time: "Jun 28, 09:18", msg: "Missing document request sent to Angela Morrison", type: "system" },
  { time: "Jun 28, 11:42", msg: "T1 General received — partial condition cleared", type: "broker" },
  { time: "Jun 29, 08:00", msg: "Reminder: 3 conditions due within 7 days", type: "system" },
  { time: "Jun 29, 14:15", msg: "Broker replied: bank statements uploading by July 3", type: "broker" },
];

export function CommunicationsView() {
  return (
    <>
      <h1 className="page-title">Broker Communication & Conditions</h1>
      <p className="page-subtitle">Automated updates, condition tracking, smart reminders & escalation</p>

      <DemoMoment>
        Conditional approval with 5 outstanding items — platform generated clean broker-facing list,
        sent reminders as deadlines approach, and will escalate only unresolved issues to the team.
      </DemoMoment>

      <div className="grid-2">
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 12 }}>File {GOLDEN_FILE.fileNumber}</div>
          <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 16 }}>
            {GOLDEN_FILE.borrower} · Conditional Approval · Closing {GOLDEN_FILE.closingDate}
          </div>
          {CONDITIONS.map((c) => (
            <div key={c.id} className="stat-row">
              <div>
                <div style={{ fontSize: 13 }}>{c.item}</div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>Due {c.due}</div>
              </div>
              <span className={`badge ${c.status === "Received" ? "badge-green" : "badge-amber"}`}>
                {c.status}
              </span>
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

      <div className="ai-panel" style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>AI-Generated Broker Update (Preview)</div>
        <p style={{ fontSize: 13, margin: 0, lineHeight: 1.6 }}>
          Hi Angela — File {GOLDEN_FILE.fileNumber} has <strong>4 outstanding conditions</strong> before
          funding. Priority items due July 5: business bank statements and T1 General. Disclosure received —
          thank you. Reply in portal or upload directly. Escalation to account rep scheduled if not received by July 6.
        </p>
      </div>
    </>
  );
}
