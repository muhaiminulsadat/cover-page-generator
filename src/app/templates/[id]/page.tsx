import {getTemplateById} from "@/app/queries/template";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {db} from "@/db";
import {user as userSchema} from "@/db/schema";
import {eq} from "drizzle-orm";
import {notFound, redirect} from "next/navigation";
import {CoverPageWebPreview} from "@/components/pdf/CoverPageWebPreview";
import {ArrowLeft} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Suspense} from "react";
import {Skeleton} from "@/components/ui/skeleton";

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

  const [currentUser] = await db
    .select()
    .from(userSchema)
    .where(eq(userSchema.id, session.user.id));

  const template = await getTemplateById(id);

  if (!template) {
    return notFound();
  }

  return (
    <main className="w-full max-w-5xl mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <Button variant="ghost" asChild>
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
        <div className="text-right">
          <h1 className="text-xl font-bold tracking-tight">
            {template.courseNumber}
          </h1>
          <p className="text-sm text-muted-foreground">
            {template.courseTitle}
          </p>
        </div>
      </div>
      <CoverPageWebPreview template={template} user={currentUser} />
    </main>
  );
}

function PreviewSkeleton() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-40" />
        <div className="space-y-2 flex flex-col items-end">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <Skeleton className="h-[800px] w-full rounded-xl" />
    </div>
  );
}
