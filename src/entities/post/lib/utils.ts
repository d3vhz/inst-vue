import type { IPost } from '../model';

const getOptimisticPost = (post: Partial<IPost>) => ({
  ...post,
  isOptimistic: true,
});

export { getOptimisticPost };
