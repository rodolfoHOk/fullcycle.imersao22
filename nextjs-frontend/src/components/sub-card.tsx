import { cn } from '@/lib/utils';

export function SubCard({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('bg-slate-700 rounded-lg p-6', className)} {...props} />
  );
}

export function SubCardTitle({
  className,
  ...props
}: React.ComponentProps<'h3'>) {
  return (
    <h3
      className={cn('text-xl font-semibold text-white mb-4', className)}
      {...props}
    />
  );
}
