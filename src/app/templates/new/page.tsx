import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";
import {CreateTemplateForm} from "@/components/forms/CreateTemplateForm";
import {Suspense} from "react";
import {Loader2} from "lucide-react";

export default function NewTemplatePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen w-full items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      }
    >
      <NewTemplateContent />
    </Suspense>
  );
}

async function NewTemplateContent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex h-full min-h-screen w-full items-center justify-center p-4 bg-muted/20 py-10">
      <CreateTemplateForm />
    </div>
  );
}
