import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ArrowRight} from "lucide-react";
import {cacheLife} from "next/cache";

async function CachedHeroCTA({isLoggedIn}: {isLoggedIn: boolean}) {
  "use cache: remote";
  cacheLife("max");

  const targetHref = isLoggedIn ? "/dashboard" : "/register";

  return (
    <Button asChild className="text-base leading-6 h-12 px-8">
      <Link href={targetHref}>
        Generate {isLoggedIn ? "" : "your first "} PDF
        <ArrowRight className="size-4 ml-2" />
      </Link>
    </Button>
  );
}

export async function AuthAwareHeroCTA() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const isLoggedIn = !!session;

  return <CachedHeroCTA isLoggedIn={isLoggedIn} />;
}

async function CachedFooterCTA({isLoggedIn}: {isLoggedIn: boolean}) {
  "use cache: remote";
  cacheLife("max");

  const targetHref = isLoggedIn ? "/dashboard" : "/register";

  return (
    <Button
      asChild
      className="bg-background text-foreground hover:bg-muted text-base h-12 px-8 relative z-10"
      size="lg"
    >
      <Link href={targetHref}>
        Get started free
        <ArrowRight className="size-4 ml-2" />
      </Link>
    </Button>
  );
}

export async function AuthAwareFooterCTA() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const isLoggedIn = !!session;

  return <CachedFooterCTA isLoggedIn={isLoggedIn} />;
}
