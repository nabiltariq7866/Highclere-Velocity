"use client";

import { DemoMoment } from "@/components/DemoMoment";
import { BROKERS } from "@/data/mockData";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function BrokerIntelligenceView() {
  const problemBroker = BROKERS.find((b) => b.missingDocRate >= 35) || BROKERS[3];
  const chartData = BROKERS.slice(0, 8).map((b) => ({
    name: b.name.split(" ")[0],
    quality: b.qualityScore,
    missing: b.missingDocRate,
  }));

  return (
    <>
      <h1 className="page-title">Broker Intelligence & Partner Quality</h1>
      <p className="page-subtitle">500 broker partners · 100 brokerages · quality scorecards & education</p>

      <DemoMoment>
        {problemBroker.brokerage} sends high volume but has {problemBroker.missingDocRate}% missing-document rate.
        System recommends targeted education on top missing items and projects funding speed improvement.
      </DemoMoment>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Active Brokers</div>
          <div className="kpi-value">500</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Brokerages</div>
          <div className="kpi-value">100</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Avg Quality Score</div>
          <div className="kpi-value">74</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Needs Education</div>
          <div className="kpi-value" style={{ color: "var(--amber-500)" }}>23</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Quality vs Missing Docs</div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="quality" fill="var(--accent)" name="Quality" />
              <Bar dataKey="missing" fill="var(--amber-500)" name="Missing %" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Education Recommendation — {problemBroker.name}</div>
          <div className="alert-banner">
            Missing-doc rate <strong>{problemBroker.missingDocRate}%</strong> — top gaps: bank statements,
            NOA, employment letters
          </div>
          <div className="stat-row"><span>Submission Volume</span><strong>{problemBroker.volume}/mo</strong></div>
          <div className="stat-row"><span>Approval Rate</span><strong>{problemBroker.approvalRate}%</strong></div>
          <div className="stat-row"><span>Funding Conversion</span><strong>{problemBroker.fundingConversion}%</strong></div>
          <div className="stat-row"><span>Rework Rate</span><strong>{problemBroker.reworkRate}%</strong></div>
          <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 12 }}>
            Reducing missing docs by 15% could improve avg funding speed by 2.3 days for this partner.
          </p>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Broker</th>
              <th>Brokerage</th>
              <th>Province</th>
              <th>Volume</th>
              <th>Quality</th>
              <th>Missing %</th>
              <th>Funding Conv.</th>
            </tr>
          </thead>
          <tbody>
            {BROKERS.map((b) => (
              <tr key={b.id}>
                <td style={{ fontWeight: 600 }}>{b.name}</td>
                <td>{b.brokerage}</td>
                <td>{b.province}</td>
                <td>{b.volume}</td>
                <td>
                  <span className={`badge ${b.qualityScore >= 75 ? "badge-green" : b.qualityScore >= 60 ? "badge-amber" : "badge-red"}`}>
                    {b.qualityScore}
                  </span>
                </td>
                <td>{b.missingDocRate}%</td>
                <td>{b.fundingConversion}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
