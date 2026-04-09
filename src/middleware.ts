import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/docs/qagent") {
    const url = request.nextUrl.clone();
    url.pathname = "/docs/q-agent";
    return NextResponse.redirect(url, 308);
  }

  if (pathname.startsWith("/docs/qagent/")) {
    const suffix = pathname.replace("/docs/qagent", "");
    const url = request.nextUrl.clone();
    url.pathname = `/docs/q-agent${suffix}`;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/docs/qagent", "/docs/qagent/:path*"],
};
