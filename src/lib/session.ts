import type { SessionUser } from "@/lib/types";

export type { SessionUser };

export const setSessionCookies = (user: SessionUser) => {
  document.cookie = `hcv_session=mock_jwt; path=/; max-age=86400`;
  document.cookie = `hcv_role=${user.role}; path=/; max-age=86400`;
};

export const clearSessionCookies = () => {
  document.cookie = "hcv_session=; path=/; max-age=0";
  document.cookie = "hcv_role=; path=/; max-age=0";
};

export const getStoredRole = (): SessionUser["role"] | null => {
  const match = document.cookie.match(/(?:^|;\s*)hcv_role=([^;]+)/);
  return (match?.[1] as SessionUser["role"]) || null;
};
