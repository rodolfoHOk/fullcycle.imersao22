import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const statusBadgeVariants = cva('px-3 py-1 rounded-full text-xs', {
  variants: {
    status: {
      Aprovado: 'bg-green-200 text-green-800',
      Pendente: 'bg-yellow-200 text-yellow-800',
      Rejeitado: 'bg-red-200 text-red-800',
    },
  },
  defaultVariants: {
    status: 'Pendente',
  },
});

export function StatusBadge({
  status,
  className,
}: React.ComponentProps<'span'> & VariantProps<typeof statusBadgeVariants>) {
  return (
    <span className={cn(statusBadgeVariants({ status, className }))}>
      {status}
    </span>
  );
}
