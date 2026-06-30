"use client";

import { DemoMoment } from "@/components/DemoMoment";
import { GOLDEN_FILE } from "@/data/mockData";

const PRODUCTS_COMPARE = [
  { product: "Business-for-Self", fit: 88, notes: "Best fit — 2+ years self-employed, strong credit", recommended: true },
  { product: "Alt-A", fit: 62, notes: "Possible if BFS docs incomplete — higher rate", recommended: false },
  { product: "Prime", fit: 12, notes: "Not eligible — non-traditional income", recommended: false },
  { product: "Insurable", fit: 8, notes: "Income verification requirements not met", recommended: false },
];

export function ProductMatchingView() {
  return (
    <>
      <h1 className="page-title">Product Matching Engine</h1>
      <p className="page-subtitle">Match borrower scenarios to Highclere products with policy-fit confidence</p>

      <DemoMoment>
        Self-employed borrower Sarah Chen — platform compared BFS and Alt-A criteria, recommended BFS path,
        flagged missing proof points, and generated broker-facing submission guidance.
      </DemoMoment>

      <div className="grid-2">
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Scenario: {GOLDEN_FILE.borrower}</div>
          <div className="stat-row"><span>Income Type</span><strong>Self-Employed (BFS)</strong></div>
          <div className="stat-row"><span>Credit Score</span><strong>{GOLDEN_FILE.creditScore}</strong></div>
          <div className="stat-row"><span>LTV</span><strong>{GOLDEN_FILE.ltv}%</strong></div>
          <div className="stat-row"><span>Loan Amount</span><strong>${GOLDEN_FILE.amount.toLocaleString()}</strong></div>
          <div className="stat-row"><span>Province</span><strong>{GOLDEN_FILE.province}</strong></div>
        </div>

        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 12 }}>AI Recommendation</div>
          <div className="ai-panel">
            <div style={{ fontSize: 18, fontWeight: 800, color: "var(--accent)", marginBottom: 8 }}>
              Business-for-Self — 88% policy fit
            </div>
            <p style={{ fontSize: 13, margin: 0, lineHeight: 1.6 }}>
              Borrower meets BFS tenure requirement (self-employed since 2019). Credit and LTV within BFS
              guidelines. Complete business bank statements and resolve income variance before submission
              to underwriting.
            </p>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 12 }}>Side-by-Side Product Comparison</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Policy Fit</th>
              <th>Assessment</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {PRODUCTS_COMPARE.map((p) => (
              <tr key={p.product}>
                <td style={{ fontWeight: 600 }}>{p.product}</td>
                <td>
                  <div className="progress-bar" style={{ width: 120 }}>
                    <div
                      className={`progress-fill ${p.fit < 50 ? "red" : p.fit < 75 ? "amber" : ""}`}
                      style={{ width: `${p.fit}%` }}
                    />
                  </div>
                  <span style={{ fontSize: 12 }}>{p.fit}%</span>
                </td>
                <td style={{ fontSize: 12 }}>{p.notes}</td>
                <td>
                  {p.recommended ? (
                    <span className="badge badge-green">Recommended</span>
                  ) : (
                    <span className="badge badge-amber">Alternative</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Broker Submission Tips — BFS</div>
        <ul style={{ fontSize: 13, lineHeight: 1.8, margin: 0, paddingLeft: 20 }}>
          <li>Include 90 days business bank statements showing consistent deposits</li>
          <li>NOA and T1 must align with stated income — explain variances upfront</li>
          <li>Articles of incorporation required for incorporated borrowers</li>
          <li>2-year self-employment history minimum for BFS product path</li>
        </ul>
      </div>
    </>
  );
}
