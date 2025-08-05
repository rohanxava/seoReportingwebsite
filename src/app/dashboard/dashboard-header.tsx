
import clientPromise from "@/lib/mongodb";
import type { Project } from "@/lib/types";
import { DashboardHeader as DashboardHeaderClient } from "@/components/dashboard/dashboard-header";

async function getProjects(): Promise<Project[]> {
    try {
        const client = await clientPromise;
        const db = client.db('seoAudit');
        const projects = await db.collection('projects').find({}).toArray();
        return JSON.parse(JSON.stringify(projects));
    } catch (error) {
        console.error('Failed to fetch projects:', error);
        return [];
    }
}


export async function DashboardHeader() {
  const projects = await getProjects();
  return (
    <DashboardHeaderClient projects={projects} />
  );
}
