import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';
import { Card } from '@/components/card';
import { SubCard } from '@/components/sub-card';
import { StatusBadge } from '@/components/status-badge';
import { Button } from '@/components/button';
import { Info } from '@/components/info';
import { TimelineItem } from '@/components/timeline-item';

type Invoice = {
  id: string;
  status: 'Aprovado' | 'Pendente' | 'Rejeitado';
  createdAt: string;
  value: string;
  description: string;
  creationDate: string;
  lastUpdate: string;
  paymentMethod: string;
  lastDigits: string;
  cardHolder: string;
  accountId: string;
  clientIp: string;
  device: string;
  timeline: { status: string; time: string }[];
};

interface InvoiceDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function InvoiceDetailsPage({
  params,
}: InvoiceDetailsPageProps) {
  const { id } = await params;

  const invoice: Invoice = {
    id: `#${id}`,
    status: 'Aprovado',
    createdAt: '30/03/2025 às 14:30',
    value: 'R$ 1.500,00',
    description: 'Compra Online #123',
    creationDate: '30/03/2025 14:30',
    lastUpdate: '30/03/2025 14:35',
    paymentMethod: 'Cartão de Crédito',
    lastDigits: '1234',
    cardHolder: 'João da Silva',
    accountId: 'ACC-12345',
    clientIp: '192.168.1.1',
    device: 'Desktop - Chrome',
    timeline: [
      { status: 'Fatura Criada', time: '30/03/2025 14:30' },
      { status: 'Pagamento Processado', time: '30/03/2025 14:32' },
      { status: 'Transação Aprovada', time: '30/03/2025 14:35' },
    ],
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/faturas"
            className="text-indigo-400 hover:text-indigo-300"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">Fatura {invoice.id}</h1>

          <StatusBadge status={invoice.status} />
        </div>

        <Button variant={'secondary'}>
          <Download size={16} />
          <span>Download PDF</span>
        </Button>
      </div>

      <p className="text-gray-400 mb-6">Criada em {invoice.createdAt}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SubCard>
          <h2 className="text-xl font-semibold mb-4">Informações da Fatura</h2>

          <div className="space-y-4">
            <Info label="ID da Fatura" value={invoice.id} />
            <Info label="Valor" value={invoice.value} />
            <Info label="Data de Criação" value={invoice.creationDate} />
            <Info label="Última Atualização" value={invoice.lastUpdate} />
            <Info label="Descrição" value={invoice.description} />
          </div>
        </SubCard>

        <SubCard>
          <h2 className="text-xl font-semibold mb-4">Status da Transação</h2>

          <div className="space-y-6">
            {invoice.timeline.map((item, index) => (
              <TimelineItem
                key={index}
                status={item.status}
                datetime={item.time}
              />
            ))}
          </div>
        </SubCard>

        <SubCard>
          <h2 className="text-xl font-semibold mb-4">Método de Pagamento</h2>

          <div className="space-y-4">
            <Info label="Tipo" value={invoice.paymentMethod} />
            <Info
              label="Últimos Dígitos"
              value={`**** **** **** ${invoice.lastDigits}`}
            />
            <Info label="Titular" value={invoice.cardHolder} />
          </div>
        </SubCard>

        <SubCard>
          <h2 className="text-xl font-semibold mb-4">Dados Adicionais</h2>

          <div className="space-y-4">
            <Info label="ID da Conta" value={invoice.accountId} />
            <Info label="IP do Cliente" value={invoice.clientIp} />
            <Info label="Dispositivo" value={invoice.device} />
          </div>
        </SubCard>
      </div>
    </Card>
  );
}
