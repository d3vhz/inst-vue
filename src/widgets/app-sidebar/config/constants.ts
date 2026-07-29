import { ImagesIcon, PlusIcon } from '@lucide/vue';

import { RouteName } from '~/shared/config';

import type { IMenuItem } from '../model';

const menuItems: IMenuItem[] = [
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
