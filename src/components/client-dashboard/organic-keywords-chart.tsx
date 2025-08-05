
"use client";

import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "../ui/chart";
import { Checkbox } from "../ui/checkbox";

const organicKeywordsData = [
  { month: "Mar 1", top3: 150, '4-10': 200, '11-20': 250, '21-50': 200, '51-100': 150, serp: 50 },
  { month: "Apr 1", top3: 160, '4-10': 210, '11-20': 260, '21-50': 210, '51-100': 160, serp: 55 },
  { month: "May 1", top3: 170, '4-10': 220, '11-20': 270, '21-50': 220, '51-100': 170, serp: 60 },
  { month: "Jun 1", top3: 180, '4-10': 230, '11-20': 280, '21-50': 230, '51-100': 180, serp: 65 },
  { month: "Jul 1", top3: 190, '4-10': 240, '11-20': 290, '21-50': 240, '51-100': 190, serp: 70 },
  { month: "Aug 1", top3: 200, '4-10': 250, '11-20': 300, '21-50': 250, '51-100': 200, serp: 75 },
];

const organicKeywordsChartConfig = {
  top3: { label: "Top 3", color: "hsl(var(--chart-1))" },
  '4-10': { label: "4-10", color: "hsl(var(--chart-2))" },
  '11-20': { label: "11-20", color: "hsl(var(--chart-3))" },
  '21-50': { label: "21-50", color: "hsl(var(--chart-4))" },
  '51-100': { label: "51-100", color: "hsl(var(--chart-5))" },
  serp: { label: "SERP Features", color: "hsl(var(--chart-1))" },
} satisfies ChartConfig;


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
