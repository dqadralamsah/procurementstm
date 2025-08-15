'use server';

import prisma from './prisma';
import { signIn } from './auth';
import { AuthError } from 'next-auth';
import { SignInSchema } from './zod';

export const SignInFormAction = async (prevState: unknown, FormData: FormData) => {
  const value = Object.fromEntries(FormData.entries());
  const parse = SignInSchema.safeParse(value);

  if (!parse.success) {
    return {
      error: parse.error.flatten().fieldErrors,
    };
  }

  const { email, password } = parse.data;

  const user = await prisma.user.findUnique({
    where: { email },
    select: { role: { select: { name: true } } },
  });

  let redirectPath = '/';
  switch (user?.role.name) {
    case 'SUPER_ADMIN':
      redirectPath = '/dashboard/superadmin';
      break;
    case 'PURCHASING':
      redirectPath = '/dashboard/purchasing';
      break;
    case 'WAREHOUSE':
      redirectPath = '/dashboard/warehouse';
      break;
    default:
      redirectPath = '/';
      break;
  }
  try {
    await signIn('credentials', { email, password, redirectTo: redirectPath });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { message: 'Invalid username or password.' };
        default:
          return { message: 'Something went wrong. Please try again later.' };
      }
    }
    throw error;
  }
};
