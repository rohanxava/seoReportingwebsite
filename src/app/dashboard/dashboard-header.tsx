import type { Project } from "@/lib/types";
import { DashboardHeader as DashboardHeaderClient } from "@/components/dashboard/dashboard-header";
import { suggestKeywords } from "@/ai/flows/suggest-keywords-to-target";
import { suggestContentImprovements } from "@/ai/flows/suggest-content-improvements";
import { suggestMetaDescription } from "@/ai/flows/suggest-meta-description";
import { suggestBlogIdeas } from "@/ai/flows/suggest-blog-ideas";

interface DashboardHeaderProps {
  projects: Project[];
}

export async function DashboardHeader({ projects }: DashboardHeaderProps) {
  return (
    <DashboardHeaderClient 
        projects={projects}
        suggestKeywords={suggestKeywords}
        suggestContentImprovements={suggestContentImprovements}
        suggestMetaDescription={suggestMetaDescription}
        suggestBlogIdeas={suggestBlogIdeas}
     />
  );
}
