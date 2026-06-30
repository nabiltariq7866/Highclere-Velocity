import type { UserRole } from "@/lib/types";

/** Default landing page per role — login and middleware use this to skip extra redirects. */
export const ROLE_HOME: Record<UserRole, string> = {
  executive: "/executive/leadership",
  operations: "/operations/command-center",
  underwriter: "/underwriter/adjudication",
  compliance: "/compliance/fraud",
  broker: "/broker/portal",
};
