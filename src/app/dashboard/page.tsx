import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { TrafficOverview } from "@/components/dashboard/traffic-overview";
import { SiteAudit } from "@/components/dashboard/site-audit";
import { KeywordRankings } from "@/components/dashboard/keyword-rankings";
import { TopPages } from "@/components/dashboard/top-pages";
import { BacklinksOverview } from "@/components/dashboard/backlinks-overview";
import { kpiData } from "@/lib/data";
import { BarChart, Users, LineChart, CheckCircle } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <DashboardHeader />
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <KpiCard 
            title="Total Sessions"
            value={kpiData.sessions.value}
            change={kpiData.sessions.change}
            changeType={kpiData.sessions.changeType}
            icon={<Users />}
          />
          <KpiCard 
            title="Bounce Rate"
            value={kpiData.bounceRate.value}
            change={kpiData.bounceRate.change}
            changeType={kpiData.bounceRate.changeType}
            icon={<BarChart />}
          />
           <KpiCard 
            title="Conversions"
            value={kpiData.conversions.value}
            change={kpiData.conversions.change}
            changeType={kpiData.conversions.changeType}
            icon={<CheckCircle />}
          />
           <KpiCard 
            title="Avg. Ranking"
            value={kpiData.ranking.value}
            change={kpiData.ranking.change}
            changeType={kpiData.ranking.changeType}
            icon={<LineChart />}
          />
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <TrafficOverview />
          </div>
          <div className="lg:col-span-2">
            <SiteAudit />
          </div>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
            <KeywordRankings />
            <TopPages />
        </div>
         <div className="grid gap-4 md:gap-8">
            <BacklinksOverview />
        </div>
      </main>
    </div>
  );
}
