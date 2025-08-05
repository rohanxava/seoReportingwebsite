
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import type { User } from "@/lib/types";
import { SettingsForm } from "@/components/dashboard/settings-form";

async function getAdminUser(): Promise<User | null> {
    // In a real app, you would get the current admin's ID from the session.
    // For this prototype, we'll use a hardcoded admin ID.
    const adminId = "66a013a483896b1b36991392";

    try {
        const client = await clientPromise;
        const db = client.db('seoAudit');
        const user = await db.collection('users').findOne({ _id: new ObjectId(adminId), role: 'admin' });
        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.error('Failed to fetch admin user:', error);
        return null;
    }
}


export default async function SettingsPage() {
  const adminUser = await getAdminUser();

  return <SettingsForm adminUser={adminUser} />;
}
