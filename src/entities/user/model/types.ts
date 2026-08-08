import { z } from 'zod';

import type { IUrl } from '~/shared/model';

import { roleSchema } from '../config';

type IRole = z.infer<typeof roleSchema>;

type IUser = {
  id: string;
  avatarUrl: IUrl | null;
  email: string;
  firstName: string | null;
  lastName: string | null;
  roles: IRole[];
  createdAt: string;
  updatedAt: string;
};

type IUserEdit = Partial<Pick<IUser, 'firstName' | 'lastName'>>;

export type { IUser, IRole, IUserEdit };
