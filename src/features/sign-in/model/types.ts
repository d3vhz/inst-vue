import type z from 'zod';

import type { signInSchema } from '../config';

type ISignInDto = z.infer<typeof signInSchema>;

export type { ISignInDto };
