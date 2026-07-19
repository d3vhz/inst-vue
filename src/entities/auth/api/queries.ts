import type { SignUpWithPasswordCredentials } from '@supabase/supabase-js';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';

import { queryKeys } from '../config';
import { useAuthStore } from '../model';

import { authApi } from './api';

const useSession = () => {
  return useQuery({
    queryFn: () => {
      return authApi.getSession();
    },
    queryKey: queryKeys.session(),
    staleTime: Infinity, // it changes rarely
  });
};

const useSignIn = () => {
  const queryClient = useQueryClient();
  const authStore = useAuthStore();

  return useMutation({
    mutationFn: (credentials: SignUpWithPasswordCredentials) =>
      authApi.signIn(credentials),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.session(), data.user);
      authStore.setSession(data.session);
    },
  });
};

const useSignout = () => {
  const authStore = useAuthStore();

  return useMutation({
    mutationFn: () => authApi.signOut(),
    onSuccess: () => authStore.setSession(null),
  });
};

const useSignUp = () => {
  const queryClient = useQueryClient();
  const authStore = useAuthStore();

  return useMutation({
    mutationFn: (credentials: SignUpWithPasswordCredentials) =>
      authApi.signUp(credentials),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.session(), data.user);
      authStore.setSession(data.session);
    },
  });
};

export { useSession, useSignIn, useSignUp, useSignout };
