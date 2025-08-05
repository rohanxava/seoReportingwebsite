
"use client";

import Link from "next/link";
import { useFormStatus } from "react-dom";
import React from "react";
import { Activity, LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signupUser } from "@/app/actions/auth";
import { useToast } from "@/hooks/use-toast";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending && <LoaderCircle className="mr-2 animate-spin" />}
            Create Account
        </Button>
    )
}

export function SignupForm() {
  const [state, formAction] = React.useActionState(signupUser, null);
  const { toast } = useToast();

  React.useEffect(() => {
    if (state?.message) {
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-headline">
          <Activity className="h-6 w-6 text-primary" />
          SEO Clarity
        </CardTitle>
        <CardDescription>
          Create your agency account to get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="agency-name">Agency Name</Label>
            <Input id="agency-name" name="agencyName" placeholder="Your Agency" required />
            {state?.errors?.agencyName && <p className="text-sm font-medium text-destructive">{state.errors.agencyName}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
             {state?.errors?.email && <p className="text-sm font-medium text-destructive">{state.errors.email}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
             {state?.errors?.password && <p className="text-sm font-medium text-destructive">{state.errors.password}</p>}
          </div>
          <SubmitButton />
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
