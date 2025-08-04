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
import { clients } from "@/lib/data";

export default function ClientsPage() {
  return (
    <div className="p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Your Clients</CardTitle>
          <CardDescription>
            A list of all your clients.
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                  <TableRow key={client.id}>
                    <TableCell className="font-medium flex items-center gap-3">
                      <Image
                        src={client.logo}
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
                        <Link href={`/dashboard/clients/${client.id}`}>
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
              <Card key={client.id}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Image
                      src={client.logo}
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
                    <Link href={`/dashboard/clients/${client.id}`}>
                      View Details
                    </Link>
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
