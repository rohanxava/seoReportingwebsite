
'use server';

import { z } from 'zod';
import clientPromise from '@/lib/mongodb';
import { revalidatePath } from 'next/cache';
import { ObjectId } from 'mongodb';
import type { User } from '@/lib/types';

const updateLogoSchema = z.object({
  logoUrl: z.string().url('Please enter a valid URL.'),
  adminId: z.string().refine((val) => ObjectId.isValid(val), { message: "Invalid admin ID." }),
});

export async function updateAdminLogo(prevState: any, formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const validatedFields = updateLogoSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { logoUrl, adminId } = validatedFields.data;

  try {
    const client = await clientPromise;
    const db = client.db('seoAudit');
    const usersCollection = db.collection('users');

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(adminId), role: 'admin' },
      { $set: { logoUrl: logoUrl } }
    );

    if (result.matchedCount === 0) {
        return { message: "Admin user not found." };
    }

    revalidatePath('/dashboard', 'layout');

    return { success: true, message: 'Logo updated successfully!' };

  } catch (error) {
    console.error(error);
    return {
      message: 'An unexpected error occurred. Please try again.',
    };
  }
}

const updateDetailsSchema = z.object({
  name: z.string().min(2, 'Full name must be at least 2 characters.'),
  adminId: z.string().refine((val) => ObjectId.isValid(val), { message: "Invalid admin ID." }),
});


export async function updateAdminDetails(prevState: any, formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const validatedFields = updateDetailsSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, adminId } = validatedFields.data;

  try {
    const client = await clientPromise;
    const db = client.db('seoAudit');
    const usersCollection = db.collection('users');

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(adminId), role: 'admin' },
      { $set: { name: name } }
    );

    if (result.matchedCount === 0) {
      return { message: "Admin user not found." };
    }

    revalidatePath('/dashboard/settings');
    revalidatePath('/dashboard', 'layout'); // Revalidate layout to update name in sidebar

    return { success: true, message: 'Your details have been updated.' };

  } catch (error) {
    console.error(error);
    return {
      message: 'An unexpected error occurred. Please try again.',
    };
  }
}

// In a real app, you'd get this from the user's session
export async function getAdminUser(): Promise<User | null> {
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
