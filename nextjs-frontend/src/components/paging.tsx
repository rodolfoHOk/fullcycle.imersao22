import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const pagingButtonVariants = cva(
  'p-2 rounded  w-8 h-8 flex items-center justify-center cursor-pointer transition-colors duration-200',
  {
    variants: {
      variant: {
        default: 'bg-slate-700 hover:bg-slate-600',
        selected: 'bg-indigo-600 hover:bg-indigo-700',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function PagingButton({
  className,
  variant,
  ...props
}: React.ComponentProps<'button'> & VariantProps<typeof pagingButtonVariants>) {
  return (
    <button
      className={cn(pagingButtonVariants({ variant, className }))}
      {...props}
    />
  );
}

export function Paging() {
  return (
    <div className="flex gap-1">
      <PagingButton>
        <ChevronLeft size={16} />
      </PagingButton>

      <PagingButton variant={'selected'}>
        <span>1</span>
      </PagingButton>

      <PagingButton>
        <span>2</span>
      </PagingButton>

      <PagingButton>
        <span>3</span>
      </PagingButton>

      <PagingButton>
        <ChevronRight size={16} />
      </PagingButton>
    </div>
  );
}
