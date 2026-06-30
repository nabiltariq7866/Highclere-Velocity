import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ROLES = ["executive", "operations", "underwriter", "compliance", "broker"] as const;

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get("hcv_session");
  const roleCookie = request.cookies.get("hcv_role");
  const pathname = request.nextUrl.pathname;

  const isProtected = ROLES.some((role) => pathname.startsWith(`/${role}`));

  if (isProtected && !sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (sessionCookie && roleCookie) {
    const role = roleCookie.value;
    const allowed = ROLES.includes(role as (typeof ROLES)[number]);
    const rolePrefix = `/${role}`;
    const isAllowed = allowed && pathname.startsWith(rolePrefix);

    if (!isAllowed && pathname !== "/login") {
      return NextResponse.redirect(new URL(rolePrefix, request.url));
    }
  }

  if (pathname === "/login" && sessionCookie && roleCookie) {
    return NextResponse.redirect(new URL(`/${roleCookie.value}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
