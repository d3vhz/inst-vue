import { useAuthStore } from '../../auth';

const formatPath = (path: string) => {
  const authStore = useAuthStore();
  const userId = authStore.user.id;
  if (!userId) {
    throw new Error('user is not found');
  }
  return path.substring(path.indexOf(`${userId}/`));
};

export { formatPath };
