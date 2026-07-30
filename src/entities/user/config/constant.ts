const queryKeys = {
  user: (id: string) => ['user', id],
};

const USER_ROLES = ['admin', 'user'] as const;

export { queryKeys, USER_ROLES };
