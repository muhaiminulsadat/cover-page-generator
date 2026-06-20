import {getTemplateById} from "@/lib/queries/template";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {notFound, redirect} from "next/navigation";
import {EditTemplateForm} from "@/components/forms/EditTemplateForm";
import {TemplateFormSkeleton} from "@/components/forms/TemplateFormSkeleton";
import {Suspense} from "react";
import {DEFAULT_COVER_PAGE_DESIGN} from "@/lib/constants/cover-designs";

export default async function EditTemplatePage({
  params,
}: {
  params: Promise<{id: string}>;
}) {
  const {id} = await params;

  return (
    <div className="flex h-full min-h-screen w-full items-center justify-center p-4 bg-muted/20 py-10">
      <Suspense fallback={<TemplateFormSkeleton isEdit />}>
        <EditTemplate id={id} />
      </Suspense>
    </div>
  );
}

async function EditTemplate({id}: {id: string}) {
  try {
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

    const isOwner = template.createdBy === session.user.id;
    const isSuperadmin = session.user.role === "superadmin";

    if (!isOwner && !isSuperadmin) {
      return redirect(`/templates/${id}`);
    }

    return (
      <EditTemplateForm
        template={{
          ...template,
          coverDesignId: template.coverDesignId ?? DEFAULT_COVER_PAGE_DESIGN,
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
    );
  } catch (error) {
    console.error("Error in EditTemplate:", error);
    throw error;
  }
}
