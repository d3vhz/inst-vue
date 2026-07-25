import { z } from 'zod';

import type { RouteName, urlSchema } from '../config';

type Nullable<T> = T | null;

type IRouteName = (typeof RouteName)[keyof typeof RouteName];

type IUrl = z.infer<typeof urlSchema>;

export type { Nullable, IRouteName, IUrl };
