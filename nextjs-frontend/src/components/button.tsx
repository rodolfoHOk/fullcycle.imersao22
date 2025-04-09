import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'text-white px-4 py-2 rounded flex items-center gap-1 transition-colors duration-200 cursor-pointer',
  {
    variants: {
      variant: {
        primary: 'bg-indigo-600 hover:bg-indigo-700',
        secondary: 'bg-slate-700 hover:bg-slate-600',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

export function Button({
  className,
  variant,
  ...props
}: React.ComponentProps<'button'> & VariantProps<typeof buttonVariants>) {
  return (
    <button className={cn(buttonVariants({ variant, className }))} {...props} />
  );
}
