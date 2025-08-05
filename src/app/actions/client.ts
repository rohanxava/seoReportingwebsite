
'use server';

import { z } from 'zod';
import bcrypt from 'bcryptjs';
import clientPromise from '@/lib/mongodb';
import { revalidatePath } from 'next/cache';
import type { User } from '@/lib/types';
import { ObjectId } from 'mongodb';

const addClientSchema = z.object({
  name: z.string().min(2, 'Client name must be at least 2 characters.'),
  logoUrl: z.string().url('Please enter a valid URL.').optional().or(z.literal('')),
  email: z.string().email('Please enter a valid email.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
});

export async function addClientUser(prevState: any, formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const validatedFields = addClientSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  const { name, logoUrl, email, password } = validatedFields.data;

  // In a real app, you would get the current admin's ID from the session.
  // For this prototype, we'll use a hardcoded admin ID.
  const adminId = "66a013a483896b1b36991392";

  try {
    const client = await clientPromise;
    const db = client.db('seoAudit');
    const usersCollection = db.collection('users');

    const existingUser = await usersCollection.findOne({ email });

    if (existingUser) {
      return {
        message: 'User with this email already exists.',
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await usersCollection.insertOne({
      name,
      email,
      password: hashedPassword,
      logoUrl: logoUrl || 'https://placehold.co/32x32.png', 
      role: 'client',
      createdBy: new ObjectId(adminId), // Associate client with the admin
    });
    
    revalidatePath('/dashboard/clients');
    revalidatePath('/dashboard/projects/new');

    return {
        success: true,
    }

  } catch (error) {
    console.error(error);
    return {
      message: 'An unexpected error occurred. Please try again.',
    };
  }
}

export async function getClients(): Promise<User[]> {
    // In a real app, you would get the current admin's ID from the session.
    // For this prototype, we'll use a hardcoded admin ID to filter clients.
    const adminId = "66a013a483896b1b36991392";

    try {
        const client = await clientPromise;
        const db = client.db('seoAudit');
        const users = await db.collection('users').find({ 
            role: 'client',
            createdBy: new ObjectId(adminId) 
        }).toArray();
        return JSON.parse(JSON.stringify(users));
    } catch (error) {
        console.error('Failed to fetch clients:', error);
        return [];
    }
}
