import { cva } from 'class-variance-authority';

const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full',
  {
    variants: {
      size: {
        default: 'size-8',
        xs: 'size-6',
        sm: 'size-7',
        lg: 'size-10',
        xl: 'size-28',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export { avatarVariants };
