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
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

export function LandingPage({
  heroCTA,
  footerCTA,
}: {
  heroCTA: React.ReactNode;
  footerCTA: React.ReactNode;
}) {
  return (
    <div className="w-full flex-1 flex flex-col justify-between">
      <main className="px-6 container mx-auto flex-1">
        <section className="flex pt-12 md:pt-20 pb-10 flex-col gap-6 items-center text-center">
          <div className="rounded-full bg-muted border-border border flex px-4 py-1.5 items-center gap-2 w-fit">
            <Sparkles className="size-3.5 text-foreground" />
            <span className="font-medium text-foreground text-xs leading-4">
              Built for engineering students
            </span>
          </div>
          <h1 className="leading-tight font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight max-w-3xl">
            Stop reformatting your{" "}
            <span className="text-muted-foreground">lab submissions</span> by
            hand.
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-6 max-w-2xl mt-4">
            Set up your academic profile once and instantly generate perfectly
            formatted, multi-page lab PDFs — Top Sheet, Cover Page, and Index —
            using shared course templates.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full sm:w-auto">
            {heroCTA}
          </div>
          <div className="relative mt-12 w-full max-w-4xl mx-auto">
            <div className="rounded-2xl border-border border overflow-hidden relative w-full h-75 sm:h-100">
              <Image
                alt="Student working"
                className="object-cover"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src="https://images.unsplash.com/photo-1758874384555-37d50c0ee81a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwc3R1ZHlpbmclMjB3aXRoJTIwbGFwdG9wJTIwZG9jdW1lbnRzJTIwZGVza3xlbnwxfDB8fHwxNzgwMTkyMTQyfDA&ixlib=rb-4.1.0&q=80&w=1080"
              />
            </div>
            <div className="shadow-lg rounded-xl bg-background border-border border flex items-center absolute -bottom-4 md:bottom-8 left-4 md:-left-6 p-4 gap-3">
              <div className="size-10 rounded-lg bg-primary text-primary-foreground flex justify-center items-center">
                <CheckCheck className="size-5" />
              </div>
              <div className="flex flex-col items-start">
                <span className="font-semibold text-sm leading-5">
                  PDF ready in seconds
                </span>
                <span className="text-muted-foreground text-xs leading-4">
                  CSE-301 · Term 2 · Section A
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 pt-16 md:pt-20 w-full max-w-3xl gap-2 md:gap-8 divide-x divide-border">
            <div className="flex flex-col items-center">
              <span className="font-bold text-2xl md:text-3xl leading-8">
                3-in-1
              </span>
              <span className="text-muted-foreground text-xs md:text-sm mt-1">
                Top, Cover & Index
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-2xl md:text-3xl leading-8">
                9 fields
              </span>
              <span className="text-muted-foreground text-xs md:text-sm mt-1">
                Profile setup, once
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-2xl md:text-3xl leading-8">
                0 min
              </span>
              <span className="text-muted-foreground text-xs md:text-sm mt-1">
                Manual formatting
              </span>
            </div>
          </div>
        </section>

        <section className="flex py-16 flex-col gap-10 items-center">
          <div className="flex flex-col gap-3 text-center max-w-2xl">
            <span className="font-medium text-primary text-sm leading-5 uppercase tracking-wider">
              Everything you need
            </span>
            <h2 className="font-bold text-3xl sm:text-4xl leading-tight tracking-tight">
              From profile to polished PDF
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              CoverIt handles the repetitive work so you can focus on the actual
              lab report.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
            <Card className="text-left w-full">
              <CardHeader className="gap-4">
                <div className="size-12 rounded-lg bg-muted text-foreground flex justify-center items-center">
                  <UserCog className="size-6" />
                </div>
                <CardTitle className="text-xl">Set up once</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Enter your name, student ID, university, department, section,
                  group, level, term and HSC batch a single time.
                </p>
              </CardContent>
            </Card>
            <Card className="text-left w-full">
              <CardHeader className="gap-4">
                <div className="size-12 rounded-lg bg-muted text-foreground flex justify-center items-center">
                  <Sparkles className="size-6" />
                </div>
                <CardTitle className="text-xl">Smart template feed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Your dashboard surfaces only the course templates that match
                  your department, level and section automatically.
                </p>
              </CardContent>
            </Card>
            <Card className="text-left w-full">
              <CardHeader className="gap-4">
                <div className="size-12 rounded-lg bg-primary text-primary-foreground flex justify-center items-center">
                  <FileDown className="size-6" />
                </div>
                <CardTitle className="text-xl">Preview & download</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Preview the finalized multi-page document in-browser, then
                  download your formatted submission PDF instantly.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-16">
          <div className="rounded-3xl bg-muted border-border border p-8 sm:p-12 flex flex-col gap-10 items-center w-full max-w-4xl mx-auto">
            <h2 className="font-bold text-center text-3xl leading-tight tracking-tight">
              Three steps to a perfect submission
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 w-full">
              <div className="text-center flex flex-col items-center gap-3 flex-1">
                <div className="size-14 ring-8 ring-background font-bold rounded-full bg-background text-xl border-border border flex justify-center items-center">
                  1
                </div>
                <h3 className="font-semibold text-lg mt-2">
                  Complete your profile
                </h3>
                <p className="text-muted-foreground text-sm">
                  Fill in your academic metadata during quick onboarding.
                </p>
              </div>
              <ArrowRight className="size-6 text-muted-foreground hidden md:block -mt-8" />
              <ArrowDown className="size-6 text-muted-foreground md:hidden" />
              <div className="text-center flex flex-col items-center gap-3 flex-1">
                <div className="size-14 ring-8 ring-background font-bold rounded-full bg-background text-xl border-border border flex justify-center items-center">
                  2
                </div>
                <h3 className="font-semibold text-lg mt-2">Pick a template</h3>
                <p className="text-muted-foreground text-sm">
                  Choose a matched course template from your smart feed.
                </p>
              </div>
              <ArrowRight className="size-6 text-muted-foreground hidden md:block -mt-8" />
              <ArrowDown className="size-6 text-muted-foreground md:hidden" />
              <div className="text-center flex flex-col items-center gap-3 flex-1">
                <div className="size-14 ring-8 ring-primary/20 font-bold rounded-full bg-primary text-primary-foreground text-xl flex justify-center items-center shadow-md">
                  3
                </div>
                <h3 className="font-semibold text-lg mt-2">Download PDF</h3>
                <p className="text-muted-foreground text-sm">
                  Preview and grab your fully formatted submission.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 pb-24">
          <div className="text-center rounded-3xl bg-primary text-primary-foreground flex p-10 sm:p-16 flex-col items-center gap-6 w-full max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-size-[24px_24px]"></div>
            <h2 className="font-bold text-3xl sm:text-4xl leading-tight tracking-tight relative z-10 max-w-xl">
              Ready to never format a cover page again?
            </h2>
            <p className="text-primary-foreground/80 text-base sm:text-lg mb-4 relative z-10">
              Join engineering students generating clean lab submissions in
              seconds.
            </p>
            {footerCTA}
          </div>
        </section>
      </main>

      <footer className="border-border border-t pt-8 pb-12 mt-auto">
        <div className="flex px-6 flex-col items-center gap-6 container mx-auto">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-primary text-primary-foreground flex justify-center items-center">
              <FileText className="size-4" />
            </div>
            <span className="font-semibold text-base">CoverIt</span>
          </div>
          <div className="text-muted-foreground text-sm flex flex-wrap justify-center items-center gap-6">
            <Link href="/" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="/" className="hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
          <span className="text-center text-muted-foreground text-xs">
            © 2026 CoverDe. Made for students.
          </span>
        </div>
      </footer>
    </div>
  );
}
