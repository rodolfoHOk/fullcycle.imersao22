import Link from 'next/link';
import { cookies } from 'next/headers';
import { Eye, Download, Plus } from 'lucide-react';
import { Card, CardSubtitle, CardTitle } from '@/components/card';
import { SubCard } from '@/components/sub-card';
import { Input } from '@/components/input';
import { Select, Option } from '@/components/select';
import { StatusBadge } from '@/components/status-badge';
import { Paging } from '@/components/paging';
import { Button } from '@/components/button';
import { Label } from '@/components/label';

interface Invoice {
  id: string;
  created_at: string;
  description: string;
  amount: number;
  status: 'approved' | 'pending' | 'rejected';
}

export async function getInvoices(): Promise<Invoice[]> {
  const cookiesStore = await cookies();
  const apiKey = cookiesStore.get('apiKey')?.value;

  const response = await fetch('http://gateway-api:8080/invoice', {
    headers: {
      'X-API-KEY': apiKey as string,
    },
    // cache: 'force-cache',
    next: {
      tags: [`accounts/${apiKey}/invoices`],
    },
  });

  return response.json();
}

export default async function InvoicesPage() {
  const invoices = await getInvoices();

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
          <Link href="/invoices/create" className="flex items-center gap-1">
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

                <td className="py-3 px-4">
                  {new Date(invoice.created_at).toLocaleDateString()}
                </td>

                <td className="py-3 px-4">{invoice.description}</td>

                <td className="py-3 px-4">
                  {invoice.amount.toFixed(2).replace('.', ',')}
                </td>

                <td className="py-3 px-4">
                  <StatusBadge status={invoice.status} />
                </td>

                <td className="py-3 px-4">
                  <div className="flex gap-4">
                    <Link
                      href={`/invoices/${invoice.id}`}
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
