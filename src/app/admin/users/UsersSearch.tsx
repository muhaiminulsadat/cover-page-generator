"use client";

import {useTransition} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Search, Loader2} from "lucide-react";
import {Input} from "@/components/ui/input";

export function UsersSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    params.delete("page"); // Reset page on new search

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="relative w-full max-w-sm">
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
          ) : (
            <Search className="w-4 h-4" />
          )}
        </span>
        <Input
          type="search"
          placeholder="Search users by name or email..."
          className="pl-9 pr-4 h-10 w-full transition-all duration-200 ease-out border-border/60 focus-visible:ring-primary focus-visible:border-primary/50 bg-card/50"
          defaultValue={searchParams.get("search") ?? ""}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
