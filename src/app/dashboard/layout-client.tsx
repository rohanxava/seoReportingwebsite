
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Briefcase,
  Home,
  LogOut,
  Settings,
  Upload,
  Users,
} from "lucide-react";
import Image from "next/image";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { User } from "@/lib/types";
import { Suspense } from "react";
import { DashboardHeader } from "./dashboard-header";

export function DashboardLayoutClient({
  children,
  clients,
}: {
  children: React.ReactNode;
  clients: User[];
}) {
  const pathname = usePathname();
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Activity className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-headline text-lg font-semibold">
              SEO Clarity
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton href="/dashboard" isActive={pathname === '/dashboard'}>
                <Home />
                Dashboard
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/dashboard/projects" isActive={pathname.startsWith('/dashboard/projects')}>
                <Briefcase />
                All Projects
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton href="/dashboard/clients" isActive={pathname.startsWith('/dashboard/clients')}>
                <Users />
                Clients
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton href="/dashboard/settings" isActive={pathname === '/dashboard/settings'}>
                <Settings />
                Settings
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          <Separator className="my-4" />
          
          <SidebarGroup>
            <SidebarGroupLabel>Your Clients</SidebarGroupLabel>
            <SidebarMenu>
                {clients.map(client => (
                    <SidebarMenuItem key={client._id.toString()}>
                        <SidebarMenuButton href={`/dashboard/clients/${client._id}`} isActive={pathname === `/dashboard/clients/${client._id}`}>
                            <Image src={client.logoUrl || 'https://placehold.co/20x20.png'} alt={client.name} width={20} height={20} className="rounded-full" data-ai-hint="logo" />
                            {client.name}
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
            <Button variant="outline" className="w-full justify-start gap-2">
                <Upload />
                Upload Logo
            </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <SidebarTrigger className="sm:hidden" />
            <div className="flex items-center gap-2 sm:hidden">
              <Activity className="h-6 w-6 text-primary" />
              <span className="font-headline text-lg font-semibold">
                SEO Clarity
              </span>
            </div>
             <div className="flex-1">
              <Suspense>
                <DashboardHeader />
              </Suspense>
            </div>
            <div className="ml-auto flex items-center gap-2">
                <Button asChild variant="outline" size="sm">
                    <Link href="/">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span className="hidden md:inline">Sign Out</span>
                    </Link>
                </Button>
            </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

