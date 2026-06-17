import {Suspense} from "react";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";
import {AnalyticsSummary} from "./AnalyticsSummary";
import {
  SummarySkeleton,
  BarChartSkeleton,
  PieChartSkeleton,
  TableSkeleton,
} from "./AnalyticsSkeletons";
import {DownloadsByDaySection} from "./_components/DownloadsByDaySection";
import {RoleDistributionSection} from "./_components/RoleDistributionSection";
import {DeviceBrowserSection} from "./_components/DeviceBrowserSection";
import {PopularTemplatesSection} from "./_components/PopularTemplatesSection";
import {RecentDownloadsSection} from "./_components/RecentDownloadsSection";

export default async function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-heading">Analytics</h1>
        <p className="text-muted-foreground text-sm">
          Platform usage, template metrics, and document download statistics.
        </p>
      </div>

      <Suspense fallback={<AnalyticsPageSkeleton />}>
        <AnalyticsContentWrapper />
      </Suspense>
    </div>
  );
}

function AnalyticsPageSkeleton() {
  return (
    <div className="space-y-6">
      <SummarySkeleton />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BarChartSkeleton />
        <PieChartSkeleton />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PieChartSkeleton />
        <PieChartSkeleton />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TableSkeleton />
        <TableSkeleton />
      </div>
    </div>
  );
}

async function AnalyticsContentWrapper() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user?.role !== "superadmin") {
    redirect("/admin");
  }

  return (
    <div className="space-y-6">
      <Suspense fallback={<SummarySkeleton />}>
        <AnalyticsSummary />
      </Suspense>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Suspense fallback={<BarChartSkeleton />}>
          <DownloadsByDaySection />
        </Suspense>
        <Suspense fallback={<PieChartSkeleton />}>
          <RoleDistributionSection />
        </Suspense>
      </div>

      <Suspense fallback={
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PieChartSkeleton />
          <PieChartSkeleton />
        </div>
      }>
        <DeviceBrowserSection />
      </Suspense>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Suspense fallback={<TableSkeleton />}>
          <PopularTemplatesSection />
        </Suspense>
        <Suspense fallback={<TableSkeleton />}>
          <RecentDownloadsSection />
        </Suspense>
      </div>
    </div>
  );
}
