import type { LucideIcon } from '@lucide/vue';
import type { BasicColorSchema } from '@vueuse/core';

import type { IButtonProps } from '../../button';

type IThemeSwitcherProps = Pick<IButtonProps, 'variant' | 'size'>;

type IThemeItem = { label: BasicColorSchema; icon: LucideIcon };

export type { IThemeItem, IThemeSwitcherProps };
