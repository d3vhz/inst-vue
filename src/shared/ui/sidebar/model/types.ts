import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'vue';

import type { sidebarMenuButtonVariants } from '../config';

interface SidebarProps {
  side?: 'left' | 'right';
  variant?: 'sidebar' | 'floating' | 'inset';
  collapsible?: 'offcanvas' | 'icon' | 'none';
  class?: HTMLAttributes['class'];
}

type SidebarMenuButtonVariants = VariantProps<typeof sidebarMenuButtonVariants>;

export type { SidebarProps, SidebarMenuButtonVariants };
