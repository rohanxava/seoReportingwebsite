
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import type { User } from "@/lib/types";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Project name must be at least 2 characters.",
  }),
  domain: z.string().regex(/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/, {
    message: "Please enter a valid domain name.",
  }),
  clientId: z.string({
    required_error: "Please select a client.",
  }),
});

async function getClients(): Promise<User[]> {
    try {
        // This is a client component, so we need to fetch from an API route
        // or use a server action. For simplicity, we'll fetch from an API route
        // if we were to build one. As a placeholder, we'll return an empty array
        // and assume a future API endpoint would provide the clients.
        // In a real app, you would fetch this from '/api/clients' for example.
        const res = await fetch('/api/clients');
        if (!res.ok) return [];
        const clients = await res.json();
        return clients;
    } catch (error) {
        console.error('Failed to fetch clients:', error);
        return [];
    }
}

export default function NewProjectPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState<User[]>([]);

  useEffect(() => {
    // Since this is a client component, we cannot directly query the DB.
    // A proper implementation would involve creating an API route to fetch clients.
    // For now, we'll simulate this by setting an empty array, but the form will be disabled.
    // To make this fully functional, an API endpoint at `/api/clients` would be needed.
    const fetchClients = async () => {
      // const fetchedClients = await getClients();
      // setClients(fetchedClients);
    };
    fetchClients();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      domain: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    console.log(values);
    // Here you would typically make an API call to save the data.
    // For this prototype, we'll simulate a delay and show a toast.
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Project Added",
        description: `${values.name} has been successfully added.`,
      });
      router.push("/dashboard/projects");
    }, 1000);
  }

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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Company Website Redesign" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="domain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Domain Name</FormLabel>
                    <FormControl>
                      <Input placeholder="example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="clientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assign to Client</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value} disabled={clients.length === 0}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a client" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {clients.map(client => (
                            <SelectItem key={client._id.toString()} value={client._id.toString()}>{client.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                     {clients.length === 0 && <FormDescription>To assign a project, first add a client.</FormDescription>}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading}>
                {loading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                Add Project
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
