import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.string().trim().min(1, 'Email is required').pipe(z.string().email('Invalid email')),
  password: z
    .string()
    .min(6, 'Password must be more than 6 characters')
    .max(32, 'Password must be less than 32 characters'),
});
