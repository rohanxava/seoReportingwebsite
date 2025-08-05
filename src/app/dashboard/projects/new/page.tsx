
'use client';

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { addProject } from "@/app/actions/project";
import { getClients } from "@/app/actions/client";
import type { User } from "@/lib/types";
import { Label } from "@/components/ui/label";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
      Add Project
    </Button>
  );
};

export default function NewProjectPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [state, formAction] = useActionState(addProject, null);
  const [clients, setClients] = useState<User[]>([]);

  useEffect(() => {
    async function fetchClients() {
        const fetchedClients = await getClients();
        setClients(fetchedClients);
    }
    fetchClients();
  }, []);

  useEffect(() => {
    if (state?.success) {
        toast({
            title: "Project Added",
            description: `The project has been successfully added.`,
        });
        router.push("/dashboard/projects");
    } else if (state?.message) {
        toast({
            variant: "destructive",
            title: "Error",
            description: state.message,
        });
    }
  }, [state, toast, router]);

  return (
    <div className="p-4 md:p-8">
       <Button asChild variant="outline" size="sm" className="mb-4">
          <Link href="/dashboard/projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </Button>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Add a New Project</CardTitle>
          <CardDescription>
            Fill in the details below to create a new project.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Label htmlFor="name">Project Name</Label>
                  <Input id="name" name="name" placeholder="e.g. Company Website Redesign" required />
                  {state?.errors?.name && <p className="text-sm font-medium text-destructive">{state.errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="domain">Domain Name</Label>
                  <Input id="domain" name="domain" placeholder="example.com" required />
                  {state?.errors?.domain && <p className="text-sm font-medium text-destructive">{state.errors.domain}</p>}
                </div>
                <div>
                    <Label htmlFor="clientId">Assign to Client</Label>
                     <Select name="clientId" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a client" />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.map(client => (
                            <SelectItem key={client._id.toString()} value={client._id.toString()}>{client.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                     {clients.length === 0 && <p className="text-sm text-muted-foreground">To assign a project, first add a client.</p>}
                     {state?.errors?.clientId && <p className="text-sm font-medium text-destructive">{state.errors.clientId}</p>}
                </div>
            </div>
              <SubmitButton />
            </form>
        </CardContent>
      </Card>
    </div>
  );
}
