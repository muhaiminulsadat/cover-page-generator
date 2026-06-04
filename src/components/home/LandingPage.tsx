import Link from "next/link";
import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  CheckCheck,
  FileDown,
  FileText,
  Sparkles,
  UserCog,
} from "lucide-react";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

export async function LandingPage({
  heroCTA,
  footerCTA,
}: {
  heroCTA: React.ReactNode;
  footerCTA: React.ReactNode;
}) {
  return (
    <div className="w-full flex-1 flex flex-col justify-between">
      <main className="px-6 container mx-auto flex-1">
        {/* Hero Section */}
        <section className="flex pt-12 md:pt-20 pb-10 flex-col gap-6 items-center text-center">
          <div className="rounded-full bg-muted/60 border-border border flex px-4 py-1.5 items-center gap-2 w-fit transition-all duration-300 hover:bg-muted/80 hover:-translate-y-px hover:shadow-xs group/badge cursor-default">
            <Sparkles className="size-3.5 text-foreground transition-transform duration-500 group-hover/badge:rotate-12 group-hover/badge:scale-110" />
            <span className="font-medium text-foreground text-xs leading-4">
              Built for engineering students
            </span>
          </div>
          
          <h1 className="leading-tight font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight max-w-3xl font-heading">
            Stop reformatting your{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-foreground via-foreground/90 to-primary font-heading">
              lab submissions
            </span>{" "}
            by hand.
          </h1>
          
          <p className="text-muted-foreground text-base sm:text-lg leading-6 max-w-2xl mt-4 font-sans">
            Set up your academic profile once and instantly generate perfectly
            formatted, multi-page lab PDFs — Top Sheet, Cover Page, and Index —
            using shared course templates.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full sm:w-auto">
            {heroCTA}
          </div>
          
          {/* Main Hero Image with Floating Badge */}
          <div className="relative mt-12 w-full max-w-4xl mx-auto group/hero-img">
            {/* Ambient background glow */}
            <div className="absolute -inset-4 bg-linear-to-tr from-primary/10 to-transparent rounded-3xl blur-2xl -z-10 opacity-75 dark:opacity-40" />
            
            <div className="rounded-2xl border-border border overflow-hidden relative w-full h-75 sm:h-100 shadow-2xl transition-all duration-500 hover:border-primary/20">
              <Image
                alt="Student working"
                className="object-cover"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src="https://images.unsplash.com/photo-1758874384555-37d50c0ee81a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwc3R1ZHlpbmclMjB3aXRoJTIwbGFwdG9wJTIwZG9jdW1lbnRzJTIwZGVza3xlbnwxfDB8fHwxNzgwMTkyMTQyfDA&ixlib=rb-4.1.0&q=80&w=1080"
              />
            </div>
            
            {/* Floating Info Card */}
            <div className="shadow-xl rounded-xl bg-background/95 backdrop-blur-md border-border border flex items-center absolute -bottom-4 md:bottom-8 left-4 md:-left-6 p-4 gap-3 animate-float transition-all duration-300 hover:scale-[1.02] cursor-default">
              <div className="size-10 rounded-lg bg-primary text-primary-foreground flex justify-center items-center">
                <CheckCheck className="size-5" />
              </div>
              <div className="flex flex-col items-start">
                <span className="font-semibold text-sm leading-5">
                  PDF ready in seconds
                </span>
                <span className="text-muted-foreground text-xs leading-4 font-sans">
                  CSE-301 · Term 2 · Section A
                </span>
              </div>
            </div>
          </div>
          
          {/* Metrics Grid */}
          <div className="grid grid-cols-3 pt-16 md:pt-20 w-full max-w-3xl gap-4 md:gap-8">
            <div className="flex flex-col items-center p-4 rounded-2xl bg-muted/20 border border-transparent transition-all duration-300 hover:bg-muted/40 hover:border-border/50 hover:-translate-y-0.5 hover:shadow-xs cursor-default">
              <span className="font-bold text-2xl md:text-3xl leading-8 font-heading">
                3-in-1
              </span>
              <span className="text-muted-foreground text-xs md:text-sm mt-1 font-sans">
                Top, Cover & Index
              </span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-2xl bg-muted/20 border border-transparent transition-all duration-300 hover:bg-muted/40 hover:border-border/50 hover:-translate-y-0.5 hover:shadow-xs cursor-default">
              <span className="font-bold text-2xl md:text-3xl leading-8 font-heading">
                9 fields
              </span>
              <span className="text-muted-foreground text-xs md:text-sm mt-1 font-sans">
                Profile setup, once
              </span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-2xl bg-muted/20 border border-transparent transition-all duration-300 hover:bg-muted/40 hover:border-border/50 hover:-translate-y-0.5 hover:shadow-xs cursor-default">
              <span className="font-bold text-2xl md:text-3xl leading-8 font-heading">
                0 min
              </span>
              <span className="text-muted-foreground text-xs md:text-sm mt-1 font-sans">
                Manual formatting
              </span>
            </div>
          </div>
        </section>

        {/* Features Cards Section */}
        <section className="flex py-16 flex-col gap-10 items-center">
          <div className="flex flex-col gap-3 text-center max-w-2xl">
            <span className="font-medium text-primary text-sm leading-5 uppercase tracking-wider">
              Everything you need
            </span>
            <h2 className="font-bold text-3xl sm:text-4xl leading-tight tracking-tight font-heading">
              From profile to polished PDF
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg font-sans">
              CoverDe handles the repetitive work so you can focus on the actual
              lab report.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
            {/* Card 1 */}
            <Card className="group text-left w-full transition-all duration-300 hover:bg-muted/5 hover:-translate-y-1 hover:border-primary/20 hover:shadow-md">
              <CardHeader className="gap-4">
                <div className="size-12 rounded-lg bg-muted text-foreground flex justify-center items-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <UserCog className="size-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
                </div>
                <CardTitle className="text-xl font-heading">Set up once</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed font-sans">
                  Enter your name, student ID, university, department, section,
                  group, level, term and HSC batch a single time.
                </p>
              </CardContent>
            </Card>
            
            {/* Card 2 */}
            <Card className="group text-left w-full transition-all duration-300 hover:bg-muted/5 hover:-translate-y-1 hover:border-primary/20 hover:shadow-md">
              <CardHeader className="gap-4">
                <div className="size-12 rounded-lg bg-muted text-foreground flex justify-center items-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <Sparkles className="size-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
                </div>
                <CardTitle className="text-xl font-heading">Smart template feed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed font-sans">
                  Your dashboard surfaces only the course templates that match
                  your department, level and section automatically.
                </p>
              </CardContent>
            </Card>
            
            {/* Card 3 */}
            <Card className="group text-left w-full transition-all duration-300 hover:bg-muted/5 hover:-translate-y-1 hover:border-primary/20 hover:shadow-md">
              <CardHeader className="gap-4">
                <div className="size-12 rounded-lg bg-primary text-primary-foreground flex justify-center items-center transition-all duration-300 group-hover:scale-105">
                  <FileDown className="size-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
                </div>
                <CardTitle className="text-xl font-heading">Preview & download</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed font-sans">
                  Preview the finalized multi-page document in-browser, then
                  download your formatted submission PDF instantly.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Steps Flow Section */}
        <section className="py-16">
          <div className="rounded-3xl bg-muted border-border border p-8 sm:p-12 flex flex-col gap-10 items-center w-full max-w-4xl mx-auto">
            <h2 className="font-bold text-center text-3xl leading-tight tracking-tight font-heading">
              Three steps to a perfect submission
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 w-full">
              {/* Step 1 */}
              <div className="group/step text-center flex flex-col items-center gap-3 flex-1 p-5 rounded-2xl transition-all duration-300 hover:bg-background/40 hover:shadow-xs">
                <div className="size-14 ring-8 ring-background/60 font-bold rounded-full bg-background text-xl border-border border flex justify-center items-center transition-all duration-300 group-hover/step:ring-primary/10 group-hover/step:border-primary/30 group-hover/step:scale-105 font-heading">
                  1
                </div>
                <h3 className="font-semibold text-lg mt-2 font-heading">
                  Complete your profile
                </h3>
                <p className="text-muted-foreground text-sm font-sans">
                  Fill in your academic metadata during quick onboarding.
                </p>
              </div>
              
              <ArrowRight className="size-6 text-muted-foreground hidden md:block -mt-8" />
              <ArrowDown className="size-6 text-muted-foreground md:hidden" />
              
              {/* Step 2 */}
              <div className="group/step text-center flex flex-col items-center gap-3 flex-1 p-5 rounded-2xl transition-all duration-300 hover:bg-background/40 hover:shadow-xs">
                <div className="size-14 ring-8 ring-background/60 font-bold rounded-full bg-background text-xl border-border border flex justify-center items-center transition-all duration-300 group-hover/step:ring-primary/10 group-hover/step:border-primary/30 group-hover/step:scale-105 font-heading">
                  2
                </div>
                <h3 className="font-semibold text-lg mt-2 font-heading">Pick a template</h3>
                <p className="text-muted-foreground text-sm font-sans">
                  Choose a matched course template from your smart feed.
                </p>
              </div>
              
              <ArrowRight className="size-6 text-muted-foreground hidden md:block -mt-8" />
              <ArrowDown className="size-6 text-muted-foreground md:hidden" />
              
              {/* Step 3 */}
              <div className="group/step text-center flex flex-col items-center gap-3 flex-1 p-5 rounded-2xl transition-all duration-300 hover:bg-background/40 hover:shadow-xs">
                <div className="size-14 ring-8 ring-primary/10 font-bold rounded-full bg-primary text-primary-foreground text-xl flex justify-center items-center shadow-md transition-all duration-300 group-hover/step:ring-primary/20 group-hover/step:scale-105 font-heading">
                  3
                </div>
                <h3 className="font-semibold text-lg mt-2 font-heading">Download PDF</h3>
                <p className="text-muted-foreground text-sm font-sans">
                  Preview and grab your fully formatted submission.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Call-To-Action (CTA) */}
        <section className="py-16 pb-24">
          <div className="text-center rounded-3xl bg-primary text-primary-foreground flex p-10 sm:p-16 flex-col items-center gap-6 w-full max-w-4xl mx-auto relative overflow-hidden border border-primary-foreground/5 shadow-2xl">
            {/* Premium pattern backing */}
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,currentColor_1.5px,transparent_1.5px)] bg-size-[24px_24px]"></div>
            
            <h2 className="font-bold text-3xl sm:text-4xl leading-tight tracking-tight relative z-10 max-w-xl font-heading">
              Ready to never format a cover page again?
            </h2>
            <p className="text-primary-foreground/80 text-base sm:text-lg mb-4 relative z-10 font-sans">
              Join engineering students generating clean lab submissions in
              seconds.
            </p>
            {footerCTA}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-border border-t pt-8 pb-12 mt-auto">
        <div className="flex px-6 flex-col items-center gap-6 container mx-auto">
          <div className="flex items-center gap-2 group cursor-default">
            <div className="size-8 rounded-lg bg-primary text-primary-foreground flex justify-center items-center transition-transform duration-300 group-hover:scale-105">
              <FileText className="size-4" />
            </div>
            <span className="font-semibold text-base font-heading">CoverDe</span>
          </div>
          
          <div className="text-muted-foreground text-sm flex flex-wrap justify-center items-center gap-6">
            <Link href="/" className="hover:text-primary transition-all duration-200 hover:-translate-y-px">
              Privacy
            </Link>
            <Link href="/" className="hover:text-primary transition-all duration-200 hover:-translate-y-px">
              Terms
            </Link>
            <Link href="/" className="hover:text-primary transition-all duration-200 hover:-translate-y-px">
              Contact
            </Link>
          </div>
          
          <span className="text-center text-muted-foreground text-xs font-sans">
            © 2026 CoverDe. Made for students.
          </span>
        </div>
      </footer>
    </div>
  );
}
