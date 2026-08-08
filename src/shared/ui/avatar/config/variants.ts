import { cva } from 'class-variance-authority';

const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full',
  {
    variants: {
      size: {
        default: 'size-12',
        xs: 'size-8',
        sm: 'size-10',
        lg: 'size-16',
        xl: 'size-28',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export { avatarVariants };
