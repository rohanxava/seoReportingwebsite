
"use client";

import { Scatter, ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { competitivePositioningData, competitivePositioningChartConfig } from "@/lib/data";

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


export function CompetitivePositioningMap() {
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
              <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<ChartTooltipContent indicator="dot" />} />
              <Legend content={<CustomLegend />} />
              {Object.keys(competitivePositioningChartConfig).map((key) => (
                 <Scatter key={key} name={competitivePositioningChartConfig[key as keyof typeof competitivePositioningChartConfig].label} data={competitivePositioningData.filter(d => d.name === competitivePositioningChartConfig[key as keyof typeof competitivePositioningChartConfig].label)} fill={competitivePositioningChartConfig[key as keyof typeof competitivePositioningChartConfig].color} />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
