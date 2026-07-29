import { useAuthStore } from '~/shared/api';
import { RouteName } from '~/shared/config';

import type { IUserDropdownMenuItem } from '../model';

export function useUserDropdownItems() {
  const authStore = useAuthStore();
  const userId = authStore.user.id;

  const userDropdownItems: IUserDropdownMenuItem[] = [
    {
      title: 'Profile',
      routeName: RouteName.UserShow,
      routeParams: { ...(userId && { id: userId }) },
    },
    {
      title: 'Settings',
      routeName: RouteName.UserShow,
      disabled: true,
    },
  ];

  return {
    user: authStore.user,
    userDropdownItems,
  };
}
