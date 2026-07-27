export { useGetPostList, usePostCreate, usePostUpdate, postApi } from './api';
export {
  postCreateSchema,
  postUpdateSchema,
  queryKeys,
  statusItems,
  CAPTION_MIN_LENGTH,
  CAPTION_MAX_LENGTH,
  IMAGES_MIN_LENGTH,
  IMAGES_MAX_LENGTH,
} from './config';
export type {
  IPost,
  IPostCreate,
  IPostUpdate,
  IPostCreateFormData,
  IGetPostListParams,
} from './model';
