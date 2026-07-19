import type { RouteName } from '../config';

type Nullable<T> = T | null;

type IRouteName = (typeof RouteName)[keyof typeof RouteName];

export type { Nullable, IRouteName };
