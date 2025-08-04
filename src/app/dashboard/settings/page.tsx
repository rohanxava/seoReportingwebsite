
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
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  const handleSaveChanges = () => {
    toast({
      title: "Settings Saved",
      description: "Your changes have been successfully saved.",
    });
  };

  const handleThemeChange = (value: string) => {
    setTheme(value);
  }

  return (
    <div className="p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Settings</CardTitle>
          <CardDescription>
            Manage your account and application settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" defaultValue="Agency Admin" readOnly />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="agency@example.com" readOnly />
          </div>
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
          <Button onClick={handleSaveChanges}>Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}
