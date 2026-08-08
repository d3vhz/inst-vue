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
  setLike({ postId, isLiked }: { postId: string; isLiked: boolean }) {
    return isLiked
      ? api.post<{ id: string }, IPost>({
          url: `/posts/${postId}/add-like`,
        })
      : api.delete<{ id: string }>({
          url: `/posts/${postId}/remove-like`,
        });
  },
  setSave({ postId, isSaved }: { postId: string; isSaved: boolean }) {
    return isSaved
      ? api.post<{ id: string }, IPost>({
          url: `/posts/${postId}/add-save`,
        })
      : api.delete<{ id: string }>({
          url: `/posts/${postId}/remove-save`,
        });
  },
};

export { postApi };
