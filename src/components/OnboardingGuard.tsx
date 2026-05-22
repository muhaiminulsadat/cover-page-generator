"use client";

import {useEffect} from "react";
import {usePathname, useRouter} from "next/navigation";
import {authClient} from "@/lib/auth-client";

export default function OnboardingGuard() {
  const router = useRouter();
  const pathname = usePathname();
  const {data: session, isPending} = authClient.useSession();

  useEffect(() => {
    if (isPending) return;
    if (!session?.user) return;

    // Derive profile completion directly from the authClient session
    // avoiding heavy SWR network requests + DB bottleneck
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

    if (!profileComplete && pathname !== "/onboarding") {
      router.replace("/onboarding");
    }

    if (profileComplete && pathname === "/onboarding") {
      router.replace("/");
    }
  }, [isPending, session, pathname, router]);

  return null;
}
