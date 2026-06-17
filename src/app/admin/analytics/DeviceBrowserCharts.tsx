"use client";

import {Pie, PieChart, Legend} from "recharts";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
  tablet: {
    label: "Tablet",
    color: "hsl(var(--chart-3))",
  },
  Chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  Edge: {
    label: "Edge",
    color: "hsl(var(--chart-2))",
  },
  Firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  Safari: {
    label: "Safari",
    color: "hsl(var(--chart-4))",
  },
  Other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  }
} satisfies ChartConfig;

interface Props {
  deviceData: {device: string | null; count: number}[];
  browserData: {browser: string | null; count: number}[];
}

export function DeviceBrowserCharts({deviceData, browserData}: Props) {
  const formattedDeviceData = deviceData.map((item) => ({
    name: item.device || "Unknown",
    count: item.count,
    fill: chartConfig[(item.device || "desktop") as keyof typeof chartConfig]?.color || "hsl(var(--chart-5))",
  }));

  const formattedBrowserData = browserData.map((item) => ({
    name: item.browser || "Unknown",
    count: item.count,
    fill: chartConfig[(item.browser || "Other") as keyof typeof chartConfig]?.color || "hsl(var(--chart-5))",
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="flex flex-col h-full border-border/50 bg-card/60 backdrop-blur-md transition-all duration-200 hover:shadow-md hover:border-border/80">
        <CardHeader className="items-center pb-0">
          <CardTitle className="font-heading font-semibold text-base text-foreground">
            Devices
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Downloads split by device type
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-4 flex flex-col justify-center min-h-[300px]">
          <ChartContainer config={chartConfig} className="mx-auto aspect-square w-full max-h-[260px]">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie 
                data={formattedDeviceData} 
                dataKey="count" 
                nameKey="name" 
                innerRadius={65} 
                outerRadius={85}
                strokeWidth={2}
                stroke="hsl(var(--card))"
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card className="flex flex-col h-full border-border/50 bg-card/60 backdrop-blur-md transition-all duration-200 hover:shadow-md hover:border-border/80">
        <CardHeader className="items-center pb-0">
          <CardTitle className="font-heading font-semibold text-base text-foreground">
            Browsers
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Downloads split by browser type
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-4 flex flex-col justify-center min-h-[300px]">
          <ChartContainer config={chartConfig} className="mx-auto aspect-square w-full max-h-[260px]">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie 
                data={formattedBrowserData} 
                dataKey="count" 
                nameKey="name" 
                innerRadius={65} 
                outerRadius={85}
                strokeWidth={2}
                stroke="hsl(var(--card))"
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
