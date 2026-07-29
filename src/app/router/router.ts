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
const PostListPage = () => import('~/pages/post/list/ui/PostListPage.vue');
const PostCreatePage = () =>
  import('~/pages/post/create/ui/PostCreatePage.vue');
const PostShowPage = () => import('~/pages/post/show/ui/PostShowPage.vue');
const PostEditPage = () => import('~/pages/post/edit/ui/PostEditPage.vue');
const UserShowPage = () => import('~/pages/user/show/ui/UserShowPage.vue');
const UserEditPage = () => import('~/pages/user/edit/ui/UserEditPage.vue');

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: { name: RouteName.PostList },
  },
  {
    path: '/posts',
    meta: {
      breadcrumb: {
        label: 'Posts',
      },
    },
    children: [
      {
        path: '',
        name: RouteName.PostList,
        component: PostListPage,
        meta: {
          breadcrumb: {
            label: 'List',
          },
        },
      },
      {
        path: 'create',
        name: RouteName.PostCreate,
        component: PostCreatePage,
        meta: {
          breadcrumb: {
            label: 'Create',
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
  {
    path: '/users',
    meta: {
      breadcrumb: {
        label: 'Users',
        disabled: true,
      },
    },
    children: [
      {
        path: ':id',
        name: RouteName.UserShow,
        component: UserShowPage,
        meta: {
          breadcrumb: {
            label: (params: RouteParamsGeneric) => `${params.id}`,
          },
        },
      },
      {
        path: ':id/edit',
        name: RouteName.UserEdit,
        component: UserEditPage,
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
