import type z from 'zod';

import type { postCreateSchema } from '../config';

type IPostCreateFormData = z.infer<typeof postCreateSchema>;

export type { IPostCreateFormData };
