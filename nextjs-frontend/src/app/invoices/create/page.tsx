import { Card, CardSubtitle, CardTitle } from '@/components/card';
import { InvoiceForm } from './invoice-form';

export default function NewInvoicePage() {
  return (
    <Card>
      <div className="mb-6">
        <CardTitle>Criar Nova Fatura</CardTitle>
        <CardSubtitle>
          Preencha os dados abaixo para processar um novo pagamento
        </CardSubtitle>
      </div>

      <InvoiceForm />
    </Card>
  );
}
