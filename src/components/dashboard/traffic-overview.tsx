
"use client";

import { Line, LineChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer, Legend, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { trafficOverviewData, trafficChartConfig } from "@/lib/data";
import { Checkbox } from "../ui/checkbox";

export function TrafficOverview() {
  return (
      <ChartContainer config={trafficChartConfig} className="h-[350px] w-full">
        <ResponsiveContainer>
          <LineChart data={trafficOverviewData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
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
             <Legend content={
                <div className="flex justify-start gap-4 p-4">
                    <div className="flex items-center gap-2">
                        <Checkbox id="organic" defaultChecked />
                        <label htmlFor="organic" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Organic Traffic
                        </label>
                    </div>
                     <div className="flex items-center gap-2">
                        <Checkbox id="paid" defaultChecked />
                        <label htmlFor="paid" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                           Paid Traffic
                        </label>
                    </div>
                </div>
             } />
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
