import type z from 'zod';

import type { IBlobUrl } from '~/shared/model';

import type { postCreateSchema, postUpdateSchema } from '../config';

type IPost = {
  id: string;
  userId: string;
  caption: string;
  status: string;
};

type IPostCreateSchema = z.infer<typeof postCreateSchema>;
type IPostUpdateSchema = z.infer<typeof postUpdateSchema>;

type IPostCreate = Pick<IPostCreateSchema, 'caption'>;

type IPostUpdate = Omit<IPostUpdateSchema, 'images'> & {
  imgUrls: IBlobUrl[];
};

export type { IPost, IPostCreate, IPostUpdate, IPostCreateSchema };
