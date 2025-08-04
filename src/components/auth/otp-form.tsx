"use client";

import { useRouter, useSearchParams } from "next/navigation";
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

export function OtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd verify the OTP here.
    // For this prototype, we'll just redirect.
    router.push(redirectUrl);
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">
          Enter Verification Code
        </CardTitle>
        <CardDescription>
          A one-time password has been sent to your email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleVerify} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="otp">One-Time Password</Label>
            <Input
              id="otp"
              type="text"
              placeholder="123456"
              required
              maxLength={6}
            />
          </div>
          <Button type="submit" className="w-full">
            Verify
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
