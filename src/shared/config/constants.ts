const RouteName = {
  SignIn: 'sign-in',
  SignUp: 'sign-up',
  PostList: 'post-list',
  PostCreate: 'post-create',
  PostShow: 'post-show',
  PostEdit: 'post-edit',
  UserShow: 'user-show',
  UserEdit: 'user-edit',
} as const;

const DEFAULT_DEBOUNCE_TIME = 500;

const DEFAULT_STALE_TIME = 2 * 60 * 1000;

export { RouteName, DEFAULT_DEBOUNCE_TIME, DEFAULT_STALE_TIME };
