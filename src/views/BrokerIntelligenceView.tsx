"use client";

import { useState } from "react";
import { DemoMoment } from "@/components/DemoMoment";
import { BROKERS } from "@/data/mockData";
import { DECLINE_REASONS_BY_BROKER, NEW_BROKER_ONBOARDING } from "@/data/extendedMockData";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function BrokerIntelligenceView() {
  const [selectedBroker, setSelectedBroker] = useState(BROKERS.find((b) => b.missingDocRate >= 35)?.id ?? BROKERS[3].id);
  const broker = BROKERS.find((b) => b.id === selectedBroker) ?? BROKERS[0];
  const chartData = BROKERS.slice(0, 8).map((b) => ({
    name: b.name.split(" ")[0],
    quality: b.qualityScore,
    missing: b.missingDocRate,
  }));

  return (
    <>
      <h1 className="page-title">Broker Intelligence & Partner Quality</h1>
      <p className="page-subtitle">Click a broker row for scorecard — decline reasons, SLA, funded volume, onboarding pipeline</p>

      <DemoMoment>
        {broker.brokerage} — {broker.missingDocRate}% missing-doc rate. Select brokers in table for live scorecard drill-down.
      </DemoMoment>

      <div className="kpi-grid">
        <div className="kpi-card"><div className="kpi-label">Active Brokers</div><div className="kpi-value">500</div></div>
        <div className="kpi-card"><div className="kpi-label">High-Value Partners</div><div className="kpi-value" style={{ color: "var(--accent)" }}>42</div></div>
        <div className="kpi-card"><div className="kpi-label">Needs Education</div><div className="kpi-value" style={{ color: "var(--amber-500)" }}>23</div></div>
        <div className="kpi-card"><div className="kpi-label">New Onboarding</div><div className="kpi-value">3</div></div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Quality vs Missing Docs</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="quality" fill="var(--accent)" />
              <Bar dataKey="missing" fill="var(--amber-500)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Scorecard — {broker.name}</div>
          <div className="stat-row"><span>Brokerage</span><strong>{broker.brokerage}</strong></div>
          <div className="stat-row"><span>Volume / month</span><strong>{broker.volume}</strong></div>
          <div className="stat-row"><span>Approval rate</span><strong>{broker.approvalRate}%</strong></div>
          <div className="stat-row"><span>Funding conversion</span><strong>{broker.fundingConversion}%</strong></div>
          <div className="stat-row"><span>Funded volume (YTD)</span><strong>{broker.volume * 8} files</strong></div>
          <div className="stat-row"><span>SLA performance</span><strong>{broker.qualityScore >= 75 ? "96%" : broker.qualityScore >= 60 ? "88%" : "72%"}</strong></div>
          <div className="stat-row"><span>Top decline reasons</span><strong style={{ fontSize: 12 }}>{DECLINE_REASONS_BY_BROKER[broker.name] ?? "Missing docs, Income"}</strong></div>
          {broker.missingDocRate >= 30 && (
            <div className="alert-banner" style={{ marginTop: 12 }}>
              Recommend BFS document training — projected 2.3 day funding improvement if missing docs drop 15%.
            </div>
          )}
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 12 }}>Broker Partners — click row for scorecard</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Broker</th>
              <th>Brokerage</th>
              <th>Province</th>
              <th>Volume</th>
              <th>Quality</th>
              <th>Missing %</th>
              <th>Funded YTD</th>
              <th>SLA</th>
            </tr>
          </thead>
          <tbody>
            {BROKERS.map((b) => (
              <tr
                key={b.id}
                onClick={() => setSelectedBroker(b.id)}
                style={{ cursor: "pointer", background: selectedBroker === b.id ? "var(--highlight)" : undefined }}
              >
                <td style={{ fontWeight: 600 }}>{b.name}</td>
                <td>{b.brokerage}</td>
                <td>{b.province}</td>
                <td>{b.volume}</td>
                <td><span className={`badge ${b.qualityScore >= 75 ? "badge-green" : "badge-amber"}`}>{b.qualityScore}</span></td>
                <td>{b.missingDocRate}%</td>
                <td>{b.volume * 8}</td>
                <td>{b.qualityScore >= 75 ? "96%" : "88%"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 12 }}>New Broker Onboarding Pipeline</div>
        {NEW_BROKER_ONBOARDING.map((n) => (
          <div key={n.name} className="stat-row">
            <div>
              <div style={{ fontWeight: 600 }}>{n.name} ({n.province})</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>{n.docs}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <span className={`badge ${n.progress === 100 ? "badge-green" : "badge-amber"}`}>{n.stage}</span>
              <div className="progress-bar" style={{ width: 80, marginTop: 6 }}>
                <div className="progress-fill" style={{ width: `${n.progress}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
