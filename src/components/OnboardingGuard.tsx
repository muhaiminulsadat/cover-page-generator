"use client";

import {useEffect} from "react";
import {usePathname, useRouter} from "next/navigation";
import {authClient} from "@/lib/auth-client";

const PUBLIC_PATHS = ["/", "/login", "/register"];

function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.includes(pathname);
}

export default function OnboardingGuard() {
  const router = useRouter();
  const pathname = usePathname();
  const {data: session, isPending} = authClient.useSession();

  useEffect(() => {
    if (isPending) return;
    if (!session?.user) return;

    const user = session.user as Record<string, unknown>;
    const profileComplete = Boolean(
      user.studentId &&
      user.university &&
      user.department &&
      user.section &&
      user.subsection &&
      user.level &&
      user.term &&
      user.hscBatch,
    );

    if (!profileComplete) {
      if (pathname !== "/onboarding" && !isPublicPath(pathname)) {
        router.replace("/onboarding");
      }
      return;
    }

    if (profileComplete && pathname === "/onboarding") {
      router.replace("/dashboard");
    }
  }, [isPending, session, pathname, router]);

  return null;
}
