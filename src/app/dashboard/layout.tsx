
import { Suspense } from "react";
import { SidebarWrapper } from "@/components/dashboard/sidebar-wrapper";
import clientPromise from "@/lib/mongodb";
import type { User } from "@/lib/types";

// In a real app, you'd get this from the user's session
async function getAdminUser(): Promise<User | null> {
    try {
        const client = await clientPromise;
        const db = client.db('seoAudit');
        // Find the first admin user for this prototype
        const user = await db.collection('users').findOne({ role: 'admin' });
        if (!user) return null;
        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.error('Failed to fetch admin user:', error);
        return null;
    }
}


export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adminUser = await getAdminUser();
  
  return (
    <SidebarWrapper adminUser={adminUser}>
      {children}
    </SidebarWrapper>
  );
}
