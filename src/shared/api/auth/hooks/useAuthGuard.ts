import { parseError } from '~/shared/lib';

import { authApi } from '../api';
import { useAuthStore } from '../model';

export async function useAuthGuard() {
  const authStore = useAuthStore();

  if (!authStore.session) {
    try {
      const session = await authApi.getSession();
      authStore.setSession(session);
    } catch (error) {
      console.error('Failed to fetch session:', parseError(error));
      authStore.setSession(null);
    }
  }

  return {
    isAuthenticated: authStore.isAuthenticated,
  };
}
