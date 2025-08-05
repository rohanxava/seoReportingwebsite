'use server';

import clientPromise from "@/lib/mongodb";
import type { User } from "@/lib/types";
import { SettingsForm } from "@/components/dashboard/settings-form";
import { updateAdminDetails } from "@/app/actions/user";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

async function getAdminUser(): Promise<User | null> {
    // In a real app, you would get the current admin's ID from the session.
    // For this prototype, we'll just find the first admin user.
    try {
        const client = await clientPromise;
        const db = client.db('seoAudit');
        const user = await db.collection('users').findOne({ role: 'admin' });
        if (!user) return null;
        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.error('Failed to fetch admin user:', error);
        return null;
    }
}


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
