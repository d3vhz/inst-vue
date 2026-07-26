export { useGetPostList, usePostCreate, usePostUpdate, postApi } from './api';
export {
  postCreateSchema,
  postUpdateSchema,
  CAPTION_MAX_LENGTH,
  IMAGES_MAX_LENGTH,
} from './config';
export type { IPostCreate, IPostUpdate, IPostCreateSchema } from './model';
