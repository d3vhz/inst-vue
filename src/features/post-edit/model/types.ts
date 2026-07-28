import type z from 'zod';

import type { postEditSchema } from '../config';

type IPostEditFormData = z.infer<typeof postEditSchema>;

export type { IPostEditFormData };
