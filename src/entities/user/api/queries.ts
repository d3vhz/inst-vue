import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import type { ComputedRef } from 'vue';

import { DEFAULT_GC_TIME, DEFAULT_STALE_TIME } from '~/shared/config';

import { queryKeys } from '../config';
import type { IUser } from '../model';

import { userApi } from './api';

const useGetUser = (userId: ComputedRef<string>) => {
  return useQuery({
    queryFn: () => userApi.getUser(userId.value),
    queryKey: queryKeys.user(userId),
    enabled: Boolean(userId),
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME,
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
