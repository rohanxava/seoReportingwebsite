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
import { projects, clients } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

export default function ProjectsPage() {
  const getClientName = (clientId: string) => {
    return clients.find((c) => c.id === clientId)?.name || "N/A";
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
