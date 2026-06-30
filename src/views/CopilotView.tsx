"use client";

import { useState } from "react";
import { DemoMoment } from "@/components/DemoMoment";
import { ScoreBadge } from "@/components/StatusBadges";
import { useDemoState } from "@/context/DemoStateProvider";
import { GOLDEN_FILE } from "@/data/mockData";
import { UW_PRODUCTIVITY } from "@/data/extendedMockData";

const COPILOT_ANSWERS: Record<string, string> = {
  income: "Use NOA line 150 ($118,400) until business bank statements received. BFS guideline §4.2.",
  conditions: "1) 90-day business bank statements 2) T1 all schedules 3) LOE income variance 4) Fire insurance 5) Solicitor commitment",
  gds: `GDS ${GOLDEN_FILE.gds}% / TDS ${GOLDEN_FILE.tds}% — recalculate after verified income.`,
};

export function CopilotView() {
  const { uwDecision, setUwDecision, qualityScore } = useDemoState();
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "user", text: "What income should I use for GDS/TDS calculation?" },
    { role: "ai", text: COPILOT_ANSWERS.income },
  ]);

  const ask = () => {
    if (!question.trim()) return;
    const q = question.toLowerCase();
    let answer = "Based on file HCV-2026-10482: maintain conditional hold until income docs complete. Approval likelihood ~68%.";
    if (q.includes("income")) answer = COPILOT_ANSWERS.income;
    else if (q.includes("condition")) answer = COPILOT_ANSWERS.conditions;
    else if (q.includes("gds") || q.includes("tds")) answer = COPILOT_ANSWERS.gds;
    setChat((c) => [...c, { role: "user", text: question }, { role: "ai", text: answer }]);
    setQuestion("");
  };

  return (
    <>
      <h1 className="page-title">Underwriter Copilot</h1>
      <p className="page-subtitle">AI summary, live Q&A, decision capture & productivity dashboard</p>

      <DemoMoment>
        One-page summary on open — capture approve/condition/escalate decision (persists to audit trail). Ask Copilot live questions.
      </DemoMoment>

      <div className="kpi-grid">
        {UW_PRODUCTIVITY.map((u) => (
          <div key={u.name} className="kpi-card">
            <div className="kpi-label">{u.name.split(" ")[0]} — Today</div>
            <div className="kpi-value" style={{ fontSize: 18 }}>{u.decisions} decisions</div>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>{u.filesToday} files · {u.avgMinutes} min avg</div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: 18 }}>{GOLDEN_FILE.fileNumber}</div>
              <div style={{ color: "var(--muted)", fontSize: 13 }}>{GOLDEN_FILE.borrower} · Intake quality {qualityScore}%</div>
            </div>
            <ScoreBadge score={GOLDEN_FILE.approvalScore} />
          </div>
          <div className="ai-panel" style={{ fontSize: 13, lineHeight: 1.7 }}>
            <p><strong>Borrower:</strong> Self-employed 6+ yrs · Credit {GOLDEN_FILE.creditScore}</p>
            <p><strong>Income:</strong> Stated $142K vs NOA $118K — 17% variance</p>
            <p><strong>Recommended:</strong> Conditional approval — do not fast-track</p>
          </div>
          {uwDecision && (
            <div className="alert-banner" style={{ marginTop: 12 }}>
              Decision recorded: <strong>{uwDecision.replace(/_/g, " ")}</strong> — synced to compliance audit log
            </div>
          )}
          <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
            <button type="button" className="btn-primary" onClick={() => setUwDecision("approve_conditions")}>Approve with Conditions</button>
            <button type="button" className="btn-secondary" onClick={() => setUwDecision("more_info")}>Request More Info</button>
            <button type="button" className="btn-secondary" onClick={() => setUwDecision("escalate")}>Escalate</button>
          </div>
        </div>
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Ask Copilot</div>
          {chat.map((m, i) => (
            <div key={i} className={`chat-bubble ${m.role}`}>{m.text}</div>
          ))}
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <input
              className="top-bar-search"
              style={{ flex: 1 }}
              placeholder="Ask about income, conditions, GDS..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && ask()}
            />
            <button type="button" className="btn-primary" onClick={ask}>Ask</button>
          </div>
        </div>
      </div>
    </>
  );
}
