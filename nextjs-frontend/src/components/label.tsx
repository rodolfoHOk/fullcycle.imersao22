import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const labelVariants = cva('block mb-2 font-normal text-white', {
  variants: {
    size: {
      default: 'text-base',
      small: 'text-sm',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export function Label({
  className,
  size,
  ...props
}: React.ComponentProps<'label'> & VariantProps<typeof labelVariants>) {
  return (
    <label className={cn(labelVariants({ size, className }))} {...props} />
  );
}
