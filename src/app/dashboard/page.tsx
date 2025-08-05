
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

export default async function DashboardPage() {
  const auditData = {
      authorityScore: 30,
      organicSearchTraffic: 3600,
      paidSearchTraffic: 126,
      backlinks: 7000,
      referringDomains: 731,
      organicKeywords: 1000,
      paidKeywords: 8,
    };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
       <Suspense>
        <DashboardHeader />
      </Suspense>
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
                    <TrafficOverview />
                </CardContent>
            </Card>
            <div className="grid auto-rows-min gap-4 md:gap-8 md:grid-cols-2">
                <CountryDistribution />
                <KeywordsByIntent />
            </div>
            <div className="grid auto-rows-min gap-4 md:gap-8 md:grid-cols-2">
                <CompetitorAnalysis />
                <TopOrganicKeywords />
            </div>
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 mt-4">
              <MainOrganicCompetitors />
              <CompetitivePositioningMap />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
