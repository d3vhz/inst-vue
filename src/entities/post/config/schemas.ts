import { z } from 'zod';

import { FileItemSchema } from '~/shared/ui';

import { CAPTION_MIN_LENGTH, STATUS } from './constants';

const imagesSchema = z.array(FileItemSchema).max(5, 'Select up to files');
const statusSchema = z.enum(STATUS);
const captionSchema = z
  .string()
  .min(CAPTION_MIN_LENGTH, { message: 'Email is required' });

const postCreateSchema = z.object({
  images: imagesSchema,
  caption: captionSchema,
});

const postUpdateSchema = z.object({
  images: imagesSchema.optional(),
  status: statusSchema.optional(),
  caption: captionSchema.optional(),
});

export { postCreateSchema, postUpdateSchema };
