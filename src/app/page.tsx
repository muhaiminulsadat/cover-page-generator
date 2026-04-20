import Link from "next/link";
import {Button} from "@/components/ui/button";
import {ArrowRight, Layers, Zap, ShieldCheck, Code2} from "lucide-react";

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

export default function HomePage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] flex flex-col">
      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-muted text-muted-foreground text-xs font-mono tracking-wider uppercase mb-6">
          <Layers className="w-3.5 h-3.5" />
          Next.js Starter
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground max-w-2xl leading-tight">
          Ship your next idea{" "}
          <span className="text-muted-foreground">faster than ever.</span>
        </h1>

        <p className="mt-5 text-muted-foreground text-base sm:text-lg max-w-md leading-relaxed">
          A production-ready starter with auth, a component library, and a clean
          structure — so you can focus on what matters.
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
