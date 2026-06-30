"use client";

import { useDemoState } from "@/context/DemoStateProvider";

export function ToastStack() {
  const { toasts, dismissToast } = useDemoState();

  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 2000,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        maxWidth: 360,
      }}
    >
      {toasts.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => dismissToast(t.id)}
          className="toast-geo"
          style={{
            border: "none",
            borderRadius: 12,
            padding: "12px 16px",
            fontSize: 13,
            fontWeight: 600,
            textAlign: "left",
            cursor: "pointer",
            boxShadow: "var(--shadow-panel)",
            fontFamily: "inherit",
          }}
        >
          {t.type === "success" ? "✓ " : "→ "}
          {t.message}
        </button>
      ))}
    </div>
  );
}
