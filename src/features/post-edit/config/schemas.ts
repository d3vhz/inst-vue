import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

import { captionSchema, imgUrlsSchema, statusSchema } from '~/entities/post';

const postEditSchema = z.object({
  imgUrls: imgUrlsSchema,
  status: statusSchema.optional(),
  caption: captionSchema.optional(),
});

const typedPostEditSchema = toTypedSchema(postEditSchema);

export { postEditSchema, typedPostEditSchema };
