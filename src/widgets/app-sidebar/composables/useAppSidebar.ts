import { ImagesIcon, PlusIcon, SearchIcon, UserIcon } from '@lucide/vue';

import { useAuthStore } from '~/shared/api';
import { RouteName } from '~/shared/config';

import type { IMenuItem } from '../model';

export function useAppSidebar() {
  const authStore = useAuthStore();
  const authUser = authStore.user;

  const menuItems: IMenuItem[] = [
    {
      title: 'Feed',
      routeName: RouteName.Feed,
      icon: ImagesIcon,
    },
    {
      title: 'Search',
      routeName: RouteName.Search,
      icon: SearchIcon,
    },
    {
      title: 'Create Post',
      routeName: RouteName.PostCreate,
      icon: PlusIcon,
    },
    {
      title: 'Profile',
      routeName: RouteName.ProfileShow,
      routeParams: { ...(authUser.id && { id: authUser.id }) },
      icon: UserIcon,
    },
  ];

  return {
    authUser,
    menuItems,
  };
}
