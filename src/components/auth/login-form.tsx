"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Activity } from "lucide-react";

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

export function LoginForm() {
  const router = useRouter();

  const handleAgencyLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/otp?redirect=/dashboard");
  };

  const handleClientLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/otp?redirect=/client-dashboard");
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-headline">
          <Activity className="h-6 w-6 text-primary" />
          SEO Clarity
        </CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAgencyLogin} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              defaultValue="agency@example.com"
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                href="#"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" required defaultValue="password" />
          </div>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
          <Button variant="outline" className="w-full" onClick={handleClientLogin}>
            Sign in as Client
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
