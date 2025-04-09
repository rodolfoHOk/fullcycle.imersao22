import { cn } from '@/lib/utils';

export function SubCard({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('bg-slate-700 rounded-lg p-6', className)} {...props} />
  );
}
