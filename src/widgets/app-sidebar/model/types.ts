import type { LucideIcon } from '@lucide/vue';
import type { RouteParamsGeneric } from 'vue-router';

import type { IRouteName } from '~/shared/model';

type IMenuItem = {
  title: string;
  routeName: IRouteName;
  routeParams?: RouteParamsGeneric;
  icon?: LucideIcon;
  disabled?: boolean;
};

type IUserDropdownMenuItem = IMenuItem;

export type { IMenuItem, IUserDropdownMenuItem };
