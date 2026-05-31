import {getAnalyticsSummary} from "@/lib/queries/analytics";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Users, Layers, Download} from "lucide-react";

export async function AnalyticsSummary() {
  "use cache: remote";
  const {cacheLife, cacheTag} = await import("next/cache");
  cacheLife("minutes");
  cacheTag("analytics");

  const summary = await getAnalyticsSummary();

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.totalUsers}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Templates</CardTitle>
          <Layers className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.totalTemplates}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Downloads</CardTitle>
          <Download className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.totalDownloads}</div>
        </CardContent>
      </Card>
    </div>
  );
}
