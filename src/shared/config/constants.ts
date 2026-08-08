const RouteName = {
  SignIn: 'sign-in',
  SignUp: 'sign-up',
  Feed: 'feed',
  ProfileShow: 'profile-show',
  ProfileEdit: 'profile-edit',
  Search: 'search',
  PostCreate: 'post-create',
  PostShow: 'post-show',
  PostEdit: 'post-edit',
} as const;

const DEFAULT_DEBOUNCE_TIME = 500;

const DEFAULT_STALE_TIME = 2 * 60 * 1000;
const DEFAULT_GC_TIME = 5 * 60 * 1000;

export {
  RouteName,
  DEFAULT_DEBOUNCE_TIME,
  DEFAULT_STALE_TIME,
  DEFAULT_GC_TIME,
};
