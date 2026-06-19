import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";
import {CreateTemplateForm} from "@/components/forms/CreateTemplateForm";
import {TemplateFormSkeleton} from "@/components/forms/TemplateFormSkeleton";
import {Suspense} from "react";

export default function NewTemplatePage() {
  return (
    <div className="flex h-full min-h-screen w-full items-center justify-center p-4 bg-muted/20 py-10">
      <Suspense fallback={<TemplateFormSkeleton />}>
        <NewTemplateContent />
      </Suspense>
    </div>
  );
}

async function NewTemplateContent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role === "student") {
    redirect("/dashboard");
  }

  return <CreateTemplateForm />;
}
