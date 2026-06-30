"use client";

import { DemoMoment } from "@/components/DemoMoment";
import { PROVINCE_STATS } from "@/data/mockData";

export function ProvinceExpansionView() {
  return (
    <>
      <h1 className="page-title">Province Expansion & Licensing</h1>
      <p className="page-subtitle">National scale tracking — licensing, product availability & broker onboarding</p>

      <DemoMoment>
        National expansion dashboard shows active provinces, upcoming markets, broker adoption by region,
        and compliance items required before launching in a new province.
      </DemoMoment>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Active Provinces</div>
          <div className="kpi-value">6</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Expansion Pipeline</div>
          <div className="kpi-value">2</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Regional Brokers</div>
          <div className="kpi-value">500</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Compliance Tasks Open</div>
          <div className="kpi-value" style={{ color: "var(--amber-500)" }}>7</div>
        </div>
      </div>

      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Province</th>
              <th>Status</th>
              <th>Active Files</th>
              <th>Funded (YTD)</th>
              <th>Brokers</th>
              <th>Products Available</th>
            </tr>
          </thead>
          <tbody>
            {PROVINCE_STATS.map((p) => (
              <tr key={p.province}>
                <td style={{ fontWeight: 700 }}>{p.province}</td>
                <td>
                  <span className={`badge ${p.expansionReady ? "badge-green" : "badge-amber"}`}>
                    {p.expansionReady ? "Active" : "Pre-Launch"}
                  </span>
                </td>
                <td>{p.active}</td>
                <td>{p.funded}</td>
                <td>{p.brokers}</td>
                <td style={{ fontSize: 12 }}>Prime, Insurable, Alt-A, BFS</td>
              </tr>
            ))}
            <tr>
              <td style={{ fontWeight: 700 }}>NS</td>
              <td><span className="badge badge-amber">Expansion Q3</span></td>
              <td>—</td>
              <td>—</td>
              <td>12 (pipeline)</td>
              <td style={{ fontSize: 12 }}>Pending license</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 700 }}>NB</td>
              <td><span className="badge badge-amber">Expansion Q4</span></td>
              <td>—</td>
              <td>—</td>
              <td>8 (pipeline)</td>
              <td style={{ fontSize: 12 }}>Compliance review</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid-2" style={{ marginTop: 16 }}>
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 8 }}>NS Expansion Checklist</div>
          {[
            { task: "Provincial mortgage broker license", done: true },
            { task: "Product registration — Alt-A", done: false },
            { task: "Regional compliance officer assigned", done: true },
            { task: "Broker onboarding (min 10 partners)", done: false },
            { task: "Appraisal vendor agreements", done: true },
          ].map((t) => (
            <div key={t.task} className="stat-row">
              <span>{t.task}</span>
              <span className={`badge ${t.done ? "badge-green" : "badge-amber"}`}>
                {t.done ? "Complete" : "Pending"}
              </span>
            </div>
          ))}
        </div>
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Market Opportunity Score</div>
          <div className="stat-row"><span>NS — Halifax corridor</span><strong style={{ color: "var(--accent)" }}>82/100</strong></div>
          <div className="stat-row"><span>NB — Moncton region</span><strong>71/100</strong></div>
          <div className="stat-row"><span>PEI</span><strong>58/100</strong></div>
        </div>
      </div>
    </>
  );
}
