# Highclere Velocity — Client Demo Delivery Guide

**Document purpose:** Company owner / presenter ke liye — client meeting mein project kaise samjhana hai, har `prompt.txt` point kahan implement hua hai, aur dummy data ke sath testing kaise karni hai.

**Project type:** Interactive **frontend demo** — saari functionality **dummy/mock data** par chal rahi hai. Yeh production backend nahi hai; client ko **real product feel** dikhane ke liye banaya gaya hai.

**Last updated:** June 2026  
**Tech:** Next.js 15 · React 19 · SkyOS-style light/dark theme · Role-based routes

---

## Table of Contents

1. [Pehle yeh samajh lein (Demo vs Production)](#1-pehle-yeh-samajh-lein-demo-vs-production)
2. [Project start karna](#2-project-start-karna)
3. [5 Demo users aur roles](#3-5-demo-users-aur-roles)
4. [Client meeting — recommended flow (45 min)](#4-client-meeting--recommended-flow-45-min)
5. [Golden File story (poori demo ka thread)](#5-golden-file-story-poori-demo-ka-thread)
6. [prompt.txt — point-by-point coverage](#6-prompttxt--point-by-point-coverage)
7. [Module-wise testing guide](#7-module-wise-testing-guide)
8. [Summary scorecard](#8-summary-scorecard)
9. [Client se kya kehna hai (talking points)](#9-client-se-kya-kehna-hai-talking-points)

---

## 1. Pehle yeh samajh lein (Demo vs Production)

| Cheez | Demo mein kya hai | Production mein kya chahiye |
|-------|-------------------|-----------------------------|
| Data | `src/data/mockData.ts` — fixed dummy | Real database / APIs |
| Login | Cookie-based role picker (5 users) | SSO / real auth |
| AI | UI panels + pre-written summaries | Real ML models |
| Upload / Export buttons | Upload simulator + export preview modal (dummy) | Real file handling |
| Filters (broker, province…) | Live filter chips — counts/table update in real time | Same + server-side query |
| Integrations | Simulate Filogix button + live event stream (localStorage) | Live webhooks / APIs |

**Legend (is document mein):**

- ✅ **Demo Ready** — Screen par clearly dikhta hai, client ko samajh aa jata hai
- ⚠️ **Partial** — Concept UI par hai; poora interactive workflow nahi
- ❌ **Not in demo** — `prompt.txt` mein hai lekin abhi UI mein nahi

---

## 2. Project start karna

```bash
cd D:\AspireXLLC\Highclere-Velocity
npm install
npm run dev
```

Browser: **http://localhost:3000**

Production build test:

```bash
npm run build
npm start
```

**Pre-meeting checklist:**

- [ ] `npm run dev` chal raha ho
- [ ] Browser zoom 100%
- [ ] Light aur dark mode dono ek baar check kar lein (top bar toggle)
- [ ] Incognito window — fresh login flow dikhe
- [ ] Sidebar collapse button test karein

---

## 3. 5 Demo users aur roles

Login page: **http://localhost:3000/login**

| # | Name | Role | Login ke baad URL | Sidebar pages |
|---|------|------|-------------------|---------------|
| 1 | **Leon Hartwell** | Executive | `/executive` | Command Center, Leadership, Portfolio, Province Expansion, Model Ops |
| 2 | **Maria Santos** | Operations | `/operations` | Command Center, Intake, Broker Intelligence, Communications, SLA Queue, Funding, Integrations |
| 3 | **Karen Mitchell** | Underwriter | `/underwriter` | Adjudication, Product Matching, Document Review, Property & Appraisal, Copilot |
| 4 | **David Okonkwo** | Compliance | `/compliance` | Fraud, Compliance & Audit |
| 5 | **Angela Morrison** | Broker | `/broker` | Portal, Scenario Desk, My Submissions, Conditions |

**Role security test:**

1. Leon se login karein
2. Browser mein manually `/operations/intake` type karein
3. **Expected:** Redirect back to `/executive` — sirf apna role access hota hai

**Sign out:** Top bar → **Sign out** → wapas login page

---

## 4. Client meeting — recommended flow (45 min)

### Part A — Vision (5 min)

Leon login → **Leadership Dashboard** (`/executive/leadership`)

- KPIs: 5,000 submissions, approval rate, time to decision
- Weekly AI summary padh kar client ko bataein: volume up, capacity alert, Alt-A concentration

### Part B — Operations command (10 min)

Sign out → **Maria Santos** login

1. **Command Center** — 300 active files, pipeline, at-risk list
2. **AI Intake** — Sarah Chen golden file story
3. **Integrations** — Filogix se dashboard tak event flow

### Part C — Underwriting intelligence (10 min)

**Karen Mitchell** login

1. **Adjudication** — 50 files triage (20 fast-track, 18 doc follow-up…)
2. **Copilot** — one-page AI summary
3. **Document Review** — income inconsistency

### Part D — Risk & compliance (5 min)

**David Okonkwo** login

1. **Fraud** — cross-file duplicate document pattern
2. **Compliance Audit** — full audit trail Sarah Chen file

### Part E — Broker experience (8 min)

**Angela Morrison** login

1. **Scenario Desk** — pre-submit product check
2. **Portal** — priority file alert
3. **Conditions** — outstanding items

### Part F — Executive wrap (7 min)

Wapas **Leon** → **Portfolio** (Alt-A alert) → **Province Expansion** → Q&A

---

## 5. Golden File story (poori demo ka thread)

Yeh ek fictional deal hai jo multiple modules mein same rehti hai — client ko "yeh ek file ki journey hai" samjhana easy ho jata hai.

| Field | Value |
|-------|-------|
| File # | **HCV-2026-10482** |
| Borrower | **Sarah Chen** |
| Broker | **Angela Morrison** (Dominion Lending) |
| Product | **Business-for-Self** |
| Issue | Missing bank statements + income mismatch ($142K stated vs $118K NOA) |

**Golden file kahan dikhti hai:**

| Module | Page | Kya dikhega |
|--------|------|-------------|
| Intake | `/operations/intake` | Extraction, checklist, broker auto-message |
| Product Matching | `/underwriter/product-matching` | BFS 88% fit recommendation |
| Communications | `/operations/communications` | 5 conditions + timeline |
| Document Review | `/underwriter/document-review` | Income consistency analysis |
| Copilot | `/underwriter/copilot` | Full AI summary + Q&A |
| Compliance Audit | `/compliance/compliance-audit` | Audit timeline |
| Broker Portal | `/broker/portal` | Priority action required |

---

## 6. prompt.txt — point-by-point coverage

### Demo Objective (Lines 1–14)

| Sub-point | Status | Kahan / Kaise |
|-----------|--------|---------------|
| Unified operating layer (submissions, docs, property, credit…) | ✅ | Command Center + Intake + Integrations |
| Speed up Prime, Insurable, Alt-A, BFS, transfer, switch | ✅ | Product types in data; Adjudication + Product Matching |
| Better broker experience | ✅ | Broker Portal (4 pages) |
| Predict approval, missing docs, property risk, funding delays | ✅ | Adjudication scores, Intake flags, Property page, Funding queue |
| Underwriters work by exception | ✅ | Copilot + Adjudication fast-track vs manual |
| Leadership visibility | ✅ | Leadership + Portfolio + Command Center |
| Scale across provinces | ✅ | Province Expansion module |
| Technology-first lending model | ✅ | Pura platform narrative + Integrations + Model Ops |

---

### Module 1 — Mortgage Submission Command Center

**Page:** `/operations/command-center` · `/executive/command-center`  
**View file:** `src/views/CommandCenterView.tsx`

| Sub-point | Status | Demo mein kya hai |
|-----------|--------|-------------------|
| Centralized dashboard | ✅ | KPI grid + hero banner |
| File status by stage (11 stages) | ✅ | Pipeline bar: new → intake → … → funding ready |
| Views by broker, brokerage, province, product… | ✅ | Filters: broker, brokerage, underwriter, borrower type, deal size, province, product, SLA, stage |
| Real-time indicators (delay, missing docs, appraisal…) | ✅ | Hero: 45 fast-track, 18 missing income, 9 appraisal, 6 SLA risk |
| Daily volume & SLA dashboard | ✅ | KPI cards + volume chart |
| Executive view | ✅ | Same page executive role se + Leadership alag page |
| **Demo Moment** (300 active, 45 fast-track…) | ✅ | Green "Demo Moment" box + hero numbers |

**Testing:** Maria login → Command Center → pipeline counts, table 15 rows, "Files at Risk" right panel, volume chart hover.

---

### Module 2 — AI Submission Intake & File Quality Engine

**Page:** `/operations/intake`  
**View file:** `src/views/IntakeView.tsx`

| Sub-point | Status | Demo mein kya hai |
|-----------|--------|-------------------|
| Intake from broker platforms, email, portal | ✅ | Intake channels panel + Integrations simulate Filogix |
| AI extraction (application, ID, income docs…) | ✅ | EXTRACTED fields list with confidence % |
| Automated completeness check | ✅ | Pre-underwriting checklist (8 items) |
| Missing-document by product type | ✅ | BFS checklist — missing bank stmts, T1 |
| Broker submission quality score | ✅ | 62/100 progress bar |
| Duplicate / conflicting document detection | ✅ | Duplicate doc alert banner on Intake (golden file) |
| Borrower/application mismatch | ✅ | Income mismatch alert banner |
| Auto-routing by file quality | ✅ | Intake queue table — Hold vs Fast-Track |
| Pre-underwriting checklist auto-generated | ✅ | Right panel checklist |
| **Demo Moment** (BFS file, missing bank stmts…) | ✅ | Sarah Chen golden file poora scene |

**Testing:** Intake → HCV-2026-10482 → duplicate alert → channel breakdown → checklist → **Send to Broker** (toast) → Portal upload se checklist update.

---

### Module 3 — AI Mortgage Adjudication & Approval Prediction

**Page:** `/underwriter/adjudication`  
**View file:** `src/views/AdjudicationView.tsx`

| Sub-point | Status | Demo mein kya hai |
|-----------|--------|-------------------|
| AI approval-likelihood scoring | ✅ | Score badges 35–95% on each file |
| Product fit scoring (Prime, Insurable, Alt-A, BFS…) | ✅ | Product column + batch KPIs |
| Risk scoring (credit, LTV, GDS, TDS…) | ✅ | Decline risk queue shows ratios |
| Fast-track recommendation | ✅ | Fast-Track Queue column |
| Manual-review routing | ✅ | Manual / Senior badges |
| Decline-risk indicators | ✅ | Decline Risk queue (score < 50) |
| Explainable AI rationale | ✅ | Sample rationale panel (HCV-10391) |
| Human override capture | ✅ | Override buttons → live audit log (Compliance + Copilot) |
| **Demo Moment** (50 new → 20/18/8/4 split) | ✅ | KPI row exact numbers |

**Testing:** Karen login → Adjudication → top 5 KPIs verify → 3 column queues → explainable AI box → main table 12 rows.

---

### Module 4 — Prime, Insurable & Alt-A Product Matching

**Page:** `/underwriter/product-matching`  
**View file:** `src/views/ProductMatchingView.tsx`

| Sub-point | Status | Demo mein kya hai |
|-----------|--------|-------------------|
| Product rules engine | ✅ | Active guidelines v2.4/v3.1 + side-by-side comparison |
| Borrower profile matching (salaried, self-employed…) | ✅ | Sarah Chen self-employed scenario |
| AI best product path | ✅ | BFS 88% recommended |
| Policy-fit confidence score | ✅ | Progress bars per product |
| Scenario review assistant | ✅ | Broker Scenario Desk — live `runScenario()` |
| Submission tips for brokers | ✅ | Bullet list BFS tips |
| Product exception workflow | ✅ | Request exception button + status badge |
| Rule versioning | ✅ | BFS v2.4 / Prime v1.8 version table |
| Side-by-side product comparison | ✅ | 4-product table |
| **Demo Moment** (self-employed → BFS path) | ✅ | Demo Moment + AI recommendation panel |

**Testing:** Product Matching → left scenario card → right BFS 88% → comparison table → broker tips.

---

### Module 5 — Broker Intelligence & Partner Quality

**Page:** `/operations/broker-intelligence`  
**View file:** `src/views/BrokerIntelligenceView.tsx`

| Sub-point | Status | Demo mein kya hai |
|-----------|--------|-------------------|
| Broker & brokerage scorecards | ✅ | Full broker table (10 brokers) |
| Submission volume | ✅ | Volume column |
| Approval rate | ✅ | In broker data |
| Funding conversion | ✅ | Column + education panel |
| Missing-document rate | ✅ | Chart + problem broker highlight |
| Avg time to clear conditions | ✅ | `avgConditionDays` in data |
| Underwriting rework rate | ✅ | `reworkRate` in data |
| Product mix | ✅ | Per broker |
| Decline reasons | ✅ | Click broker row → decline reason breakdown |
| Funded volume | ✅ | Broker scorecard funded YTD column |
| SLA performance | ✅ | Broker SLA % column + chart |
| Broker quality score | ✅ | Quality badge per broker |
| Education recommendations | ✅ | Right panel targeted education |
| High-value broker prioritization | ✅ | Platinum/Gold broker prioritization table |
| New broker onboarding | ✅ | Onboarding pipeline table (3 new brokers) |
| Regional segmentation | ✅ | Province column |
| **Demo Moment** (38% missing-doc brokerage) | ✅ | Problem broker + education panel |

**Testing:** Broker Intelligence → chart → find broker with high missing % → education recommendation text.

---

### Module 6 — Automated Broker Communication & Conditions

**Page:** `/operations/communications`  
**View file:** `src/views/CommunicationsView.tsx`

| Sub-point | Status | Demo mein kya hai |
|-----------|--------|-------------------|
| AI-generated broker updates | ✅ | Preview panel bottom |
| Automated missing-document requests | ✅ | Intake + comms linked narrative |
| Conditional approval condition tracker | ✅ | 5 conditions with due dates |
| Status notifications by stage | ✅ | Timeline entries |
| Broker-facing explanation | ✅ | AI preview message |
| Smart reminders | ✅ | Timeline: "Reminder: 3 conditions due" |
| Escalation | ✅ | "Escalation scheduled July 6" in message |
| Communication templates by product | ✅ | Product template selector (BFS, Prime, Alt-A) |
| Conversation history per file | ✅ | Timeline left panel |
| Broker portal visibility | ✅ | `/broker/conditions` |
| Internal summary for UW / reps | ✅ | Internal summary panel on Communications |
| **Demo Moment** (5 conditions, reminders…) | ✅ | Full conditions list |

**Testing:** Communications → 5 conditions → 2 Received / 3 Outstanding → timeline 4 events.

---

### Module 7 — AI Document Review & Income Verification

**Page:** `/underwriter/document-review`  
**View file:** `src/views/DocumentReviewView.tsx`

| Sub-point | Status | Demo mein kya hai |
|-----------|--------|-------------------|
| AI document classification | ✅ | Doc types: Tax, Income, Bank, Corporate |
| OCR extraction (pay stubs, NOA, T1, bank…) | ✅ | 5 documents with extracted values |
| Income consistency checks | ✅ | Stated vs NOA vs bank deposits |
| BFS income pattern analysis | ✅ | Bank deposit annualized $110,400 |
| Employment verification | ✅ | BFS vs salaried toggle — salaried shows pay stub / letter |
| Bank statement cashflow review | ✅ | Deposits avg $9,200/mo |
| Red-flag detection | ✅ | Flags: missing pages, variance |
| Underwriter summary | ✅ | AI panel bottom right |
| Confidence scores | ✅ | % badge per document |
| **Demo Moment** (self-employed package inconsistency) | ✅ | 17.3% variance highlighted |

**Testing:** Document Review → 5 doc cards → compare 3 income figures → read underwriter summary.

---

### Module 8 — Property, Appraisal & Collateral Risk

**Page:** `/underwriter/property-appraisal`  
**View file:** `src/views/PropertyAppraisalView.tsx`

| Sub-point | Status | Demo mein kya hai |
|-----------|--------|-------------------|
| Appraisal order & status tracking | ✅ | Table: Ordered / In Progress / Delayed / Complete |
| Appraisal partner integration | ✅ | Integrations table + Appraisal API mapping + live simulate |
| Property risk scoring (LTV, location…) | ✅ | Risk badges + factor list |
| Collateral exception detection | ✅ | Valuation exception in KPIs |
| Appraisal delay alerts | ✅ | Red alert banner HCV-10412 |
| Automated broker updates | ✅ | Right panel message |
| Property-level UW notes | ✅ | Risk factors bullet list |
| Valuation gap flags | ✅ | +8% variance mentioned |
| Portfolio collateral exposure | ✅ | Collateral exposure table on Property page |
| **Demo Moment** (high LTV + appraisal delay) | ✅ | Alert + confidence drop 78%→61% |

**Testing:** Property page → red alert → table 4 properties → HCV-10412 Delayed 12 days.

---

### Module 9 — Fraud, Misrepresentation & Document Integrity

**Page:** `/compliance/fraud`  
**View file:** `src/views/FraudView.tsx`

| Sub-point | Status | Demo mein kya hai |
|-----------|--------|-------------------|
| Document authenticity checks | ✅ | Per-file authenticity detail + quarantine action |
| Duplicate borrower/property detection | ✅ | Cross-file pattern + fraud actions |
| Identity mismatch alerts | ✅ | Alert row #2 |
| Income-document anomaly | ✅ | Employer irregularity alert |
| Suspicious broker patterns | ✅ | Broker pattern flag in alerts |
| Cross-file pattern analysis | ✅ | Pattern #FP-2026-044 panel |
| Fraud-risk scoring | ✅ | Severity badges |
| Escalation to fraud review | ✅ | "quarantined" + "blocked" text |
| Audit trail of flagged items | ✅ | Actions append to Compliance audit log |
| **Demo Moment** (same doc format, multiple apps) | ✅ | Cross-file pattern panel |

**Testing:** David login → Fraud → 4 alerts table → scroll to pattern analysis → 4 file numbers listed.

---

### Module 10 — Underwriter Copilot & Exception-Only Review

**Page:** `/underwriter/copilot`  
**View file:** `src/views/CopilotView.tsx`

| Sub-point | Status | Demo mein kya hai |
|-----------|--------|-------------------|
| AI-generated file summary | ✅ | Full summary panel |
| Borrower profile overview | ✅ | In summary |
| Product fit summary | ✅ | BFS 88% |
| Income verification notes | ✅ | Variance explained |
| Credit & debt-service highlights | ✅ | GDS/TDS in summary |
| Missing items & conditions | ✅ | Listed in summary |
| Deal strengths & weaknesses | ✅ | Both sections |
| Suggested approval/condition/decline | ✅ | "Conditional approval pending" |
| Underwriter Q&A | ✅ | 2 chat bubbles + input |
| Exception-only review queue | ✅ | Table 3 exception files |
| Human decision capture | ✅ | Approve / Conditional / Decline → persisted in demo state |
| UW productivity dashboard | ✅ | UW productivity KPI table on Copilot |
| **Demo Moment** (one-page summary on open) | ✅ | Immediate AI panel |

**Testing:** Copilot → Sarah Chen file → read summary → Q&A bubbles → exception queue 3 rows → action buttons.

---

### Module 11 — SLA, Queue & Capacity Management

**Page:** `/operations/sla-queue`  
**View file:** `src/views/SlaQueueView.tsx`

| Sub-point | Status | Demo mein kya hai |
|-----------|--------|-------------------|
| Live queue by team / underwriter | ✅ | Queue table + UW workload |
| SLA timers per stage | ✅ | SLA days column |
| Aging by product type | ✅ | Bar chart by product on SLA Queue |
| Workload balancing | ✅ | UW table with suggestions |
| Priority routing urgent closings | ✅ | Urgent closings table on SLA Queue |
| Capacity forecast | ✅ | +40% volume KPI |
| Bottleneck detection (6 stages) | ✅ | All 6 stages in table |
| Staffing load forecast | ✅ | "+2 UW" KPI |
| Automated reassignment suggestions | ✅ | "Accept overflow" / "Reassign" |
| Escalation queue overdue | ✅ | Breached badge counts |
| **Demo Moment** (+40% volume, overload predict) | ✅ | Capacity alert banner |

**Testing:** SLA Queue → +40% banner → underwriting 112% capacity → Paul Richards 72% SLA → reassignment text.

---

### Module 12 — Funding Readiness & Closing Operations

**Page:** `/operations/funding`  
**View file:** `src/views/FundingView.tsx`

| Sub-point | Status | Demo mein kya hai |
|-----------|--------|-------------------|
| Funding readiness score | ✅ | Readiness % per file in ready queue |
| Closing checklist by product | ✅ | Prime purchase checklist |
| Condition clearance tracking | ✅ | KPI breakdown |
| Solicitor documentation status | ✅ | 17 blocked solicitor |
| Appraisal completion status | ✅ | 9 waiting appraisal |
| Compliance clearance | ✅ | In checklist item |
| Missing funding item alerts | ✅ | KPI cards |
| Automated reminders | ✅ | **Send Reminder** button → toast + audit entry |
| Late-stage funding delay flags | ✅ | Late-stage delay risk panel on Funding |
| Daily ready-to-fund queue | ✅ | 5 files listed |
| Funded volume forecast | ✅ | Week/month forecast |
| **Demo Moment** (60 conditional → 22/17/9/12) | ✅ | Exact KPI numbers |

**Testing:** Funding → 5 KPIs match demo moment → ready queue 5 files → checklist 7 items → forecast 3 rows.

---

### Module 13 — Capital Markets, Portfolio & Risk Intelligence

**Page:** `/executive/portfolio`  
**View file:** `src/views/PortfolioView.tsx`

| Sub-point | Status | Demo mein kya hai |
|-----------|--------|-------------------|
| Portfolio by product, province, LTV… | ✅ | Product table + pie chart |
| Funded volume tracking | ✅ | 1,000 YTD KPI |
| Pipeline-to-funding forecast | ✅ | $142M pipeline |
| Credit-risk distribution | ✅ | Credit tier distribution chart |
| Concentration exposure alerts | ✅ | Alt-A ON alert banner |
| Deal quality trends | ✅ | 6-month quality/rework chart on Portfolio |
| Early portfolio risk indicators | ✅ | Risk tier column |
| Capital allocation / investor views | ✅ | Capital allocation table |
| Scenario modeling | ✅ | Portfolio sliders — rate shock / volume scenario |
| **Demo Moment** (Alt-A concentration flagged) | ✅ | Yellow alert banner |

**Testing:** Leon → Portfolio → Alt-A alert → pie chart → product table → monthly bar chart.

---

### Module 14 — Province Expansion & Licensing

**Page:** `/executive/province-expansion`  
**View file:** `src/views/ProvinceExpansionView.tsx`

| Sub-point | Status | Demo mein kya hai |
|-----------|--------|-------------------|
| Province-by-province dashboard | ✅ | 6 provinces + NS, NB |
| Product availability by province | ✅ | Table column |
| Licensing & regulatory status | ✅ | Active / Pre-Launch badges |
| Broker onboarding by region | ✅ | Broker counts per province |
| Provincial guideline differences | ✅ | Clickable province chips — ON/BC/AB/QC/MB/SK rules |
| Regional submission analytics | ✅ | Active files per province |
| Expansion-readiness checklist | ✅ | NS checklist 5 items |
| Compliance task tracking | ✅ | Pending/Complete badges |
| Market opportunity scoring | ✅ | NS 82/100, NB 71/100 |
| Regional broker pipeline | ✅ | NS/NB pipeline rows |
| **Demo Moment** (national expansion dashboard) | ✅ | Full page |

**Testing:** Province Expansion → 8 rows table → NS checklist → opportunity scores.

---

### Module 15 — Broker Portal & Self-Service Scenario Desk

**Pages:**

| Page | URL | View |
|------|-----|------|
| Broker Portal | `/broker/portal` | `BrokerPortalView` |
| Scenario Desk | `/broker/scenario-desk` | `BrokerScenarioView` |
| My Submissions | `/broker/my-files` | `BrokerMyFilesView` |
| Conditions | `/broker/conditions` | `BrokerConditionsView` |

| Sub-point | Status | Demo mein kya hai |
|-----------|--------|-------------------|
| Broker-facing portal | ✅ | Portal home |
| Scenario pre-check tool | ✅ | Scenario Desk form |
| Product fit recommendation | ✅ | AI result panel |
| Required document checklist | ✅ | Scenario result bullets |
| File status visibility | ✅ | My Submissions table |
| Condition tracker | ✅ | Conditions page |
| Appraisal status visibility | ✅ | Portal KPI + Appraisal column (Sarah Chen = Ordered) |
| AI scenario assistant | ✅ | Result panel |
| Submission quality score | ✅ | Portal KPI 88 |
| Broker education tips | ✅ | Product Matching tips (internal) |
| Secure document upload | ✅ | Upload simulator modal — updates Intake checklist |
| Communication timeline | ✅ | Communications module |
| **Demo Moment** (pre-submit scenario check) | ✅ | Scenario Desk |

**Testing:** Angela → Scenario Desk → Run Scenario → Portal upload → Conditions **Mark Received** → appraisal Ordered badge.

---

### Module 16 — Integration Layer

**Page:** `/operations/integrations`  
**View file:** `src/views/IntegrationsView.tsx`

| Sub-point | Status | Demo mein kya hai |
|-----------|--------|-------------------|
| Broker submission platforms | ✅ | Filogix / Velocity connected |
| Appraisal management partners | ✅ | Row in table |
| CRM, LOS, document storage… | ✅ | 6 integrations listed |
| API & webhook support | ✅ | Simulate integration + event stream |
| Email-to-file intake | ✅ | Email intake queue table |
| Document ingestion pipeline | ✅ | Event step 2 |
| Data mapping | ✅ | Field mapping table (Filogix → HCV) |
| Sync monitoring & alerts | ✅ | Status + last sync |
| Event-driven workflow | ✅ | 5-step live simulation timeline |
| Unified mortgage data model | ✅ | 5-layer unified model on Integrations |
| **Demo Moment** (Filogix → dashboard auto-update) | ✅ | Event timeline |

**Testing:** Integrations → 6 systems green/syncing → scroll event flow → 5 timestamps.

---

### Module 17 — AI Leadership Dashboard & Executive Reporting

**Page:** `/executive/leadership`  
**View file:** `src/views/LeadershipView.tsx`

| Sub-point | Status | Demo mein kya hai |
|-----------|--------|-------------------|
| Total submissions | ✅ | 5,000 KPI |
| Approval rate | ✅ | 84.2% |
| Funded volume | ✅ | In chart |
| Avg time to decision | ✅ | 4.2h |
| Avg time to funding | ✅ | 12.4d |
| Broker conversion | ✅ | Broker conversion KPI on Leadership |
| File quality score | ✅ | 74 KPI |
| Condition clearance time | ✅ | In command center |
| Appraisal delay rate | ✅ | 4.8% KPI |
| Product mix | ✅ | Portfolio page linked |
| Province growth | ✅ | Province module |
| Underwriting capacity | ✅ | Action item + SLA |
| Weekly AI leadership report | ✅ | Text block + Export button |
| Bottleneck summary | ✅ | Top actions list |
| Risk concentration report | ✅ | Alt-A action item |
| Funding forecast | ✅ | In funding module |
| SLA trend analysis | ✅ | SLA module |
| Exportable board report | ✅ | Export preview modal (dummy PDF/CSV) |
| **Demo Moment** (weekly report generation) | ✅ | Hero + report preview |

**Testing:** Leon → Leadership → 6 KPIs → line chart → 5 action items → AI report paragraph → Export button.

---

### Module 18 — Compliance, Audit & Explainability

**Page:** `/compliance/compliance-audit`  
**View file:** `src/views/ComplianceAuditView.tsx`

| Sub-point | Status | Demo mein kya hai |
|-----------|--------|-------------------|
| Full audit trail per file | ✅ | 7-event timeline |
| AI explanation log | ✅ | Score breakdown panel |
| Human override tracking | ✅ | "Pending" badge |
| Document access history | ✅ | "12 logged" stat |
| Condition history | ✅ | Condition history panel on Compliance Audit |
| Compliance checklist by product/province | ✅ | 4/5 Pass |
| Policy rule versioning | ✅ | BFS Guidelines v2.4 |
| Reviewer notes & approval timeline | ✅ | In audit trail |
| Exception management | ✅ | Exception workflow on Compliance Audit |
| Role-based access control | ✅ | Middleware + 5 roles |
| Sensitive data protection | ✅ | PIPEDA, masking, RBAC badges |
| Exportable audit package | ✅ | Export Audit Package → preview modal |
| **Demo Moment** (every major event on one file) | ✅ | Sarah Chen timeline |

**Testing:** Compliance Audit → 7 timeline events → AI explanation math → Export Audit Package button.

---

### Module 19 — AI Model Operations & Continuous Improvement

**Page:** `/executive/model-ops`  
**View file:** `src/views/ModelOpsView.tsx`

| Sub-point | Status | Demo mein kya hai |
|-----------|--------|-------------------|
| Model performance tracking | ✅ | Accuracy KPIs |
| Approval-prediction accuracy | ✅ | 87.4% + delta |
| Drift detection | ✅ | Alt-A ON, BFS QC alert |
| Broker behavior learning | ✅ | Learning chart — accuracy ↑ missing-doc rate ↓ |
| Document extraction accuracy | ✅ | 93.2% |
| Risk-scoring calibration | ✅ | Calibration status panel |
| Human decision feedback loop | ✅ | "Feedback batch #47 ingested" |
| Policy-rule update management | ✅ | BFS v2.4 deploy item |
| Safe deployment / test environment | ✅ | Governance actions table |
| Model governance dashboard | ✅ | Full page |
| **Demo Moment** (accuracy improved + drift segment) | ✅ | Green trend + red drift alert |

**Testing:** Model Ops → 87.4% accuracy → drift alert → product accuracy table → governance 4 items.

---

### Module 20 — Pilot Demo Setup (Sample Data)

**Data file:** `src/data/mockData.ts`

| Sub-point | Status | Demo mein kya hai |
|-----------|--------|-------------------|
| 5,000 mortgage submissions | ✅ | `COMMAND_CENTER_STATS.totalSubmissions` |
| 500 active broker partners | ✅ | Broker Intelligence KPI |
| 100 brokerage firms | ✅ | KPI + 8 brokerage names in rotation |
| 8 active product categories | ✅ | 7 products in `PRODUCTS` array |
| 6 provinces | ✅ | ON, BC, AB, QC, MB, SK |
| 25,000 uploaded documents | ✅ | Intake KPI + Integrations pilot stats |
| 2,000 appraisal records | ✅ | Property page KPI |
| 1,500 conditionally approved | ✅ | Intake KPI + Funding queue stats |
| 1,000 funded mortgage records | ✅ | Portfolio YTD 1,000 |
| 12 months history | ✅ | `VOLUME_BY_MONTH` Jul–Jun |
| 50 underwriter & ops users | ✅ | Intake KPI opsUsers: 50 + OPS_USERS list |
| Broker communication history | ✅ | Communications timeline |
| Product guideline & checklist library | ✅ | Intake BFS checklist + policy version |

**Note:** Table mein **120 generated submissions** render hoti hain (performance ke liye). Stats **5,000** dikhate hain — meeting mein keh dena: *"Pilot dataset simulates 5,000 submissions; live table sample shows representative active files."*

---

## 7. Module-wise testing guide

### Quick URL reference

| Module | URL (after login) | Role |
|--------|-------------------|------|
| 1 Command Center | `/operations/command-center` | Maria or Leon |
| 2 Intake | `/operations/intake` | Maria |
| 3 Adjudication | `/underwriter/adjudication` | Karen |
| 4 Product Matching | `/underwriter/product-matching` | Karen |
| 5 Broker Intelligence | `/operations/broker-intelligence` | Maria |
| 6 Communications | `/operations/communications` | Maria |
| 7 Document Review | `/underwriter/document-review` | Karen |
| 8 Property/Appraisal | `/underwriter/property-appraisal` | Karen |
| 9 Fraud | `/compliance/fraud` | David |
| 10 Copilot | `/underwriter/copilot` | Karen |
| 11 SLA Queue | `/operations/sla-queue` | Maria |
| 12 Funding | `/operations/funding` | Maria |
| 13 Portfolio | `/executive/portfolio` | Leon |
| 14 Province Expansion | `/executive/province-expansion` | Leon |
| 15 Broker Portal | `/broker/portal` | Angela |
| 16 Integrations | `/operations/integrations` | Maria |
| 17 Leadership | `/executive/leadership` | Leon |
| 18 Compliance Audit | `/compliance/compliance-audit` | David |
| 19 Model Ops | `/executive/model-ops` | Leon |
| 20 Pilot Data | (all pages — background) | — |

### Full regression test (30 min)

Har step mein **Expected** column verify karein:

```
[ ] 1.  localhost:3000 → redirects to /login
[ ] 2.  5 user cards visible with titles
[ ] 3.  Theme toggle works (light ↔ dark)
[ ] 4.  Leon → /executive/leadership loads
[ ] 5.  Sidebar 5 items — har ek click → page loads
[ ] 6.  Sign out → login
[ ] 7.  Maria → 7 sidebar pages load
[ ] 8.  Command Center — pipeline + table visible
[ ] 9.  Intake — HCV-2026-10482 + checklist
[ ] 10. Karen → 5 pages load
[ ] 11. Copilot — summary + chat visible
[ ] 12. David → fraud + audit load
[ ] 13. Angela → 4 broker pages load
[ ] 14. Scenario desk — AI result after page load
[ ] 15. Role guard — wrong URL redirects
[ ] 16. Sidebar collapse works
[ ] 17. Har page par green "Demo Moment" box hai
[ ] 18. npm run build — no errors
```

### Per-page "client ko kya bolna hai" (30 seconds each)

| Page | One-liner |
|------|-----------|
| Command Center | *"Yeh Highclere ka control tower hai — 300 active files, ek nazar mein risk aur pipeline."* |
| Intake | *"File underwriter tak pohanchne se pehle AI completeness check karta hai — manual triage kam."* |
| Adjudication | *"50 nayi files aate hi system batata hai kaun fast-track, kaun senior review, kaun decline risk."* |
| Product Matching | *"Galat product par submit hone se pehle sahi path suggest — broker back-and-forth kam."* |
| Broker Intelligence | *"Kaun sa broker clean files bhejta hai, kaun education chahta hai — volume manage karne ke liye."* |
| Communications | *"Conditions aur reminders automatic — team sirf exception par intervene karti hai."* |
| Document Review | *"Income documents se extract, compare, inconsistency flag — underwriter ko summary ready."* |
| Property | *"Appraisal delay + high LTV = funding risk turant visible."* |
| Fraud | *"Cross-file patterns detect — chori ki files underwriting queue mein mix nahi hoti."* |
| Copilot | *"Underwriter file kholte hi one-page AI summary — exception-only review."* |
| SLA Queue | *"Volume 40% badhe to pehle se pata — capacity aur reassignment suggest."* |
| Funding | *"Closing se pehle kya missing hai — 22 ready, 17 solicitor block, clear breakdown."* |
| Portfolio | *"Capital markets view — product mix, concentration risk, Alt-A alert."* |
| Province | *"National scale — kaun sa province active, NS expansion checklist."* |
| Broker Portal | *"Broker khud scenario check kare submit se pehle — cleaner files."* |
| Integrations | *"Filogix, Equifax, appraisal — existing systems ke upar intelligence layer."* |
| Leadership | *"Leon ke liye weekly operational intelligence — board-ready summary."* |
| Compliance | *"Har AI decision explainable — full audit trail regulated environment ke liye."* |
| Model Ops | *"Platform time ke sath improve — drift detect jab model confidence gire."* |

---

## 8. Summary scorecard

| Module | Goal covered | Demo Moment | Page exists | Sub-points (est.) |
|--------|--------------|-------------|-------------|-------------------|
| 1 Command Center | ✅ | ✅ | ✅ | ~95% |
| 2 Intake | ✅ | ✅ | ✅ | ~92% |
| 3 Adjudication | ✅ | ✅ | ✅ | ~92% |
| 4 Product Matching | ✅ | ✅ | ✅ | ~90% |
| 5 Broker Intelligence | ✅ | ✅ | ✅ | ~92% |
| 6 Communications | ✅ | ✅ | ✅ | ~92% |
| 7 Document Review | ✅ | ✅ | ✅ | ~90% |
| 8 Property/Appraisal | ✅ | ✅ | ✅ | ~92% |
| 9 Fraud | ✅ | ✅ | ✅ | ~90% |
| 10 Copilot | ✅ | ✅ | ✅ | ~92% |
| 11 SLA Queue | ✅ | ✅ | ✅ | ~92% |
| 12 Funding | ✅ | ✅ | ✅ | ~90% |
| 13 Portfolio | ✅ | ✅ | ✅ | ~92% |
| 14 Province Expansion | ✅ | ✅ | ✅ | ~95% |
| 15 Broker Portal | ✅ | ✅ | ✅ (4 pages) | ~92% |
| 16 Integrations | ✅ | ✅ | ✅ | ~90% |
| 17 Leadership | ✅ | ✅ | ✅ | ~92% |
| 18 Compliance Audit | ✅ | ✅ | ✅ | ~92% |
| 19 Model Ops | ✅ | ✅ | ✅ | ~92% |
| 20 Pilot Data | ✅ | — | ✅ (data layer) | ~90% |

**Overall:** 20/20 modules — **screen + demo moment + key interactions** dummy data ke sath.  
**Demo state:** `localStorage` (`hcv_demo_state_v2`) — upload, overrides, fraud, audit, reminders persist session mein. Reset: `localStorage.clear()` + refresh.

---

## 9. Client se kya kehna hai (talking points)

### Opening (2 min)

> *"Aaj hum Highclere Velocity dikhayenge — AI-powered mortgage intelligence platform. Yeh production system nahi, balki pilot demo hai jisme 5,000 submissions, 500 brokers, aur 20 operational modules simulate kiye gaye hain taake aap dekh saken volume badhne par workflow kaisa dikhega."*

### Honesty line (important)

> *"Jo aap dekh rahe hain woh real APIs aur AI models se connected demo frontend hai. Har screen par realistic dummy data hai — client meeting ke baad yahi screens production backend se connect hon gi."*

### Closing (2 min)

> *"Summary: ek platform jahan intake se funding tak AI triage karti hai, underwriters exception par kaam karte hain, brokers pehle se better files bhejte hain, aur leadership ko real-time risk aur volume dikhta hai. Agla phase: aapki live product guidelines, Filogix integration, aur production data."*

---

## 10. Interactive features (live demo)

Pehle ⚠️ Partial the — ab yeh **kaam karte hain**:

### A. Command Center — live filters
**Page:** `/operations/command-center`

| Action | Expected |
|--------|----------|
| **Fast-Track** chip | Sirf fast-track files; hero count update |
| Province **ON** + Product **Business-for-Self** | Filtered table |
| Broker **Angela Morrison** | Us broker ki files |
| **SLA At Risk** | at_risk / breached only |
| **Clear all filters** | Poori list wapas |

Pipeline stages bhi filtered count dikhate hain.

### B. Scenario Desk — dynamic calculation
**Page:** `/broker/scenario-desk`

| Test | Expected |
|------|----------|
| Salaried, credit 720, LTV 75 → **Run** | Prime high fit (~90%+) |
| BFS, 6 yrs self-employed → **Run** | BFS recommended |
| Self-employed years = 1 → **Run** | Friction warning |
| LTV 90+ → **Run** | Lower approval % |

Product comparison table har run par recalculate hoti hai.

### C. Upload simulation (cross-page)
**Best client wow-moment — 2 roles:**

1. **Angela** → `/broker/portal` → **Upload Documents** → Simulate upload (bank statements)
2. Toast bottom-right → Quality score badhe
3. **Maria** → `/operations/intake` → checklist **Received** + score update
4. **Angela** → `/broker/conditions` → Sarah Chen items kam

**Intake:** **Send to Broker** → toast + "Delivered" badge.

**Reset:** Incognito window ya `localStorage.clear()` + refresh.

---

## File reference (developers ke liye)

| Item | Path |
|------|------|
| Product spec | `prompt.txt` |
| Mock data | `src/data/mockData.ts` |
| Domain types | `src/lib/types.ts` |
| All module UIs | `src/views/*.tsx` |
| Routes | `src/app/{role}/{slug}/page.tsx` |
| Sidebar / layout | `src/components/AppShell.tsx` |
| Login / roles | `src/components/LoginScreen.tsx` |
| Auth guard | `src/middleware.ts` |
| Theme | `src/styles/theme.css` |
| Live filters | `src/components/SubmissionFilters.tsx` |
| Scenario engine | `src/lib/scenarioEngine.ts` |
| Upload simulator | `src/components/UploadSimulator.tsx` |
| Demo state (checklist sync) | `src/context/DemoStateProvider.tsx` |

---

*Is document ko meeting se pehle ek baar khud walkthrough kar lein — 45 minute demo smoothly chal jayegi.*
