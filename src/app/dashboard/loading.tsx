import {Skeleton} from "@/components/ui/skeleton";
import {Button} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";
import Link from "next/link";

export default function DashboardLoading() {
  return (
    <main className="w-full max-w-5xl mx-auto px-4 py-10 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 border-b pb-6 gap-4 sm:gap-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Available Templates
          </h1>
          <div className="mt-2 text-muted-foreground flex items-center gap-1.5">
            Showing top sheet templates for <Skeleton className="h-4 w-28 sm:w-36 rounded" />
          </div>
        </div>
        <Button disabled className="w-full sm:w-auto opacity-50 cursor-not-allowed">
          Create Template <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({length: 6}).map((_, i) => (
          <div
            key={i}
            className="flex flex-col space-y-4 rounded-xl border border-border p-6 shadow-sm"
          >
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[100px]" />
              </div>
            </div>
            <div className="space-y-2 pt-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
