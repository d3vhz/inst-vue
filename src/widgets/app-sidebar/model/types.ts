import type { LucideIcon } from '@lucide/vue';

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
};

export type { IMenuItem, IUserDropdownMenuItem };
