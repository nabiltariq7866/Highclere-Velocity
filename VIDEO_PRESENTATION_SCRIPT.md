# Highclere Velocity — Boss Video Presentation Script

**Purpose:** Is script ko follow karke aap apne boss ko video mein poora project explain kar sakte ho — login se le kar har role, har module, aur har interactive feature tak.

**Suggested video length:** 35–45 minutes (full) · 15-minute version ke liye har section mein *"Short cut"* diya gaya hai.

**Before recording:**
```bash
cd D:\AspireXLLC\Highclere-Velocity
npm run dev
```
Browser: `http://localhost:3000` · Zoom 100% · Incognito window (fresh demo)

---

## Table of Contents

1. [Opening — Boss ko 1 minute mein kya batana hai](#1-opening)
2. [Project kya hai aur kyun banaya](#2-project-overview)
3. [Tech stack — simple language mein](#3-tech-stack)
4. [Login page — pehla scene](#4-login-page)
5. [UI tour — sidebar, theme, layout](#5-ui-tour)
6. [Golden File — poori demo ki kahani](#6-golden-file)
7. [Role 1: Leon — Executive](#7-leon-executive)
8. [Role 2: Maria — Operations](#8-maria-operations)
9. [Role 3: Karen — Underwriter](#9-karen-underwriter)
10. [Role 4: David — Compliance](#10-david-compliance)
11. [Role 5: Angela — Broker](#11-angela-broker)
12. [Cross-role wow moment — upload flow](#12-cross-role-wow-moment)
13. [Honest limitations — boss ko zaroor batana](#13-honest-limitations)
14. [Closing script](#14-closing)
15. [15-minute short version](#15-short-version)

---

## 1. Opening

**[ON SCREEN: Browser blank → type localhost:3000]**

**Aap bolein:**

> "Assalam-o-Alaikum / Good morning. Aaj main aapko **Highclere Velocity** dikhaunga — yeh ek **AI-powered mortgage intelligence platform** ka **pilot demo** hai jo humne client presentation ke liye banaya hai.
>
> Yeh production system nahi hai — yeh ek **working frontend prototype** hai jisme **realistic dummy data** hai taake client dekh sake ke volume badhne par Highclere ka workflow kaisa dikhega: intake se le kar funding, underwriting, compliance, aur broker portal tak — sab ek jagah.
>
> Original requirement **`prompt.txt`** file mein thi — **20 modules**. Maine poora UI, role-based access, interactive filters, upload simulation, aur audit trail implement kiya hai. Chaliye shuru karte hain."

**Short cut:** Sirf 2 sentences + login screen dikhao.

---

## 2. Project Overview

**[ON SCREEN: Optionally `prompt.txt` ya `DEMO_DELIVERY_GUIDE.md` file explorer mein dikhao]**

**Aap bolein:**

> "Client ka problem yeh tha: broker submissions barh rahi hain, lekin manual underwriting slow ho jati hai, documents missing aate hain, aur leadership ko real-time picture nahi milti.
>
> **Highclere Velocity** ka jawab yeh hai:
> - **Ek command center** jahan 300+ active files ek nazar mein
> - **AI intake** jo file underwriter se pehle completeness check kare
> - **Adjudication** jo bataye kaun fast-track, kaun senior review, kaun decline risk
> - **Broker portal** jahan broker submit se pehle scenario check kare
> - **Compliance & fraud** layer regulated environment ke liye
> - **Executive dashboards** Leon jaisi leadership ke liye
>
> Humne **`prompt.txt` ke 20 modules** cover kiye — har ek ka alag screen hai, har ek par green **Demo Moment** box hai jo client ko samjhata hai yeh screen kyun important hai."

**Files boss ko dikhane ke liye:**
| File | Kaam |
|------|------|
| `prompt.txt` | Client ki original spec |
| `DEMO_DELIVERY_GUIDE.md` | Har point ka mapping + testing steps |
| `VIDEO_PRESENTATION_SCRIPT.md` | Yeh video script |
| `src/views/` | Har module ki UI |
| `src/data/mockData.ts` | Dummy data layer |

---

## 3. Tech Stack

**[ON SCREEN: Optional — VS Code project folder]**

**Aap bolein (simple, non-technical boss ke liye):**

> "Technically yeh **Next.js 15** aur **React 19** par hai — modern, fast, production-ready framework. Styling **SkyOS-style theme** hai light aur dark dono modes ke sath — professional financial platform jaisa look.
>
> **5 roles** hain — executive, operations, underwriter, compliance, broker. Har role ka apna sidebar aur routes hain. **Middleware** guard karta hai ke broker operations page nahi khol sakta — real RBAC ka demo.
>
> Interactive cheezein **localStorage** mein save hoti hain — jaise upload ke baad checklist update, ya underwriter override audit log mein jaye. Demo reset ke liye incognito ya `localStorage.clear()` karte hain.
>
> **Production mein** yeh screens Filogix, Equifax, real database, aur actual AI models se connect hongi. Abhi data `mockData.ts` se aa raha hai — yeh intentional hai pilot demo ke liye."

**Short cut:** "Next.js demo, 5 roles, dummy data, production-ready UI shell."

---

## 4. Login Page

**[ON SCREEN: `http://localhost:3000/login`]**

**Aap bolein:**

> "Jab app khulta hai to pehle **login page** aata hai. Production mein yahan SSO ya real authentication hoga. Demo mein hum **5 personas** choose karte hain — har ek alag role represent karta hai."

**[Mouse se har card par hover karo]**

| Card | Role | Aap kya bolein |
|------|------|----------------|
| **Leon Hartwell** | CEO / Executive | "Leadership — portfolio, weekly reports, national expansion" |
| **Maria Santos** | VP Operations | "Operations — command center, intake, SLA, funding, integrations" |
| **Karen Mitchell** | Senior Underwriter | "Underwriting — adjudication, documents, AI copilot" |
| **David Okonkwo** | Chief Compliance | "Compliance — fraud, audit trail, explainability" |
| **Angela Morrison** | Mortgage Broker | "Broker partner — portal, scenario desk, conditions" |

**[Top right: Theme toggle click karo — light ↔ dark]**

> "Yahan **light/dark theme toggle** hai — client meeting mein dono dikha sakte ho. Design consistent hai poori app mein."

**[Leon par click karo — login]**

> "Main pehle **Leon** se login karta hoon — executive view se shuru karte hain kyunki boss / client ko pehle big picture chahiye hoti hai."

---

## 5. UI Tour

**[ON SCREEN: Koi bhi role logged in — AppShell visible]**

**Layout explain karo — har role mein same structure:**

| Area | Kya hai | Kya bolein |
|------|---------|------------|
| **Left sidebar** | Navigation | "Har role ko sirf woh pages dikhte hain jo uske kaam se related hain — security aur clarity dono ke liye." |
| **Sidebar brand** | Highclere Velocity | "Pilot Demo v1.0 branding — client ko pata chale yeh pilot hai." |
| **Collapse button** | Sidebar chhota/bada | "Sidebar collapse — zyada table space ke liye." |
| **Top bar** | User name, Pro mode, Sign out | "User context hamesha visible — kaun logged in hai." |
| **Pro mode toggle** | UI density | "Pro mode — operations users ke liye dense view." |
| **Sign out** | Logout | "Sign out — dusre role mein switch karne ke liye." |
| **Green box** | Demo Moment | "Har page par yeh green box client ko batata hai is screen ka **wow moment** kya hai — presenter guide built-in hai." |

---

## 6. Golden File

**Poori video mein yeh thread repeat karo — client / boss ko story yaad rehti hai.**

**[ON SCREEN: Koi bhi module jahan HCV-2026-10482 dikhe]**

**Aap bolein:**

> "Poori demo ek **fictional deal** ke around ghoomti hai — isse client ko samajh aata hai yeh alag-alag screens ek hi file ki journey hain:
>
> - **File:** HCV-2026-10482  
> - **Borrower:** Sarah Chen  
> - **Broker:** Angela Morrison, Dominion Lending  
> - **Product:** Business-for-Self (self-employed)  
> - **Problem:** Missing bank statements + income mismatch — stated $142,000 vs NOA $118,400  
>
> Yeh file Intake se start hoti hai, Underwriter Copilot tak jati hai, Compliance audit mein dikhti hai, aur Broker portal par Angela ko action required dikhta hai."

---

## 7. Leon — Executive

**[Sign out → Login → Leon Hartwell]**

**Default landing:** `/executive/leadership`

---

### 7.1 Leadership Dashboard

**URL:** `/executive/leadership`

**Aap bolein:**

> "Leon yahan **weekly executive intelligence** dekhta hai — board meeting ke liye."

**[Screen par point karo]**

- **KPI cards:** "5,000 total submissions, 84% approval rate, 78% broker conversion, 4.2 hour avg decision time, 4.8% appraisal delay rate."
- **Line chart:** "Approvals aur funded volume trend — 12 months history."
- **Top Operational Actions:** "AI suggest karta hai kya karna hai — add underwriters, broker education, Alt-A portfolio review."
- **AI Weekly Report paragraph:** "Natural language summary — production mein yeh har hafte auto-generate hoga."
- **Export Board Report button:** "Click karo — export preview modal khulta hai, PDF/CSV demo. Boss ko dikhao yeh board-ready output hai."

**Short cut:** KPIs + Export button — 2 min.

---

### 7.2 Command Center (Executive view)

**Sidebar → Command Center** · `/executive/command-center`

**Aap bolein:**

> "Executive bhi command center dekh sakta hai — same operations view lekin leadership lens se. Yahan **300 active files**, pipeline by stage, volume chart, aur at-risk files list hai."

**[Filters demo — optional]**

> "Filters live hain — province Ontario, product Business-for-Self, broker Angela Morrison — table aur pipeline counts turant update hote hain. Yeh drill-down capability client ko pasand aati hai."

---

### 7.3 Portfolio & Capital Markets

**Sidebar → Portfolio** · `/executive/portfolio`

**Aap bolein:**

> "Yeh **capital markets view** hai — product mix pie chart, credit tier distribution, LTV band exposure, investor pool allocation."

**[Scenario sliders move karo]**

> "Yeh sliders live hain — volume growth 10% se 30% karo, Alt-A share badhao — neeche projected pipeline aur risk level change hota hai. Demo Moment: Alt-A Ontario concentration alert — leadership ko early warning."

---

### 7.4 Province Expansion

**Sidebar → Province Expansion** · `/executive/province-expansion`

**Aap bolein:**

> "Highclere national scale karna chahta hai — yahan 6 active provinces, NS/NB expansion pipeline, compliance checklist, market opportunity scores."

**[Province chips click karo — ON, BC, QC]**

> "Provincial guideline differences — har province ke alag rules. ON par BFS max LTV 80%, QC par French disclosure mandatory — yeh scaling ke liye critical hai."

---

### 7.5 Model Ops

**Sidebar → Model Ops** · `/executive/model-ops`

**Aap bolein:**

> "AI platform time ke sath improve hota hai — approval accuracy 87.4%, drift detection Alt-A Ontario par, broker behavior learning chart jahan missing-doc rate kam ho raha hai. Client ko confidence deta hai ke yeh static tool nahi — learning system hai."

**[Sign out]**

> "Executive section complete — ab operations dekhte hain jahan files actually flow hoti hain."

---

## 8. Maria — Operations

**[Login → Maria Santos]** · `/operations/command-center`

---

### 8.1 Command Center

**Aap bolein:**

> "Maria ka **control tower** — saari broker submissions ek jagah. Hero banner: 45 fast-track, 18 missing income docs, 9 appraisal waiting, 6 SLA at risk — yeh `prompt.txt` ka exact Demo Moment hai."

**[Live filter demo — ZAROOR karo video mein]**

1. **Fast-Track chip** click → "Sirf clean files — count update."
2. **Clear** → Province **ON** + Product **Business-for-Self** → "Regional product drill-down."
3. Broker **Angela Morrison** → "Us broker ki saari files."
4. **SLA At Risk** → "Jin deals ko funding deadline miss ho sakti hai."
5. **Brokerage** dropdown → Dominion Lending
6. **Deal Size** → Over $750K
7. **Clear all filters**

> "Pipeline bar bhi filtered count dikhati hai — yeh real operations team ko chahiye hota hai daily standup mein."

---

### 8.2 AI Intake & File Quality

**Sidebar → Intake** · `/operations/intake`

**Aap bolein:**

> "File underwriter tak pohanchne se **pehle** AI kaam karti hai. Sarah Chen golden file — Filogix se aayi."

**[Screen walkthrough]**

- **Pilot KPIs top:** "25,000 documents, 1,500 conditional approved, 50 ops users — pilot dataset scale."
- **Intake channels:** "Filogix, portal upload, email-to-file — multi-channel intake."
- **Red duplicate alert:** "Same pay stub template doosri file par — fraud ko route, underwriting ko nahi."
- **Extracted fields:** "AI ne income, NOA, business type extract kiya confidence % ke sath."
- **Income mismatch banner:** "Stated vs NOA 17% variance — underwriter ko pehle se pata."
- **Live checklist:** "Missing bank statements, T1 — quality score 62/100."
- **Send to Broker button:** "Click — toast notification, broker ko auto-message jata hai demo mein."

---

### 8.3 Broker Intelligence

**Sidebar → Broker Intelligence** · `/operations/broker-intelligence`

**Aap bolein:**

> "500 brokers manage karna mushkil hai — yahan scorecards hain. Ek brokerage 38% missing-doc rate bhej rahi hai — system education recommend karta hai."

**[Broker table row click karo]**

> "Click karne par scorecard update — volume, approval rate, funding conversion, decline reasons, SLA. High-value broker prioritization table — Platinum partners. Account rep dashboard. New broker onboarding pipeline NS/NB ke liye."

---

### 8.4 Communications & Conditions

**Sidebar → Communications** · `/operations/communications`

**Aap bolein:**

> "Manual follow-up kam — AI broker messages generate karta hai. Sarah Chen file par 5 conditions — 2 received, 3 outstanding."

**[Product template dropdown change karo]**

> "Templates product ke hisaab se — BFS alag, Prime alag. Mark Received button — condition clear. Internal summary panel underwriters ke liye. Timeline left side — conversation history."

---

### 8.5 SLA & Capacity

**Sidebar → SLA Queue** · `/operations/sla-queue`

**Aap bolein:**

> "Volume 40% badh jaye to pehle se pata chale — yahan capacity 112% alert hai. Urgent closings table — kaun si file 2 din mein close honi hai, kisko route karna hai. Aging by product chart — BFS slowest. Reassign button — file Diana Cho ko assign demo."

---

### 8.6 Funding Readiness

**Sidebar → Funding** · `/operations/funding`

**Aap bolein:**

> "Closing se pehle kya missing hai — 60 conditional, 22 ready, 17 solicitor block, 9 appraisal, 12 broker follow-up. Har file ka readiness % progress bar. Send Reminder — late-stage delay flags alag panel mein."

---

### 8.7 Integrations

**Sidebar → Integrations** · `/operations/integrations`

**Aap bolein:**

> "Yeh replace nahi karta existing systems — upar intelligence layer hai. Filogix, Equifax, Appraisal API, CRM, Servicing — connected status."

**[Simulate Filogix Submission button — MUST DEMO]**

> "Yeh sabse important interactive moment hai operations mein. Click — live event stream: webhook → documents → credit pull → appraisal order → dashboard update. Email-to-file queue aur unified data model layers bhi dikhte hain."

**[Sign out]**

---

## 9. Karen — Underwriter

**[Login → Karen Mitchell]** · `/underwriter/adjudication`

---

### 9.1 Adjudication & Approval Prediction

**Aap bolein:**

> "50 new submissions aaye — system ne triage kiya: fast-track, doc follow-up, senior review, decline risk. KPIs live update jab filter lagao."

**[Override buttons click karo]**

> "Accept AI Fast-Track, Override Request Docs, Senior Review — yeh decisions Compliance audit log mein jate hain. Explainable AI panel batata hai score kyun 91% hai."

---

### 9.2 Product Matching

**Sidebar → Product Matching** · `/underwriter/product-matching`

**Aap bolein:**

> "Sarah Chen self-employed — BFS 88% policy fit. Product rules engine v2.4 active. Exception workflow table. Side-by-side comparison — Prime, Insurable, Alt-A, BFS — kaun best fit."

---

### 9.3 Document Review

**Sidebar → Document Review** · `/underwriter/document-review`

**Aap bolein:**

> "AI har document se extract karti hai — pay stub, NOA, T1, bank statements. Income consistency check — stated vs NOA vs deposits. 17.3% variance flagged."

**[BFS / Salaried toggle switch karo]**

> "Salaried package alag documents dikhata hai — employment letter, T4 — same engine, different product type."

---

### 9.4 Property & Appraisal

**Sidebar → Property & Appraisal** · `/underwriter/property-appraisal`

**Aap bolein:**

> "Appraisal delay + high LTV = funding risk. Red alert HCV-10412 — 12 days delayed. Collateral exposure by region. Approval confidence drop 78% se 61% — AI batati hai collateral impact."

---

### 9.5 Underwriter Copilot

**Sidebar → Copilot** · `/underwriter/copilot`

**Aap bolein:**

> "Yeh underwriter ka main workspace hai — file kholte hi one-page AI summary: borrower, product fit, income notes, strengths, weaknesses, recommended conditional approval."

**[Q&A section]**

> "Underwriter question puch sakta hai — demo mein pre-written answers. Decision buttons — Approve, Conditional, Decline — persist hote hain. UW productivity table — files per day per underwriter."

**[Sign out]**

---

## 10. David — Compliance

**[Login → David Okonkwo]** · `/compliance/fraud`

---

### 10.1 Fraud & Document Integrity

**Aap bolein:**

> "Volume barhne par fraud risk barhta hai. Pattern FP-2026-044 — same pay stub template 4 unrelated applications par."

**[Quarantine button click]**

> "Quarantine — files underwriting queue mein nahi jati. Clear false positive bhi kar sakte hain. Document authenticity details expand. Property flipping aur synthetic profile indicators extended panel mein."

---

### 10.2 Compliance & Audit

**Sidebar → Compliance & Audit** · `/compliance/compliance-audit`

**Aap bolein:**

> "Regulated lending mein har step auditable hona chahiye. Live audit trail — jo bhi app mein action hua woh yahan append hota hai: upload, override, fraud quarantine, funding reminder."

**[Screen walkthrough]**

- **Timeline:** "Documents received → AI extraction → missing docs flagged → broker message → UW routing."
- **AI explanation:** "Score 68% — income variance minus 12, missing docs minus 8, credit plus 18."
- **Condition history:** "Har condition received ya outstanding."
- **Exception management:** "Product policy exceptions track."
- **Sensitive data & RBAC:** "PIPEDA, data masking, role enforcement."
- **Export Audit Package:** "Regulator ya internal audit ke liye export preview."

**[Sign out]**

---

## 11. Angela — Broker

**[Login → Angela Morrison]** · `/broker/portal`

---

### 11.1 Broker Portal

**Aap bolein:**

> "Broker experience alag hai — woh Highclere team nahi, partner hai. Angela Dominion Lending se hai. Priority file Sarah Chen — action required missing documents."

**[KPIs]**

> "Live quality score, conditions outstanding, appraisal status Ordered ETA 4 days."

**[Upload Documents — MUST DEMO]**

> "Upload Documents click — simulator modal: progress bar, AI extraction animation, success toast. Intake checklist update hoga jab Maria ke role mein dekho."

**Communication timeline** — Sarah Chen file ki messages.

**My Submissions table** — appraisal column, scores.

---

### 11.2 Scenario Desk

**Sidebar → Scenario Desk** · `/broker/scenario-desk`

**Aap bolein:**

> "Broker submit se **pehle** scenario check kare — back-and-forth kam. Education tips top par."

**[Live demo — MUST]**

1. Borrower: **Salaried**, Credit **720**, LTV **75** → **Run Scenario Check** → "Prime recommended ~90%+"
2. Change to **BFS**, 6 years self-employed → Run → "BFS best fit"
3. Self-employed years **1** → Run → "Friction warning"
4. LTV **90** → Run → "Lower approval likelihood"

> "Product comparison table har run par recalculate — yeh `scenarioEngine.ts` se live compute hota hai, static text nahi."

---

### 11.3 My Submissions

**Sidebar → My Submissions** · `/broker/my-files`

**Aap bolein:**

> "Angela ki saari files pipeline mein — stage, closing date, approval score."

---

### 11.4 Conditions Tracker

**Sidebar → Conditions** · `/broker/conditions`

**Aap bolein:**

> "Document conditions aur conditional approval items — portal upload aur communications se sync. Mark Received button — ops side par bhi update."

**[Sign out]**

---

## 12. Cross-Role Wow Moment

**Yeh 3-minute segment video ka sabse strong part ho sakta hai — zaroor record karo.**

**Step-by-step:**

| Step | Role | Action | Kya bolein |
|------|------|--------|------------|
| 1 | Angela | Portal → Upload Documents → bank statements simulate | "Broker ne document bheja" |
| 2 | Angela | Conditions dekho — items kam | "Broker side update" |
| 3 | Maria | Intake → checklist **Received** + score up | "Ops ne turant dekha — underwriter ko file ready" |
| 4 | Karen | Copilot → updated context | "Underwriter ko manually chase nahi karna pada" |
| 5 | David | Compliance Audit → new audit entry | "Poori chain logged — regulator-ready" |

> "Yeh dikhata hai platform **ek integrated operating layer** hai — siloed tools nahi."

**Reset:** `localStorage.clear()` in browser console → refresh.

---

## 13. Honest Limitations

**Boss ko trust ke liye yeh clearly bolo — end se pehle ya start mein:**

> "Kuch cheezein consciously demo scope mein hain:
>
> 1. **No real backend** — data `mockData.ts` se aata hai, database nahi  
> 2. **No real AI models** — summaries aur scores pre-written / rule-based hain  
> 3. **No live Filogix / Equifax** — Simulate button event stream dikhata hai  
> 4. **120 rows in table, 5,000 in stats** — performance ke liye sample; stats pilot scale batate hain  
> 5. **5 login users** — 50 ops users KPI mein simulated  
>
> Lekin **UI, workflow, role structure, aur client narrative** production direction dikhate hain. Agla phase: real APIs, Highclere product guidelines, production data."

---

## 14. Closing

**[ON SCREEN: Login page ya Leadership dashboard]**

**Aap bolein:**

> "To summarize — maine **Highclere Velocity pilot demo** deliver kiya hai:
>
> - **20 modules** from `prompt.txt` — sab ke screens + demo moments  
> - **5 roles** — executive se broker tak complete journey  
> - **Interactive features** — filters, scenario engine, upload sync, audit trail, integrations simulate  
> - **Golden file thread** — Sarah Chen / HCV-2026-10482 poore flow mein  
> - **Documentation** — `DEMO_DELIVERY_GUIDE.md` client meeting ke liye ready  
> - **Build verified** — `npm run build` pass, 33 routes  
>
> Client ko yeh dikha kar hum keh sakte hain: *'Yeh aapka future operating system hai — ab isko aapke live systems se connect karte hain.'*
>
> Questions?"

---

## 15. Short Version (15 min)

Agar boss ke paas kam time ho — sirf yeh order follow karo:

| Min | Scene |
|-----|-------|
| 0–1 | Opening + project 1-liner |
| 1–2 | Login + 5 roles dikhao |
| 2–5 | Leon: Leadership KPIs + Export + Portfolio sliders |
| 5–8 | Maria: Command Center filters + Intake golden file + **Simulate Filogix** |
| 8–11 | Karen: Copilot summary + Adjudication override |
| 11–13 | David: Fraud quarantine + Audit trail |
| 13–15 | Angela: Scenario Desk Run + Upload → Closing |

---

## Recording Tips

1. **Microphone** clear ho — screen recording se zyada important  
2. **Mouse slow move karo** — jahan click karo wahan 1 sec ruko  
3. **Green Demo Moment boxes** padhne ki zaroorat nahi — apni words mein summarize karo  
4. **Ek mistake ho** to clip cut karo — live demo mein `localStorage.clear()` se reset  
5. **Boss technical nahi** ho to Section 3 (Tech) skip karo  
6. **Boss technical ho** to `src/context/DemoStateProvider.tsx` aur `middleware.ts` 30 sec dikha do  

---

## Quick Reference — URLs

| Role | Page | URL |
|------|------|-----|
| All | Login | `/login` |
| Leon | Leadership | `/executive/leadership` |
| Leon | Portfolio | `/executive/portfolio` |
| Maria | Command Center | `/operations/command-center` |
| Maria | Intake | `/operations/intake` |
| Maria | Integrations | `/operations/integrations` |
| Karen | Copilot | `/underwriter/copilot` |
| Karen | Adjudication | `/underwriter/adjudication` |
| David | Fraud | `/compliance/fraud` |
| David | Audit | `/compliance/compliance-audit` |
| Angela | Portal | `/broker/portal` |
| Angela | Scenario Desk | `/broker/scenario-desk` |

---

*Script complete. Recording se pehle ek baar khud walkthrough karo — phir video smooth hogi. Good luck!*
