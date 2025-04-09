import { cn } from '@/lib/utils';

export function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('bg-slate-800 rounded-lg p-8 w-full h-fit', className)}
      {...props}
    />
  );
}
