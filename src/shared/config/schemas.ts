import { z } from 'zod';

const BlobUrlSchema = z.string().url('Must be a valid URL');

const UrlSchema = z.string().url('Must be a valid URL');

const FileItemSchema = z.object({
  name: z.string(),
  size: z.number().nonnegative('The size must be a non-negative number.'),
  type: z.string(),
  blobUrl: BlobUrlSchema,
  file: z.instanceof(File, { message: 'There must be a File object.' }),
});

const ImageItemSchema = FileItemSchema.extend({
  type: z
    .string()
    .regex(/^image\//, 'The file type must be an image (image/*)'),
});

export { BlobUrlSchema, UrlSchema, FileItemSchema, ImageItemSchema };
