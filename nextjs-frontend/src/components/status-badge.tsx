import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const translatedStatus = {
  approved: {
    text: 'Aprovado',
  },
  pending: {
    text: 'Pendente',
  },
  rejected: {
    text: 'Rejeitado',
  },
};

const statusBadgeVariants = cva(
  'px-3 py-1 rounded-full text-xs transition-colors duration-200',
  {
    variants: {
      status: {
        approved:
          'bg-green-200 text-green-800 hover:bg-green-500/20 hover:text-white',
        pending:
          'bg-yellow-200 text-yellow-800 hover:bg-yellow-500/20 hover:text-white',
        rejected:
          'bg-red-200 text-red-800 hover:bg-red-500/20 hover:text-white',
      },
    },
    defaultVariants: {
      status: 'pending',
    },
  }
);

export function StatusBadge({
  status,
  className,
}: React.ComponentProps<'span'> & VariantProps<typeof statusBadgeVariants>) {
  return (
    <span className={cn(statusBadgeVariants({ status, className }))}>
      {status ? translatedStatus[status].text : 'Pendente'}
    </span>
  );
}
