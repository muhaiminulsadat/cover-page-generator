import {Suspense} from "react";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";
import {Loader2} from "lucide-react";
import {AnalyticsSummary} from "./AnalyticsSummary";
import {
  getRoleDistribution,
  getDownloadsByDay,
  getDeviceDistribution,
  getBrowserDistribution,
  getPopularTemplates,
  getRecentDownloads,
} from "@/lib/queries/analytics";
import {RoleDistributionChart} from "./RoleDistributionChart";
import {DownloadsByDayChart} from "./DownloadsByDayChart";
import {DeviceBrowserCharts} from "./DeviceBrowserCharts";
import {PopularTemplatesTable} from "./PopularTemplatesTable";
import {RecentDownloadsTable} from "./RecentDownloadsTable";

export default async function AnalyticsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user?.role !== "superadmin") {
    redirect("/admin");
  }

  const [
    roleData,
    downloadsData,
    deviceData,
    browserData,
    popularTemplates,
    recentDownloads,
  ] = await Promise.all([
    getRoleDistribution(),
    getDownloadsByDay(),
    getDeviceDistribution(),
    getBrowserDistribution(),
    getPopularTemplates(5),
    getRecentDownloads(5),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Platform usage and download statistics.
        </p>
      </div>

      <Suspense fallback={<div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>}>
        <AnalyticsSummary />
      </Suspense>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DownloadsByDayChart data={downloadsData} />
        <RoleDistributionChart data={roleData} />
      </div>

      <DeviceBrowserCharts deviceData={deviceData} browserData={browserData} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PopularTemplatesTable templates={popularTemplates} />
        <RecentDownloadsTable downloads={recentDownloads} />
      </div>
    </div>
  );
}
