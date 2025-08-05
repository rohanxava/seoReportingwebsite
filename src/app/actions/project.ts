
'use server';

import { z } from 'zod';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';
import type { Project, User } from '@/lib/types';

const addProjectSchema = z.object({
  name: z.string().min(2, 'Project name must be at least 2 characters.'),
  domain: z.string().regex(/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/, 'Please enter a valid domain name.'),
  clientId: z.string().refine((val) => ObjectId.isValid(val), { message: "Invalid client ID." }),
});

async function getAdmin(): Promise<User | null> {
    try {
        const client = await clientPromise;
        const db = client.db('seoAudit');
        const user = await db.collection<User>('users').findOne({ role: 'admin' });
        if (!user) return null;
        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.error('Failed to fetch admin user:', error);
        return null;
    }
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
    if (!admin) {
        throw new Error("No admin user found.")
    }
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

export async function getProjects(): Promise<Project[]> {
    try {
        const admin = await getAdmin();
         if (!admin) {
            return [];
        }
        const adminId = admin._id;

        const client = await clientPromise;
        const db = client.db('seoAudit');
        const projects = await db.collection('projects').find({
            createdBy: new ObjectId(adminId)
        }).toArray();
        return JSON.parse(JSON.stringify(projects));
    } catch (error) {
        console.error('Failed to fetch projects:', error);
        return [];
    }
}
