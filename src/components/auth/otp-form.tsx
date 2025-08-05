
"use client";

import { useSearchParams } from "next/navigation";
import { useFormStatus } from "react-dom";
import React, { useActionState, useEffect, useState, useTransition } from "react";
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
import { resendOtp } from "@/app/actions/auth";

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
  const [verifyState, verifyAction] = useActionState(verifyOtp, null);
  const [resendState, resendAction] = useActionState(resendOtp, null);
  const [cooldown, setCooldown] = useState(0);
  const [isResendPending, startResendTransition] = useTransition();

  useEffect(() => {
    if (verifyState?.message) {
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: verifyState.message,
      });
    }
  }, [verifyState, toast]);

  useEffect(() => {
    if (resendState?.success) {
      toast({
        title: "OTP Sent",
        description: resendState.message,
      });
      setCooldown(60);
    } else if (resendState?.message) {
       toast({
        variant: "destructive",
        title: "Error",
        description: resendState.message,
      });
    }
  }, [resendState, toast]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleResend = () => {
    const formData = new FormData();
    if (email) {
      formData.append('email', email);
    }
    startResendTransition(() => {
        resendAction(formData);
    });
  }

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
        <form action={verifyAction} className="grid gap-4">
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
             {verifyState?.errors?.otp && <p className="text-sm font-medium text-destructive">{verifyState.errors.otp}</p>}
          </div>
          <SubmitButton />
        </form>
         <div className="mt-4 text-center text-sm">
          Didn't receive the code?{' '}
          <Button 
            variant="link" 
            className="p-0 h-auto"
            onClick={handleResend}
            disabled={cooldown > 0 || isResendPending}
          >
            {isResendPending && <LoaderCircle className="mr-2 animate-spin" />}
            Resend OTP
            {cooldown > 0 && ` (${cooldown}s)`}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
