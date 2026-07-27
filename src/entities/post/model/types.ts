import type z from 'zod';

import type { postCreateSchema, postEditSchema, statusSchema } from '../config';

type IPost = {
  id: string;
  userId: string;
  caption: string;
  status: IPostStatus;
  imgUrls: string[];
};

type IPostStatus = z.infer<typeof statusSchema>;
type IPostCreateFormData = z.infer<typeof postCreateSchema>;
type IPostEditFormData = z.infer<typeof postEditSchema>;

type IPostCreate = Pick<IPostCreateFormData, 'caption'>;

type IPostEdit = IPostEditFormData;

type IGetPostListParams = {
  search: string;
  page: string;
  limit: string;
  status: IPostStatus;
};

export type {
  IPost,
  IPostCreate,
  IPostEdit,
  IPostCreateFormData,
  IPostEditFormData,
  IGetPostListParams,
};
