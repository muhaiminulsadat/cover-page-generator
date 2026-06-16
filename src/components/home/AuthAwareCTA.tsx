"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AuthAwareHeroCTA() {
  const { data: session, isPending } = authClient.useSession();
  const isLoggedIn = !!session;
  const targetHref = isLoggedIn ? "/dashboard" : "/register";

  if (isPending) {
    return (
      <Button disabled className="rounded-full text-base leading-6 h-12 px-8 w-fit mx-auto lg:mx-0">
        Generate PDF
        <ArrowRight className="size-4 ml-2" />
      </Button>
    );
  }

  return (
    <Button asChild className="rounded-full text-base leading-6 h-12 px-8 w-fit mx-auto lg:mx-0 group/button transition-all duration-200 active:scale-[0.98]">
      <Link href={targetHref}>
        {isLoggedIn ? "Go to dashboard" : "Get started free"}
        <ArrowRight className="size-4 ml-2 transition-transform duration-200 group-hover/button:translate-x-0.5" />
      </Link>
    </Button>
  );
}

export function AuthAwareFooterCTA() {
  const { data: session, isPending } = authClient.useSession();
  const isLoggedIn = !!session;
  const targetHref = isLoggedIn ? "/dashboard" : "/register";

  if (isPending) {
    return (
      <Button disabled className="rounded-full text-base h-12 px-8 w-fit mx-auto" size="lg">
        Get started free
        <ArrowRight className="size-4 ml-2" />
      </Button>
    );
  }

  return (
    <Button asChild className="rounded-full text-base h-12 px-8 group/button transition-all duration-200 active:scale-[0.98] w-fit mx-auto" size="lg">
      <Link href={targetHref}>
        Get started free
        <ArrowRight className="size-4 ml-2 transition-transform duration-200 group-hover/button:translate-x-0.5" />
      </Link>
    </Button>
  );
}
