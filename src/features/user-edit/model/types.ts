import { z } from 'zod';

import type { userEditSchema } from '../config';

type IUserEditFormData = z.infer<typeof userEditSchema>;

export type { IUserEditFormData };
