import {getTemplateById} from "@/lib/queries/template";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {notFound, redirect} from "next/navigation";
import {EditTemplateForm} from "@/components/forms/EditTemplateForm";
import {Suspense} from "react";
import {Loader2} from "lucide-react";
import {DEFAULT_COVER_PAGE_DESIGN} from "@/lib/constants/cover-designs";

export default function EditTemplatePage({
  params,
}: {
  params: Promise<{id: string}>;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      }
    >
      <EditTemplate params={params} />
    </Suspense>
  );
}

async function EditTemplate({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return redirect("/login");
  }

  const template = await getTemplateById(id);

  if (!template) {
    return notFound();
  }

  if (template.createdBy !== session.user.id) {
    return redirect(`/templates/${id}`);
  }

  return (
    <div className="flex h-full min-h-screen w-full items-center justify-center p-4 bg-muted/20 py-10">
      <EditTemplateForm
        template={{
          ...template,
          coverDesignId: template.coverDesignId ?? DEFAULT_COVER_PAGE_DESIGN,
          experimentName: template.experimentName ?? undefined,
          departmentTarget: template.departmentTarget ?? undefined,
          levelTarget: template.levelTarget ?? undefined,
          termTarget: template.termTarget ?? undefined,
          sectionTarget: template.sectionTarget ?? undefined,
          subsectionTarget: template.subsectionTarget ?? undefined,
          hscBatchTarget: template.hscBatchTarget ?? undefined,
          teacher2Name: template.teacher2Name ?? undefined,
          teacher2Designation: template.teacher2Designation ?? undefined,
        }}
      />
    </div>
  );
}
