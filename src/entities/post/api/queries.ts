import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';

import { queryKeys } from '../config';

import { postApi } from './api';

const useGetPostList = () => {
  return useQuery({
    queryFn: postApi.getPostList,
    queryKey: queryKeys.all,
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
