
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
  type ChartConfig
} from "@/components/ui/chart";

const competitivePositioningData = [
    { name: 'cajeestimezone.c...', organicKeywords: 45, organicSearchTraffic: 50, z: 2.4 },
    { name: 'timeshop24.co.uk', organicKeywords: 60, organicSearchTraffic: 40, z: 2.4 },
    { name: 'customworksaus...', organicKeywords: 145, organicSearchTraffic: 30, z: 2.4 },
    { name: 'style-old-money...', organicKeywords: 70, organicSearchTraffic: 20, z: 2.4 },
    { name: 'laphont.com', organicKeywords: 50, organicSearchTraffic: 350, z: 2.4 },
    { name: 'egardwatches.com', organicKeywords: 20, organicSearchTraffic: 10, z: 2.4 },
];

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
