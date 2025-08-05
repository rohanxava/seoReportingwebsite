'use client';

import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import Link from 'next/link';
import { LoaderCircle, Mail } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending && <LoaderCircle className="mr-2 animate-spin" />}
      Send Reset Link
    </Button>
  );
}

export function ForgotPasswordForm({ requestPasswordReset }: { requestPasswordReset: (prevState: any, formData: FormData) => Promise<any>; }) {
  const { toast } = useToast();
  const [state, formAction] = useActionState(requestPasswordReset, null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (state?.success) {
      setSubmitted(true);
    } else if (state?.message) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
  }, [state, toast]);

  if (submitted) {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader className="items-center text-center">
          <Mail className="h-12 w-12 text-primary" />
          <CardTitle className="text-2xl font-headline">Check your email</CardTitle>
          <CardDescription>
            If an account with that email exists, we have sent a password reset link to it.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Button asChild className="w-full">
                <Link href="/">Back to Login</Link>
            </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Forgot Password?</CardTitle>
        <CardDescription>
          No worries, we'll send you reset instructions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
            />
            {state?.errors?.email && (
              <p className="text-sm font-medium text-destructive">
                {state.errors.email}
              </p>
            )}
          </div>
          <SubmitButton />
        </form>
        <div className="mt-4 text-center text-sm">
          <Link href="/" className="underline">
            Back to login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}