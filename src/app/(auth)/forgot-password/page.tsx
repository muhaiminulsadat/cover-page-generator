import { Suspense } from "react";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { auth } from "@/lib/auth";
import { ForgotPasswordForm } from "./_components/ForgotPasswordForm";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

async function ForgotPasswordHeader() {
  "use cache";
  return (
    <CardHeader className="gap-4 p-0">
      <div className="flex flex-col gap-2">
        <CardTitle className="font-heading font-bold text-3xl tracking-tight text-foreground">
          Forgot password?
        </CardTitle>
        <CardDescription className="leading-relaxed text-muted-foreground text-sm">
          Enter your email address and we will send you a secure link to reset your password.
        </CardDescription>
      </div>
    </CardHeader>
  );
}

function FormSkeleton() {
  return (
    <div className="flex flex-col gap-4 mt-2 w-full">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-28 rounded-md" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
      <Skeleton className="h-10 w-full rounded-lg mt-2" />
    </div>
  );
}

async function ForgotPasswordFormWrapper() {
  const headersList = await headers();
  let session = null;
  try {
    session = await auth.api.getSession({
      headers: headersList,
    });
  } catch (error) {
    console.error("Session check failed:", error);
  }

  if (session?.user) {
    redirect("/dashboard");
  }

  return <ForgotPasswordForm />;
}

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center w-full relative overflow-hidden px-4">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-primary/5 dark:bg-primary/10 rounded-full blur-[100px] pointer-events-none z-0" />
      
      <main className="flex w-full max-w-md flex-col relative z-10 my-8">
        <Card className="bg-card/60 backdrop-blur-md shadow-xl border-border p-6 md:p-8 flex flex-col gap-6">
          <ForgotPasswordHeader />
          
          <CardContent className="p-0">
            <Suspense fallback={<FormSkeleton />}>
              <ForgotPasswordFormWrapper />
            </Suspense>
          </CardContent>

          <CardFooter className="flex-col gap-4 p-0">
            <div className="h-px bg-border/60 w-full" />
            <p className="text-center text-sm w-full">
              <Link
                className="group inline-flex items-center gap-1.5 font-medium text-muted-foreground hover:text-foreground transition-colors"
                href="/login"
              >
                <ArrowLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-1" />
                Back to log in
              </Link>
            </p>
          </CardFooter>
        </Card>

        <div className="rounded-xl bg-secondary/20 border border-border/50 flex mt-6 px-4 py-3 justify-center items-center gap-2">
          <ShieldCheck className="size-4 text-muted-foreground shrink-0" />
          <span className="text-muted-foreground text-xs font-medium">
            Your academic data stays private and secure.
          </span>
        </div>
      </main>
    </div>
  );
}

