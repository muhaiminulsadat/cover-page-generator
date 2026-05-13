"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {authClient} from "@/lib/auth-client";
import {OnboardingForm} from "@/components/forms/OnboardingForm";
import {Loader2} from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const {data: session, isPending} = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace("/login");
    }
  }, [isPending, router, session]);

  if (isPending) {
    return <OnboardingPageSkeleton />;
  }

  if (!session?.user) {
    return <OnboardingPageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-background via-muted/30 to-background px-4 py-6 sm:px-6 sm:py-10 lg:py-16">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-5xl items-center justify-center">
        <OnboardingForm />
      </div>
    </div>
  );
}

function OnboardingPageSkeleton() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background via-muted/30 to-background px-4 py-6 sm:px-6 sm:py-10 lg:py-16">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-5xl items-center justify-center">
        <div className="flex h-96 w-full max-w-2xl items-center justify-center rounded-2xl border border-border bg-card/80 shadow-sm">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}
