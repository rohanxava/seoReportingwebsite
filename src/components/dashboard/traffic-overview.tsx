
"use client";

import { Line, LineChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer, Legend, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
} from "@/components/ui/chart";
import { Checkbox } from "../ui/checkbox";
import type { TrafficOverviewDataPoint } from "@/lib/types";


const trafficChartConfig = {
  organic: {
    label: "Organic Traffic",
    color: "hsl(var(--chart-1))",
  },
  paid: {
    label: "Paid Traffic",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;


const CustomLegend = (props: any) => {
  const { payload } = props;
  return (
    <div className="flex justify-start items-center gap-4 p-4 flex-wrap">
      {payload.map((entry: any, index: number) => (
        <div key={`item-${index}`} className="flex items-center gap-2">
          <Checkbox id={entry.dataKey} defaultChecked style={{ color: entry.color }} />
          <label htmlFor={entry.dataKey} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {entry.value}
          </label>
        </div>
      ))}
    </div>
  );
};

interface TrafficOverviewProps {
  data: TrafficOverviewDataPoint[];
}

export function TrafficOverview({ data }: TrafficOverviewProps) {
  return (
      <ChartContainer config={trafficChartConfig} className="h-[350px] w-full">
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short' })}
            />
            <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                 tickFormatter={(value) => `${value / 1000}K`}
             />
            <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
            />
             <Legend content={<CustomLegend />} />
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
  );
}
