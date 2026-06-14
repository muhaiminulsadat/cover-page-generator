import {Suspense} from "react";
import {redirect} from "next/navigation";
import {headers} from "next/headers";
import {auth} from "@/lib/auth";
import {ResetPasswordForm} from "./_components/ResetPasswordForm";
import {Skeleton} from "@/components/ui/skeleton";

interface PageProps {
  searchParams: Promise<{
    token?: string;
  }>;
}

function ResetFormSkeleton() {
  return (
    <div className="flex px-6 py-12 flex-col w-full max-w-md mx-auto gap-6">
      <div className="flex flex-col gap-4">
        <Skeleton className="h-6 w-32 rounded-full" />
        <Skeleton className="h-10 w-48 mt-2" />
        <Skeleton className="h-4 w-full" />
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-4 w-24 mt-2" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full mt-4" />
      </div>
    </div>
  );
}

export default async function ResetPasswordPage({searchParams}: PageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    redirect("/dashboard");
  }

  const params = await searchParams;
  const token = params.token ?? null;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center w-full">
      <Suspense fallback={<ResetFormSkeleton />}>
        <ResetPasswordForm token={token} />
      </Suspense>
    </div>
  );
}
