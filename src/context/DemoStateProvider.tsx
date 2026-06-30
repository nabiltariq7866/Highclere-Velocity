"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { CONDITION_ITEMS } from "@/data/extendedMockData";

export type ChecklistItem = { id: string; item: string; done: boolean };
export type Toast = { id: number; message: string; type: "success" | "info" };
export type UwDecision = "approve_conditions" | "more_info" | "escalate" | null;
export type ConditionStatus = "outstanding" | "received";

export type ConditionItem = {
  id: string;
  item: string;
  due: string;
  status: ConditionStatus;
  product: string;
};

export type AuditEntry = {
  id: string;
  time: string;
  event: string;
  actor: string;
};

const INITIAL_CHECKLIST: ChecklistItem[] = [
  { id: "app", item: "Signed mortgage application", done: true },
  { id: "id", item: "Government-issued ID", done: true },
  { id: "noa", item: "NOA 2024", done: true },
  { id: "t1", item: "T1 General 2024", done: false },
  { id: "bank", item: "Business bank statements (90 days)", done: false },
  { id: "corp", item: "Articles of incorporation", done: true },
  { id: "purchase", item: "Purchase agreement", done: true },
  { id: "credit", item: "Credit report", done: true },
];

type DemoStateContextValue = {
  goldenFileChecklist: ChecklistItem[];
  brokerMessageSent: boolean;
  markDocUploaded: (checklistId: string, docLabel: string) => void;
  sendBrokerMessage: () => void;
  qualityScore: number;
  toasts: Toast[];
  pushToast: (message: string, type?: Toast["type"]) => void;
  dismissToast: (id: number) => void;
  uwDecision: UwDecision;
  setUwDecision: (d: UwDecision) => void;
  conditions: ConditionItem[];
  markConditionReceived: (id: string) => void;
  fraudStatuses: Record<number, "pending" | "quarantined" | "cleared">;
  setFraudStatus: (id: number, status: "quarantined" | "cleared") => void;
  integrationEvents: { time: string; step: string; msg: string }[];
  simulateIntegration: () => void;
  auditLog: AuditEntry[];
  appendAudit: (event: string, actor: string) => void;
  fundingReminders: string[];
  sendFundingReminder: (file: string) => void;
  reassignments: Record<string, string>;
  reassignFile: (file: string, to: string) => void;
  commTemplateProduct: string;
  setCommTemplateProduct: (p: string) => void;
};

const DemoStateContext = createContext<DemoStateContextValue | null>(null);
const STORAGE_KEY = "hcv_demo_state_v2";

function nowTime() {
  return new Date().toLocaleString("en-CA", { hour: "2-digit", minute: "2-digit", month: "short", day: "numeric" });
}

export function DemoStateProvider({ children }: { children: ReactNode }) {
  const [goldenFileChecklist, setGoldenFileChecklist] = useState<ChecklistItem[]>(INITIAL_CHECKLIST);
  const [brokerMessageSent, setBrokerMessageSent] = useState(false);
  const [uwDecision, setUwDecisionState] = useState<UwDecision>(null);
  const [conditions, setConditions] = useState<ConditionItem[]>(CONDITION_ITEMS);
  const [fraudStatuses, setFraudStatuses] = useState<Record<number, "pending" | "quarantined" | "cleared">>({
    1: "pending", 2: "pending", 3: "pending", 4: "pending",
  });
  const [integrationEvents, setIntegrationEvents] = useState<{ time: string; step: string; msg: string }[]>([]);
  const [auditLog, setAuditLog] = useState<AuditEntry[]>([
    { id: "a0", time: "Jun 28 09:14", event: "Broker submission received via Filogix", actor: "System" },
    { id: "a1", time: "Jun 28 09:15", event: "AI extracted income: $142,000 stated (BFS)", actor: "AI Intake" },
  ]);
  const [fundingReminders, setFundingReminders] = useState<string[]>([]);
  const [reassignments, setReassignments] = useState<Record<string, string>>({});
  const [commTemplateProduct, setCommTemplateProduct] = useState("Business-for-Self");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (s.checklist) setGoldenFileChecklist(s.checklist);
        if (s.brokerMessageSent) setBrokerMessageSent(true);
        if (s.uwDecision) setUwDecisionState(s.uwDecision);
        if (s.conditions) setConditions(s.conditions);
        if (s.fraudStatuses) setFraudStatuses(s.fraudStatuses);
        if (s.auditLog) setAuditLog(s.auditLog);
        if (s.fundingReminders) setFundingReminders(s.fundingReminders);
        if (s.reassignments) setReassignments(s.reassignments);
      }
    } catch { /* ignore */ }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ checklist: goldenFileChecklist, brokerMessageSent, uwDecision, conditions, fraudStatuses, auditLog, fundingReminders, reassignments })
    );
  }, [goldenFileChecklist, brokerMessageSent, uwDecision, conditions, fraudStatuses, auditLog, fundingReminders, reassignments, hydrated]);

  const qualityScore = Math.round(
    (goldenFileChecklist.filter((c) => c.done).length / goldenFileChecklist.length) * 100
  );

  const pushToast = useCallback((message: string, type: Toast["type"] = "success") => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4500);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const appendAudit = useCallback((event: string, actor: string) => {
    setAuditLog((log) => [
      { id: `a${Date.now()}`, time: nowTime(), event, actor },
      ...log,
    ]);
  }, []);

  const markDocUploaded = useCallback(
    (checklistId: string, docLabel: string) => {
      setGoldenFileChecklist((list) => list.map((c) => (c.id === checklistId ? { ...c, done: true } : c)));
      appendAudit(`${docLabel} uploaded and extracted`, "Broker Portal");
      pushToast(`${docLabel} uploaded — AI extraction complete`);
    },
    [pushToast, appendAudit]
  );

  const sendBrokerMessage = useCallback(() => {
    setBrokerMessageSent(true);
    appendAudit("Auto missing-document request sent to Angela Morrison", "Communications");
    pushToast("Missing-document request sent to Angela Morrison", "info");
  }, [pushToast, appendAudit]);

  const setUwDecision = useCallback(
    (d: UwDecision) => {
      setUwDecisionState(d);
      const labels = {
        approve_conditions: "Conditional approval recorded — Karen Mitchell",
        more_info: "More info requested — routed to broker",
        escalate: "Escalated to senior underwriter",
      };
      if (d) {
        appendAudit(labels[d], "Karen Mitchell");
        pushToast(labels[d], "info");
      }
    },
    [appendAudit, pushToast]
  );

  const markConditionReceived = useCallback(
    (id: string) => {
      setConditions((c) => c.map((x) => (x.id === id ? { ...x, status: "received" as const } : x)));
      appendAudit(`Condition cleared: ${id}`, "Broker Portal");
      pushToast("Condition marked received — file status updated");
    },
    [appendAudit, pushToast]
  );

  const setFraudStatus = useCallback(
    (id: number, status: "quarantined" | "cleared") => {
      setFraudStatuses((f) => ({ ...f, [id]: status }));
      appendAudit(`Fraud alert #${id} ${status}`, "David Okonkwo");
      pushToast(`Fraud alert #${id} marked ${status}`, status === "quarantined" ? "info" : "success");
    },
    [appendAudit, pushToast]
  );

  const simulateIntegration = useCallback(() => {
    const file = "HCV-2026-10501";
    const events = [
      { step: "Filogix webhook", msg: `New submission ${file} received from Dominion Lending` },
      { step: "Document pipeline", msg: "12 documents ingested to S3 · AI extraction started" },
      { step: "Equifax", msg: "Credit pull complete · Score 756 · GDS/TDS calculated" },
      { step: "Appraisal API", msg: "Appraisal order placed · ETA 4 business days" },
      { step: "Command Center", msg: "Dashboard updated · File routed to intake · Broker notified" },
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i >= events.length) {
        clearInterval(interval);
        pushToast("Integration flow complete — check Command Center", "success");
        return;
      }
      const e = events[i];
      setIntegrationEvents((prev) => [...prev, { time: nowTime(), ...e }]);
      i++;
    }, 800);
    appendAudit(`Live integration simulation started for ${file}`, "System");
  }, [appendAudit, pushToast]);

  const sendFundingReminder = useCallback(
    (file: string) => {
      if (fundingReminders.includes(file)) return;
      setFundingReminders((r) => [...r, file]);
      appendAudit(`Funding reminder sent for ${file}`, "Operations");
      pushToast(`Closing reminder sent for ${file}`, "info");
    },
    [fundingReminders, appendAudit, pushToast]
  );

  const reassignFile = useCallback(
    (file: string, to: string) => {
      setReassignments((r) => ({ ...r, [file]: to }));
      appendAudit(`${file} reassigned to ${to}`, "SLA Queue");
      pushToast(`${file} reassigned to ${to}`);
    },
    [appendAudit, pushToast]
  );

  return (
    <DemoStateContext.Provider
      value={{
        goldenFileChecklist,
        brokerMessageSent,
        markDocUploaded,
        sendBrokerMessage,
        qualityScore,
        toasts,
        pushToast,
        dismissToast,
        uwDecision,
        setUwDecision,
        conditions,
        markConditionReceived,
        fraudStatuses,
        setFraudStatus,
        integrationEvents,
        simulateIntegration,
        auditLog,
        appendAudit,
        fundingReminders,
        sendFundingReminder,
        reassignments,
        reassignFile,
        commTemplateProduct,
        setCommTemplateProduct,
      }}
    >
      {children}
    </DemoStateContext.Provider>
  );
}

export function useDemoState() {
  const ctx = useContext(DemoStateContext);
  if (!ctx) throw new Error("useDemoState must be used within DemoStateProvider");
  return ctx;
}

export function resetDemoState() {
  localStorage.removeItem("hcv_demo_state_v2");
  localStorage.removeItem("hcv_demo_checklist");
  localStorage.removeItem("hcv_broker_msg");
}
