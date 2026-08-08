import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { type ComputedRef } from 'vue';

import { DEFAULT_GC_TIME, DEFAULT_STALE_TIME } from '~/shared/config';

import { queryKeys } from '../config';
import { getOptimisticPost } from '../lib';
import type { IGetPostListParams, IPost } from '../model';

import { postApi } from './api';

const useGetPost = (postId: ComputedRef<string>) => {
  return useQuery({
    queryFn: ({ signal }) => postApi.getPost({ postId: postId.value, signal }),
    queryKey: queryKeys.post(postId),
    enabled: Boolean(postId),
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME,
  });
};

const useGetPostList = (params?: ComputedRef<IGetPostListParams>) => {
  return useQuery({
    queryFn: ({ signal }) =>
      postApi.getPostList({ params: params?.value, signal }),
    queryKey: queryKeys.list(params),
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME,
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
        const optimisticPost = getOptimisticPost(newPost);
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
            posts: oldPostListCache.posts.map((post: IPost) => {
              const optimisticPost = getOptimisticPost(updatedPost);
              // !post.status it means this post updates after creating
              return post.id === updatedPost.id || !post.status
                ? optimisticPost
                : post;
            }),
          };
        }
      );

      queryClient.invalidateQueries({
        queryKey: queryKeys.post(updatedPost.id),
      });
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.list() }),
  });
};

const usePostDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postApi.deletePost,
    onSuccess: ({ id: deletedPostId }) => {
      queryClient.setQueryData(
        queryKeys.list(),
        (oldPostListCache: { posts: IPost[] }) => {
          if (!oldPostListCache) return;
          return {
            ...oldPostListCache,
            posts: oldPostListCache.posts.filter(
              (post) => post.id !== deletedPostId
            ),
          };
        }
      );
      queryClient.removeQueries({ queryKey: queryKeys.post(deletedPostId) });
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.list() }),
  });
};

const usePostSetLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postApi.setLike,
    onMutate: ({ postId }) => {
      queryClient.cancelQueries({ queryKey: queryKeys.list() });
      queryClient.cancelQueries({ queryKey: queryKeys.post(postId) });
    },
    onSuccess: ({ id }) =>
      queryClient.invalidateQueries({ queryKey: queryKeys.post(id) }),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.list() }),
  });
};

const usePostSetSave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postApi.setSave,
    onMutate: ({ postId }) => {
      queryClient.cancelQueries({ queryKey: queryKeys.list() });
      queryClient.cancelQueries({ queryKey: queryKeys.post(postId) });
    },
    onSuccess: ({ id }) =>
      queryClient.invalidateQueries({ queryKey: queryKeys.post(id) }),
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
  usePostSetLike,
  usePostSetSave,
};
