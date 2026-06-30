"use client";

import { DemoMoment } from "@/components/DemoMoment";
import { MODEL_METRICS } from "@/data/mockData";
import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const BROKER_LEARNING = [
  { week: "W1", accuracy: 84.2, missingDocRate: 22 },
  { week: "W2", accuracy: 85.1, missingDocRate: 20 },
  { week: "W3", accuracy: 86.0, missingDocRate: 18 },
  { week: "W4", accuracy: 87.4, missingDocRate: 16 },
];

export function ModelOpsView() {
  return (
    <>
      <h1 className="page-title">AI Model Operations</h1>
      <p className="page-subtitle">Drift detection, broker behavior learning, risk calibration governance</p>

      <DemoMoment>
        Accuracy improved +2.1% from underwriter feedback. Alt-A Ontario drift flagged. Broker missing-doc rate down 6% after education model.
      </DemoMoment>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Approval Prediction Accuracy</div>
          <div className="kpi-value">{MODEL_METRICS.approvalAccuracy}%</div>
          <div className="kpi-trend up">↑ {MODEL_METRICS.approvalAccuracyDelta}% this month</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Extraction Accuracy</div>
          <div className="kpi-value">{MODEL_METRICS.extractionAccuracy}%</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Decisions Learned (30d)</div>
          <div className="kpi-value">{MODEL_METRICS.decisionsLearned.toLocaleString()}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Broker Behavior Model</div>
          <div className="kpi-value" style={{ fontSize: 16 }}>v1.3 active</div>
        </div>
      </div>

      <div className="alert-banner danger">
        <strong>Drift:</strong> {MODEL_METRICS.driftSegments.join(", ")} — recalibration in progress (test env BFS v2.4 deployed).
      </div>

      <div className="grid-2">
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Broker Behavior Learning — Missing Doc Rate ↓</div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={BROKER_LEARNING}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="accuracy" stroke="var(--accent)" name="Approval accuracy %" />
              <Line type="monotone" dataKey="missingDocRate" stroke="var(--amber-500)" name="Missing doc %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Risk Scoring Calibration</div>
          <div className="stat-row"><span>Alt-A ON weights</span><span className="badge badge-amber">Recalibrating</span></div>
          <div className="stat-row"><span>BFS income variance threshold</span><span className="badge badge-green">Calibrated</span></div>
          <div className="stat-row"><span>Human feedback batch #47</span><span className="badge badge-green">Ingested</span></div>
          <div className="stat-row"><span>Test env guideline deploy</span><span className="badge badge-green">BFS v2.4 live</span></div>
        </div>
      </div>
    </>
  );
}
