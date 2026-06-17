import {Skeleton} from "@/components/ui/skeleton";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

export function SummarySkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {Array.from({length: 3}).map((_, i) => (
        <Card key={i} className="border-border/50 bg-card/60 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-20 rounded-sm" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-16 rounded-sm mt-1" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function BarChartSkeleton() {
  return (
    <Card className="h-full flex flex-col border-border/50 bg-card/60 backdrop-blur-md">
      <CardHeader>
        <Skeleton className="h-5 w-36 rounded-sm" />
        <Skeleton className="h-3 w-20 rounded-sm mt-1.5" />
      </CardHeader>
      <CardContent className="flex-1 flex items-end justify-between gap-3 h-[300px] pt-4 pb-2">
        {Array.from({length: 7}).map((_, i) => {
          // Varying heights for realistic bar charts
          const heights = ["h-[60px]", "h-[120px]", "h-[90px]", "h-[180px]", "h-[150px]", "h-[100px]", "h-[140px]"];
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <Skeleton className={`w-full rounded-t-md bg-muted/70 ${heights[i]}`} />
              <Skeleton className="h-3 w-8 rounded-sm mt-1" />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

export function PieChartSkeleton() {
  return (
    <Card className="flex flex-col h-full border-border/50 bg-card/60 backdrop-blur-md">
      <CardHeader className="items-center pb-0">
        <Skeleton className="h-5 w-32 rounded-sm" />
        <Skeleton className="h-3 w-28 rounded-sm mt-1.5" />
      </CardHeader>
      <CardContent className="flex-1 pb-4 flex flex-col items-center justify-center min-h-[300px]">
        {/* Ring skeleton */}
        <div className="relative size-[160px] rounded-full border-[18px] border-muted/30 animate-pulse flex items-center justify-center">
          <div className="size-[124px] rounded-full bg-transparent" />
        </div>
        {/* Legend item skeletons */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-6 w-full px-4">
          {Array.from({length: 4}).map((_, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <Skeleton className="size-3 rounded-full" />
              <Skeleton className="h-3.5 w-14 rounded-sm" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function TableSkeleton() {
  return (
    <Card className="flex-1 border-border/50 bg-card/60 backdrop-blur-md">
      <CardHeader>
        <Skeleton className="h-5 w-36 rounded-sm" />
        <Skeleton className="h-3 w-40 rounded-sm mt-1.5" />
      </CardHeader>
      <CardContent className="space-y-4">
        {Array.from({length: 5}).map((_, i) => (
          <div key={i} className="flex items-center justify-between border-b border-border/30 pb-3 last:border-0 last:pb-0">
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-[160px] rounded-sm" />
              <Skeleton className="h-3 w-[120px] rounded-sm" />
            </div>
            <Skeleton className="h-4 w-10 rounded-sm" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
