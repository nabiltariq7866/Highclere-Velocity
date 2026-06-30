import type { SessionUser } from "@/lib/types";

export type { SessionUser };

const cookieFlags = () => {
  const secure = typeof window !== "undefined" && window.location.protocol === "https:" ? "; Secure" : "";
  return `; path=/; max-age=86400; SameSite=Lax${secure}`;
};

export const setSessionCookies = (user: SessionUser) => {
  const flags = cookieFlags();
  document.cookie = `hcv_session=mock_jwt${flags}`;
  document.cookie = `hcv_role=${user.role}${flags}`;
};

export const clearSessionCookies = () => {
  document.cookie = "hcv_session=; path=/; max-age=0";
  document.cookie = "hcv_role=; path=/; max-age=0";
};

export const getStoredRole = (): SessionUser["role"] | null => {
  const match = document.cookie.match(/(?:^|;\s*)hcv_role=([^;]+)/);
  return (match?.[1] as SessionUser["role"]) || null;
};
