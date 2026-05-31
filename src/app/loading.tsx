import {Skeleton} from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto p-6 md:p-8 space-y-8 animate-in fade-in duration-500">
      {/* Header Skeleton */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="space-y-2">
          <Skeleton className="h-8 w-[250px] sm:w-[350px]" />
          <Skeleton className="h-4 w-[200px] sm:w-[250px]" />
        </div>
        <Skeleton className="h-10 w-[120px] rounded-md" />
      </div>

      <Skeleton className="h-[1px] w-full" />

      {/* Content Skeleton */}
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
    </div>
  );
}
