"use client";

import { useState } from "react";
import { DemoMoment } from "@/components/DemoMoment";
import { useDemoState } from "@/context/DemoStateProvider";
import { GOLDEN_FILE } from "@/data/mockData";
import { SALARIED_DOC_PACKAGE } from "@/data/extendedMockData";

const BFS_DOCS = [
  { name: "NOA 2024", type: "Tax", extracted: "$118,400 line 150", confidence: 94, flag: null },
  { name: "T1 General 2024", type: "Tax", extracted: "Pending full parse", confidence: 72, flag: "Missing schedules" },
  { name: "Business Bank Stmt (partial)", type: "Bank", extracted: "Deposits avg $9,200/mo", confidence: 81, flag: "Only 45 days" },
];

export function DocumentReviewView() {
  const [mode, setMode] = useState<"bfs" | "salaried">("bfs");
  const { qualityScore } = useDemoState();

  const pkg = mode === "bfs" ? { ...GOLDEN_FILE, docs: BFS_DOCS, income: { stated: 142000, noa: 118400, deposits: 110400 } } : SALARIED_DOC_PACKAGE;

  return (
    <>
      <h1 className="page-title">Document Review & Income Verification</h1>
      <p className="page-subtitle">Toggle BFS vs salaried package — extraction, consistency, employment verification</p>

      <DemoMoment>
        Switch borrower type to see different document packages. BFS shows income mismatch; salaried shows clean verification.
      </DemoMoment>

      <div className="filter-bar">
        <button type="button" className={`filter-chip ${mode === "bfs" ? "active" : ""}`} onClick={() => setMode("bfs")}>BFS — Sarah Chen</button>
        <button type="button" className={`filter-chip ${mode === "salaried" ? "active" : ""}`} onClick={() => setMode("salaried")}>Salaried — James Wilson</button>
      </div>

      <div className="grid-2">
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 12 }}>{mode === "bfs" ? GOLDEN_FILE.fileNumber : SALARIED_DOC_PACKAGE.file}</div>
          {(mode === "bfs" ? BFS_DOCS : SALARIED_DOC_PACKAGE.docs).map((d) => (
            <div key={d.name} className="file-card">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{d.name}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)" }}>{d.type}</div>
                </div>
                <span className={`badge ${d.confidence >= 90 ? "badge-green" : "badge-amber"}`}>{d.confidence}%</span>
              </div>
              <div style={{ fontSize: 12, marginTop: 8 }}>{d.extracted}</div>
              {d.flag && <div style={{ fontSize: 11, color: "var(--amber-500)" }}>⚠ {d.flag}</div>}
            </div>
          ))}
        </div>

        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Income Consistency</div>
          {mode === "bfs" ? (
            <>
              <div className="stat-row"><span>Stated</span><strong style={{ color: "var(--amber-500)" }}>$142,000</strong></div>
              <div className="stat-row"><span>NOA</span><strong>$118,400</strong></div>
              <div className="stat-row"><span>Bank (annualized)</span><strong>$110,400</strong></div>
              <div className="stat-row"><span>Variance</span><strong style={{ color: "var(--red-500)" }}>17.3%</strong></div>
            </>
          ) : (
            <>
              <div className="stat-row"><span>Stated</span><strong>$89,200</strong></div>
              <div className="stat-row"><span>NOA</span><strong>$88,950</strong></div>
              <div className="stat-row"><span>Pay stubs (annualized)</span><strong>$89,100</strong></div>
              <div className="stat-row"><span>Employment verified</span><span className="badge badge-green">TechCorp Inc.</span></div>
            </>
          )}
          <div className="ai-panel" style={{ marginTop: 16, fontSize: 13 }}>
            {mode === "bfs"
              ? `Underwriter summary: Income mismatch. Intake quality ${qualityScore}%. Recommend LOE + bank statements.`
              : "Underwriter summary: Clean salaried package. Employment letter matches pay stubs and NOA. Fast-track eligible."}
          </div>
        </div>
      </div>
    </>
  );
}
