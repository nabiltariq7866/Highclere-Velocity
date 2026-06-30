import { ROLE_HOME } from "@/lib/routes";
import type { SessionUser } from "@/lib/types";

export const DEMO_USERS: SessionUser[] = [
  {
    id: "executive",
    name: "Leon Hartwell",
    role: "executive",
    avatar: "LH",
    email: "leon@highclere.ca",
    title: "Chief Executive Officer",
    redirectTo: ROLE_HOME.executive,
  },
  {
    id: "operations",
    name: "Maria Santos",
    role: "operations",
    avatar: "MS",
    email: "maria.santos@highclere.ca",
    title: "VP Lending Operations",
    redirectTo: ROLE_HOME.operations,
  },
  {
    id: "underwriter",
    name: "Karen Mitchell",
    role: "underwriter",
    avatar: "KM",
    email: "karen.mitchell@highclere.ca",
    title: "Senior Underwriter",
    redirectTo: ROLE_HOME.underwriter,
  },
  {
    id: "compliance",
    name: "David Okonkwo",
    role: "compliance",
    avatar: "DO",
    email: "david.okonkwo@highclere.ca",
    title: "Chief Compliance Officer",
    redirectTo: ROLE_HOME.compliance,
  },
  {
    id: "broker",
    name: "Angela Morrison",
    role: "broker",
    avatar: "AM",
    email: "angela@dominionlending.ca",
    title: "Mortgage Broker — Dominion Lending",
    redirectTo: ROLE_HOME.broker,
  },
];

export function getUserForRole(role: SessionUser["role"]) {
  return DEMO_USERS.find((u) => u.role === role)!;
}
