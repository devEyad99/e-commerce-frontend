//..
import { z } from 'zod';

// Validation schema using Zod
const signUpSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: 'First Name is required' })
      .max(255, { message: 'First name is too long' }),
    lastName: z
      .string()
      .min(2, { message: 'Last Name is required' })
      .max(255, { message: 'Last Name is too long' }),
    email: z
      .string()
      .min(1, { message: 'Email address is required' })
      .email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .max(255, { message: 'Password is too long' })
      .regex(/[a-zA-Z]/, { message: 'Password must contain a letter' })
      .regex(/[0-9]/, { message: 'Password must contain a number' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirm Password is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'], // Affects the `confirmPassword` field
  });

type signUpType = z.infer<typeof signUpSchema>;

export { signUpSchema, type signUpType };
