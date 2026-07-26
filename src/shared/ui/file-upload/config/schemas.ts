import { z } from 'zod';

import { BlobUrlSchema } from '~/shared/config';

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

export { FileItemSchema, ImageItemSchema };
