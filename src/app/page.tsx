import {Suspense} from "react";
import {LandingPage} from "@/components/home/LandingPage";
import {
  AuthAwareHeroCTA,
  AuthAwareFooterCTA,
} from "@/components/home/AuthAwareCTA";
import {Button} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";

export default function HomePage() {
  return (
    <LandingPage
      heroCTA={
        <Suspense
          key="hero-suspense"
          fallback={
            <Button disabled className="text-base leading-6 h-12 px-8">
              Generate PDF
              <ArrowRight className="size-4 ml-2" />
            </Button>
          }
        >
          <AuthAwareHeroCTA />
        </Suspense>
      }
      footerCTA={
        <Suspense
          key="footer-suspense"
          fallback={
            <Button
              disabled
              className="bg-background text-foreground hover:bg-muted text-base h-12 px-8 relative z-10"
              size="lg"
            >
              Get started free
              <ArrowRight className="size-4 ml-2" />
            </Button>
          }
        >
          <AuthAwareFooterCTA />
        </Suspense>
      }
    />
  );
}
