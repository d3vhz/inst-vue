import type { NavigationGuard } from 'vue-router';

import { useAuthGuard } from '~/entities/auth';
import { RouteName } from '~/shared/config';
import type { IRouteName } from '~/shared/model';

const AUTH_ROUTES = new Set<IRouteName>([RouteName.SignIn, RouteName.SignUp]);

const authGuard: NavigationGuard = async (to) => {
  const { isAuthenticated } = await useAuthGuard();
  const isAuthRoute = AUTH_ROUTES.has(to.name as IRouteName);

  if (!isAuthenticated && !isAuthRoute) {
    return { name: RouteName.SignIn };
  }

  if (isAuthenticated && isAuthRoute) {
    return { name: RouteName.Home };
  }
};

export { authGuard };
