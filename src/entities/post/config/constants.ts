import { pascalCase } from 'es-toolkit/string';

import type { IGetPostListParams } from '../model';

const queryKeys = {
  post: (id: string) => ['post', id],
  postLike: (id: string) => ['post', 'post-like', id],
  postSave: (id: string) => ['post', 'post-save', id],
  list: (params?: IGetPostListParams) => ['post', 'list', params ?? {}],
};

const STATUSES = ['active', 'archived'] as const;

const CAPTION_MIN_LENGTH = 1;
const CAPTION_MAX_LENGTH = 500;

const IMAGES_MIN_LENGTH = 1;
const IMAGES_MAX_LENGTH = 5;

const statusItems = STATUSES.map((value) => ({
  label: pascalCase(value),
  value,
}));

export {
  queryKeys,
  statusItems,
  STATUSES,
  CAPTION_MIN_LENGTH,
  CAPTION_MAX_LENGTH,
  IMAGES_MIN_LENGTH,
  IMAGES_MAX_LENGTH,
};
