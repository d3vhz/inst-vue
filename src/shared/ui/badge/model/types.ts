import type { VariantProps } from 'class-variance-authority';

import type { badgeVariants } from '../config';

type BadgeVariants = VariantProps<typeof badgeVariants>;

export type { BadgeVariants };
