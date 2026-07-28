import { ImageItemSchema, UrlSchema } from '../config';
import type { IImageItem, IUrl } from '../model';

const isUrl = (url: unknown): url is IUrl => UrlSchema.safeParse(url).success;

const isImageItemSchema = (value: unknown): value is IImageItem => {
  return ImageItemSchema.safeParse(value).success;
};

export { isUrl, isImageItemSchema };
