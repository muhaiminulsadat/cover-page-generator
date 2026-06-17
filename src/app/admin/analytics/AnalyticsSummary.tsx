import {getAnalyticsSummary} from "@/lib/queries/analytics";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Users, Layers, Download} from "lucide-react";

export async function AnalyticsSummary() {
  "use cache: remote";
  const {cacheLife, cacheTag} = await import("next/cache");
  cacheLife("minutes");
  cacheTag("analytics");

  const summary = await getAnalyticsSummary();

  const stats = [
    {
      label: "Total Users",
      value: summary.totalUsers,
      icon: Users,
      description: "Registered platform accounts",
    },
    {
      label: "Templates",
      value: summary.totalTemplates,
      icon: Layers,
      description: "Active cover page configurations",
    },
    {
      label: "Downloads",
      value: summary.totalDownloads,
      icon: Download,
      description: "Total generated documents",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card 
            key={stat.label} 
            className="border-border/50 bg-card/60 backdrop-blur-md relative overflow-hidden transition-all duration-200 hover:shadow-md hover:border-border/80"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </CardTitle>
              <Icon className="h-4.5 w-4.5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-heading text-foreground tracking-tight">
                {stat.value}
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
