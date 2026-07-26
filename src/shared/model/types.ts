import { z } from 'zod';

import type { BlobUrlSchema, RouteName } from '../config';

type Nullable<T> = T | null;

type IRouteName = (typeof RouteName)[keyof typeof RouteName];

type IBlobUrl = z.infer<typeof BlobUrlSchema>;

export type { Nullable, IRouteName, IBlobUrl };
