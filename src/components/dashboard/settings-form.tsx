
'use client';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "next-themes";
import { useEffect, useState, useActionState } from "react";
import type { User } from "@/lib/types";
import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";

const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
             {pending && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
            Save All Changes
        </Button>
    )
}

interface SettingsFormProps {
    adminUser: User;
    updateAdminDetails: (prevState: any, formData: FormData) => Promise<any>;
}

export function SettingsForm({ adminUser, updateAdminDetails }: SettingsFormProps) {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [state, formAction] = useActionState(updateAdminDetails, null);

  useEffect(() => {
    setMounted(true);
  }, []);
  
   useEffect(() => {
    if (state?.success) {
      toast({
        title: "Settings Saved",
        description: state.message,
      });
    } else if (state?.message) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
  }, [state, toast]);


  const handleThemeChange = (value: string) => {
    setTheme(value);
  }

  return (
    <form action={formAction}>
      <div className="p-4 md:p-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Account Settings</CardTitle>
            <CardDescription>
              Manage your account settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" defaultValue={adminUser.name} />
               {state?.errors?.name && <p className="text-sm font-medium text-destructive">{state.errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={adminUser.email} readOnly />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Application Settings</CardTitle>
            <CardDescription>
              Manage your application settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              {mounted && (
              <Select value={theme} onValueChange={handleThemeChange}>
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">API Settings</CardTitle>
            <CardDescription>
              Configure your third-party API keys.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="seo-api-key">SEO Audit API Key</Label>
              <Input id="seo-api-key" type="password" placeholder="Enter your API key" />
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-end">
            <input type="hidden" name="adminId" value={adminUser._id.toString()} />
            <SubmitButton />
        </div>
      </div>
    </form>
  );
}
