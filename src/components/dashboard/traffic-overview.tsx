"use client";

import { Line, LineChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { trafficOverviewData, trafficChartConfig } from "@/lib/data";

export function TrafficOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Traffic Overview</CardTitle>
        <CardDescription>Organic vs. Paid Sessions</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={trafficChartConfig} className="h-[250px] w-full">
          <ResponsiveContainer>
            <LineChart data={trafficOverviewData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Line
                dataKey="organic"
                type="monotone"
                stroke="var(--color-organic)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="paid"
                type="monotone"
                stroke="var(--color-paid)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
