
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
import { useToast } from "@/hooks/use-toast";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { Label } from "@/components/ui/label";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
      Add Client
    </Button>
  );
};

export function NewClientForm({ addClientUser }: { addClientUser: (prevState: any, formData: FormData) => Promise<any> }) {
  const router = useRouter();
  const { toast } = useToast();
  const [state, formAction] = useActionState(addClientUser, null);

  useEffect(() => {
    if (state?.success) {
        toast({
            title: "Client Added",
            description: `The client has been successfully added.`,
        });
        router.push("/dashboard/clients");
    } else if (state?.message) {
        toast({
            variant: "destructive",
            title: "Error",
            description: state.message,
        });
    }
  }, [state, toast, router]);


  return (
    <>
      <Button asChild variant="outline" size="sm" className="mb-4">
        <Link href="/dashboard/clients">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Clients
        </Link>
      </Button>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Add a New Client</CardTitle>
          <CardDescription>
            Fill in the details below to create a new client profile and their login credentials.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Label htmlFor="name">Client Name</Label>
                  <Input id="name" name="name" placeholder="e.g. Innovate Inc." required />
                  {state?.errors?.name && <p className="text-sm font-medium text-destructive">{state.errors.name}</p>}
                </div>
                 <div>
                  <Label htmlFor="logoUrl">Logo URL (Optional)</Label>
                  <Input id="logoUrl" name="logoUrl" placeholder="https://example.com/logo.png" />
                   {state?.errors?.logoUrl && <p className="text-sm font-medium text-destructive">{state.errors.logoUrl}</p>}
                </div>
                 <div>
                  <Label htmlFor="email">Client Email</Label>
                  <Input id="email" name="email" type="email" placeholder="client@example.com" required/>
                   {state?.errors?.email && <p className="text-sm font-medium text-destructive">{state.errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" placeholder="********" required/>
                   {state?.errors?.password && <p className="text-sm font-medium text-destructive">{state.errors.password}</p>}
                </div>
              </div>
              <SubmitButton />
            </form>
        </CardContent>
      </Card>
      </>
  );
}
