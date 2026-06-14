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
import {ScrollReveal} from "@/components/home/HeroMotion";

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
      <div className="flex flex-col items-center justify-center text-center py-20 px-6 border border-border/80 bg-card/50 rounded-xl max-w-xl mx-auto shadow-xs">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-muted border border-border/80 text-muted-foreground mb-5 transition-transform duration-300 hover:scale-105">
          <Layers className="w-6 h-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          No templates found
        </h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-sm leading-relaxed">
          {userRole !== "student" 
            ? "Be the first to create a cover page template for your department. Your classmates can reuse it instantly."
            : "Ask your class representative or a moderator to create a template for this department."}
        </p>
        {userRole !== "student" && (
          <Button asChild className="mt-6 font-semibold" variant="outline">
            <Link href="/templates/new">Create First Template</Link>
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templatesList.map((template, index) => (
        <ScrollReveal key={template.id} delay={index * 0.05}>
          <TemplateCard
            template={template as never}
            userId={userId}
            userRole={userRole}
          />
        </ScrollReveal>
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
                className="flex flex-col rounded-xl border border-border/80 bg-card p-6 shadow-xs gap-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-4 w-20 rounded" />
                </div>
                <div className="space-y-3 flex-1">
                  <Skeleton className="h-6 w-3/4 rounded" />
                  <Skeleton className="h-4 w-1/2 rounded" />
                </div>
                <div className="flex items-center gap-2 pt-4 border-t border-border/60">
                  <Skeleton className="h-9 flex-1 rounded-md" />
                  <Skeleton className="h-9 w-9 rounded-md shrink-0" />
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
