"use client";

import type { ReactNode } from "react";
import { AppShell } from "@/components/AppShell";
import { getUserForRole } from "@/data/demoUsers";
import type { UserRole } from "@/lib/types";

export function RolePage({ role, children }: { role: UserRole; children: ReactNode }) {
  const user = getUserForRole(role);
  return <AppShell role={role} user={user}>{children}</AppShell>;
}
