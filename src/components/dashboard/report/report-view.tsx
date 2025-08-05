
'use client';

import { useState } from "react";
import type { ReportData } from "@/app/actions/report";
import { emailReportToClient } from "@/app/actions/report";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { TrafficOverview } from "../traffic-overview";
import { CountryDistribution } from "../country-distribution";
import { KeywordsByIntent } from "../keywords-by-intent";
import { TopOrganicKeywords } from "@/components/client-dashboard/top-organic-keywords";
import { MainOrganicCompetitors } from "../main-organic-competitors";
import { CompetitivePositioningMap } from "../competitive-positioning-map";
import { LoaderCircle, Mail, Printer } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function ReportView({ reportData }: { reportData: ReportData }) {
  const { project, client, auditData, generatedAt } = reportData;
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);

  const handleSendReport = async () => {
    setIsSending(true);
    const result = await emailReportToClient(reportData);
    if (result.success) {
      toast({
        title: "Report Sent",
        description: result.message,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.message,
      });
    }
    setIsSending(false);
  };

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
          <div className="flex items-center gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button disabled={isSending}>
                  {isSending ? (
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Mail className="mr-2 h-4 w-4" />
                  )}
                  Send Report
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Report Email</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will send an email with the report summary to <strong>{client.email}</strong>.
                    Are you sure you want to continue?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSendReport}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button onClick={() => window.print()} variant="outline">
              <Printer className="mr-2 h-4 w-4" />
              Print / Download
            </Button>
          </div>
        </div>
        <div className="text-left sm:text-right mb-8">
            <p className="text-sm">
              Client: <strong>{client.name}</strong>
            </p>
            <p className="text-sm text-muted-foreground">
              Generated on: {generatedAt}
            </p>
        </div>


        <div className="space-y-8">
            <Card>
            <CardHeader>
                <CardTitle>Key Metrics Overview</CardTitle>
                <CardDescription>
                A snapshot of the most important SEO performance indicators for the
                domain.
                </CardDescription>
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

            <Card>
                <CardHeader>
                    <CardTitle>Traffic Overview</CardTitle>
                    <CardDescription>
                        Monthly organic vs. paid traffic trends.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <TrafficOverview data={auditData.trafficOverviewData} />
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
                <CountryDistribution data={auditData.countryDistributionData} />
                <KeywordsByIntent data={auditData.keywordsByIntentData} />
            </div>

            <TopOrganicKeywords data={auditData.topOrganicKeywordsData} />

             <div className="grid md:grid-cols-2 gap-8">
                <MainOrganicCompetitors data={auditData.mainOrganicCompetitorsData} />
                <CompetitivePositioningMap data={auditData.competitivePositioningData} />
            </div>
        </div>


        <div className="mt-12 text-center text-xs text-muted-foreground">
          <p>This report was generated by SEO Clarity.</p>
          <p>
            The data is based on a snapshot from our latest audit and is
            intended for informational purposes.
          </p>
        </div>
      </div>
    </div>
  );
}
