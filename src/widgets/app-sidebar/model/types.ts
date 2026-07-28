import type { LucideIcon } from '@lucide/vue';
import type { RouteParamsGeneric } from 'vue-router';

import type { IRouteName } from '~/shared/model';

type IMenuItem = {
  title: string;
  routeName: IRouteName;
  icon: LucideIcon;
};

type IUserDropdownMenuItem = {
  title: string;
  routeName: IRouteName;
  disabled?: boolean;
  routeParams?: RouteParamsGeneric;
};

export type { IMenuItem, IUserDropdownMenuItem };
