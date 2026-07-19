const queryKeys = {
  all: ['users'],
  session: () => [...queryKeys.all, 'session'],
};

const PASSWORD_MAX_CHARACTERS_COUNT = 6;

export { queryKeys, PASSWORD_MAX_CHARACTERS_COUNT };
