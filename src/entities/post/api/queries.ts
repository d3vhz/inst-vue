import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { type ComputedRef } from 'vue';

import { queryKeys } from '../config';
import type { IGetPostListParams } from '../model';

import { postApi } from './api';

const useGetPost = (postId: string) => {
  return useQuery({
    queryFn: () => postApi.getPost(postId),
    queryKey: [queryKeys.post(postId)],
  });
};

const useGetPostList = (params?: ComputedRef<IGetPostListParams>) => {
  return useQuery({
    queryFn: () => postApi.getPostList(params?.value),
    queryKey: [queryKeys.all, params],
  });
};

const usePostCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postApi.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
    },
  });
};

const usePostUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postApi.updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
    },
  });
};

const usePostDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postApi.deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
    },
  });
};

export {
  useGetPost,
  useGetPostList,
  usePostCreate,
  usePostUpdate,
  usePostDelete,
};
