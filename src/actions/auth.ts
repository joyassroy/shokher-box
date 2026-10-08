'use server';

import { signIn, auth } from '@/auth';
import { AuthError } from 'next-auth';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';

export async function loginWithCredentials(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const locale = formData.get('locale') as string || 'bn';

  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials.' };
        default:
          return { error: 'Something went wrong.' };
      }
    }
    throw error;
  }
  
  redirect(`/${locale}/onboarding`);
}

export async function registerWithCredentials(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const phone = formData.get('phone') as string;
  const locale = formData.get('locale') as string || 'bn';

  if (!name || !email || !password || !phone) {
    return { error: 'All fields are required.' };
  }

  await dbConnect();
  
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return { error: 'User already exists with this email.' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
    provider: 'credentials',
    profileComplete: true, // They provided phone number during registration
  });

  // Automatically login after registration
  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    throw error;
  }

  redirect(`/${locale}`);
}

export async function completeOnboarding(formData: FormData) {
  const phone = formData.get('phone') as string;
  const locale = formData.get('locale') as string || 'bn';

  if (!phone) {
    return { error: 'Phone number is required.' };
  }

  const session = await auth();
  if (!session?.user?.email) {
    return { error: 'Not authenticated.' };
  }

  await dbConnect();
  
  await User.findOneAndUpdate(
    { email: session.user.email },
    { 
      phone, 
      profileComplete: true 
    }
  );

  redirect(`/${locale}`);
}
