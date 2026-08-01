import type z from 'zod';

import type { statusSchema } from '../config';

type IPost = {
  id: string;
  userId: string;
  caption: string;
  status: IPostStatus;
  imgUrls: string[];
  likes: number;
};

type IPostStatus = z.infer<typeof statusSchema>;

type IPostCreate = Pick<IPost, 'caption'>;

type IPostEdit = Partial<Pick<IPost, 'caption' | 'status' | 'imgUrls'>>;

type SearchParams = {
  search: string;
  page: string;
  limit: string;
  status: IPostStatus;
};

type IGetPostListParams = Partial<SearchParams>;

type IPostLike = {
  postId: string;
  userId: string;
};

export type { IPost, IPostCreate, IPostEdit, IGetPostListParams, IPostLike };
