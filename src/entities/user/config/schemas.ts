import { z } from 'zod';

import { ImageItemSchema, UrlSchema } from '~/shared/config';

import { USER_ROLES } from './constant';

const avatarUrlSchema = z.array(ImageItemSchema).or(UrlSchema).optional();
const firstNameSchema = z.string();
const lastNameSchema = z.string();
const roleSchema = z.enum(USER_ROLES);
const rolesSchema = z.array(roleSchema);

export {
  avatarUrlSchema,
  firstNameSchema,
  lastNameSchema,
  rolesSchema,
  roleSchema,
};
