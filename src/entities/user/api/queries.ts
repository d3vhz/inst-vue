import { useMutation, useQuery } from '@tanstack/vue-query';

import { queryKeys } from '../config';

import { userApi } from './api';

const useGetUser = (userId: string) => {
  return useQuery({
    queryFn: () => userApi.getUser(userId),
    queryKey: [queryKeys.user(userId)],
    enabled: Boolean(userId),
  });
};

const useUserUpdate = () => {
  return useMutation({
    mutationFn: userApi.updateUser,
  });
};

const useUserDelete = () => {
  return useMutation({
    mutationFn: userApi.deleteUser,
  });
};

export { useGetUser, useUserUpdate, useUserDelete };
