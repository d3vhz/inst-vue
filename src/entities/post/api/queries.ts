import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { type ComputedRef } from 'vue';

import { queryKeys } from '../config';
import type { IGetPostListParams } from '../model';

import { postApi } from './api';

const useGetPostList = (params?: ComputedRef<IGetPostListParams>) => {
  return useQuery({
    queryFn: () => postApi.getPostList(params?.value),
    queryKey: [queryKeys.all, params],
  });
};

const usePostCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
    },
  });
};

const usePostUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
    },
  });
};

export { useGetPostList, usePostCreate, usePostUpdate };
