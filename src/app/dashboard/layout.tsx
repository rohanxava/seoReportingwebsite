
import { DashboardLayoutClient } from "./layout-client";
import { getClients } from "@/app/actions/client";
import { DashboardHeader } from "./dashboard-header";
import { Suspense } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const clients = await getClients();
  
  return (
    <DashboardLayoutClient 
      clients={clients}
      header={
        <Suspense>
          <DashboardHeader />
        </Suspense>
      }
    >
        {children}
    </DashboardLayoutClient>
  );
}
