import { z } from 'zod';

import { ImageItemSchema } from '~/shared/ui';

import {
  CAPTION_MAX_LENGTH,
  CAPTION_MIN_LENGTH,
  IMAGES_MAX_LENGTH,
  IMAGES_MIN_LENGTH,
  STATUSES,
} from './constants';

const imagesSchema = z
  .array(ImageItemSchema)
  .min(IMAGES_MIN_LENGTH, `Select at least ${IMAGES_MIN_LENGTH} file`)
  .max(IMAGES_MAX_LENGTH, `Select up to ${IMAGES_MAX_LENGTH} files`);
const statusSchema = z.enum(STATUSES);
const captionSchema = z
  .string()
  .min(CAPTION_MIN_LENGTH, { message: 'Caption is required' })
  .max(CAPTION_MAX_LENGTH, {
    message: `Caption must not exceed ${CAPTION_MAX_LENGTH} characters`,
  })
  .transform((val) => val.trim());

const postCreateSchema = z.object({
  images: imagesSchema,
  caption: captionSchema,
});

const postUpdateSchema = z.object({
  images: imagesSchema.optional(),
  status: statusSchema.optional(),
  caption: captionSchema.optional(),
});

export { postCreateSchema, postUpdateSchema, statusSchema };
