
'use server';

import { getProjectForReport } from "@/app/actions/report";
import { ReportView } from "@/components/dashboard/report/report-view";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";


export default async function ReportPage({
  params,
  searchParams
}: {
  params: { projectId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const reportId = searchParams?.report as string | undefined;
  const reportData = await getProjectForReport(params.projectId, reportId);

  if (!reportData) {
    return (
      <div className="p-4 md:p-8">
        <Button asChild variant="outline" size="sm" className="mb-4">
          <Link href="/dashboard/projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>Report Not Found</CardTitle>
            <CardDescription>
              The report you are looking for could not be generated or the
              project does not exist.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Please check the project ID or go back to the projects list.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <ReportView reportData={reportData} />;
}
