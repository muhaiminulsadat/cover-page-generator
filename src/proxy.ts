import {betterFetch} from "@better-fetch/fetch";
import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";

export async function proxy(request: NextRequest) {
  const {data: session} = await betterFetch<{
    user: {
      id: string;
      email: string;
      studentId: string | null;
    };
  }>("/api/auth/get-session", {
    baseURL: request.nextUrl.origin,
    headers: {
      cookie: request.headers.get("cookie") || "",
    },
  });

  if (!session) {
    if (
      request.nextUrl.pathname.startsWith("/templates") ||
      request.nextUrl.pathname === "/onboarding"
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    const hasCompletedProfile = !!session.user.studentId;

    if (!hasCompletedProfile && request.nextUrl.pathname !== "/onboarding") {
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }

    if (hasCompletedProfile && request.nextUrl.pathname === "/onboarding") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/templates/:path*", "/onboarding"],
};
