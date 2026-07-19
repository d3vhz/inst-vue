import { HomeIcon, InboxIcon, PlusIcon } from '@lucide/vue';

import { RouteName } from '~/shared/config';

import type { IMenuItem, IUserDropdownMenuItem } from '../model';

const menuItems: IMenuItem[] = [
  {
    title: 'Create',
    routeName: RouteName.Home,
    icon: PlusIcon,
  },
  {
    title: 'Home',
    routeName: RouteName.Home,
    icon: HomeIcon,
  },
  {
    title: 'About',
    routeName: RouteName.About,
    icon: InboxIcon,
  },
];

const userDropdownItems: IUserDropdownMenuItem[] = [
  {
    title: 'Account',
    routeName: RouteName.Home,
    disabled: true,
  },
  {
    title: 'Settings',
    routeName: RouteName.Home,
    disabled: true,
  },
];

export { menuItems, userDropdownItems };
