
"use client";

import { useSearchParams } from "next/navigation";
import { useFormStatus, useActionState } from "react-dom";
import React from "react";
import { LoaderCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending && <LoaderCircle className="mr-2 animate-spin" />}
            Verify
        </Button>
    )
}

export function OtpForm({ verifyOtp }: { verifyOtp: (prevState: any, formData: FormData) => Promise<any> }) {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const { toast } = useToast();
  const [state, formAction] = useActionState(verifyOtp, null);

  React.useEffect(() => {
    if (state?.message) {
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">
          Enter Verification Code
        </CardTitle>
        <CardDescription>
          A one-time password has been sent to your email: <strong>{email}</strong>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="grid gap-4">
          <input type="hidden" name="email" value={email || ''} />
          <div className="grid gap-2">
            <Label htmlFor="otp">One-Time Password</Label>
            <Input
              id="otp"
              name="otp"
              type="text"
              placeholder="123456"
              required
              maxLength={6}
              minLength={6}
            />
             {state?.errors?.otp && <p className="text-sm font-medium text-destructive">{state.errors.otp}</p>}
          </div>
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
