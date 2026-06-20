import {Skeleton} from "@/components/ui/skeleton";
import {Button} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";

export default function DashboardLoading() {
  return (
    <main className="w-full max-w-5xl mx-auto px-4 py-10 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 border-b pb-6 gap-4 sm:gap-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Available Templates
          </h1>
          <div className="mt-2 text-muted-foreground flex items-center gap-1.5">
            Showing top sheet templates for{" "}
            <Skeleton className="h-4 w-28 sm:w-36 rounded" />
          </div>
        </div>
        <Button
          disabled
          className="w-full sm:w-auto opacity-50 cursor-not-allowed"
        >
          Create Template <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({length: 6}).map((_, i) => (
          <div
            key={i}
            className="flex flex-col rounded-xl border border-border/80 bg-card p-6 shadow-xs gap-6"
          >
            <div className="flex items-start justify-between gap-4">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-4 w-20 rounded" />
            </div>
            <div className="space-y-3 flex-1">
              <Skeleton className="h-6 w-3/4 rounded" />
              <Skeleton className="h-4 w-1/2 rounded" />
            </div>
            <div className="flex items-center gap-2 pt-4 border-t border-border/60">
              <Skeleton className="h-9 flex-1 rounded-md" />
              <Skeleton className="h-9 w-9 rounded-md shrink-0" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
