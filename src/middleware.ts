import { NextRequest, NextResponse } from "next/server";

function hasValidBasicAuth(request: NextRequest) {
  const user = process.env.SITE_AUTH_USER;
  const pass = process.env.SITE_AUTH_PASSWORD;

  if (!user || !pass) return true;

  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Basic ")) return false;

  const encoded = authHeader.slice(6);
  let decoded = "";

  try {
    decoded = atob(encoded);
  } catch {
    return false;
  }

  const separatorIndex = decoded.indexOf(":");
  if (separatorIndex === -1) return false;

  const providedUser = decoded.slice(0, separatorIndex);
  const providedPass = decoded.slice(separatorIndex + 1);

  return providedUser === user && providedPass === pass;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!hasValidBasicAuth(request)) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="WaveQ Docs", charset="UTF-8"',
      },
    });
  }

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
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
