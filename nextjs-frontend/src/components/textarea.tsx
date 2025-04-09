import { cn } from '@/lib/utils';

export function TextArea({
  className,
  ...props
}: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      className={cn(
        'w-full h-32 bg-slate-600 border border-slate-500 rounded p-2',
        className
      )}
      {...props}
    />
  );
}
