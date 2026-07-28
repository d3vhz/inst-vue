import { api, formatPath, storageApi } from '~/shared/api';
import type { IFileItem } from '~/shared/model';

import type {
  IGetPostListParams,
  IPost,
  IPostCreate,
  IPostEdit,
} from '../model';

const postApi = {
  getPost(postId: string) {
    return api.get<IPost>({
      url: `/posts/${postId}`,
    });
  },
  getPostList(params?: IGetPostListParams) {
    return api.get<{ posts: IPost[]; total: number }>({
      url: '/posts',
      params,
    });
  },
  createPost(data: IPostCreate) {
    return api.post<IPostCreate, IPost>({
      url: '/posts',
      data,
    });
  },
  updatePost({ id, data }: { id: string; data: IPostEdit }) {
    return api.patch<IPostEdit, IPost>({
      url: `/posts/${id}`,
      data,
    });
  },
  deletePost(postId: string) {
    return api.delete<IPost>({
      url: `/posts/${postId}`,
    });
  },
  deleteFiles(paths: string[]) {
    return storageApi.deleteFiles(paths.map((url) => formatPath(url)));
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
