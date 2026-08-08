import {
  createRouter,
  createWebHistory,
  type RouteParamsGeneric,
  type RouteRecordRaw,
} from 'vue-router';

import { RouteName } from '~/shared/config';

import { authGuard } from './guards';

const SignInPage = () => import('~/pages/auth/sign-in/ui/SignInPage.vue');
const SignUpPage = () => import('~/pages/auth/sign-up/ui/SignUpPage.vue');
const FeedPage = () => import('~/pages/feed/ui/FeedPage.vue');
const ProfileShowPage = () =>
  import('~/pages/profile/show/ui/ProfileShowPage.vue');
const ProfileEditPage = () =>
  import('~/pages/profile/edit/ui/ProfileEditPage.vue');
const PostListPage = () => import('~/pages/post/list/ui/PostListPage.vue');
const PostCreatePage = () =>
  import('~/pages/post/create/ui/PostCreatePage.vue');
const PostShowPage = () => import('~/pages/post/show/ui/PostShowPage.vue');
const PostEditPage = () => import('~/pages/post/edit/ui/PostEditPage.vue');

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: FeedPage,
    name: RouteName.Feed,
    meta: {
      breadcrumb: {
        label: 'Feed',
      },
    },
  },
  {
    path: '/profiles',
    meta: {
      breadcrumb: {
        label: 'Profiles',
        disabled: true,
      },
    },
    children: [
      {
        path: '',
        redirect: { name: RouteName.Search },
      },
      {
        path: ':id',
        name: RouteName.ProfileShow,
        component: ProfileShowPage,
        meta: {
          breadcrumb: {
            label: (params: RouteParamsGeneric) => `${params.id}`,
          },
        },
      },
      {
        path: ':id/edit',
        name: RouteName.ProfileEdit,
        component: ProfileEditPage,
        meta: {
          breadcrumb: {
            label: (params: RouteParamsGeneric) => `${params.id}`,
          },
        },
      },
    ],
  },
  {
    path: '/posts',
    meta: {
      breadcrumb: {
        label: 'Search',
      },
    },
    children: [
      {
        path: '',
        name: RouteName.Search,
        component: PostListPage,
      },
      {
        path: 'create',
        name: RouteName.PostCreate,
        component: PostCreatePage,
        meta: {
          breadcrumb: {
            label: 'Create Post',
          },
        },
      },
      {
        path: ':id',
        name: RouteName.PostShow,
        component: PostShowPage,
        meta: {
          breadcrumb: {
            label: (params: RouteParamsGeneric) => `${params.id}`,
          },
        },
      },
      {
        path: ':id/edit',
        name: RouteName.PostEdit,
        component: PostEditPage,
        meta: {
          breadcrumb: {
            label: (params: RouteParamsGeneric) => `${params.id}`,
          },
        },
      },
    ],
  },
  { path: '/sign-in', name: RouteName.SignIn, component: SignInPage },
  { path: '/sign-up', name: RouteName.SignUp, component: SignUpPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(authGuard);

export { router };
