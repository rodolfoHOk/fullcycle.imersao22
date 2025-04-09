import { cn } from '@/lib/utils';

export function Input({
  className,
  type,
  ...props
}: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'w-full h-11 bg-slate-600 border border-slate-500 rounded p-2',
        className
      )}
      {...props}
    />
  );
}
