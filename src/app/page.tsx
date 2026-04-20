import Link from "next/link";
import {Button} from "@/components/ui/button";
import {ArrowRight, Layers, Zap, ShieldCheck, Code2} from "lucide-react";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {db} from "@/db";
import {user as userSchema} from "@/db/schema";
import {eq} from "drizzle-orm";
import {getTemplatesByMetadata, getAllTemplates} from "@/app/queries/template";
import {TemplateCard} from "@/components/ui-custom/TemplateCard";
import {Suspense} from "react";
import {Skeleton} from "@/components/ui/skeleton";

const FEATURES = [
  {
    icon: Zap,
    title: "Fast by default",
    description:
      "Built on Next.js App Router with server components and optimized rendering out of the box.",
  },
  {
    icon: ShieldCheck,
    title: "Auth ready",
    description:
      "Better Auth integrated with email/password and OAuth support. Sessions just work.",
  },
  {
    icon: Code2,
    title: "Great DX",
    description:
      "shadcn/ui components, Tailwind CSS, and TypeScript — a stack you'll actually enjoy.",
  },
];

function LandingPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] flex flex-col">
      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-muted text-muted-foreground text-xs font-mono tracking-wider uppercase mb-6">
          <Layers className="w-3.5 h-3.5" />
          Cover-Page Generator
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground max-w-2xl leading-tight">
          Standardized University Formats,{" "}
          <span className="text-muted-foreground">Generated instantly.</span>
        </h1>

        <p className="mt-5 text-muted-foreground text-base sm:text-lg max-w-md leading-relaxed">
          Save your academic details once, select your course template, and
          download a ready-to-print PDF Top Page.
        </p>

        <div className="flex items-center gap-3 mt-8 flex-wrap justify-center">
          <Button asChild size="lg">
            <Link href="/register">
              Get started <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/login">Sign in</Link>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border px-4 py-16">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          {FEATURES.map(({icon: Icon, title, description}) => (
            <div key={title} className="flex flex-col gap-3">
              <div className="w-9 h-9 rounded-md border border-border bg-muted flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-foreground" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return <LandingPage />;
  }

  const sessionUser = session.user;

  // Fetch user's completed profile metadata
  const [currentUser] = await db
    .select()
    .from(userSchema)
    .where(eq(userSchema.id, sessionUser.id));

  // Determine filtering: passing department/level/etc so user only sees templates aimed at them natively
  const templatesList = currentUser
    ? await getTemplatesByMetadata({
        department: currentUser.department,
        level: currentUser.level,
        term: currentUser.term,
      })
    : await getAllTemplates();

  return (
    <main className="w-full max-w-5xl mx-auto px-4 py-10">
      <div className="flex justify-between items-end mb-8 border-b pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Available Templates
          </h1>
          <p className="mt-2 text-muted-foreground">
            Showing cover page templates matches for{" "}
            {currentUser?.department || "your department"}.
          </p>
        </div>
        <Button asChild>
          <Link href="/templates/new">
            Create Template <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </div>

      {templatesList.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-lg bg-muted/50">
          <Layers className="w-10 h-10 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">
            No templates found for your department
          </h3>
          <p className="text-muted-foreground max-w-sm mx-auto mt-2">
            Be the first to create a template for your class. Your classmates
            will be able to reuse it instantly.
          </p>
          <Button asChild className="mt-6" variant="outline">
            <Link href="/templates/new">Create First Template</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templatesList.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      )}
    </main>
  );
}

function DashboardSkeleton() {
  return (
    <main className="w-full max-w-5xl mx-auto px-4 py-10">
      <div className="flex justify-between items-end mb-8 border-b pb-6">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-10 w-36" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl border bg-card text-card-foreground shadow pt-6 pb-4 px-6 h-48 space-y-4"
          >
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-10 w-full mt-[auto]" />
          </div>
        ))}
      </div>
    </main>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <Dashboard />
    </Suspense>
  );
}
