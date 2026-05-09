import {betterFetch} from "@better-fetch/fetch";
import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import {hasCompletedProfile} from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const {data: session} = await betterFetch<{
    user: {
      id: string;
      email: string;
      studentId: string | null;
      university: string | null;
      department: string | null;
      section: string | null;
      subsection: string | null;
      level: string | null;
      term: string | null;
      hscBatch: string | null;
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
    const profileComplete = hasCompletedProfile(session.user);

    if (!profileComplete && request.nextUrl.pathname !== "/onboarding") {
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }

    if (profileComplete && request.nextUrl.pathname === "/onboarding") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/templates/:path*", "/onboarding"],
};
