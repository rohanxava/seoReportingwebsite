
"use client";

import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { organicKeywordsChartConfig, organicKeywordsData } from "@/lib/data";
import { Checkbox } from "../ui/checkbox";

const CustomLegend = (props: any) => {
  const { payload } = props;
  return (
    <div className="flex justify-center items-center gap-x-4 gap-y-2 p-4 flex-wrap">
      {payload.map((entry: any, index: number) => (
        <div key={`item-${index}`} className="flex items-center gap-2">
          <Checkbox id={entry.dataKey} defaultChecked style={{ color: entry.color }} />
          <label htmlFor={entry.dataKey} className="text-xs font-medium leading-none">
            {entry.value}
          </label>
        </div>
      ))}
    </div>
  );
};

export function OrganicKeywordsChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Organic Keywords <span className="font-normal text-muted-foreground">1,046</span></CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={organicKeywordsChartConfig} className="h-64 w-full">
                    <ResponsiveContainer>
                        <AreaChart
                            data={organicKeywordsData}
                            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                            <Tooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="line" />}
                            />
                            <Legend content={<CustomLegend />} />
                            <defs>
                                <linearGradient id="fillTop3" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--color-top3)" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="var(--color-top3)" stopOpacity={0.1} />
                                </linearGradient>
                                <linearGradient id="fill4-10" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--color-4-10)" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="var(--color-4-10)" stopOpacity={0.1} />
                                </linearGradient>
                                <linearGradient id="fill11-20" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--color-11-20)" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="var(--color-11-20)" stopOpacity={0.1} />
                                </linearGradient>
                                <linearGradient id="fill21-50" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--color-21-50)" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="var(--color-21-50)" stopOpacity={0.1} />
                                </linearGradient>
                                <linearGradient id="fill51-100" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--color-51-100)" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="var(--color-51-100)" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <Area
                                dataKey="top3"
                                type="natural"
                                fill="url(#fillTop3)"
                                stroke="var(--color-top3)"
                                stackId="a"
                            />
                            <Area
                                dataKey="4-10"
                                type="natural"
                                fill="url(#fill4-10)"
                                stroke="var(--color-4-10)"
                                stackId="a"
                            />
                            <Area
                                dataKey="11-20"
                                type="natural"
                                fill="url(#fill11-20)"
                                stroke="var(--color-11-20)"
                                stackId="a"
                            />
                            <Area
                                dataKey="21-50"
                                type="natural"
                                fill="url(#fill21-50)"
                                stroke="var(--color-21-50)"
                                stackId="a"
                            />
                            <Area
                                dataKey="51-100"
                                type="natural"
                                fill="url(#fill51-100)"
                                stroke="var(--color-51-100)"
                                stackId="a"
                            />
                             <Area
                                dataKey="serp"
                                type="natural"
                                fill="green"
                                stroke="green"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
