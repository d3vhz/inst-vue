import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

import { captionSchema, imagesSchema } from '~/entities/post';

const postCreateSchema = z.object({
  images: imagesSchema,
  caption: captionSchema,
});

const typedPostCreateSchema = toTypedSchema(postCreateSchema);

export { postCreateSchema, typedPostCreateSchema };
