import { cn } from '@/lib/utils';

export function Select({
  className,
  ...props
}: React.ComponentProps<'select'>) {
  return (
    <select
      className={cn(
        'w-full h-11 bg-slate-600 border border-slate-500 rounded p-2',
        className
      )}
      {...props}
    />
  );
}

export function Option({ ...props }: React.ComponentProps<'option'>) {
  return <option {...props} />;
}
