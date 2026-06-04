"use client";

import {authClient} from "@/lib/auth-client";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ArrowRight} from "lucide-react";

export function AuthAwareHeroCTA() {
  const {data: session, isPending} = authClient.useSession();
  const isLoggedIn = !!session;
  const targetHref = isLoggedIn ? "/dashboard" : "/register";

  if (isPending) {
    return (
      <Button disabled className="text-base leading-6 h-12 px-8">
        Generate PDF
        <ArrowRight className="size-4 ml-2" />
      </Button>
    );
  }

  return (
    <Button asChild className="text-base leading-6 h-12 px-8 group/button">
      <Link href={targetHref}>
        Generate {isLoggedIn ? "" : "your first "} PDF
        <ArrowRight className="size-4 ml-2 transition-transform duration-200 group-hover/button:translate-x-0.5" />
      </Link>
    </Button>
  );
}

export function AuthAwareFooterCTA() {
  const {data: session, isPending} = authClient.useSession();
  const isLoggedIn = !!session;
  const targetHref = isLoggedIn ? "/dashboard" : "/register";

  if (isPending) {
    return (
      <Button
        disabled
        className="bg-background text-foreground hover:bg-muted text-base h-12 px-8 relative z-10"
        size="lg"
      >
        Get started free
        <ArrowRight className="size-4 ml-2" />
      </Button>
    );
  }

  return (
    <Button
      asChild
      className="bg-background text-foreground hover:bg-muted text-base h-12 px-8 relative z-10 group/button"
      size="lg"
    >
      <Link href={targetHref}>
        Get started free
        <ArrowRight className="size-4 ml-2 transition-transform duration-200 group-hover/button:translate-x-0.5" />
      </Link>
    </Button>
  );
}
