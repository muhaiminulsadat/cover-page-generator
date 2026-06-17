"use client";

import {Bar, BarChart, CartesianGrid, XAxis, YAxis} from "recharts";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";

const chartConfig = {
  count: {
    label: "Downloads",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface Props {
  data: {date: string; count: number}[];
}

export function DownloadsByDayChart({data}: Props) {
  return (
    <Card className="h-full flex flex-col border-border/50 bg-card/60 backdrop-blur-md transition-all duration-200 hover:shadow-md hover:border-border/80">
      <CardHeader>
        <CardTitle className="font-heading font-semibold text-base text-foreground">
          Downloads Over Time
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Document generation volume (last 7 days)
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 min-h-[300px]">
        <ChartContainer config={chartConfig} className="aspect-auto h-[300px] w-full">
          <BarChart data={data}>
            <CartesianGrid vertical={false} stroke="hsl(var(--border) / 0.5)" />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              stroke="hsl(var(--muted-foreground))"
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {weekday: "short"});
              }}
            />
            <YAxis 
              tickLine={false} 
              axisLine={false} 
              tickMargin={10}
              stroke="hsl(var(--muted-foreground))"
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="count" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
