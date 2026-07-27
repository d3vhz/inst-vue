import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-primary/20 text-primary hover:bg-primary/80 hover:text-primary-foreground',
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
        ghost:
          'hover:bg-primary/80 hover:text-primary-foreground data-[active="true"]:not-hover:bg-secondary data-[active="true"]:not-hover:text-secondary-foreground',
        link: 'text-primary hover:bg-primary/20',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        xs: "h-6 gap-1 px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: 'h-8 gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-xs': "size-6 [&_svg:not([class*='size-'])]:size-3",
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export { buttonVariants };
