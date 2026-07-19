import type z from 'zod';

import type { signUpSchema } from '../config';

type ISignUpDto = z.infer<typeof signUpSchema>;

export type { ISignUpDto };
