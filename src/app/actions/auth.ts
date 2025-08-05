
'use server';

import { z } from 'zod';
import bcrypt from 'bcryptjs';
import clientPromise from '@/lib/mongodb';
import { redirect } from 'next/navigation';
import { sendOtpEmail } from '@/lib/mail';
import { ObjectId } from 'mongodb';

// --- Helper Functions ---

async function generateAndSaveOtp(email: string): Promise<string> {
    const client = await clientPromise;
    const db = client.db('seoAudit');
    const usersCollection = db.collection('users');

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

    await usersCollection.updateOne(
        { email },
        { $set: { otp, otpExpires } }
    );

    return otp;
}


// --- Signup Action ---

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
      name: agencyName,
      email,
      password: hashedPassword,
      role: 'admin',
    });

    const otp = await generateAndSaveOtp(email);
    await sendOtpEmail(email, otp);
    
  } catch (error) {
    console.error(error);
    return {
      message: 'An unexpected error occurred. Please try again.',
    };
  }

  redirect(`/otp?email=${encodeURIComponent(email)}`);
}


// --- Login Action ---

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
        const db = client.db('seoAudit');
        const usersCollection = db.collection("users");

        const user = await usersCollection.findOne({ email });

        if (!user) {
            return { message: "Invalid email or password." };
        }

        const passwordMatch = await bcrypt.compare(password, user.password as string);

        if (!passwordMatch) {
            return { message: "Invalid email or password." };
        }
        
        const otp = await generateAndSaveOtp(email);
        await sendOtpEmail(email, otp);

    } catch (error) {
        console.error(error);
        return { message: "An unexpected error occurred." };
    }

    redirect(`/otp?email=${encodeURIComponent(email)}`);
}

// --- OTP Verification Action ---

const otpSchema = z.object({
    email: z.string().email(),
    otp: z.string().length(6, "OTP must be 6 digits."),
});

export async function verifyOtp(prevState: any, formData: FormData) {
    const values = Object.fromEntries(formData.entries());
    const validatedFields = otpSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Invalid input."
        };
    }

    const { email, otp } = validatedFields.data;
    let redirectUrl;

    try {
        const client = await clientPromise;
        const db = client.db('seoAudit');
        const usersCollection = db.collection('users');

        const user = await usersCollection.findOne({ email });

        if (!user) {
             return { message: "User not found." };
        }

        if (user.otp !== otp) {
            return { message: "Invalid OTP. Please try again." };
        }

        if (!user.otpExpires || new Date(user.otpExpires) < new Date()) {
            return { message: "OTP has expired. Please log in again to get a new one." };
        }

        await usersCollection.updateOne(
            { _id: new ObjectId(user._id) },
            { $unset: { otp: "", otpExpires: "" } }
        );
        
        redirectUrl = user.role === 'client' ? '/client-dashboard' : '/dashboard';

    } catch (error) {
        console.error(error);
        return { message: "An unexpected error occurred during OTP verification." };
    }

    redirect(redirectUrl);
}

// --- Resend OTP Action ---

const resendOtpSchema = z.object({
  email: z.string().email(),
});

export async function resendOtp(prevState: any, formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const validatedFields = resendOtpSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      message: "Invalid email.",
    };
  }

  const { email } = validatedFields.data;

  try {
    const client = await clientPromise;
    const db = client.db('seoAudit');
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({ email });

    if (!user) {
      return { message: "User not found." };
    }

    const otp = await generateAndSaveOtp(email);
    await sendOtpEmail(email, otp);

    return { success: true, message: "A new OTP has been sent to your email." };

  } catch (error) {
    console.error(error);
    return { message: "An unexpected error occurred. Please try again." };
  }
}
