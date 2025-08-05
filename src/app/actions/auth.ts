
'use server';

import { z } from 'zod';
import bcrypt from 'bcryptjs';
import clientPromise from '@/lib/mongodb';
import { redirect } from 'next/navigation';

const signupSchema = z.object({
  agencyName: z.string().min(2, 'Agency name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
});

export async function signupUser(prevState: any, formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const validatedFields = signupSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  const { agencyName, email, password } = validatedFields.data;

  try {
    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection('users');

    const existingUser = await usersCollection.findOne({ email });

    if (existingUser) {
      return {
        message: 'User with this email already exists.',
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await usersCollection.insertOne({
      name: agencyName,
      email,
      password: hashedPassword,
      role: 'admin', // Default role for new signups
    });
    
  } catch (error) {
    console.error(error);
    return {
      message: 'An unexpected error occurred. Please try again.',
    };
  }

  redirect('/dashboard');
}


const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function loginUser(prevState: any, formData: FormData) {
    const values = Object.fromEntries(formData.entries());
    const validatedFields = loginSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            message: "Invalid email or password.",
        };
    }

    const { email, password } = validatedFields.data;

    try {
        const client = await clientPromise;
        const db = client.db();
        const usersCollection = db.collection("users");

        const user = await usersCollection.findOne({ email });

        if (!user) {
            return { message: "Invalid email or password." };
        }

        const passwordMatch = await bcrypt.compare(password, user.password as string);

        if (!passwordMatch) {
            return { message: "Invalid email or password." };
        }
        
        // Redirect based on role
        const redirectUrl = user.role === 'client' ? '/client-dashboard' : '/dashboard';
        redirect(redirectUrl);

    } catch (error) {
        console.error(error);
        return { message: "An unexpected error occurred." };
    }
}
