"use client";

import { DemoMoment } from "@/components/DemoMoment";
import { ScoreBadge, StageBadge, formatCurrency } from "@/components/StatusBadges";
import { getSubmissionsByBroker, GOLDEN_FILE } from "@/data/mockData";

export function BrokerPortalView() {
  const myFiles = getSubmissionsByBroker("Angela Morrison").slice(0, 6);

  return (
    <>
      <h1 className="page-title">Broker Portal</h1>
      <p className="page-subtitle">Welcome Angela — Dominion Lending Centres · Ontario</p>

      <DemoMoment>
        Enter borrower scenario before submitting — system recommends best-fit product, warns about missing
        documents, shows likely approval friction, helps package file correctly the first time.
      </DemoMoment>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Active Files</div>
          <div className="kpi-value">{myFiles.length + 8}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Quality Score</div>
          <div className="kpi-value" style={{ color: "var(--accent)" }}>88</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Conditions Outstanding</div>
          <div className="kpi-value" style={{ color: "var(--amber-500)" }}>4</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Funded This Month</div>
          <div className="kpi-value">12</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 12 }}>Priority File — {GOLDEN_FILE.fileNumber}</div>
        <div className="alert-banner">
          Action required: Upload business bank statements and T1 General for Sarah Chen (BFS).
          Income variance explanation needed.
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button type="button" className="btn-primary">Upload Documents</button>
          <button type="button" className="btn-secondary">View Conditions</button>
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
  return (
    <>
      <h1 className="page-title">Scenario Desk</h1>
      <p className="page-subtitle">Pre-check product fit before submission</p>

      <div className="card">
        <div className="grid-2" style={{ marginBottom: 0 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, display: "block", marginBottom: 6 }}>Borrower Type</label>
            <select className="top-bar-search" style={{ width: "100%" }} defaultValue="bfs">
              <option value="salaried">Salaried</option>
              <option value="bfs">Self-Employed (BFS)</option>
              <option value="new-se">Newly Self-Employed</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, display: "block", marginBottom: 6 }}>Province</label>
            <select className="top-bar-search" style={{ width: "100%" }} defaultValue="ON">
              <option>ON</option><option>BC</option><option>AB</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, display: "block", marginBottom: 6 }}>Credit Score</label>
            <input type="text" className="top-bar-search" style={{ width: "100%" }} defaultValue="742" />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, display: "block", marginBottom: 6 }}>LTV %</label>
            <input type="text" className="top-bar-search" style={{ width: "100%" }} defaultValue="78" />
          </div>
        </div>
        <button type="button" className="btn-primary" style={{ marginTop: 16 }}>Run Scenario Check</button>
      </div>

      <div className="ai-panel" style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>AI Scenario Result</div>
        <p style={{ fontSize: 13, margin: "0 0 12px" }}>
          <strong>Recommended:</strong> Business-for-Self (88% fit) · Likely approval friction: income documentation
        </p>
        <p style={{ fontSize: 13, margin: "0 0 12px" }}>
          <strong>Before submitting include:</strong> NOA, T1, 90-day business bank statements, articles of incorporation
        </p>
        <p style={{ fontSize: 13, margin: 0 }}>
          <strong>Estimated approval likelihood:</strong> 72% if docs complete · 45% with current package
        </p>
      </div>
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
  return (
    <>
      <h1 className="page-title">Conditions Tracker</h1>
      <p className="page-subtitle">Outstanding items across your active files</p>
      <div className="card">
        {[
          { file: GOLDEN_FILE.fileNumber, borrower: "Sarah Chen", item: "Business bank statements", due: "Jul 5" },
          { file: GOLDEN_FILE.fileNumber, borrower: "Sarah Chen", item: "T1 General 2024", due: "Jul 5" },
          { file: "HCV-2026-10312", borrower: "James Wilson", item: "Employment letter", due: "Jul 8" },
          { file: "HCV-2026-10345", borrower: "Priya Sharma", item: "Fire insurance binder", due: "Jul 10" },
        ].map((c, i) => (
          <div key={i} className="stat-row">
            <div>
              <div style={{ fontWeight: 600 }}>{c.item}</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>{c.file} · {c.borrower}</div>
            </div>
            <span className="badge badge-amber">Due {c.due}</span>
          </div>
        ))}
      </div>
    </>
  );
}
