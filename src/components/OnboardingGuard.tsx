"use client";

import {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {authClient} from "@/lib/auth-client";

export default function OnboardingGuard() {
  const router = useRouter();
  const pathname = usePathname();
  const {data: session, isPending} = authClient.useSession();
  const [profileComplete, setProfileComplete] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function check() {
      if (!session?.user) {
        setProfileComplete(null);
        return;
      }

      try {
        const res = await fetch("/api/home/dashboard", {cache: "no-store"});
        if (!res.ok) {
          setProfileComplete(null);
          return;
        }
        const data = await res.json();
        if (!cancelled) setProfileComplete(Boolean(data.profileComplete));
      } catch {
        if (!cancelled) setProfileComplete(null);
      }
    }

    void check();

    return () => {
      cancelled = true;
    };
  }, [session]);

  useEffect(() => {
    if (isPending) return;
    if (!session?.user) return;
    if (profileComplete === null) return; // unknown yet

    if (!profileComplete && pathname !== "/onboarding") {
      router.replace("/onboarding");
    }

    if (profileComplete && pathname === "/onboarding") {
      router.replace("/");
    }
  }, [isPending, session, profileComplete, pathname, router]);

  return null;
}
