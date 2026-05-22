import {Skeleton} from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <main className="w-full max-w-5xl mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 border-b pb-6 gap-4 sm:gap-0">
        <div>
          <Skeleton className="h-8 w-48 sm:w-64 mb-2" />
          <Skeleton className="h-4 w-full sm:w-96 max-w-[250px] sm:max-w-none" />
        </div>
        <Skeleton className="h-10 w-full sm:w-36" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl border bg-card text-card-foreground shadow pt-6 pb-4 px-6 min-h-[220px] flex flex-col space-y-4"
          >
            <div className="flex justify-between items-start gap-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex gap-2 min-h-[24px]" />
            <Skeleton className="h-10 w-full mt-auto" />
          </div>
        ))}
      </div>
    </main>
  );
}
