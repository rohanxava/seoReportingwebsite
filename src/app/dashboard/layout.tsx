
import { DashboardLayoutClient } from "./layout-client";
import { getClients } from "@/app/actions/client";
import { DashboardHeader } from "./dashboard-header";
import { Suspense } from "react";
import type { User } from "@/lib/types";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const clientsData: User[] = await getClients();
  // Ensure the data passed to the client component is serializable
  const clients = JSON.parse(JSON.stringify(clientsData));
  
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
