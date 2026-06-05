import Link from "next/link";
import {FileText, Download, LayoutTemplate, Zap} from "lucide-react";
import {cn} from "@/lib/utils";
import {FadeIn} from "@/components/home/FadeIn";
import {FadeUp, ScrollReveal} from "@/components/home/HeroMotion";

interface LandingPageProps {
  heroCTA: React.ReactNode;
  footerCTA: React.ReactNode;
}

function DocumentPreview() {
  return (
    <div className="relative w-full max-w-[280px] sm:max-w-[320px] mx-auto py-8 [perspective:1200px] group/stack">
      <div className="relative w-full aspect-[1/1.3] [transform-style:preserve-3d] transition-transform duration-500 ease-out">
        <div className="absolute inset-0 rounded-2xl border border-border/80 bg-muted/40 backdrop-blur-xs shadow-md transition-all duration-500 ease-out origin-center translate-z-[-20px] -rotate-6 -translate-x-6 translate-y-6 opacity-60 group-hover/stack:-rotate-12 group-hover/stack:-translate-x-12 group-hover/stack:translate-y-12 group-hover/stack:opacity-80 flex flex-col justify-between p-4 select-none">
          <div className="space-y-2">
            <div className="h-1.5 w-1/3 bg-muted-foreground/30 rounded" />
            <div className="h-2 w-full bg-muted-foreground/15 rounded" />
            <div className="h-px bg-border my-2" />
            <div className="space-y-1">
              <div className="h-1.5 w-3/4 bg-muted-foreground/10 rounded" />
              <div className="h-1.5 w-5/6 bg-muted-foreground/10 rounded" />
              <div className="h-1.5 w-1/2 bg-muted-foreground/10 rounded" />
            </div>
          </div>
          <span className="text-[7px] font-mono text-muted-foreground/60 uppercase self-end">
            Index Page
          </span>
        </div>

        <div className="absolute inset-0 rounded-2xl border border-border/80 bg-muted/60 backdrop-blur-xs shadow-lg transition-all duration-500 ease-out origin-center translate-z-[-10px] rotate-3 translate-x-6 -translate-y-3 opacity-80 group-hover/stack:rotate-8 group-hover/stack:translate-x-12 group-hover/stack:-translate-y-6 group-hover/stack:opacity-95 flex flex-col justify-between p-4 select-none">
          <div className="space-y-3">
            <div className="size-6 rounded-full border border-border bg-background mx-auto flex items-center justify-center">
              <span className="size-2 rounded-full bg-primary/20" />
            </div>
            <div className="space-y-1.5">
              <div className="h-2 w-1/2 bg-muted-foreground/20 rounded mx-auto" />
              <div className="h-1.5 w-3/4 bg-muted-foreground/10 rounded mx-auto" />
            </div>
          </div>
          <span className="text-[7px] font-mono text-muted-foreground/60 uppercase self-end">
            Cover Page
          </span>
        </div>

        <div className="absolute inset-0 rounded-2xl border border-border bg-card shadow-2xl transition-all duration-500 ease-out origin-center translate-z-0 -rotate-1 group-hover/stack:rotate-2 group-hover/stack:scale-[1.03] group-hover/stack:shadow-primary/5 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-3.5 py-2 bg-muted/40 border-b border-border select-none">
            <div className="flex items-center gap-1.2">
              <span className="size-2 rounded-full bg-red-400/60" />
              <span className="size-2 rounded-full bg-yellow-400/60" />
              <span className="size-2 rounded-full bg-green-400/60" />
            </div>
            <span className="text-[9px] font-mono text-muted-foreground/85 tracking-tight">
              CE320_TopSheet.pdf
            </span>
            <span className="flex items-center gap-1 text-[8px] font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="size-1.2 rounded-full bg-emerald-500 animate-pulse" />
              Print ready
            </span>
          </div>

          <div className="p-5 bg-card flex-1 flex flex-col justify-between select-none">
            <div className="text-center">
              <p className="text-[6px] font-bold text-foreground uppercase tracking-[0.14em] leading-[1.6]">
                Bangladesh University of Engineering
                <br />
                and Technology
              </p>
              <p className="text-[5px] text-muted-foreground mt-0.5 uppercase tracking-wider">
                Dhaka — 1000
              </p>
            </div>

            <div className="h-px bg-border my-2" />

            <div className="text-center my-1">
              <p className="text-[8px] font-black text-primary uppercase tracking-[0.18em]">
                CE 320
              </p>
              <p className="text-[7.5px] font-bold text-foreground mt-0.5 leading-snug">
                Steel Structure Design Sessional
              </p>
              <div className="my-1.5 flex flex-col items-center gap-0.5">
                <span className="text-[5px] font-semibold text-muted-foreground uppercase tracking-widest">
                  Experiment No. 04
                </span>
                <span className="text-[6.5px] font-semibold text-foreground text-center">
                  Tension Member Analysis
                </span>
              </div>
            </div>

            <div className="h-px bg-border my-2" />

            <div className="space-y-1">
              {[
                ["Submitted by", "Muhaiminul Sadat"],
                ["Student ID", "2104001"],
                ["Section / Group", "A1 · Group 03"],
                ["Submitted to", "Prof. Dr. Tanvir Ahmed"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-2"
                >
                  <span className="text-[5.5px] text-muted-foreground shrink-0">
                    {label}
                  </span>
                  <span className="text-[5.5px] font-semibold text-foreground text-right truncate">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div className="h-px bg-border my-2" />

            <div className="flex justify-between items-center text-[5px] text-muted-foreground mt-1">
              <span>Date: 06 June 2026</span>
              <span className="font-mono">Page 1 of 3</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -top-1 -right-4 rounded-xl border border-border bg-card/90 backdrop-blur-md shadow-lg px-2.5 py-1.5 flex items-center gap-1.5 transition-transform duration-300 group-hover/stack:scale-105 select-none">
        <Zap className="size-3 text-emerald-500 animate-pulse" />
        <span className="text-[9px] font-mono font-medium text-foreground">
          3 pages PDF ready
        </span>
      </div>
    </div>
  );
}

interface StepItem {
  n: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const steps: StepItem[] = [
  {
    n: "01",
    icon: <Zap className="size-4" />,
    title: "Complete your profile",
    desc: "Fill in name, student ID, department, and section once. They sync to all sheets.",
  },
  {
    n: "02",
    icon: <LayoutTemplate className="size-4" />,
    title: "Pick a template",
    desc: "Your course templates appear automatically filtered by department and term.",
  },
  {
    n: "03",
    icon: <Download className="size-4" />,
    title: "Download your PDF",
    desc: "Preview A4 sheets in-browser and download top sheets, covers, and indexes.",
  },
];

export async function LandingPage({heroCTA, footerCTA}: LandingPageProps) {
  return (
    <div className="w-full flex-1 flex flex-col">
      <main>
        <section className="relative overflow-hidden pt-16 md:pt-24 pb-16 md:pb-20">
          <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-[size:24px_24px] opacity-70 [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)] pointer-events-none" />
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-56 size-[700px] rounded-full bg-primary/[0.04] blur-[120px]" />
            <div className="absolute top-1/2 -left-48 size-[500px] rounded-full bg-primary/[0.03] blur-[100px]" />
          </div>

          <div className="relative px-6 container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
              <FadeUp
                delay={0}
                className="flex flex-col gap-6 items-center text-center lg:items-start lg:text-left mx-auto lg:mx-0 max-w-xl"
              >
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-3 py-1.5 text-[11px] font-semibold text-muted-foreground tracking-wide">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500"></span>
                  </span>
                  BUET Lab Report Companion
                </span>

                <h1 className="text-[2.2rem] sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight leading-[1.08] font-heading">
                  Lab cover pages, <br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/50 bg-clip-text text-transparent">
                    formatted instantly.
                  </span>
                </h1>

                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-[42ch]">
                  Set up your student profile once. Generate academic-standard
                  top sheets, cover pages, and index sheets in 30 seconds.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center lg:justify-start">
                  {heroCTA}
                </div>

                <p className="text-xs text-muted-foreground">
                  A4 Print-ready PDF · Built for university standards
                </p>
              </FadeUp>

              <FadeIn
                delay={0.2}
                className="w-full max-w-[300px] sm:max-w-[340px] mx-auto lg:ml-auto lg:mr-0"
              >
                <DocumentPreview />
              </FadeIn>
            </div>
          </div>
        </section>

        <div className="border-t border-b border-border/40 py-5 bg-muted/5 select-none relative overflow-hidden w-full">
          <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <div className="flex w-max items-center animate-marquee hover:[animation-play-state:paused] gap-6 will-change-transform">
            {[
              "CE · Civil Engineering",
              "CSE · Computer Science",
              "EEE · Electrical & Electronic",
              "ME · Mechanical",
              "IPE · Industrial & Production",
              "ChE · Chemical",
              "WRE · Water Resources",
              "NAME · Naval Architecture",
            ].concat([
              "CE · Civil Engineering",
              "CSE · Computer Science",
              "EEE · Electrical & Electronic",
              "ME · Mechanical",
              "IPE · Industrial & Production",
              "ChE · Chemical",
              "WRE · Water Resources",
              "NAME · Naval Architecture",
            ]).map((dept, idx) => (
              <span
                key={idx}
                className="px-3.5 py-2 rounded-xl bg-card border border-border/70 text-[10px] font-mono font-semibold text-muted-foreground tracking-wide flex items-center gap-2 shadow-2xs hover:border-primary/20 hover:text-foreground transition-colors duration-200"
              >
                <span className="size-1.5 rounded-full bg-primary/30 animate-pulse" />
                {dept}
              </span>
            ))}
          </div>
        </div>

        <section className="px-6 container mx-auto py-16 md:py-20">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight font-heading">
                Three steps to done.
              </h2>
              <p className="text-muted-foreground mt-3 text-sm sm:text-base max-w-sm mx-auto">
                No MS Word layout shifts. Simple form fields. Single click
                compile.
              </p>
            </ScrollReveal>

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {steps.map((step, i) => (
                <ScrollReveal
                  key={step.n}
                  delay={i * 0.08}
                  className="group relative bg-card hover:bg-muted/5 border border-border hover:border-primary/20 rounded-lg p-6 flex flex-col justify-between h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-primary/[0.01] cursor-default"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-black font-mono text-muted-foreground/15 group-hover:text-primary/10 transition-colors">
                        {step.n}
                      </span>
                      <div className="size-9 rounded-xl bg-muted border border-border flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                        {step.icon}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="font-bold text-base font-heading text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 container mx-auto pb-16 md:pb-20">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <ScrollReveal
                delay={0}
                className="md:col-span-2 rounded-lg border border-border hover:border-primary/20 p-6 sm:p-8 flex flex-col justify-between bg-muted/5 hover:bg-muted/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-primary/[0.01] cursor-default"
              >
                <div className="flex flex-col gap-4">
                  <div className="size-10 rounded-xl bg-muted border border-border flex items-center justify-center text-foreground">
                    <LayoutTemplate className="size-4" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-base sm:text-lg font-heading text-foreground">
                      Course-Matched Templates
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-[50ch]">
                      Templates adapt instantly to specific course guidelines.
                      Pick your department and select your target sessional
                      module.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-6">
                  {[
                    "CE 320",
                    "CSE 315",
                    "EEE 211",
                    "ME 401",
                    "IPE 305",
                    "ChE 303",
                  ].map((course, idx) => (
                    <span
                      key={course}
                      className={cn(
                        "px-2.5 py-1.5 rounded-lg border text-[10px] font-semibold tracking-wide transition-all duration-300 select-none",
                        idx === 0
                          ? "bg-primary text-primary-foreground border-primary shadow-xs"
                          : "bg-background border-border text-muted-foreground",
                      )}
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal
                delay={0.08}
                className="md:col-span-1 rounded-lg border border-border hover:border-primary/20 p-6 sm:p-8 flex flex-col justify-between bg-muted/5 hover:bg-muted/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-primary/[0.01] cursor-default"
              >
                <div className="flex flex-col gap-4">
                  <div className="size-10 rounded-xl bg-muted border border-border flex items-center justify-center text-foreground">
                    <Zap className="size-4" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-base sm:text-lg font-heading text-foreground">
                      30-Second Turnaround
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Fill out essential details, check layout previews, and
                      generate high-resolution, print-ready files instantly.
                    </p>
                  </div>
                </div>

                <div className="w-full bg-muted border border-border/50 h-8 rounded-lg overflow-hidden relative mt-6 flex items-center justify-between px-3 select-none">
                  <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 relative z-10 flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Compiling PDF...
                  </span>
                  <span className="text-[10px] font-mono font-bold text-muted-foreground relative z-10">
                    80%
                  </span>
                </div>
              </ScrollReveal>

              <ScrollReveal
                delay={0.16}
                className="md:col-span-1 rounded-lg border border-border hover:border-primary/20 p-6 sm:p-8 flex flex-col justify-between bg-muted/5 hover:bg-muted/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-primary/[0.01] cursor-default"
              >
                <div className="flex flex-col gap-4">
                  <div className="size-10 rounded-xl bg-muted border border-border flex items-center justify-center text-foreground">
                    <FileText className="size-4" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-base sm:text-lg font-heading text-foreground">
                      Three-in-One Compile
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Top sheets, main covers, and table of contents pages
                      generated together and packed as a single PDF.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-6">
                  {["Top Sheet", "Cover", "Index"].map((doc) => (
                    <span
                      key={doc}
                      className="px-2 py-1 rounded bg-background border border-border/80 text-[9px] font-mono font-medium text-muted-foreground select-none"
                    >
                      {doc}
                    </span>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal
                delay={0.24}
                className="md:col-span-2 rounded-lg border border-border hover:border-primary/20 p-6 sm:p-8 flex flex-col justify-between bg-muted/5 hover:bg-muted/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-primary/[0.01] cursor-default"
              >
                <div className="flex flex-col gap-4">
                  <div className="size-10 rounded-xl bg-muted border border-border flex items-center justify-center text-foreground">
                    <Download className="size-4" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-base sm:text-lg font-heading text-foreground">
                      100% Free, Built For Students
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-[50ch]">
                      Created by a student, kept free for all. No watermarks,
                      paywalls, or feature locking. Open, print, and submit.
                    </p>
                  </div>
                </div>

                <div className="flex items-baseline gap-2 mt-6">
                  <span className="text-2xl font-black font-mono tracking-tight text-foreground">
                    0 Taka
                  </span>
                  <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                    No credit card required
                  </span>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="w-full border-t border-b border-border/40 bg-gradient-to-b from-muted/50 to-muted/20 dark:from-muted/20 dark:to-muted/5 py-16 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.25] pointer-events-none" />
          <ScrollReveal className="max-w-4xl mx-auto px-6 text-center relative flex flex-col items-center gap-6">
            <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-[0.05] dark:opacity-[0.09] pointer-events-none select-none">
              <span className="font-serif text-[18rem] font-bold leading-none select-none translate-y-[-2rem] text-primary">
                “
              </span>
            </div>

            <blockquote className="text-xl sm:text-2xl font-medium tracking-tight italic text-foreground/95 max-w-3xl leading-relaxed relative z-10">
              &ldquo;I copied the entire lab report from my friend, but my cover page looked so premium that the teacher accused &lsquo;him&rsquo; of copying from &lsquo;me&rsquo;. He got a warning letter, and I got a 10/10. Best friendship break-up ever.&rdquo;
            </blockquote>

            <div className="flex items-center gap-3 mt-2 relative z-10">
              <div className="size-9 rounded-full bg-primary/10 dark:bg-primary/20 text-primary border border-primary/20 flex items-center justify-center text-[10px] font-bold font-mono select-none">
                CE
              </div>
              <div className="text-left">
                <cite className="not-italic text-sm font-semibold text-foreground">
                  Anisul Islam
                </cite>
                <p className="text-[11px] text-muted-foreground">
                  Civil Engineering Student, BUET
                </p>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section className="px-6 container mx-auto pt-16 md:pt-20 pb-16 md:pb-20">
          <ScrollReveal>
            <div className="relative rounded-lg border border-border bg-muted/10 overflow-hidden w-full max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40 pointer-events-none" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,_hsl(from_var(--primary)_h_s_l_/_0.04),transparent)]" />

              <div className="relative flex flex-col items-center gap-5 p-12 sm:p-20 text-center">
                <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl leading-tight tracking-tight max-w-md font-heading">
                  Ready to skip the formatting?
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base max-w-sm">
                  Save your credentials once. Generate print-ready university
                  lab submissions in seconds.
                </p>
                {footerCTA}
              </div>
            </div>
          </ScrollReveal>
        </section>
      </main>

      <footer className="border-t border-border pt-8 pb-10 mt-auto">
        <div className="px-6 flex flex-col items-center gap-5 container mx-auto">
          <div className="flex items-center gap-2 group select-none">
            <div className="size-7 rounded-md bg-primary text-primary-foreground flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
              <FileText className="size-3.5" />
            </div>
            <span className="font-semibold text-sm font-heading">CoverDe</span>
          </div>

          <div className="text-muted-foreground text-xs flex flex-wrap justify-center items-center gap-6">
            <Link
              href="/"
              className="hover:text-foreground transition-colors duration-200"
            >
              Privacy
            </Link>
            <Link
              href="/"
              className="hover:text-foreground transition-colors duration-200"
            >
              Terms
            </Link>
            <Link
              href="/"
              className="hover:text-foreground transition-colors duration-200"
            >
              Contact
            </Link>
          </div>

          <span className="text-muted-foreground text-[10px] text-center tracking-wider uppercase font-mono">
            &copy; 2026 CoverDe &middot; Built for students.
          </span>
        </div>
      </footer>
    </div>
  );
}
