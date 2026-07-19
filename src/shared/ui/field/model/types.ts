import type { VariantProps } from 'class-variance-authority';

import type { fieldVariants } from '../config';

type IFieldVariants = VariantProps<typeof fieldVariants>;

export type { IFieldVariants };
