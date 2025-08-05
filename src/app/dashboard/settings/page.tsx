import { SettingsForm } from "@/components/dashboard/settings-form";
import { updateAdminDetails, getAdminUser } from "@/app/actions/user";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default async function SettingsPage() {
  const adminUser = await getAdminUser();

  if (!adminUser) {
     return (
        <div className="p-4 md:p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Error</CardTitle>
                    <CardDescription>Could not load user settings.</CardDescription>
                </CardHeader>
            </Card>
        </div>
    )
  }

  return <SettingsForm adminUser={adminUser} updateAdminDetails={updateAdminDetails} />;
}
