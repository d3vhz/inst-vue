import { toTypedSchema } from '@vee-validate/zod';

import { postEditSchema } from '~/entities/post';

const typedPostEditSchema = toTypedSchema(postEditSchema);

export { typedPostEditSchema };
