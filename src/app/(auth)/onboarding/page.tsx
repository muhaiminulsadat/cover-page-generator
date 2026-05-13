import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";
import {OnboardingForm} from "@/components/forms/OnboardingForm";

export default async function OnboardingPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-background via-muted/30 to-background px-4 py-6 sm:px-6 sm:py-10 lg:py-16">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-5xl items-center justify-center">
        <OnboardingForm />
      </div>
    </div>
  );
}
