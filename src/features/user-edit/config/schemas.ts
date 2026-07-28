import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

import { firstNameSchema, lastNameSchema } from '~/entities/user';

const userEditSchema = z.object({
  firstName: firstNameSchema.optional().nullable(),
  lastName: lastNameSchema.optional().nullable(),
});

const typedUserEditSchema = toTypedSchema(userEditSchema);

export { userEditSchema, typedUserEditSchema };
