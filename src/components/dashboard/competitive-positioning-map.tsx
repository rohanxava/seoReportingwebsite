
"use client";

import { Scatter, ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  type ChartConfig
} from "@/components/ui/chart";
import type { CompetitivePositioningDataPoint } from "@/lib/types";

const competitivePositioningChartConfig = {
    cajeestimezone: { label: "cajeestimezone.c...", color: "hsl(var(--chart-1))" },
    timeshop24: { label: "timeshop24.co.uk", color: "hsl(var(--chart-2))" },
    customworksa: { label: "customworksaus...", color: "hsl(var(--chart-3))" },
    styleoldmone: { label: "style-old-money...", color: "hsl(var(--chart-4))" },
    laphont: { label: "laphont.com", color: "hsl(var(--chart-5))" },
    egardwatches: { label: "egardwatches.com", color: "hsl(var(--secondary))" },
} satisfies ChartConfig;


const CustomLegend = (props: any) => {
  const { payload } = props;
  return (
    <div className="flex justify-center items-center gap-x-4 gap-y-2 p-4 flex-wrap">
      {payload.map((entry: any, index: number) => (
        <div key={`item-${index}`} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
          <p className="text-xs text-muted-foreground">{entry.value}</p>
        </div>
      ))}
    </div>
  );
};

interface CompetitivePositioningMapProps {
    data: CompetitivePositioningDataPoint[];
}

export function CompetitivePositioningMap({ data }: CompetitivePositioningMapProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Competitive Positioning Map</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={competitivePositioningChartConfig} className="h-[350px] w-full">
          <ResponsiveContainer>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid />
              <XAxis dataKey="organicKeywords" type="number" name="Organic Keywords" label={{ value: "Organic Keywords", position: 'insideBottom', offset: -10 }} />
              <YAxis dataKey="organicSearchTraffic" type="number" name="Organic Search Traffic" label={{ value: "Organic Search Traffic", angle: -90, position: 'insideLeft' }} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend content={<CustomLegend />} />
              <Scatter name="Competitors" data={data} fill="hsl(var(--chart-1))" />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
