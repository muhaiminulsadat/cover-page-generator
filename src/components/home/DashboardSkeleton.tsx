import {Skeleton} from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <main className="w-full max-w-5xl mx-auto px-4 py-10">
      <div className="flex justify-between items-end mb-8 border-b pb-6">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-10 w-36" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl border bg-card text-card-foreground shadow pt-6 pb-4 px-6 h-48 space-y-4"
          >
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-10 w-full mt-auto" />
          </div>
        ))}
      </div>
    </main>
  );
}
