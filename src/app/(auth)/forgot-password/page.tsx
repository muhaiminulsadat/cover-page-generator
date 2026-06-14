import {Suspense} from "react";
import {redirect} from "next/navigation";
import {headers} from "next/headers";
import Link from "next/link";
import {ArrowLeft, GraduationCap, ShieldCheck} from "lucide-react";
import {auth} from "@/lib/auth";
import {ForgotPasswordForm} from "./_components/ForgotPasswordForm";
import {Skeleton} from "@/components/ui/skeleton";

async function ForgotPasswordHeader() {
  "use cache";
  return (
    <div className="flex flex-col gap-4">
      <div className="inline-flex rounded-full bg-secondary/60 border border-border px-3 py-1 self-start items-center gap-2">
        <GraduationCap className="size-3.5 text-muted-foreground" />
        <span className="font-medium text-muted-foreground text-xs leading-4">
          For university students
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-3xl tracking-tight mt-2">
          Forgot password?
        </h1>
        <p className="leading-relaxed text-muted-foreground text-sm">
          Enter your email address and we will send you a secure link to reset your password.
        </p>
      </div>
    </div>
  );
}

function FormSkeleton() {
  return (
    <div className="flex flex-col gap-4 mt-8 w-full">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full" />
      </div>
      <Skeleton className="h-10 w-full mt-4" />
    </div>
  );
}

export default async function ForgotPasswordPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center w-full">
      <main className="flex px-6 py-12 flex-col w-full max-w-md mx-auto relative z-10">
        <ForgotPasswordHeader />
        
        <Suspense fallback={<FormSkeleton />}>
          <ForgotPasswordForm />
        </Suspense>

        <p className="text-center mt-6 text-muted-foreground text-sm">
          <Link
            className="inline-flex items-center gap-1.5 underline-offset-2 underline font-semibold text-foreground hover:text-primary"
            href="/login"
          >
            <ArrowLeft className="size-4" />
            Back to log in
          </Link>
        </p>

        <div className="rounded-lg bg-secondary/30 border border-border flex mt-8 px-4 py-3 justify-center items-center gap-2">
          <ShieldCheck className="size-4 text-muted-foreground" />
          <span className="text-muted-foreground text-xs">
            Your academic data stays private and secure.
          </span>
        </div>
      </main>
    </div>
  );
}
