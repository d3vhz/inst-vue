import type { VariantProps } from 'class-variance-authority';
import type { PrimitiveProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

import type { buttonVariants } from '../config';

type IButtonVariants = VariantProps<typeof buttonVariants>;

interface IButtonProps extends PrimitiveProps {
  variant?: IButtonVariants['variant'];
  size?: IButtonVariants['size'];
  class?: HTMLAttributes['class'];
}

export type { IButtonProps, IButtonVariants };
