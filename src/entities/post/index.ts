export {
  useGetPost,
  useGetPostList,
  usePostCreate,
  usePostUpdate,
  usePostDelete,
  postApi,
} from './api';
export {
  postCreateSchema,
  postEditSchema,
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
  IPostEdit,
  IPostCreateFormData,
  IPostEditFormData,
  IGetPostListParams,
} from './model';
