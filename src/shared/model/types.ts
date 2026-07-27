import { z } from 'zod';

import type { BlobUrlSchema, RouteName, UrlSchema } from '../config';

type Nullable<T> = T | null;

type IRouteName = (typeof RouteName)[keyof typeof RouteName];

type IBlobUrl = z.infer<typeof BlobUrlSchema>;

type IUrl = z.infer<typeof UrlSchema>;

export type { Nullable, IRouteName, IUrl, IBlobUrl };
