
import clientPromise from "@/lib/mongodb";
import type { Project } from "@/lib/types";
import { DashboardHeader as DashboardHeaderClient } from "@/components/dashboard/dashboard-header";
import { suggestKeywords } from "@/ai/flows/suggest-keywords-to-target";
import { suggestContentImprovements } from "@/ai/flows/suggest-content-improvements";
import { ObjectId } from "mongodb";

async function getAdmin() {
    const client = await clientPromise;
    const db = client.db('seoAudit');
    const admin = await db.collection('users').findOne({ role: 'admin' });
    if (!admin) {
        throw new Error("No admin user found in the database.");
    }
    return admin;
}

async function getProjects(): Promise<Project[]> {
    try {
        const admin = await getAdmin();
        const adminId = admin._id;

        const client = await clientPromise;
        const db = client.db('seoAudit');
        const projects = await db.collection('projects').find({ 
            createdBy: new ObjectId(adminId) 
        }).toArray();

        return JSON.parse(JSON.stringify(projects));
    } catch (error) {
        console.error('Failed to fetch projects:', error);
        return [];
    }
}


export async function DashboardHeader() {
  const projects = await getProjects();
  return (
    <DashboardHeaderClient 
        projects={projects}
        suggestKeywords={suggestKeywords}
        suggestContentImprovements={suggestContentImprovements}
     />
  );
}
