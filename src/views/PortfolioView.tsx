"use client";

import { DemoMoment } from "@/components/DemoMoment";
import { PRODUCT_MIX, VOLUME_BY_MONTH } from "@/data/mockData";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const COLORS = ["#1bd488", "#055b65", "#45828b", "#9ab5b1", "#2f5f66", "#033840", "#6a9a9a"];

export function PortfolioView() {
  return (
    <>
      <h1 className="page-title">Capital Markets & Portfolio Risk</h1>
      <p className="page-subtitle">Funded volume, product mix, credit quality & concentration monitoring</p>

      <DemoMoment>
        Leadership views next month&apos;s expected funding by product, province, LTV band — rising Alt-A
        concentration in one region flagged for portfolio review.
      </DemoMoment>

      <div className="alert-banner">
        <strong>Concentration Alert:</strong> Alt-A volume in Ontario up 24% MoM — exceeds internal threshold.
        Recommend portfolio review before month-end funding batch.
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Funded YTD</div>
          <div className="kpi-value">1,000</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Pipeline to Fund</div>
          <div className="kpi-value">$142M</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Avg Credit Score</div>
          <div className="kpi-value">712</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Avg LTV</div>
          <div className="kpi-value">74.2%</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Product Mix</div>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={PRODUCT_MIX} dataKey="volume" nameKey="product" cx="50%" cy="50%" outerRadius={80} label>
                {PRODUCT_MIX.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Monthly Funded Volume</div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={VOLUME_BY_MONTH}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="funded" fill="var(--accent)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Volume</th>
              <th>Share</th>
              <th>Avg LTV</th>
              <th>Risk Tier</th>
            </tr>
          </thead>
          <tbody>
            {PRODUCT_MIX.map((p) => (
              <tr key={p.product}>
                <td style={{ fontWeight: 600 }}>{p.product}</td>
                <td>{p.volume}</td>
                <td>{p.share}%</td>
                <td>{68 + p.share}%</td>
                <td>
                  <span className={`badge ${p.product === "Alt-A" ? "badge-amber" : "badge-green"}`}>
                    {p.product === "Alt-A" ? "Elevated" : "Standard"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
