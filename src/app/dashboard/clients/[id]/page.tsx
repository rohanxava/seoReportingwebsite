
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { clients, projects } from "@/lib/data";
import Link from "next/link";

export default function ClientDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const client = clients.find((c) => c.id === params.id);
  const clientProjects = projects.filter((p) => p.clientId === params.id);

  if (!client) {
    return (
      <div className="p-4 md:p-8">
        <h1 className="text-2xl font-bold">Client not found</h1>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-4">
       <Button asChild variant="outline" size="sm" className="mb-4">
          <Link href="/dashboard/clients">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Clients
          </Link>
        </Button>
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Image
            src={client.logo}
            alt={client.name}
            width={64}
            height={64}
            className="rounded-full"
            data-ai-hint="logo"
          />
          <div>
            <CardTitle className="font-headline">{client.name}</CardTitle>
            <CardDescription>
              Details and projects for {client.name}.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="font-headline text-lg mb-2">Projects</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {clientProjects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription>{project.domain}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <Link href="/client-dashboard">View Dashboard</Link>
                    </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
