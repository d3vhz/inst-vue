import type { MaybeRef } from '~/shared/model';

const queryKeys = {
  user: (id: MaybeRef<string>) => ['user', id],
};

const USER_ROLES = ['admin', 'user'] as const;

export { queryKeys, USER_ROLES };
