import { api, storageApi } from '~/shared/api';
import type { IFileItem } from '~/shared/ui';

import type {
  IGetPostListParams,
  IPost,
  IPostCreate,
  IPostUpdate,
} from '../model';

const postApi = {
  getPostList(params?: IGetPostListParams) {
    return api.get<{ posts: IPost[]; total: number }>({
      url: '/posts',
      params,
    });
  },
  create(data: IPostCreate) {
    return api.post<IPostCreate, IPost>({
      url: '/posts',
      data,
    });
  },
  update({ id, data }: { id: string; data: IPostUpdate }) {
    return api.patch<IPostUpdate, IPost>({
      url: `/posts/${id}`,
      data,
    });
  },
  async uploadFile({ path, file }: { path: string; file: IFileItem }) {
    try {
      await storageApi.uploadFile({
        path,
        file: file.file,
        contentType: file.type,
      });
      return storageApi.getPublicUrl(path);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export { postApi };
