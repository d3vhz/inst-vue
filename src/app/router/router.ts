import { createMemoryHistory, createRouter } from 'vue-router';

const HomePage = () => import('~/pages/home/ui/Home.vue');
const AboutPage = () => import('~/pages/about/ui/About.vue');

const routes = [
  { path: '/', component: HomePage },
  { path: '/about', component: AboutPage },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export { router };
