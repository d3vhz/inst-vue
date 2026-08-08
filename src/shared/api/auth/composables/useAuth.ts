import { useAuthStore } from '../model';

export function useAuth() {
  const authStore = useAuthStore();

  const isCurrentUser = (userId: string) => authStore.user.id === userId;

  return {
    isCurrentUser,
  };
}
