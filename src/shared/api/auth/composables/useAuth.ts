import { useAuthStore } from '../model';

export function useAuth() {
  const authStore = useAuthStore();

  const hasAccess = (userId: string) => authStore.user.id === userId;

  return {
    hasAccess,
  };
}
