"use client";

import {Pie, PieChart, Legend} from "recharts";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";

const chartConfig = {
  student: {
    label: "Student",
    color: "var(--chart-1)",
  },
  moderator: {
    label: "Moderator",
    color: "var(--chart-2)",
  },
  admin: {
    label: "Admin",
    color: "var(--chart-3)",
  },
  superadmin: {
    label: "Superadmin",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

export function RoleDistributionChart({data}: {data: {role: string; count: number}[]}) {
  const chartData = data.map(item => ({
    role: item.role,
    count: item.count,
    fill: chartConfig[item.role as keyof typeof chartConfig]?.color || "var(--chart-5)",
  }));

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Role Distribution</CardTitle>
        <CardDescription>Current users by role</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="role"
              innerRadius={60}
            />
            <Legend />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
