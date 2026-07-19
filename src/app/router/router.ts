import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router';

import { RouteName } from '~/shared/config';

import { authGuard } from './guards';

const HomePage = () => import('~/pages/home/ui/HomePage.vue');
const AboutPage = () => import('~/pages/about/ui/AboutPage.vue');
const SignInPage = () => import('~/pages/auth/sign-in/ui/SignInPage.vue');
const SignUpPage = () => import('~/pages/auth/sign-up/ui/SignUpPage.vue');

const routes: RouteRecordRaw[] = [
  { path: '/', name: RouteName.Home, component: HomePage },
  { path: '/about', name: RouteName.About, component: AboutPage },
  { path: '/sign-in', name: RouteName.SignIn, component: SignInPage },
  { path: '/sign-up', name: RouteName.SignUp, component: SignUpPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(authGuard);

export { router };
