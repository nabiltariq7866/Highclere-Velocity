"use client";

import { useMemo, useState } from "react";
import { DemoMoment } from "@/components/DemoMoment";
import { CAPITAL_ALLOCATION, CREDIT_TIER_DIST, DEAL_QUALITY_TRENDS, PORTFOLIO_LTV_BANDS } from "@/data/extendedMockData";
import { PRODUCT_MIX, VOLUME_BY_MONTH } from "@/data/mockData";
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const COLORS = ["#1bd488", "#055b65", "#45828b", "#9ab5b1", "#2f5f66"];

export function PortfolioView() {
  const [volumeGrowth, setVolumeGrowth] = useState(10);
  const [altAShare, setAltAShare] = useState(18);

  const scenario = useMemo(() => {
    const base = 142;
    const projected = base * (1 + volumeGrowth / 100);
    const altARisk = altAShare > 22 ? "High — review recommended" : altAShare > 18 ? "Elevated — monitor" : "Within limits";
    return { projected: projected.toFixed(0), altARisk };
  }, [volumeGrowth, altAShare]);

  return (
    <>
      <h1 className="page-title">Capital Markets & Portfolio Risk</h1>
      <p className="page-subtitle">Credit tiers, capital allocation, scenario modeling sliders</p>

      <DemoMoment>
        Alt-A concentration in Ontario flagged — adjust scenario sliders to model volume growth and product mix risk.
      </DemoMoment>

      <div className="alert-banner">Concentration Alert: Alt-A volume in Ontario up 24% MoM — exceeds internal threshold.</div>

      <div className="grid-2">
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Credit Risk Distribution</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={CREDIT_TIER_DIST}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="tier" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" fill="var(--accent)" name="Files" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Product Mix</div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={PRODUCT_MIX} dataKey="volume" nameKey="product" cx="50%" cy="50%" outerRadius={70} label>
                {PRODUCT_MIX.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid-2" style={{ marginTop: 16 }}>
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Deal Quality Trends (6 mo)</div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={DEAL_QUALITY_TRENDS}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="quality" stroke="var(--accent)" name="Quality score" />
              <Line type="monotone" dataKey="rework" stroke="var(--amber-500)" name="Rework %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Portfolio by LTV Band</div>
          {PORTFOLIO_LTV_BANDS.map((b) => (
            <div key={b.band} className="stat-row">
              <span>{b.band}</span>
              <span><strong>{b.volume}</strong> · {b.share}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 12 }}>Capital Allocation — Investor Pools</div>
        <table className="data-table">
          <thead>
            <tr><th>Pool</th><th>Allocated</th><th>Utilized</th><th>Yield</th></tr>
          </thead>
          <tbody>
            {CAPITAL_ALLOCATION.map((c) => (
              <tr key={c.pool}>
                <td style={{ fontWeight: 600 }}>{c.pool}</td>
                <td>{c.allocated}</td>
                <td>
                  <div className="progress-bar" style={{ width: 80, display: "inline-block" }}>
                    <div className="progress-fill" style={{ width: `${c.utilized}%` }} />
                  </div>
                  <span style={{ marginLeft: 6 }}>{c.utilized}%</span>
                </td>
                <td>{c.yield}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 12 }}>Scenario Modeling (live)</div>
        <div className="grid-2" style={{ marginBottom: 0 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600 }}>Volume growth %: <strong>{volumeGrowth}</strong></label>
            <input type="range" min={-10} max={40} value={volumeGrowth} onChange={(e) => setVolumeGrowth(Number(e.target.value))} style={{ width: "100%" }} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600 }}>Alt-A share %: <strong>{altAShare}</strong></label>
            <input type="range" min={10} max={35} value={altAShare} onChange={(e) => setAltAShare(Number(e.target.value))} style={{ width: "100%" }} />
          </div>
        </div>
        <div className="ai-panel" style={{ marginTop: 12, fontSize: 13 }}>
          <strong>Projected pipeline:</strong> ${scenario.projected}M next month (vs $142M base) ·{" "}
          <strong>Alt-A risk:</strong> {scenario.altARisk}
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Monthly Funded Volume</div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={VOLUME_BY_MONTH}>
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar dataKey="funded" fill="#055b65" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
