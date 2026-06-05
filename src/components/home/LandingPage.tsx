import Link from "next/link";
import Image from "next/image";
import { FileText, Zap, LayoutTemplate, Download } from "lucide-react";

import { FadeIn } from "@/components/home/FadeIn";

interface LandingPageProps {
  heroCTA: React.ReactNode;
  footerCTA: React.ReactNode;
}

export async function LandingPage({ heroCTA, footerCTA }: LandingPageProps) {
  return (
    <div className="w-full flex-1 flex flex-col justify-between">
      <main>
        {/* ── HERO ── */}
        <section className="px-6 container mx-auto pt-12 md:pt-20 pb-20 md:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center max-w-6xl mx-auto">
            {/* Text block — centered on mobile, left-aligned on desktop */}
            <div className="flex flex-col gap-6 items-center text-center lg:items-start lg:text-left mx-auto lg:mx-0 max-w-xl">
              <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-bold tracking-tight leading-[1.08] font-heading">
                Your lab submissions,{" "}
                <span className="text-primary">formatted instantly.</span>
              </h1>

              <p className="text-muted-foreground text-lg leading-relaxed max-w-[52ch]">
                Set up your profile once. Pick a course template. Download a
                polished PDF with top sheet, cover page and index, ready to
                submit.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-2 w-full sm:w-auto justify-center lg:justify-start">
                {heroCTA}
              </div>
            </div>

            {/* Hero image */}
            <FadeIn className="relative w-full max-w-xl mx-auto lg:mx-0" delay={0.15}>
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-border shadow-xl">
                <Image
                  alt="Clean desk with formatted assignment documents and laptop"
                  className="object-cover"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  src="/hero-desk.png"
                />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="px-6 container mx-auto pb-24 md:pb-32">
          <div className="max-w-6xl mx-auto">
            <FadeIn className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-heading">
                How it works
              </h2>
              <p className="text-muted-foreground text-base mt-3 max-w-lg mx-auto md:mx-0">
                Three steps between you and a submission-ready document.
              </p>
            </FadeIn>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Card 1 */}
              <FadeIn
                className="md:col-span-5 group rounded-2xl border border-border bg-muted/30 p-8 transition-colors duration-300 hover:bg-muted/50"
                delay={0.05}
              >
                <div className="size-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <Zap className="size-5" />
                </div>
                <h3 className="font-semibold text-xl mt-5 font-heading">
                  Complete your profile
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mt-2 max-w-[40ch]">
                  Name, student ID, university, department, section and term.
                  Fill it once during onboarding.
                </p>
              </FadeIn>

              {/* Card 2 */}
              <FadeIn
                className="md:col-span-7 group rounded-2xl border border-border bg-muted/30 p-8 transition-colors duration-300 hover:bg-muted/50"
                delay={0.12}
              >
                <div className="size-11 rounded-xl bg-muted text-foreground flex items-center justify-center border border-border transition-transform duration-300 group-hover:scale-105">
                  <LayoutTemplate className="size-5" />
                </div>
                <h3 className="font-semibold text-xl mt-5 font-heading">
                  Pick a template
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mt-2 max-w-[48ch]">
                  Your dashboard surfaces only the course templates that match
                  your department, level and section automatically.
                </p>
              </FadeIn>

              {/* Card 3 — full-width accent card */}
              <FadeIn
                className="md:col-span-12 group rounded-2xl border border-border bg-primary text-primary-foreground p-8 transition-all duration-300 hover:shadow-lg"
                delay={0.2}
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-col gap-2">
                    <div className="size-11 rounded-xl bg-primary-foreground/15 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                      <Download className="size-5" />
                    </div>
                    <h3 className="font-semibold text-xl mt-3 font-heading">
                      Download your PDF
                    </h3>
                    <p className="text-primary-foreground/75 text-sm leading-relaxed max-w-[50ch]">
                      Preview the finalized multi-page document in-browser, then
                      download your formatted top sheet, cover page and index
                      instantly.
                    </p>
                  </div>
                  <div className="flex items-baseline gap-1 shrink-0 self-start md:self-center">
                    <span className="text-5xl md:text-6xl font-bold font-heading tracking-tight">
                      3
                    </span>
                    <span className="text-primary-foreground/60 text-lg font-heading">
                      pages, one click
                    </span>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── FOOTER CTA ── */}
        <section className="px-6 container mx-auto pb-24 md:pb-32">
          <FadeIn>
            <div className="text-center rounded-2xl bg-muted/40 border border-border flex p-10 sm:p-16 flex-col items-center gap-6 w-full max-w-4xl mx-auto relative overflow-hidden">
              <h2 className="font-bold text-3xl sm:text-4xl leading-tight tracking-tight max-w-lg font-heading">
                Ready to skip the busywork?
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg max-w-md">
                Set up once, generate every submission after that in seconds.
                Free for all students.
              </p>
              {footerCTA}
            </div>
          </FadeIn>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="border-border border-t pt-8 pb-12 mt-auto">
        <div className="flex px-6 flex-col items-center gap-6 container mx-auto">
          <div className="flex items-center gap-2 group cursor-default">
            <div className="size-8 rounded-lg bg-primary text-primary-foreground flex justify-center items-center transition-transform duration-300 group-hover:scale-105">
              <FileText className="size-4" />
            </div>
            <span className="font-semibold text-base font-heading">
              CoverDe
            </span>
          </div>

          <div className="text-muted-foreground text-sm flex flex-wrap justify-center items-center gap-6">
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

          <span className="text-center text-muted-foreground text-xs">
            2026 CoverDe. Made for students.
          </span>
        </div>
      </footer>
    </div>
  );
}
