import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

import { firstNameSchema, lastNameSchema } from '~/entities/user';

const profileEditSchema = z.object({
  firstName: firstNameSchema.optional().nullable(),
  lastName: lastNameSchema.optional().nullable(),
});

const typedProfileEditSchema = toTypedSchema(profileEditSchema);

export { profileEditSchema, typedProfileEditSchema };
