import Link from 'next/link';
import { Eye, Download, Plus } from 'lucide-react';
import { Card, CardSubtitle, CardTitle } from '@/components/card';
import { SubCard } from '@/components/sub-card';
import { Input } from '@/components/input';
import { Select, Option } from '@/components/select';
import { StatusBadge } from '@/components/status-badge';
import { Paging } from '@/components/paging';
import { Button } from '@/components/button';
import { Label } from '@/components/label';

type Invoice = {
  id: string;
  date: string;
  description: string;
  value: string;
  status: 'Aprovado' | 'Pendente' | 'Rejeitado';
};

export default function InvoicesPage() {
  const invoices: Invoice[] = [
    {
      id: '#INV-001',
      date: '30/03/2025',
      description: 'Compra Online #123',
      value: 'R$ 1.500,00',
      status: 'Aprovado',
    },
    {
      id: '#INV-002',
      date: '29/03/2025',
      description: 'Serviço Premium',
      value: 'R$ 15.000,00',
      status: 'Pendente',
    },
    {
      id: '#INV-003',
      date: '28/03/2025',
      description: 'Assinatura Mensal',
      value: 'R$ 99,90',
      status: 'Rejeitado',
    },
  ];

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <div>
          <CardTitle>Faturas</CardTitle>
          <CardSubtitle className="text-gray-400">
            Gerencie suas faturas e acompanhe os pagamentos
          </CardSubtitle>
        </div>

        <Button variant={'primary'}>
          <Link href="/faturas/nova" className="flex items-center gap-1">
            <Plus size={16} />
            <span>Nova Fatura</span>
          </Link>
        </Button>
      </div>

      <SubCard className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label size={'small'}>Status</Label>
            <Select>
              <Option>Todos</Option>
              <Option>Aprovado</Option>
              <Option>Pendente</Option>
              <Option>Rejeitado</Option>
            </Select>
          </div>

          <div>
            <Label size={'small'}>Data Inicial</Label>
            <Input type="date" placeholder="dd/mm/aaaa" />
          </div>

          <div>
            <Label size={'small'}>Data Final</Label>
            <Input type="date" placeholder="dd/mm/aaaa" />
          </div>

          <div>
            <Label size={'small'}>Buscar</Label>
            <Input type="text" placeholder="ID ou descrição" />
          </div>
        </div>
      </SubCard>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-600">
              <th className="text-left py-3 px-4">ID</th>
              <th className="text-left py-3 px-4">DATA</th>
              <th className="text-left py-3 px-4">DESCRIÇÃO</th>
              <th className="text-left py-3 px-4">VALOR</th>
              <th className="text-left py-3 px-4">STATUS</th>
              <th className="text-left py-3 px-4">AÇÕES</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-b border-slate-700">
                <td className="py-3 px-4">{invoice.id}</td>

                <td className="py-3 px-4">{invoice.date}</td>

                <td className="py-3 px-4">{invoice.description}</td>

                <td className="py-3 px-4">{invoice.value}</td>

                <td className="py-3 px-4">
                  <StatusBadge status={invoice.status} />
                </td>

                <td className="py-3 px-4">
                  <div className="flex gap-4">
                    <Link
                      href={`/faturas/INV-${invoice.id.replace('#', '')}`}
                      className="text-indigo-400 hover:text-indigo-300 cursor-pointer transition-colors duration-200"
                    >
                      <Eye size={24} />
                    </Link>

                    <button className="text-indigo-400 hover:text-indigo-300 cursor-pointer transition-colors duration-200">
                      <Download size={24} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-400">
          Mostrando 1 - 3 de 50 resultados
        </div>

        <Paging />
      </div>
    </Card>
  );
}
