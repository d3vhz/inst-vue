import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { computed, type ComputedRef } from 'vue';

import { DEFAULT_STALE_TIME } from '~/shared/config';

import { queryKeys } from '../config';
import type { IGetPostListParams, IPost } from '../model';

import { postApi } from './api';

const useGetPost = (postId: string) => {
  return useQuery({
    queryFn: () => postApi.getPost(postId),
    queryKey: queryKeys.post(postId),
    enabled: Boolean(postId),
    staleTime: DEFAULT_STALE_TIME,
  });
};

const useGetPostList = (params?: ComputedRef<IGetPostListParams>) => {
  return useQuery({
    queryFn: () => postApi.getPostList(params?.value),
    queryKey: computed(() => queryKeys.list(params?.value)),
    staleTime: DEFAULT_STALE_TIME,
  });
};

const usePostCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postApi.createPost,
    onMutate: async (newPost) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.list() });
      const postListCache = queryClient.getQueryData<{
        total: number;
        posts: IPost[];
      }>(queryKeys.list());

      if (postListCache) {
        const optimisticPost = {
          ...newPost,
          isOptimistic: true,
        };
        queryClient.setQueryData(queryKeys.list(), {
          ...postListCache,
          posts: [optimisticPost, ...postListCache.posts],
        });
      }
      return { postListCache };
    },
    onError: (_err, _newData, context) => {
      queryClient.setQueryData(queryKeys.list(), context?.postListCache);
    },
  });
};

const usePostUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postApi.updatePost,
    onSuccess: (updatedPost) => {
      queryClient.setQueryData(
        queryKeys.list(),
        (oldPostListCache: { posts: IPost[] }) => {
          if (!oldPostListCache) return;
          return {
            ...oldPostListCache,
            posts: oldPostListCache.posts.map((post: IPost) =>
              // !post.status it means this post updates after creating
              post.id === updatedPost.id || !post.status
                ? { ...updatedPost, isOptimistic: true }
                : post
            ),
          };
        }
      );
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.list() }),
  });
};

const usePostDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postApi.deletePost,
    onSuccess: (deletedPost) => {
      queryClient.setQueryData(
        queryKeys.list(),
        (oldPostListCache: { posts: IPost[] }) => {
          if (!oldPostListCache) return;
          return {
            ...oldPostListCache,
            posts: oldPostListCache.posts.filter(
              (post) => post.id !== deletedPost.id
            ),
          };
        }
      );
      queryClient.removeQueries({ queryKey: queryKeys.post(deletedPost.id) });
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.list() }),
  });
};

export {
  useGetPost,
  useGetPostList,
  usePostCreate,
  usePostUpdate,
  usePostDelete,
};
