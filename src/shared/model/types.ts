import { z } from 'zod';

import type {
  BlobUrlSchema,
  FileItemSchema,
  ImageItemSchema,
  RouteName,
  UrlSchema,
} from '../config';

type Nullable<T> = T | null;

type IRouteName = (typeof RouteName)[keyof typeof RouteName];

type IRouteMeta = {
  breadcrumb: IBreadcrumb;
};

type IBreadcrumb = {
  label: string;
  path: Nullable<IRouteName>;
  disabled: boolean;
};

type IBlobUrl = z.infer<typeof BlobUrlSchema>;

type IUrl = z.infer<typeof UrlSchema>;

type IFileItem = z.infer<typeof FileItemSchema>;

type IImageItem = z.infer<typeof ImageItemSchema>;

export type {
  Nullable,
  IBlobUrl,
  IUrl,
  IFileItem,
  IImageItem,
  IRouteName,
  IRouteMeta,
  IBreadcrumb,
};
