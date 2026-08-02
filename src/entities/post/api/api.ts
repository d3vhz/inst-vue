import { api, formatPath, storageApi } from '~/shared/api';
import type { IFileItem } from '~/shared/model';

import type {
  IGetPostListParams,
  IPost,
  IPostCreate,
  IPostEdit,
} from '../model';

const postApi = {
  getPost({ postId, signal }: { postId: string; signal?: AbortSignal }) {
    return api.get<IPost>({
      url: `/posts/${postId}`,
      signal,
    });
  },
  getPostList({
    params,
    signal,
  }: {
    params?: IGetPostListParams;
    signal?: AbortSignal;
  }) {
    return api.get<{ posts: IPost[]; total: number }>({
      url: '/posts',
      params,
      signal,
    });
  },
  createPost(data: IPostCreate) {
    return api.post<IPostCreate, { id: string }>({
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
    return api.delete<{ id: string }>({
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
  getPostLike({ postId, signal }: { postId: string; signal?: AbortSignal }) {
    return api.get<{ hasPostLike: boolean }>({
      url: `/posts/${postId}/post-like`,
      signal,
    });
  },
  setLike({ postId, isLike }: { postId: string; isLike: boolean }) {
    return isLike
      ? api.post<{ id: string }, IPost>({
          url: `/posts/${postId}/add-like`,
        })
      : api.delete<{ id: string }>({
          url: `/posts/${postId}/remove-like`,
        });
  },
  getPostSave({ postId, signal }: { postId: string; signal?: AbortSignal }) {
    return api.get<{ hasPostSave: boolean }>({
      url: `/posts/${postId}/post-save`,
      signal,
    });
  },
  setSave({ postId, isSave }: { postId: string; isSave: boolean }) {
    return isSave
      ? api.post<{ id: string }, IPost>({
          url: `/posts/${postId}/add-save`,
        })
      : api.delete<{ id: string }>({
          url: `/posts/${postId}/remove-save`,
        });
  },
};

export { postApi };
