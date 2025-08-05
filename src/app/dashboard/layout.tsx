
import Link from "next/link";
import {
  Activity,
  Briefcase,
  ChevronDown,
  Home,
  LogOut,
  Menu,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/data";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DashboardLayoutClient } from "./layout-client";
import clientPromise from "@/lib/mongodb";
import type { User } from "@/lib/types";

async function getClients(): Promise<User[]> {
    try {
        const client = await clientPromise;
        const db = client.db('seoAudit');
        const users = await db.collection('users').find({ role: 'client' }).toArray();
        return JSON.parse(JSON.stringify(users));
    } catch (error) {
        console.error('Failed to fetch clients:', error);
        return [];
    }
}


export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const clients = await getClients();
  
  return (
    <DashboardLayoutClient clients={clients}>
        {children}
    </DashboardLayoutClient>
  );
}
