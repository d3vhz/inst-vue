import type z from 'zod';

import type { statusSchema } from '../config';

type IPost = {
  id: string;
  userId: string;
  caption: string;
  status: IPostStatus;
  imgUrls: string[];
};

type IPostStatus = z.infer<typeof statusSchema>;

type IPostCreate = Pick<IPost, 'caption'>;

type IPostEdit = Partial<Pick<IPost, 'caption' | 'status' | 'imgUrls'>>;

type IGetPostListParams = {
  search: string;
  page: string;
  limit: string;
  status: IPostStatus;
};

export type { IPost, IPostCreate, IPostEdit, IGetPostListParams };
