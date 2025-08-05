
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AiInsightsSheet } from "./ai-insights-sheet";
import clientPromise from "@/lib/mongodb";
import type { Project } from "@/lib/types";

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
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Project Dashboard</h1>
        <p className="text-muted-foreground">
          Showing metrics for {projects.length > 0 ? projects[0].name : 'your project'}.
        </p>
      </div>
      <div className="flex items-center space-x-2 w-full md:w-auto">
        <Select defaultValue={projects.length > 0 ? projects[0]._id.toString() : undefined}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Select a project" />
          </SelectTrigger>
          <SelectContent>
            {projects.map((project) => (
              <SelectItem key={project._id.toString()} value={project._id.toString()}>
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <AiInsightsSheet />
      </div>
    </div>
  );
}
