//..
import { z } from 'zod';

// Validation schema using Zod
const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email address is required' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
});

type signInType = z.infer<typeof signInSchema>;

export { signInSchema, type signInType };
