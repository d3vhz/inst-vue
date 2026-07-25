import {
  createRouter,
  createWebHistory,
  type RouteParamsGeneric,
  type RouteRecordRaw,
} from 'vue-router';

import { RouteName } from '~/shared/config';

import { authGuard } from './guards';

const HomePage = () => import('~/pages/home/ui/HomePage.vue');
const AboutPage = () => import('~/pages/about/ui/AboutPage.vue');
const SignInPage = () => import('~/pages/auth/sign-in/ui/SignInPage.vue');
const SignUpPage = () => import('~/pages/auth/sign-up/ui/SignUpPage.vue');
const PostListPage = () => import('~/pages/post/list/ui/PostListPage.vue');
const PostCreatePage = () =>
  import('~/pages/post/create/ui/PostCreatePage.vue');
const PostShowPage = () => import('~/pages/post/show/ui/PostShowPage.vue');
const PostEditPage = () => import('~/pages/post/edit/ui/PostEditPage.vue');

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: RouteName.Home,
    component: HomePage,
    meta: {
      title: 'Home',
    },
  },
  {
    path: '/about',
    name: RouteName.About,
    component: AboutPage,
    meta: {
      title: 'About',
    },
  },
  {
    path: '/posts',
    meta: {
      title: 'Posts',
    },
    children: [
      {
        path: '',
        name: RouteName.PostList,
        component: PostListPage,
        meta: {
          title: 'List',
        },
      },
      {
        path: 'create',
        name: RouteName.PostCreate,
        component: PostCreatePage,
        meta: {
          title: 'Create',
        },
      },
      {
        path: ':id',
        name: RouteName.PostShow,
        component: PostShowPage,
        meta: {
          title: (params: RouteParamsGeneric) => `${params.id}`,
        },
      },
      {
        path: ':id/edit',
        name: RouteName.PostEdit,
        component: PostEditPage,
        meta: {
          title: (params: RouteParamsGeneric) => `${params.id}`,
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
