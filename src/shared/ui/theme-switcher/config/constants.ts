import { MonitorIcon, MoonIcon, SunIcon } from '@lucide/vue';

import type { IThemeItem } from '../model';

const themeItems: IThemeItem[] = [
  {
    label: 'light',
    icon: SunIcon,
  },
  {
    label: 'auto',
    icon: MonitorIcon,
  },
  {
    label: 'dark',
    icon: MoonIcon,
  },
];

export { themeItems };
