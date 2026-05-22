"use client";

import {useEffect} from "react";
import {usePathname, useRouter} from "next/navigation";
import {authClient} from "@/lib/auth-client";
import useSWR from "swr";
import {fetcher} from "@/lib/fetcher";

export default function OnboardingGuard() {
  const router = useRouter();
  const pathname = usePathname();
  const {data: session, isPending} = authClient.useSession();

  const {data: dashboardData} = useSWR(
    session?.user && !isPending ? "/api/home/dashboard" : null,
    fetcher,
  );

  const profileComplete = dashboardData?.profileComplete;

  useEffect(() => {
    if (isPending) return;
    if (!session?.user) return;
    if (profileComplete === undefined || profileComplete === null) return; // unknown yet

    if (!profileComplete && pathname !== "/onboarding") {
      router.replace("/onboarding");
    }

    if (profileComplete && pathname === "/onboarding") {
      router.replace("/");
    }
  }, [isPending, session, profileComplete, pathname, router]);

  return null;
}
