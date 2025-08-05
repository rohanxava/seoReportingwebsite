import { SidebarWrapper } from "@/components/dashboard/sidebar-wrapper";
import { getAdminUser } from "../actions/user";

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
