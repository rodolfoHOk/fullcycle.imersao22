import Link from 'next/link';
import { cookies } from 'next/headers';
import { ArrowLeft, Download } from 'lucide-react';
import { Card, CardSubtitle, CardTitle } from '@/components/card';
import { SubCard, SubCardTitle } from '@/components/sub-card';
import { StatusBadge } from '@/components/status-badge';
import { Button } from '@/components/button';
import { Info } from '@/components/info';

interface Invoice {
  id: string;
  account_id: string;
  amount: number;
  status: 'approved' | 'pending' | 'rejected';
  description: string;
  payment_type: string;
  card_last_digits: string;
  created_at: string;
  updated_at: string;
}

export async function getInvoice(id: string): Promise<Invoice> {
  const cookiesStore = await cookies();
  const apiKey = cookiesStore.get('apiKey')?.value;

  const response = await fetch(`http://localhost:8080/invoice/${id}`, {
    headers: {
      'X-API-KEY': apiKey as string,
    },
    cache: 'force-cache',
    next: {
      tags: [`accounts/${apiKey}/invoices/${id}`],
    },
  });

  return response.json();
}

interface InvoiceDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function InvoiceDetailsPage({
  params,
}: InvoiceDetailsPageProps) {
  const { id } = await params;

  const invoice = await getInvoice(id);

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/invoices"
            className="text-indigo-400 hover:text-indigo-300"
          >
            <ArrowLeft size={20} />
          </Link>
          <CardTitle>Fatura {invoice.id}</CardTitle>

          <StatusBadge status={invoice.status} />
        </div>

        <Button variant={'secondary'}>
          <Download size={16} />
          <span>Download PDF</span>
        </Button>
      </div>

      <CardSubtitle className="mb-6">
        Criada em {invoice.created_at}
      </CardSubtitle>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SubCard>
          <SubCardTitle>Informações da Fatura</SubCardTitle>

          <div className="space-y-4">
            <Info label="ID da Fatura" value={invoice.id} />
            <Info
              label="Valor"
              value={invoice.amount.toFixed(2).replace('.', ',')}
            />
            <Info
              label="Data de Criação"
              value={new Date(invoice.created_at).toLocaleDateString()}
            />
            <Info
              label="Última Atualização"
              value={new Date(invoice.updated_at).toLocaleDateString()}
            />
            <Info label="Descrição" value={invoice.description} />
          </div>
        </SubCard>

        {/* <SubCard>
          <SubCardTitle>Status da Transação</SubCardTitle>

          <div className="space-y-6">
            {invoice.timeline.map((item, index) => (
              <TimelineItem
                key={index}
                status={item.status}
                datetime={item.time}
              />
            ))}
          </div>
        </SubCard> */}

        <SubCard>
          <SubCardTitle>Método de Pagamento</SubCardTitle>

          <div className="space-y-4">
            <Info
              label="Tipo"
              value={
                invoice.payment_type === 'credit_card'
                  ? 'Cartão de crédito'
                  : 'Boleto'
              }
            />
            <Info
              label="Últimos Dígitos"
              value={`**** **** **** ${invoice.card_last_digits}`}
            />
          </div>
        </SubCard>

        {/* <SubCard>
          <SubCardTitle>Dados Adicionais</SubCardTitle>

          <div className="space-y-4">
            <Info label="ID da Conta" value={invoice.account_id} />
            <Info label="IP do Cliente" value={invoice.client_id} />
            <Info label="Dispositivo" value={invoice.device} />
          </div>
        </SubCard> */}
      </div>
    </Card>
  );
}
