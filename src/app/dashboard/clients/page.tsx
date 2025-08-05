'use server';

import Image from "next/image";
import Link from "next/link";
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
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import type { User } from "@/lib/types";
import clientPromise from "@/lib/mongodb";

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


export default async function ClientsPage() {
    const clients: User[] = await getClients();

  return (
    <div className="p-4 md:p-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-headline">Your Clients</CardTitle>
            <CardDescription>A list of all your clients.</CardDescription>
          </div>
          <Button asChild>
            <Link href="/dashboard/clients/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Client
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
           {clients.length === 0 ? (
             <div className="text-center text-muted-foreground py-12">
                <p>You haven't added any clients yet.</p>
                <Button asChild className="mt-4">
                  <Link href="/dashboard/clients/new">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Your First Client
                  </Link>
                </Button>
            </div>
           ) : (
            <>
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clients.map((client) => (
                      <TableRow key={client._id.toString()}>
                        <TableCell className="font-medium flex items-center gap-3">
                          <Image
                            src={client.logoUrl || 'https://placehold.co/32x32.png'}
                            alt={client.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                            data-ai-hint="logo"
                          />
                          {client.name}
                        </TableCell>
                        <TableCell>
                          <Button asChild variant="outline" size="sm">
                            <Link href={`/dashboard/clients/${client._id.toString()}`}>
                              View Details
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="md:hidden space-y-4">
                {clients.map((client) => (
                  <Card key={client._id.toString()}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Image
                          src={client.logoUrl || 'https://placehold.co/40x40.png'}
                          alt={client.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                          data-ai-hint="logo"
                        />
                        <div>
                          <CardTitle className="text-lg">{client.name}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button asChild variant="outline" className="w-full">
                        <Link href={`/dashboard/clients/${client._id.toString()}`}>
                          View Details
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
