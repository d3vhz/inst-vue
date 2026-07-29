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

const DEBOUNCE_TIME = 500;

export { RouteName, DEBOUNCE_TIME };
