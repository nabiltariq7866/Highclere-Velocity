"use client";

import { useMemo, useState } from "react";
import { CustomDropdown } from "@/components/CustomDropdown";
import { DemoMoment } from "@/components/DemoMoment";
import { UploadSimulator } from "@/components/UploadSimulator";
import { ScoreBadge, StageBadge, formatCurrency } from "@/components/StatusBadges";
import { useDemoState } from "@/context/DemoStateProvider";
import { getSubmissionsByBroker, GOLDEN_FILE } from "@/data/mockData";
import { BROKER_COMM_TIMELINE, BROKER_EDUCATION_TIPS } from "@/data/extendedMockData";
import { runScenario, type BorrowerType, type TransactionType } from "@/lib/scenarioEngine";
import type { Province } from "@/lib/types";
import { PROVINCES } from "@/lib/types";

const UPLOAD_TARGETS = [
  { checklistId: "bank", label: "Business bank statements (90 days)" },
  { checklistId: "t1", label: "T1 General 2024" },
];

export function BrokerPortalView() {
  const myFiles = getSubmissionsByBroker("Angela Morrison").slice(0, 6);
  const { goldenFileChecklist, qualityScore } = useDemoState();
  const [uploadOpen, setUploadOpen] = useState(false);
  const outstanding = goldenFileChecklist.filter((c) => !c.done).length;

  return (
    <>
      <h1 className="page-title">Broker Portal</h1>
      <p className="page-subtitle">Welcome Angela — Dominion Lending Centres · Ontario</p>

      <DemoMoment>
        Upload missing documents — simulated intake updates the checklist and shows AI extraction progress.
      </DemoMoment>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Active Files</div>
          <div className="kpi-value">{myFiles.length + 8}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Quality Score (live)</div>
          <div className="kpi-value" style={{ color: "var(--accent)" }}>{qualityScore}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Conditions Outstanding</div>
          <div className="kpi-value" style={{ color: "var(--amber-500)" }}>{outstanding}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Appraisal — Sarah Chen</div>
          <div className="kpi-value" style={{ fontSize: 16, color: "var(--amber-500)" }}>Ordered</div>
          <div style={{ fontSize: 11, color: "var(--muted)" }}>ETA 4 business days</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 12 }}>Priority File — {GOLDEN_FILE.fileNumber}</div>
        {outstanding > 0 ? (
          <div className="alert-banner">
            Action required: {outstanding} document(s) still outstanding for Sarah Chen (BFS).
            {goldenFileChecklist.filter((c) => !c.done).map((c) => c.item).join(" · ")}
          </div>
        ) : (
          <div className="ai-panel" style={{ marginBottom: 12, fontSize: 13 }}>
            All intake documents received for Sarah Chen — file ready for underwriting review.
          </div>
        )}
        <div style={{ display: "flex", gap: 8 }}>
          <button type="button" className="btn-primary" onClick={() => setUploadOpen(true)}>
            Upload Documents
          </button>
          <button type="button" className="btn-secondary">View Conditions</button>
        </div>
      </div>

      <UploadSimulator
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        fileNumber={GOLDEN_FILE.fileNumber}
        borrower={GOLDEN_FILE.borrower}
        targets={UPLOAD_TARGETS}
        defaultTargetId="bank"
      />

      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 12 }}>Communication Timeline — {GOLDEN_FILE.fileNumber}</div>
        <div className="timeline">
          {BROKER_COMM_TIMELINE.map((t, i) => (
            <div key={i} className="timeline-item">
              <div className="timeline-dot" />
              <div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>{t.time} · {t.from}</div>
                <div style={{ fontSize: 13 }}>{t.event}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div style={{ fontWeight: 700, marginBottom: 12 }}>My Submissions</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>File</th>
              <th>Borrower</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Stage</th>
              <th>Appraisal</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {[GOLDEN_FILE, ...myFiles].slice(0, 8).map((f) => (
              <tr key={f.id}>
                <td style={{ fontWeight: 600 }}>{f.fileNumber}</td>
                <td>{f.borrower}</td>
                <td>{f.product}</td>
                <td>{formatCurrency(f.amount)}</td>
                <td><StageBadge stage={f.stage} /></td>
                <td>
                  {f.id === GOLDEN_FILE.id ? (
                    <span className="badge badge-amber">Ordered</span>
                  ) : (
                    <span className="badge badge-green">N/A</span>
                  )}
                </td>
                <td><ScoreBadge score={f.approvalScore} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export function BrokerScenarioView() {
  const [borrowerType, setBorrowerType] = useState<BorrowerType>("bfs");
  const [province, setProvince] = useState<Province>("ON");
  const [creditScore, setCreditScore] = useState(742);
  const [ltv, setLtv] = useState(78);
  const [gds, setGds] = useState(32);
  const [tds, setTds] = useState(41);
  const [transactionType, setTransactionType] = useState<TransactionType>("purchase");
  const [selfEmployedYears, setSelfEmployedYears] = useState(6);
  const [ran, setRan] = useState(false);

  const result = useMemo(
    () =>
      runScenario({
        borrowerType,
        province,
        creditScore,
        ltv,
        gds,
        tds,
        transactionType,
        selfEmployedYears,
      }),
    [borrowerType, province, creditScore, ltv, gds, tds, transactionType, selfEmployedYears]
  );

  const handleRun = () => setRan(true);

  return (
    <>
      <h1 className="page-title">Scenario Desk</h1>
      <p className="page-subtitle">Pre-check product fit — change inputs and run scenario to see live results</p>

      <DemoMoment>
        Pre-submit scenario check — live product fit, friction warnings, and document checklist before you submit.
      </DemoMoment>

      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Broker Education Tips</div>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13 }}>
          {BROKER_EDUCATION_TIPS.map((t) => (
            <li key={t} style={{ marginBottom: 4 }}>{t}</li>
          ))}
        </ul>
      </div>

      <div className="card">
        <div className="grid-2" style={{ marginBottom: 0 }}>
          <div>
            <CustomDropdown
              label="Borrower Type"
              value={borrowerType}
              onChange={(v) => { setBorrowerType(v as BorrowerType); setRan(false); }}
              options={[
                { value: "salaried", label: "Salaried" },
                { value: "bfs", label: "Self-Employed (BFS)" },
                { value: "new-se", label: "Newly Self-Employed" },
                { value: "commission", label: "Commission / Variable" },
              ]}
            />
          </div>
          <div>
            <CustomDropdown
              label="Transaction"
              value={transactionType}
              onChange={(v) => { setTransactionType(v as TransactionType); setRan(false); }}
              options={[
                { value: "purchase", label: "Purchase" },
                { value: "refinance", label: "Refinance" },
                { value: "transfer", label: "Transfer / Switch" },
              ]}
            />
          </div>
          <div>
            <CustomDropdown
              label="Province"
              value={province}
              onChange={(v) => { setProvince(v as Province); setRan(false); }}
              options={PROVINCES.map((p) => ({ value: p, label: p }))}
            />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, display: "block", marginBottom: 6 }}>
              Credit Score: <strong>{creditScore}</strong>
            </label>
            <input
              type="range"
              min={550}
              max={850}
              value={creditScore}
              onChange={(e) => { setCreditScore(Number(e.target.value)); setRan(false); }}
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, display: "block", marginBottom: 6 }}>
              LTV %: <strong>{ltv}</strong>
            </label>
            <input
              type="range"
              min={50}
              max={95}
              value={ltv}
              onChange={(e) => { setLtv(Number(e.target.value)); setRan(false); }}
              style={{ width: "100%" }}
            />
          </div>
          {(borrowerType === "bfs" || borrowerType === "new-se") && (
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, display: "block", marginBottom: 6 }}>
                Years self-employed: <strong>{selfEmployedYears}</strong>
              </label>
              <input
                type="range"
                min={0}
                max={15}
                value={selfEmployedYears}
                onChange={(e) => { setSelfEmployedYears(Number(e.target.value)); setRan(false); }}
                style={{ width: "100%" }}
              />
            </div>
          )}
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, display: "block", marginBottom: 6 }}>GDS %</label>
            <input
              type="number"
              className="top-bar-search"
              style={{ width: "100%" }}
              value={gds}
              onChange={(e) => { setGds(Number(e.target.value)); setRan(false); }}
            />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, display: "block", marginBottom: 6 }}>TDS %</label>
            <input
              type="number"
              className="top-bar-search"
              style={{ width: "100%" }}
              value={tds}
              onChange={(e) => { setTds(Number(e.target.value)); setRan(false); }}
            />
          </div>
        </div>
        <button type="button" className="btn-primary" style={{ marginTop: 16 }} onClick={handleRun}>
          Run Scenario Check
        </button>
      </div>

      {ran ? (
        <>
          <div className="ai-panel" style={{ marginTop: 16 }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>AI Scenario Result</div>
            <p style={{ fontSize: 13, margin: "0 0 12px" }}>
              <strong>Recommended:</strong> {result.recommended} ({result.fit}% policy fit)
            </p>
            {result.friction.length > 0 && (
              <p style={{ fontSize: 13, margin: "0 0 12px", color: "var(--amber-500)" }}>
                <strong>Friction:</strong> {result.friction.join(" · ")}
              </p>
            )}
            <p style={{ fontSize: 13, margin: "0 0 12px" }}>
              <strong>Before submitting:</strong> {result.requiredDocs.join(", ")}
            </p>
            <p style={{ fontSize: 13, margin: 0 }}>
              <strong>Approval likelihood:</strong> {result.approvalLikelihoodComplete}% if docs complete ·{" "}
              {result.approvalLikelihoodCurrent}% with typical package · Quality score {result.qualityScore}/100
            </p>
          </div>

          <div className="card" style={{ marginTop: 16 }}>
            <div style={{ fontWeight: 700, marginBottom: 12 }}>Product Comparison (live)</div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Fit</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {result.products.map((p) => (
                  <tr key={p.product}>
                    <td style={{ fontWeight: 600 }}>
                      {p.product}
                      {p.recommended && (
                        <span className="badge badge-green" style={{ marginLeft: 8 }}>Best</span>
                      )}
                    </td>
                    <td>
                      <div className="progress-bar" style={{ width: 100, display: "inline-block", verticalAlign: "middle" }}>
                        <div className="progress-fill" style={{ width: `${p.fit}%` }} />
                      </div>
                      <span style={{ marginLeft: 8 }}>{p.fit}%</span>
                    </td>
                    <td style={{ fontSize: 12 }}>{p.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="card" style={{ marginTop: 16, fontSize: 13, color: "var(--muted)" }}>
          Adjust sliders and click <strong>Run Scenario Check</strong> to calculate product fit in real time.
          Try: Salaried + credit 720 + LTV 75 → Prime. BFS + LTV 90 → lower scores.
        </div>
      )}
    </>
  );
}

export function BrokerMyFilesView() {
  const files = getSubmissionsByBroker("Angela Morrison");
  return (
    <>
      <h1 className="page-title">My Submissions</h1>
      <p className="page-subtitle">{files.length} files in pipeline</p>
      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>File</th>
              <th>Borrower</th>
              <th>Stage</th>
              <th>Closing</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {files.map((f) => (
              <tr key={f.id}>
                <td>{f.fileNumber}</td>
                <td>{f.borrower}</td>
                <td><StageBadge stage={f.stage} /></td>
                <td>{f.closingDate}</td>
                <td><ScoreBadge score={f.approvalScore} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export function BrokerConditionsView() {
  const { goldenFileChecklist, conditions, markConditionReceived } = useDemoState();
  const goldenOutstanding = goldenFileChecklist.filter((c) => !c.done);
  const commOutstanding = conditions.filter((c) => c.status === "outstanding");

  return (
    <>
      <h1 className="page-title">Conditions Tracker</h1>
      <p className="page-subtitle">Document + conditional approval items — syncs with uploads & communications</p>
      <div className="card">
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Document conditions (intake)</div>
        {goldenOutstanding.map((c) => (
          <div key={c.id} className="stat-row">
            <div>
              <div style={{ fontWeight: 600 }}>{c.item}</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>{GOLDEN_FILE.fileNumber} · Sarah Chen</div>
            </div>
            <span className="badge badge-amber">Due Jul 5</span>
          </div>
        ))}
        <div style={{ fontWeight: 700, margin: "16px 0 8px" }}>Conditional approval items</div>
        {commOutstanding.map((c) => (
          <div key={c.id} className="stat-row">
            <div>
              <div style={{ fontWeight: 600 }}>{c.item}</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>Due {c.due}</div>
            </div>
            <button type="button" className="btn-secondary" style={{ padding: "4px 10px", fontSize: 11 }} onClick={() => markConditionReceived(c.id)}>
              Mark Received
            </button>
          </div>
        ))}
        {goldenOutstanding.length === 0 && commOutstanding.length === 0 && (
          <div className="ai-panel" style={{ fontSize: 13 }}>All conditions cleared for Sarah Chen (demo).</div>
        )}
      </div>
    </>
  );
}
