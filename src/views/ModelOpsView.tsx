"use client";

import { DemoMoment } from "@/components/DemoMoment";
import { MODEL_METRICS } from "@/data/mockData";

export function ModelOpsView() {
  return (
    <>
      <h1 className="page-title">AI Model Operations</h1>
      <p className="page-subtitle">Model performance, drift detection, calibration & governance</p>

      <DemoMoment>
        Approval prediction accuracy improved after learning from recent underwriter decisions — one product
        segment (Alt-A Ontario) flagged where model confidence dropped and requires review.
      </DemoMoment>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Approval Prediction Accuracy</div>
          <div className="kpi-value">{MODEL_METRICS.approvalAccuracy}%</div>
          <div className="kpi-trend up">↑ {MODEL_METRICS.approvalAccuracyDelta}% this month</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Document Extraction Accuracy</div>
          <div className="kpi-value">{MODEL_METRICS.extractionAccuracy}%</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Decisions Learned (30d)</div>
          <div className="kpi-value">{MODEL_METRICS.decisionsLearned.toLocaleString()}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Last Retrain</div>
          <div className="kpi-value" style={{ fontSize: 16 }}>{MODEL_METRICS.lastRetrain}</div>
        </div>
      </div>

      <div className="alert-banner danger">
        <strong>Drift Detected:</strong> {MODEL_METRICS.driftSegments.join(", ")} — model confidence dropped
        8% vs baseline. Recommend manual review sample and targeted recalibration.
      </div>

      <div className="grid-2">
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Model Performance by Product</div>
          {[
            { product: "Prime", accuracy: 92, drift: false },
            { product: "Insurable", accuracy: 89, drift: false },
            { product: "Alt-A", accuracy: 81, drift: true },
            { product: "Business-for-Self", accuracy: 85, drift: false },
            { product: "Transfer/Switch", accuracy: 90, drift: false },
          ].map((m) => (
            <div key={m.product} className="stat-row">
              <span>{m.product}</span>
              <span>
                <strong>{m.accuracy}%</strong>
                {m.drift && <span className="badge badge-amber" style={{ marginLeft: 8 }}>Drift</span>}
              </span>
            </div>
          ))}
        </div>

        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Governance Actions</div>
          {[
            { action: "Deploy BFS guideline v2.4 to test environment", status: "Complete" },
            { action: "Recalibrate Alt-A ON risk weights", status: "In Progress" },
            { action: "Human feedback batch #47 ingested", status: "Complete" },
            { action: "Fraud model v3.1 staging review", status: "Scheduled" },
          ].map((g) => (
            <div key={g.action} className="stat-row">
              <span style={{ fontSize: 13 }}>{g.action}</span>
              <span className={`badge ${g.status === "Complete" ? "badge-green" : "badge-amber"}`}>
                {g.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
