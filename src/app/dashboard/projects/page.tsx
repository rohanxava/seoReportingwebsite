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
import { projects } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import clientPromise from "@/lib/mongodb";
import type { User } from "@/lib/types";

async function getClients(): Promise<User[]> {
    try {
        const client = await clientPromise;
        const db = client.db('seoAudit');
        const users = await db.collection('users').find({ role: 'client' }).toArray();
        return JSON.parse(JSON.stringify(users));
    } catch (error) {
        console.error('Failed to fetch clients:', error);
        return [];
    }
}


export default async function ProjectsPage() {
  const clients = await getClients();
  const getClientName = (clientId: string) => {
    // Note: projects are static, so we match by a static `id` field.
    // In a real app, projects would have a client `_id`.
    const client = clients.find((c, index) => (index + 1).toString() === clientId);
    return client?.name || "N/A";
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
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project Name</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Domain</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {getClientName(project.clientId)}
                      </Badge>
                    </TableCell>
                    <TableCell>{project.domain}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="md:hidden space-y-4">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription>{project.domain}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline">
                        {getClientName(project.clientId)}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
