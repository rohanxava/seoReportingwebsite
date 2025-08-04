import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { projects } from "@/lib/data";
import { AiInsightsSheet } from "./ai-insights-sheet";

export function DashboardHeader() {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Project Dashboard</h1>
        <p className="text-muted-foreground">
          Showing metrics for Innovate Website.
        </p>
      </div>
      <div className="flex items-center space-x-2 w-full md:w-auto">
        <Select defaultValue="p1">
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Select a project" />
          </SelectTrigger>
          <SelectContent>
            {projects.map((project) => (
              <SelectItem key={project.id} value={project.id}>
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
