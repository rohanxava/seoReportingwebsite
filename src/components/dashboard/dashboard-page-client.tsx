
'use client';

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  ArrowDown,
  ArrowUp,
  Circle,
  Download,
  Globe,
  Link as LinkIcon,
  LoaderCircle,
  PieChart,
  Upload,
} from "lucide-react";
import { TrafficOverview } from "@/components/dashboard/traffic-overview";
import { CountryDistribution } from "@/components/dashboard/country-distribution";
import { CompetitorAnalysis } from "@/components/dashboard/competitor-analysis";
import { MainOrganicCompetitors } from "@/components/dashboard/main-organic-competitors";
import { CompetitivePositioningMap } from "@/components/dashboard/competitive-positioning-map";
import { KeywordsByIntent } from "@/components/dashboard/keywords-by-intent";
import { TopOrganicKeywords } from "@/components/client-dashboard/top-organic-keywords";
import type { AuditData, ManualReport } from "@/lib/types";
import { ManualDataForm } from "@/components/dashboard/manual-data-form";
import { getAuditData } from "@/lib/seo";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { getManualReportById } from "@/app/actions/report";
import Link from "next/link";

export function DashboardPageClient({ selectedProjectId, initialManualReports }: { selectedProjectId: string | null, initialManualReports: ManualReport[] }) {
  const [auditData, setAuditData] = useState<AuditData | null>(null);
  const [manualReports, setManualReports] = useState<ManualReport[]>(initialManualReports);
  const [isLoading, setIsLoading] = useState(true);
  const [isReportLoading, setIsReportLoading] = useState(false);
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const selectedReportId = searchParams.get('report');


  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      let report;
      if (selectedReportId) {
        report = await getManualReportById(selectedReportId);
      }
      
      if (report) {
         setAuditData(report.auditData);
      } else {
         setAuditData(await getAuditData());
      }
      setIsLoading(false);
      setIsReportLoading(false);
    };

    loadData();
  }, [selectedReportId]);

  useEffect(() => {
    setManualReports(initialManualReports);
  }, [initialManualReports]);

  const handleReportSaveOrUpdate = (savedReport: ManualReport) => {
    setManualReports(prev => {
        const existingIndex = prev.findIndex(r => r._id === savedReport._id);
        if (existingIndex !== -1) {
            const newReports = [...prev];
            newReports[existingIndex] = savedReport;
            return newReports;
        } else {
            return [savedReport, ...prev];
        }
    });
  }


  const handleDataUpdate = (newData: Partial<AuditData>) => {
    setAuditData(prevData => prevData ? {...prevData, ...newData} : null);
  }

  const handleReportSelect = (reportId: string) => {
    if (!reportId || reportId === "live-data") {
        const params = new URLSearchParams(searchParams);
        params.delete('report');
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        return;
    }
    setIsReportLoading(true);
    const params = new URLSearchParams(searchParams);
    params.set('report', reportId);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  if (isLoading || !auditData) {
    return (
        <div className="flex items-center justify-center h-64">
            <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
        </div>
    );
  }
  
  const currentReport = selectedReportId ? manualReports.find(r => r._id.toString() === selectedReportId) : null;


  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <ManualDataForm 
            projectId={selectedProjectId}
            onDataUpdate={handleDataUpdate}
            onReportSave={handleReportSaveOrUpdate}
            initialData={currentReport}
        />
        <div className="flex gap-2 w-full md:w-auto">
            <Select onValueChange={handleReportSelect} value={selectedReportId || "live-data"} disabled={isReportLoading}>
                <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Load a saved report" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="live-data">View Live Data</SelectItem>
                    {manualReports.length > 0 ? (
                        manualReports.map(report => (
                            <SelectItem key={report._id.toString()} value={report._id.toString()}>
                                {report.reportName}
                            </SelectItem>
                        ))
                    ) : (
                        <SelectItem value="no-reports" disabled>No saved reports</SelectItem>
                    )}
                </SelectContent>
            </Select>
            <Button asChild variant="outline">
                <Link href={`/dashboard/reports/${selectedProjectId}?report=${selectedReportId || ''}`}>
                    <Download className="mr-2 h-4 w-4" />
                    Report
                </Link>
            </Button>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <div className="flex items-center justify-between">
          <TabsList className="overflow-x-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="compare_domains" disabled>
              Compare domains
            </TabsTrigger>
            <TabsTrigger value="growth_report" disabled>
              Growth report
            </TabsTrigger>
            <TabsTrigger value="compare_countries" disabled>
              Compare by countries
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  Authority Score
                  <Circle className="h-4 w-4 text-muted-foreground" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary">{auditData.authorityScore}</div>
                <p className="text-xs text-muted-foreground">
                  Semrush Domain Rank 2.7M
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  Organic Search Traffic
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">
                  {(auditData.organicSearchTraffic / 1000).toFixed(1)}K
                </div>
                <div className="flex items-center text-xs">
                  <span className="text-red-500 mr-1">-0.2%</span>
                </div>
                 <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  Keywords {(auditData.organicKeywords / 1000).toFixed(0)}K <ArrowUp className="h-3 w-3 text-green-500" />
                </p>
              </CardContent>
            </Card>
             <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  Paid Search Traffic
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{auditData.paidSearchTraffic}</div>
                 <div className="flex items-center text-xs">
                  <span className="text-red-500">-2.3%</span>
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  Keywords {auditData.paidKeywords} <ArrowDown className="h-3 w-3 text-red-500" />
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  Backlinks
                  <LinkIcon className="h-4 w-4 text-muted-foreground" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">
                  {(auditData.backlinks / 1000).toFixed(0)}K
                </div>
                <p className="text-xs text-muted-foreground">
                  Referring Domains {auditData.referringDomains}
                </p>
              </CardContent>
            </Card>
            <Card className="col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  Traffic Share
                   <PieChart className="h-4 w-4 text-muted-foreground" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">2%</div>
                <p className="text-xs text-muted-foreground">
                  Competitors 65
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:gap-8 lg:grid-cols-1">
            <div className="lg:col-span-1 space-y-4 md:space-y-8">
                 <Card>
                    <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <Tabs defaultValue="organic" className="w-full">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <div className="flex items-baseline gap-2">
                                <TabsList>
                                <TabsTrigger value="organic">Organic</TabsTrigger>
                                <TabsTrigger value="paid">Paid</TabsTrigger>
                                </TabsList>
                                <h3 className="text-xl font-bold hidden lg:inline">Organic Traffic <span className="text-base font-normal text-muted-foreground">3,633/month</span></h3>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                                <Tabs defaultValue="6m" className="hidden md:block">
                                <TabsList>
                                    <TabsTrigger value="1m">1M</TabsTrigger>
                                    <TabsTrigger value="6m">6M</TabsTrigger>
                                    <TabsTrigger value="1y">1Y</TabsTrigger>
                                    <TabsTrigger value="all">All</TabsTrigger>
                                </TabsList>
                                </Tabs>
                                <Button variant="outline" size="sm">
                                    <Upload className="mr-2 h-4 w-4" />
                                    Export
                                </Button>
                            </div>
                            </div>
                        </Tabs>
                    </div>
                    </CardHeader>
                    <CardContent>
                        <TrafficOverview data={auditData.trafficOverviewData} />
                    </CardContent>
                </Card>
            </div>
            
            <div className="lg:col-span-1 grid auto-rows-min gap-4 md:gap-8 md:grid-cols-2">
              <CountryDistribution data={auditData.countryDistributionData} />
              <KeywordsByIntent data={auditData.keywordsByIntentData} />
            </div>

            <div className="lg:col-span-1 grid auto-rows-min gap-4 md:gap-8 md:grid-cols-2">
              <CompetitorAnalysis />
              <TopOrganicKeywords data={auditData.topOrganicKeywordsData} />
            </div>
            <div className="lg:col-span-1 grid gap-4 md:gap-8 lg:grid-cols-2 mt-4">
              <MainOrganicCompetitors data={auditData.mainOrganicCompetitorsData} />
              <CompetitivePositioningMap data={auditData.competitivePositioningData} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
