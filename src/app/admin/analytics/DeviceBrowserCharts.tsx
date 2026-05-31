"use client";

import {Pie, PieChart, Legend} from "recharts";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
  tablet: {
    label: "Tablet",
    color: "var(--chart-3)",
  },
  Chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  Edge: {
    label: "Edge",
    color: "var(--chart-2)",
  },
  Firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  Safari: {
    label: "Safari",
    color: "var(--chart-4)",
  },
  Other: {
    label: "Other",
    color: "var(--chart-5)",
  }
} satisfies ChartConfig;

export function DeviceBrowserCharts({
  deviceData,
  browserData
}: {
  deviceData: {device: string | null; count: number}[];
  browserData: {browser: string | null; count: number}[];
}) {
  const formattedDeviceData = deviceData.map(item => ({
    name: item.device || "Unknown",
    count: item.count,
    fill: chartConfig[(item.device || "desktop") as keyof typeof chartConfig]?.color || "var(--chart-5)",
  }));

  const formattedBrowserData = browserData.map(item => ({
    name: item.browser || "Unknown",
    count: item.count,
    fill: chartConfig[(item.browser || "Other") as keyof typeof chartConfig]?.color || "var(--chart-5)",
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="flex flex-col h-full">
        <CardHeader className="items-center pb-0">
          <CardTitle>Devices</CardTitle>
          <CardDescription>Downloads by device type</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie data={formattedDeviceData} dataKey="count" nameKey="name" innerRadius={60} />
              <Legend />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card className="flex flex-col h-full">
        <CardHeader className="items-center pb-0">
          <CardTitle>Browsers</CardTitle>
          <CardDescription>Downloads by browser</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie data={formattedBrowserData} dataKey="count" nameKey="name" innerRadius={60} />
              <Legend />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
