
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
import Link from "next/link";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import type { User, Project } from "@/lib/types";

async function getClient(id: string): Promise<User | null> {
    try {
        const client = await clientPromise;
        const db = client.db('seoAudit');
        const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.error('Failed to fetch client:', error);
        return null;
    }
}

async function getClientProjects(clientId: string): Promise<Project[]> {
    try {
        const client = await clientPromise;
        const db = client.db('seoAudit');
        const projects = await db.collection('projects').find({ clientId: new ObjectId(clientId) }).toArray();
        return JSON.parse(JSON.stringify(projects));
    } catch (error) {
        console.error('Failed to fetch client projects:', error);
        return [];
    }
}

export default async function ClientDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const client = await getClient(params.id);
  const clientProjects = await getClientProjects(params.id);

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
            src={client.logoUrl || 'https://placehold.co/64x64.png'}
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
              <Card key={project._id.toString()}>
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
