
import { Suspense } from "react";
import { DashboardHeader } from "./dashboard-header";
import { SidebarWrapper } from "@/components/dashboard/sidebar-wrapper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const header = (
    <Suspense>
      <DashboardHeader />
    </Suspense>
  );
  
  return (
    <SidebarWrapper header={header}>
      {children}
    </SidebarWrapper>
  );
}
