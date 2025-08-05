
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Briefcase,
  Home,
  LogOut,
  Settings,
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
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import type { User } from "@/lib/types";
import { UploadLogoDialog } from "./upload-logo-dialog";
import { updateAdminLogo } from "@/app/actions/user";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function SidebarWrapper({
  children,
  adminUser,
}: {
  children: React.ReactNode;
  adminUser: User | null;
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
        </SidebarContent>
        <SidebarFooter>
          {adminUser && (
             <div className="flex items-center gap-3 p-2">
                <Avatar className="h-9 w-9">
                   <AvatarImage src={adminUser.logoUrl} alt={adminUser.name} data-ai-hint="logo" />
                   <AvatarFallback>{adminUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="text-sm font-medium">{adminUser.name}</span>
                     <UploadLogoDialog updateAdminLogo={updateAdminLogo} adminId={adminUser._id.toString()} />
                </div>
            </div>
          )}
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
