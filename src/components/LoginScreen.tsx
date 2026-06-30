"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { NavIcon } from "@/components/NavIcon";
import { ThemeToggle } from "@/components/ThemeToggle";
import { DEMO_USERS } from "@/data/demoUsers";
import { setSessionCookies } from "@/lib/session";

const ROLE_DESCRIPTIONS: Record<string, string> = {
  executive: "Portfolio, leadership KPIs & national expansion",
  operations: "Command center, intake, SLA & funding ops",
  underwriter: "Adjudication, documents & AI copilot",
  compliance: "Fraud detection & regulatory audit trail",
  broker: "Self-service portal & scenario desk",
};

export function LoginScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  useEffect(() => {
    DEMO_USERS.forEach((user) => {
      router.prefetch(user.redirectTo);
    });
  }, [router]);

  const handleLogin = (user: (typeof DEMO_USERS)[0]) => {
    setLoading(user.id);
    setSessionCookies(user);
    startTransition(() => {
      router.replace(user.redirectTo);
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div style={{ display: "inline-flex", alignItems: "center", gap: "16px" }}>
          <div className="brand-icon" style={{ width: "48px", height: "48px", borderRadius: "14px" }}>
            <NavIcon name="brand" size={26} />
          </div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: "20px", fontWeight: "800", color: "var(--text)" }}>
              Highclere Velocity
            </div>
            <div
              style={{
                fontSize: "10px",
                color: "var(--muted)",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              AI Mortgage Intelligence Platform
            </div>
          </div>
        </div>
        <div className="login-theme-wrap">
          <ThemeToggle showLabel />
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: "560px" }}>
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <h1 style={{ fontSize: "24px", fontWeight: "700", color: "var(--text)", margin: "0" }}>
              Welcome to Highclere Velocity
            </h1>
            <p
              style={{
                fontSize: "13px",
                color: "var(--muted)",
                marginTop: "6px",
                maxWidth: "480px",
                margin: "6px auto 0",
              }}
            >
              Select a demo persona to explore the mortgage adjudication platform — 5,000 submissions,
              500 brokers, 20 intelligent modules.
            </p>
          </div>

          <div style={{ display: "grid", gap: "12px" }}>
            {DEMO_USERS.map((user) => (
              <button
                key={user.id}
                type="button"
                onClick={() => handleLogin(user)}
                disabled={loading !== null}
                style={{
                  width: "100%",
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "14px",
                  padding: "18px 20px",
                  textAlign: "left",
                  cursor: loading !== null ? "wait" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  opacity: loading && loading !== user.id ? 0.6 : 1,
                }}
                onMouseEnter={(e) => {
                  router.prefetch(user.redirectTo);
                  e.currentTarget.style.borderColor = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: "var(--gradient-brand)",
                    color: "var(--text-on-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "800",
                    fontSize: "16px",
                    flexShrink: "0",
                  }}
                >
                  {loading === user.id ? (
                    <div
                      style={{
                        animation: "spin 1s linear infinite",
                        width: "20px",
                        height: "20px",
                        border: "2px solid transparent",
                        borderTopColor: "currentColor",
                        borderRadius: "50%",
                      }}
                    />
                  ) : (
                    user.avatar
                  )}
                </div>
                <div style={{ flex: "1" }}>
                  <div
                    style={{
                      fontSize: "15px",
                      fontWeight: "700",
                      color: "var(--text)",
                      marginBottom: "2px",
                    }}
                  >
                    {user.name}
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--muted)" }}>{user.title}</div>
                  <div style={{ fontSize: "11px", color: "var(--accent)", marginTop: "4px" }}>
                    {ROLE_DESCRIPTIONS[user.role]}
                  </div>
                </div>
                <div style={{ fontSize: "20px", color: "var(--accent)" }}>→</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
