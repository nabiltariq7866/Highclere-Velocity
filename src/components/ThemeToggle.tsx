"use client";

import { useTheme } from "@/context/ThemeProvider";

export function ThemeToggle({ showLabel }: { showLabel?: boolean }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {showLabel && (
        <span className="theme-toggle-label">{theme === "light" ? "Light" : "Dark"}</span>
      )}
      <button
        type="button"
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      />
    </div>
  );
}
