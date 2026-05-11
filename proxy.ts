import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/auth";

const PUBLIC_PATHS = ["/login", "/api/auth/login", "/api/auth/logout"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow static assets and public paths
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/img/") ||
    pathname.startsWith("/fonts/") ||
    PUBLIC_PATHS.some((path) => pathname === path)
  ) {
    return NextResponse.next();
  }

  const session = request.cookies.get("session")?.value;
  const payload = session ? await decrypt(session) : null;

  if (!payload) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from login page
  if (pathname === "/login") {
    return NextResponse.redirect(new URL("/entertainment", request.url));
  }

  return NextResponse.next();
}
