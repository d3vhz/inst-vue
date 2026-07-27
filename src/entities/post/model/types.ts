import type z from 'zod';

import type { IBlobUrl } from '~/shared/model';

import type {
  postCreateSchema,
  postUpdateSchema,
  statusSchema,
} from '../config';

type IPost = {
  id: string;
  userId: string;
  caption: string;
  status: IPostStatus;
  imgUrls: string[];
};

type IPostStatus = z.infer<typeof statusSchema>;
type IPostCreateFormData = z.infer<typeof postCreateSchema>;
type IPostUpdateFormData = z.infer<typeof postUpdateSchema>;

type IPostCreate = Pick<IPostCreateFormData, 'caption'>;

type IPostUpdate = Omit<IPostUpdateFormData, 'images'> & {
  imgUrls: IBlobUrl[];
};

type IGetPostListParams = {
  search: string;
  page: string;
  limit: string;
  status: IPostStatus;
};

export type {
  IPost,
  IPostCreate,
  IPostUpdate,
  IPostCreateFormData,
  IGetPostListParams,
};
