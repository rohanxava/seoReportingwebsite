
'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AiInsightsSheet } from "./ai-insights-sheet";
import type { Project } from "@/lib/types";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function DashboardHeader({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedProject, setSelectedProject] = useState<string | undefined>(undefined);

  useEffect(() => {
    const projectId = searchParams.get('project');
    if (projectId) {
      setSelectedProject(projectId);
    } else if (projects.length > 0) {
      setSelectedProject(projects[0]._id.toString());
    }
  }, [searchParams, projects]);

  const handleProjectChange = (projectId: string) => {
    setSelectedProject(projectId);
    const params = new URLSearchParams(searchParams);
    params.set('project', projectId);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const currentProject = projects.find(p => p._id.toString() === selectedProject);

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Project Dashboard</h1>
        <p className="text-muted-foreground">
          Showing metrics for {currentProject ? currentProject.name : 'your project'}.
        </p>
      </div>
      <div className="flex items-center space-x-2 w-full md:w-auto">
        <Select value={selectedProject} onValueChange={handleProjectChange}>
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
