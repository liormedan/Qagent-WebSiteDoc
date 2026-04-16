import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;

  if (pathname === "/docs/qagent") {
    const url = req.nextUrl.clone();
    url.pathname = "/docs/q-agent";
    return NextResponse.redirect(url, 308);
  }

  if (pathname.startsWith("/docs/qagent/")) {
    const suffix = pathname.replace("/docs/qagent", "");
    const url = req.nextUrl.clone();
    url.pathname = `/docs/q-agent${suffix}`;
    return NextResponse.redirect(url, 308);
  }

  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
