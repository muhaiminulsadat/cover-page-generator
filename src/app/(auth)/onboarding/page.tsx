import {OnboardingForm} from "@/components/forms/OnboardingForm";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background via-muted/30 to-background px-4 py-6 sm:px-6 sm:py-10 lg:py-16">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-5xl items-center justify-center">
        <OnboardingForm />
      </div>
    </div>
  );
}
