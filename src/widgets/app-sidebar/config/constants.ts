import { HomeIcon, ImagesIcon, InfoIcon, PlusIcon } from '@lucide/vue';

import { RouteName } from '~/shared/config';

import type { IMenuItem } from '../model';

const menuItems: IMenuItem[] = [
  {
    title: 'Home',
    routeName: RouteName.Home,
    icon: HomeIcon,
  },
  {
    title: 'About',
    routeName: RouteName.About,
    icon: InfoIcon,
  },
  {
    title: 'Feed',
    routeName: RouteName.PostList,
    icon: ImagesIcon,
  },
  {
    title: 'Create',
    routeName: RouteName.PostCreate,
    icon: PlusIcon,
  },
];

export { menuItems };
