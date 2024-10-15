'use server';

import * as auth from '@/auth';
import { redirect } from 'next/navigation';
import { z } from 'zod';

interface SingInFormState {
  errors: {
    _form?: string[];
    email?: string[];
    password?: string[];
  };
}

const createSignInSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});

export async function signIn(formState: SingInFormState, formData: FormData): Promise<SingInFormState> {
  const userObj = {
    email: formData.get('email'),
    password: formData.get('password'),
  };
  const result = createSignInSchema.safeParse(userObj);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await auth.signIn('credentials', { ...userObj, redirect: false });
  } catch (err) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ['Something went wrong...'],
        },
      };
    }
  }

  redirect('/browse/1');
}

export async function signOut() {
  await auth.signOut({
    redirect: true,
    redirectTo: '/login',
  });
}
