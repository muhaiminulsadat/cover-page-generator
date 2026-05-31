import {getTemplateById} from "@/lib/queries/template";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {notFound, redirect} from "next/navigation";
import {CoverPageWebPreview} from "@/components/pdf/CoverPageWebPreview";
import {ArrowLeft, Edit} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Suspense} from "react";
import {Skeleton} from "@/components/ui/skeleton";
import {Badge} from "@/components/ui/badge";
import {
  COVER_PAGE_DESIGN_LABELS,
  DEFAULT_COVER_PAGE_DESIGN,
} from "@/lib/constants/cover-designs";
import {
  DEFAULT_TOP_SHEET_DESIGN,
  TOP_SHEET_DESIGN_LABELS,
} from "@/lib/constants/top-sheet-designs";

interface PageProps {
  params: Promise<{id: string}>;
}

export default function TemplatePreviewPage(props: PageProps) {
  return (
    <Suspense fallback={<PreviewSkeleton />}>
      <TemplatePreview params={props.params} />
    </Suspense>
  );
}

async function TemplatePreview({params}: {params: Promise<{id: string}>}) {
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

  return (
    <main className="w-full max-w-5xl mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Button variant="ghost" asChild className="-ml-4 sm:ml-0">
          <Link href="/dashboard">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:text-right w-full sm:w-auto">
          <div className="text-left sm:text-right">
            <h1 className="text-xl font-bold tracking-tight">
              {template.courseNumber}
            </h1>
            <p className="text-sm text-muted-foreground">
              {template.courseTitle}
            </p>
            <div className="mt-2 flex flex-wrap gap-2 sm:justify-end">
              <Badge variant="secondary">
                {TOP_SHEET_DESIGN_LABELS[
                  template.designId || DEFAULT_TOP_SHEET_DESIGN
                ] || TOP_SHEET_DESIGN_LABELS[DEFAULT_TOP_SHEET_DESIGN]}
              </Badge>
              <Badge variant="outline">
                {COVER_PAGE_DESIGN_LABELS[
                  template.coverDesignId || DEFAULT_COVER_PAGE_DESIGN
                ] || COVER_PAGE_DESIGN_LABELS[DEFAULT_COVER_PAGE_DESIGN]}
              </Badge>
            </div>
          </div>
          {template.createdBy === session.user.id && (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="w-full sm:w-auto"
            >
              <Link href={`/templates/${id}/edit`}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Template
              </Link>
            </Button>
          )}
        </div>
      </div>
      <CoverPageWebPreview template={template} user={session.user} />
    </main>
  );
}

function PreviewSkeleton() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
        <Skeleton className="h-10 w-full sm:w-40" />
        <div className="space-y-2 flex flex-col items-start sm:items-end w-full sm:w-auto">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <Skeleton className="h-200 w-full rounded-xl" />
    </div>
  );
}
