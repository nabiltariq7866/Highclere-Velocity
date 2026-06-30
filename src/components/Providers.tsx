"use client";

import { ToastStack } from "@/components/ToastStack";
import { DemoStateProvider } from "@/context/DemoStateProvider";
import { ThemeProvider } from "@/context/ThemeProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <DemoStateProvider>
        {children}
        <ToastStack />
      </DemoStateProvider>
    </ThemeProvider>
  );
}
