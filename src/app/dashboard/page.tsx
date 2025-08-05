
'use client';

import { useState } from "react";
import { Suspense } from "react";
import { DashboardHeader } from "./dashboard-header";
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
  Globe,
  Link as LinkIcon,
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
import type { AuditData } from "@/lib/types";
import { ManualDataForm } from "@/components/dashboard/manual-data-form";

const initialAuditData: AuditData = {
  authorityScore: 30,
  organicSearchTraffic: 3600,
  paidSearchTraffic: 126,
  backlinks: 7000,
  referringDomains: 731,
  organicKeywords: 1000,
  paidKeywords: 8,
  trafficOverviewData: [
    { date: "2024-03-01", organic: 5200, paid: 500 },
    { date: "2024-04-01", organic: 5100, paid: 550 },
    { date: "2024-05-01", organic: 4800, paid: 600 },
    { date: "2024-06-01", organic: 3500, paid: 450 },
    { date: "2024-07-01", organic: 3800, paid: 500 },
    { date: "2024-08-01", organic: 3633, paid: 400 },
  ],
  countryDistributionData: [
    { country: "Worldwide", share: 100, traffic: "3.6K", keywords: "1K" },
    { country: "🇺🇸 US", share: 58, traffic: "2.1K", keywords: "689" },
    { country: "🇮🇳 IN", share: 12, traffic: "429", keywords: "23" },
    { country: "🇦🇺 AU", share: 1, traffic: "1", keywords: "16" },
    { country: "Other", share: 30, traffic: "1.1K", keywords: "318" },
  ],
  keywordsByIntentData: [
    { intent: 'Informational', percentage: 27.8, keywords: 5, traffic: 0, color: 'bg-blue-500' },
    { intent: 'Navigational', percentage: 5.6, keywords: 1, traffic: 0, color: 'bg-purple-500' },
    { intent: 'Commercial', percentage: 50, keywords: 9, traffic: 1, color: 'bg-yellow-400' },
    { intent: 'Transactional', percentage: 16.7, keywords: 3, traffic: 0, color: 'bg-teal-500' },
  ],
  topOrganicKeywordsData: [
      { keyword: "police brand wat...", intent: ["C"], position: null, serp: true, volume: 90, cpc: 0.23, traffic: 100.00 },
      { keyword: "watch tel", intent: ["C"], position: 64, serp: false, volume: 320, cpc: 0.57, traffic: 0.00 },
      { keyword: "police wtch", intent: ["C"], position: null, serp: true, volume: 50, cpc: 0.22, traffic: 0.00 },
      { keyword: "mens infinity bra...", intent: ["I", "T"], position: 37, serp: false, volume: 70, cpc: 0.92, traffic: 0.00 },
      { keyword: "father and son o...", intent: ["I"], position: 36, serp: false, volume: 50, cpc: 0.00, traffic: 0.00 },
  ],
  mainOrganicCompetitorsData: [
    { competitor: "cajeestimezone.c...", comLevel: 80, comKeywords: 3, seKeywords: 43 },
    { competitor: "timeshop24.co.uk", comLevel: 20, comKeywords: 1, seKeywords: 48 },
    { competitor: "customworksaus...", comLevel: 10, comKeywords: 1, seKeywords: 146 },
    { competitor: "style-old-money...", comLevel: 15, comKeywords: 1, seKeywords: 67 },
    { competitor: "laphont.com", comLevel: 12, comKeywords: 1, seKeywords: 47 },
  ],
  competitivePositioningData: [
      { name: 'cajeestimezone.c...', organicKeywords: 45, organicSearchTraffic: 50, z: 2.4 },
      { name: 'timeshop24.co.uk', organicKeywords: 60, organicSearchTraffic: 40, z: 2.4 },
      { name: 'customworksaus...', organicKeywords: 145, organicSearchTraffic: 30, z: 2.4 },
      { name: 'style-old-money...', organicKeywords: 70, organicSearchTraffic: 20, z: 2.4 },
      { name: 'laphont.com', organicKeywords: 50, organicSearchTraffic: 350, z: 2.4 },
      { name: 'egardwatches.com', organicKeywords: 20, organicSearchTraffic: 10, z: 2.4 },
  ],
};


export default function DashboardPage() {
  const [auditData, setAuditData] = useState<AuditData>(initialAuditData);

  const handleDataUpdate = (newData: Partial<AuditData>) => {
    setAuditData(prevData => ({...prevData, ...newData}));
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
       <Suspense>
        <DashboardHeader />
      </Suspense>

      <ManualDataForm onDataUpdate={handleDataUpdate} />

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
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
            <div className="space-y-4 md:space-y-8">
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
                <div className="grid auto-rows-min gap-4 md:gap-8 md:grid-cols-2">
                  <CountryDistribution data={auditData.countryDistributionData} />
                  <KeywordsByIntent data={auditData.keywordsByIntentData} />
                </div>
            </div>

            <div className="space-y-4 md:space-y-8">
              <div className="grid auto-rows-min gap-4 md:gap-8 md:grid-cols-2">
                <CompetitorAnalysis />
                <TopOrganicKeywords data={auditData.topOrganicKeywordsData} />
              </div>
              <div className="grid gap-4 md:gap-8 lg:grid-cols-2 mt-4">
                <MainOrganicCompetitors data={auditData.mainOrganicCompetitorsData} />
                <CompetitivePositioningMap data={auditData.competitivePositioningData} />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
