import { toTypedSchema } from '@vee-validate/zod';

import { postCreateSchema } from '~/entities/post';

const typedPostCreateSchema = toTypedSchema(postCreateSchema);

export { postCreateSchema, typedPostCreateSchema };
