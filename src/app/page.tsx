import {LandingPage} from "@/components/home/LandingPage";
import {
  AuthAwareHeroCTA,
  AuthAwareFooterCTA,
} from "@/components/home/AuthAwareCTA";

export default function HomePage() {
  return (
    <LandingPage
      heroCTA={<AuthAwareHeroCTA />}
      footerCTA={<AuthAwareFooterCTA />}
    />
  );
}
