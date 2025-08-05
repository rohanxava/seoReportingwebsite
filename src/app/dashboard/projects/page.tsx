
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText, PlusCircle } from "lucide-react";
import clientPromise from "@/lib/mongodb";
import type { User, Project } from "@/lib/types";
import { ObjectId } from "mongodb";

// Helper function to get the current admin user.
// In a real app, this would come from a session.
async function getAdmin() {
    const client = await clientPromise;
    const db = client.db('seoAudit');
    const admin = await db.collection('users').findOne({ role: 'admin' });
    if (!admin) {
        throw new Error("No admin user found in the database.");
    }
    return admin;
}

async function getClients(): Promise<User[]> {
    try {
        const admin = await getAdmin();
        const adminId = admin._id;

        const client = await clientPromise;
        const db = client.db('seoAudit');
        const users = await db.collection('users').find({ 
            role: 'client',
            createdBy: new ObjectId(adminId) 
        }).toArray();
        return JSON.parse(JSON.stringify(users));
    } catch (error) {
        console.error('Failed to fetch clients:', error);
        return [];
    }
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

export default async function ProjectsPage() {
  const clients = await getClients();
  const projects = await getProjects();
  
  const clientMap = new Map(clients.map(c => [c._id.toString(), c.name]));
  const getClientName = (clientId: ObjectId | string) => {
    return clientMap.get(clientId.toString()) || "N/A";
  };

  return (
    <div className="p-4 md:p-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-headline">All Projects</CardTitle>
            <CardDescription>
              A list of all SEO projects you are managing.
            </CardDescription>
          </div>
           <Button asChild>
            <Link href="/dashboard/projects/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Project
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {projects.length === 0 ? (
             <div className="text-center text-muted-foreground py-12">
                <p>You haven't created any projects yet.</p>
                <Button asChild className="mt-4">
                  <Link href="/dashboard/projects/new">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Your First Project
                  </Link>
                </Button>
            </div>
          ) : (
            <>
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project Name</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Domain</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map((project) => (
                      <TableRow key={project._id.toString()}>
                        <TableCell className="font-medium">{project.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {getClientName(project.clientId)}
                          </Badge>
                        </TableCell>
                        <TableCell>{project.domain}</TableCell>
                        <TableCell>
                          <Button asChild variant="outline" size="sm">
                            <Link href={`/dashboard/reports/${project._id.toString()}`}>
                              <FileText className="mr-2 h-4 w-4" />
                              Generate Report
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="md:hidden space-y-4">
                {projects.map((project) => (
                  <Card key={project._id.toString()}>
                    <CardHeader>
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <CardDescription>{project.domain}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                      <Badge variant="outline" className="w-fit">
                            {getClientName(project.clientId)}
                      </Badge>
                      <Button asChild variant="outline" size="sm">
                            <Link href={`/dashboard/reports/${project._id.toString()}`}>
                              <FileText className="mr-2 h-4 w-4" />
                              Generate Report
                            </Link>
                          </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
