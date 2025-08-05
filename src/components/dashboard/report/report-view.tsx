
'use client';

import type { ReportData } from "@/app/actions/report";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowDown,
  ArrowUp,
  Circle,
  Globe,
  Link as LinkIcon,
  PieChart,
  Printer,
} from "lucide-react";

export function ReportView({ reportData }: { reportData: ReportData }) {
  const { project, client, auditData, generatedAt } = reportData;

  return (
    <div className="p-4 md:p-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold font-headline text-primary">
              SEO Performance Report
            </h1>
            <p className="text-muted-foreground">
              Report for: <strong>{project.name}</strong> ({project.domain})
            </p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-sm">
              Client: <strong>{client.name}</strong>
            </p>
            <p className="text-sm text-muted-foreground">
              Generated on: {generatedAt}
            </p>
          </div>
           <Button onClick={() => window.print()} className="mt-4 sm:mt-0">
                <Printer className="mr-2 h-4 w-4" />
                Print Report
            </Button>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Key Metrics Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="p-4 border rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Authority Score
                </h3>
                <p className="text-3xl font-bold text-primary">
                  {auditData.authorityScore}
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Organic Traffic
                </h3>
                <p className="text-3xl font-bold">
                  {(auditData.organicSearchTraffic / 1000).toFixed(1)}K
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Paid Traffic
                </h3>
                <p className="text-3xl font-bold">
                  {auditData.paidSearchTraffic}
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Backlinks
                </h3>
                <p className="text-3xl font-bold">
                  {(auditData.backlinks / 1000).toFixed(0)}K
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid md:grid-cols-2 gap-8">
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center justify-between">
                    Organic Search
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold">
                        {(auditData.organicSearchTraffic / 1000).toFixed(1)}K
                    </div>
                    <div className="flex items-center text-sm text-red-500">
                        -0.2%
                    </div>
                    <Separator className="my-4" />
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Keywords</span>
                        <div className="font-semibold flex items-center gap-1">
                            {(auditData.organicKeywords / 1000).toFixed(0)}K
                            <ArrowUp className="h-4 w-4 text-green-500" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center justify-between">
                    Backlink Profile
                    <LinkIcon className="h-5 w-5 text-muted-foreground" />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold">
                        {(auditData.backlinks / 1000).toFixed(0)}K
                    </div>
                     <p className="text-sm text-muted-foreground">from {auditData.referringDomains} domains</p>
                    <Separator className="my-4" />
                    <div className="text-xs text-muted-foreground">
                        A strong backlink profile is crucial for improving domain authority and search rankings.
                    </div>
                </CardContent>
            </Card>
        </div>


        <div className="mt-12 text-center text-xs text-muted-foreground">
          <p>
            This report was generated by SEO Clarity.
          </p>
          <p>
            The data is based on a snapshot from our latest audit and is
            intended for informational purposes.
          </p>
        </div>
      </div>
    </div>
  );
}
