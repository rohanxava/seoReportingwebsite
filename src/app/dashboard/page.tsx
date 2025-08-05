

import { Suspense } from "react";
import { DashboardHeader } from "./dashboard-header";
import { DashboardPageClient } from "@/components/dashboard/dashboard-page-client";
import { getProjects } from "../actions/project";
import { getManualReportsForProject } from "../actions/report";
import type { ManualReport } from "@/lib/types";


export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const projects = await getProjects();
  const selectedProjectId = searchParams?.project as string ?? (projects[0]?._id.toString() || null);
  
  let manualReports: ManualReport[] = [];
  if (selectedProjectId) {
      manualReports = await getManualReportsForProject(selectedProjectId);
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
       <Suspense>
        <DashboardHeader projects={projects} />
      </Suspense>
      <DashboardPageClient 
        key={selectedProjectId} // Add key to force re-render on project change
        selectedProjectId={selectedProjectId}
        initialManualReports={manualReports}
       />
    </main>
  );
}
