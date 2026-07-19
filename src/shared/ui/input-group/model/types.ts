import type { VariantProps } from 'class-variance-authority';

import type {
  inputGroupAddonVariants,
  inputGroupButtonVariants,
} from '../config';

type InputGroupVariants = VariantProps<typeof inputGroupAddonVariants>;

type InputGroupButtonVariants = VariantProps<typeof inputGroupButtonVariants>;

export type { InputGroupVariants, InputGroupButtonVariants };
