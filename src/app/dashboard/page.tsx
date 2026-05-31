import {Suspense} from "react";
import {redirect} from "next/navigation";
import {headers} from "next/headers";
import {auth} from "@/lib/auth";
import {getTemplatesByMetadata} from "@/lib/queries/template";
import {getDepartmentLabel} from "@/lib/constants/departments";
import {
  normalizeSectionCode,
  normalizeSubsectionCode,
} from "@/lib/constants/levels";
import {Skeleton} from "@/components/ui/skeleton";
import Link from "next/link";
import {ArrowRight, Layers} from "lucide-react";
import {Button} from "@/components/ui/button";
import {TemplateCard} from "@/components/ui-custom/TemplateCard";
import {cacheLife, cacheTag} from "next/cache";

async function DashboardGrid({
  department,
  level,
  term,
  section,
  subsection,
  hscBatch,
  userId,
  userRole,
}: {
  department: string;
  level: string;
  term: string;
  section: string;
  subsection: string;
  hscBatch: string;
  userId: string;
  userRole: string;
}) {
  "use cache: remote";
  cacheLife("hours");
  cacheTag(`templates-${department}-${level}`);
  cacheTag("templates");

  const templatesList = await getTemplatesByMetadata({
    department,
    level,
    term,
    section: normalizeSectionCode(section),
    subsection: normalizeSubsectionCode(subsection),
    hscBatch,
  });

  if (templatesList.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed rounded-lg bg-muted/50">
        <Layers className="w-10 h-10 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">
          No templates found for your department
        </h3>
        <p className="text-muted-foreground max-w-sm mx-auto mt-2">
          {userRole !== "student" 
            ? "Be the first to create a template for your class. Your classmates will be able to reuse it instantly."
            : "Ask your class representative or a moderator to create a template for this class."}
        </p>
        {userRole !== "student" && (
          <Button asChild className="mt-6" variant="outline">
            <Link href="/templates/new">Create First Template</Link>
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templatesList.map((template) => (
        <TemplateCard
          key={template.id}
          template={template as never}
          userId={userId}
          userRole={userRole}
        />
      ))}
    </div>
  );
}

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user;
  const profileComplete = Boolean(
    user.studentId &&
    user.university &&
    user.department &&
    user.section &&
    user.subsection &&
    user.level &&
    user.term &&
    user.hscBatch,
  );

  if (!profileComplete) {
    redirect("/onboarding");
  }

  const departmentLabel = user.department
    ? getDepartmentLabel(user.department)
    : "your department";

  return (
    <main className="w-full max-w-5xl mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 border-b pb-6 gap-4 sm:gap-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Available Templates
          </h1>
          <p className="mt-2 text-muted-foreground">
            Showing top sheet templates for {departmentLabel}.
          </p>
        </div>
        {user.role !== "student" && (
          <Button asChild className="w-full sm:w-auto">
            <Link href="/templates/new">
              Create Template <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        )}
      </div>

      <Suspense
        fallback={
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({length: 6}).map((_, i) => (
              <div
                key={i}
                className="flex flex-col space-y-4 rounded-xl border border-border p-6 shadow-sm"
              >
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-4 w-[100px]" />
                  </div>
                </div>
                <div className="space-y-2 pt-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </div>
            ))}
          </div>
        }
      >
        <DashboardGrid
          department={user.department as string}
          level={user.level as string}
          term={user.term as string}
          section={user.section as string}
          subsection={user.subsection as string}
          hscBatch={user.hscBatch as string}
          userId={user.id}
          userRole={user.role as string}
        />
      </Suspense>
    </main>
  );
}
