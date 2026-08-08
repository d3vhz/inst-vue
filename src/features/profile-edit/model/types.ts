import { z } from 'zod';

import type { profileEditSchema } from '../config';

type IProfileEditFormData = z.infer<typeof profileEditSchema>;

export type { IProfileEditFormData };
