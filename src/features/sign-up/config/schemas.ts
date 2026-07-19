import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

import { PASSWORD_MAX_CHARACTERS_COUNT } from '~/entities/auth';

const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email({ message: 'Please enter a valid email address' }),
    password: z
      .string()
      .min(PASSWORD_MAX_CHARACTERS_COUNT, {
        message: `Password must be at least ${PASSWORD_MAX_CHARACTERS_COUNT} characters`,
      })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)/, {
        message: 'Password must contain at least 1 letter and 1 number',
      }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Please confirm your password' }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const typedSignUpSchema = toTypedSchema(signUpSchema);

export { signUpSchema, typedSignUpSchema };
