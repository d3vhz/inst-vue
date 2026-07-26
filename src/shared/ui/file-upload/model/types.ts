import { z } from 'zod';

import type { FileItemSchema } from '../config';

type IFileItem = z.infer<typeof FileItemSchema>;

export type { IFileItem };
