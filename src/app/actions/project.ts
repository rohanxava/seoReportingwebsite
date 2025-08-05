
'use server';

import { z } from 'zod';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';

const addProjectSchema = z.object({
  name: z.string().min(2, 'Project name must be at least 2 characters.'),
  domain: z.string().regex(/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/, 'Please enter a valid domain name.'),
  clientId: z.string().refine((val) => ObjectId.isValid(val), { message: "Invalid client ID." }),
});

// Helper function to get the current admin user.
// In a real app, this would come from a session.
async function getAdmin() {
    const client = await clientPromise;
    const db = client.db('seoAudit');
    const admin = await db.collection('users').findOne({ role: 'admin' });
    if (!admin) {
        throw new Error("No admin user found in the database.");
    }
    return admin;
}


export async function addProject(prevState: any, formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const validatedFields = addProjectSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, domain, clientId } = validatedFields.data;

  try {
    const admin = await getAdmin();
    const adminId = admin._id;

    const client = await clientPromise;
    const db = client.db('seoAudit');
    const projectsCollection = db.collection('projects');

    await projectsCollection.insertOne({
      name,
      domain,
      clientId: new ObjectId(clientId),
      createdBy: new ObjectId(adminId),
    });

    revalidatePath('/dashboard/projects');
    return { success: true };

  } catch (error) {
    console.error(error);
    return {
      message: 'An unexpected error occurred. Please try again.',
    };
  }
}
