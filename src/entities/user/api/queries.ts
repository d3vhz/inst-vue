import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';

import { queryKeys } from '../config';
import type { IUser } from '../model';

import { userApi } from './api';

const useGetUser = (userId: string) => {
  return useQuery({
    queryFn: () => userApi.getUser(userId),
    queryKey: queryKeys.user(userId),
    enabled: Boolean(userId),
    staleTime: Infinity,
  });
};

const useUserUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.updateUser,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(
        queryKeys.user(updatedUser.id),
        (oldUserCache: IUser) => {
          if (!oldUserCache) return;
          return updatedUser;
        }
      );
    },
  });
};

const useUserDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.deleteUser,
    onSuccess: (deletedUser) => {
      queryClient.removeQueries({ queryKey: queryKeys.user(deletedUser.id) });
    },
  });
};

export { useGetUser, useUserUpdate, useUserDelete };
