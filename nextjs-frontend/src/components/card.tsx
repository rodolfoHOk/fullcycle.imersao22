import { cn } from '@/lib/utils';

export function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('bg-slate-800 rounded-lg p-8 w-full h-fit', className)}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: React.ComponentProps<'h1'>) {
  return (
    <h1 className={cn('text-2xl font-bold text-white', className)} {...props} />
  );
}

export function CardSubtitle({
  className,
  ...props
}: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn('text-base font-normal text-gray-400', className)}
      {...props}
    />
  );
}
