
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  ArrowDown,
  ArrowUp,
  Circle,
  ExternalLink,
  Globe,
  Link as LinkIcon,
  PieChart,
  Upload,
} from "lucide-react";
import { TrafficOverview } from "@/components/dashboard/traffic-overview";
import { CountryDistribution } from "@/components/dashboard/country-distribution";

export default function DashboardPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <DashboardHeader />
      <Tabs defaultValue="overview">
        <div className="flex items-center justify-between">
          <TabsList>
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
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  Authority Score
                  <Circle className="h-4 w-4 text-muted-foreground" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary">30</div>
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
                <div className="text-4xl font-bold">3.6K</div>
                <div className="flex items-center text-xs">
                  <span className="text-red-500 mr-1">-0.2%</span>
                  <Button variant="link" className="p-0 h-auto text-muted-foreground">View details</Button>
                </div>
                 <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  Keywords 1K <ArrowUp className="h-3 w-3 text-green-500" />
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
                <div className="text-4xl font-bold">126</div>
                 <div className="flex items-center text-xs">
                  <span className="text-red-500">-2.3%</span>
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  Keywords 8 <ArrowDown className="h-3 w-3 text-red-500" />
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
                <div className="text-4xl font-bold">7K</div>
                <p className="text-xs text-muted-foreground">
                  Referring Domains 731
                </p>
              </CardContent>
            </Card>
            <Card>
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
          <div className="grid gap-4 md:gap-8 lg:grid-cols-5">
             <div className="lg:col-span-2">
                <CountryDistribution />
            </div>
            <div className="lg:col-span-3">
              <Card>
                 <CardHeader>
                  <div className="flex items-center justify-between">
                     <Tabs defaultValue="organic" className="w-full">
                        <div className="flex items-center justify-between">
                          <div className="flex items-baseline gap-2">
                             <TabsList>
                              <TabsTrigger value="organic">Organic</TabsTrigger>
                              <TabsTrigger value="paid">Paid</TabsTrigger>
                            </TabsList>
                            <h3 className="text-xl font-bold">Organic Traffic <span className="text-base font-normal text-muted-foreground">3,633/month</span></h3>
                          </div>
                           <div className="flex items-center gap-2">
                            <Tabs defaultValue="6m" className="hidden md:block">
                               <TabsList>
                                <TabsTrigger value="1m">1M</TabsTrigger>
                                <TabsTrigger value="6m">6M</TabsTrigger>
                                <TabsTrigger value="1y">1Y</TabsTrigger>
                                <TabsTrigger value="2y">2Y</TabsTrigger>
                                <TabsTrigger value="all">All time</TabsTrigger>
                              </TabsList>
                            </Tabs>
                             <Tabs defaultValue="days" className="hidden md:block">
                               <TabsList>
                                <TabsTrigger value="days">Days</TabsTrigger>
                                <TabsTrigger value="months">Months</TabsTrigger>
                              </TabsList>
                            </Tabs>
                            <Button variant="outline">
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
            </div>
           
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
