import type { VariantProps } from 'class-variance-authority';
import type { PrimitiveProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

import type { avatarVariants } from '../config';

type IAvatarVariants = VariantProps<typeof avatarVariants>;

interface IAvatarProps extends PrimitiveProps {
  size?: IAvatarVariants['size'];
  class?: HTMLAttributes['class'];
}

export type { IAvatarProps };
