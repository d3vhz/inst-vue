import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-primary focus-visible:ring-1 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
  {
    variants: {
      variant: {
        primary:
          'bg-primary/20 text-primary hover:bg-primary/80 hover:text-primary-foreground',
        'primary-text': 'text-primary hover:bg-primary/20',
        secondary:
          'bg-secondary/20 text-secondary hover:bg-secondary/80 hover:text-secondary-foreground',
        'secondary-text': 'text-secondary hover:text-secondary/90',
        positive:
          'bg-positive/20 text-positive hover:bg-positive/80 hover:text-positive-foreground',
        'positive-text': 'text-positive hover:bg-positive/20',
        amber:
          'bg-amber/20 text-amber hover:bg-amber/80 hover:text-amber-foreground',
        'amber-text': 'text-amber hover:bg-amber/20',
        destructive:
          'bg-destructive/20 text-destructive hover:bg-destructive/80 hover:text-destructive-foreground',
        'destructive-text': 'text-destructive hover:bg-destructive/20',
        muted: 'bg-muted/20 text-muted-foreground hover:bg-muted/80',
        'muted-text': 'text-muted hover:bg-muted/20',
        ghost:
          'hover:bg-primary/80 hover:text-primary-foreground data-[active="true"]:not-hover:bg-muted data-[active="true"]:not-hover:text-muted-foreground',
      },
      size: {
        default:
          "h-9 px-4 py-2 has-[>svg]:px-4 [&_svg:not([class*='size-'])]:size-4",
        xs: "h-6 gap-1 px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5 [&_svg:not([class*='size-'])]:size-4",
        lg: "h-10 px-6 has-[>svg]:px-4 [&_svg:not([class*='size-'])]:size-6",
        icon: "size-9 [&_svg:not([class*='size-'])]:size-5",
        'icon-xs': "size-6 [&_svg:not([class*='size-'])]:size-3",
        'icon-sm': "size-8 [&_svg:not([class*='size-'])]:size-4",
        'icon-lg': "size-10 [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export { buttonVariants };
