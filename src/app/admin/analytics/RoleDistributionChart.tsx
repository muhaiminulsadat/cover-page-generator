"use client";

import {Pie, PieChart, Legend} from "recharts";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";

const chartConfig = {
  student: {
    label: "Student",
    color: "hsl(var(--chart-1))",
  },
  moderator: {
    label: "Moderator",
    color: "hsl(var(--chart-2))",
  },
  admin: {
    label: "Admin",
    color: "hsl(var(--chart-3))",
  },
  superadmin: {
    label: "Superadmin",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

interface Props {
  data: {role: string; count: number}[];
}

export function RoleDistributionChart({data}: Props) {
  const chartData = data.map((item) => ({
    role: item.role,
    count: item.count,
    fill: chartConfig[item.role as keyof typeof chartConfig]?.color || "hsl(var(--chart-5))",
  }));

  return (
    <Card className="flex flex-col h-full border-border/50 bg-card/60 backdrop-blur-md transition-all duration-200 hover:shadow-md hover:border-border/80">
      <CardHeader className="items-center pb-0">
        <CardTitle className="font-heading font-semibold text-base text-foreground">
          Role Distribution
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Current platform users by role
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-4 flex flex-col justify-center min-h-[300px]">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square w-full max-h-[260px]">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="role"
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
  );
}
