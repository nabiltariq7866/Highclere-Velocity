import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ROLE_HOME } from "@/lib/routes";
import type { UserRole } from "@/lib/types";

const ROLES = ["executive", "operations", "underwriter", "compliance", "broker"] as const;

function isRole(value: string): value is UserRole {
  return ROLES.includes(value as (typeof ROLES)[number]);
}

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get("hcv_session");
  const roleCookie = request.cookies.get("hcv_role");
  const pathname = request.nextUrl.pathname;

  const isProtected = ROLES.some((role) => pathname.startsWith(`/${role}`));

  if (isProtected && !sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (sessionCookie && roleCookie) {
    const roleValue = roleCookie.value;
    if (!isRole(roleValue)) {
      return NextResponse.next();
    }
    const role = roleValue;
    const rolePrefix = `/${role}`;
    const isAllowed = pathname.startsWith(rolePrefix);

    if (pathname === rolePrefix || pathname === `${rolePrefix}/`) {
      return NextResponse.redirect(new URL(ROLE_HOME[role], request.url));
    }

    if (!isAllowed && pathname !== "/login") {
      return NextResponse.redirect(new URL(ROLE_HOME[role], request.url));
    }
  }

  if (pathname === "/login" && sessionCookie && roleCookie && isRole(roleCookie.value)) {
    return NextResponse.redirect(new URL(ROLE_HOME[roleCookie.value], request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
