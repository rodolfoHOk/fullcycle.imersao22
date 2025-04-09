'use client';

import Link from 'next/link';
import { CreditCard, Lock } from 'lucide-react';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Label } from '@/components/label';
import { SubCard, SubCardTitle } from '@/components/sub-card';
import { TextArea } from '@/components/textarea';
import { createInvoiceAction } from './create-invoice-action';

export function InvoiceForm() {
  const value = 1.01;
  const processingFee = value * 0.02;
  const total = value + processingFee;

  return (
    <form action={createInvoiceAction}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <Label>Valor</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                R$
              </span>
              <Input
                id="amount"
                name="amount"
                type="number"
                step={0.01}
                min={0}
                defaultValue={1.01}
                placeholder="0,00"
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <Label>Descrição</Label>
            <TextArea
              id="description"
              name="description"
              placeholder="Descreva o motivo do pagamento"
              defaultValue={'Pagamento de fatura'}
            />
          </div>
        </div>

        <SubCard>
          <SubCardTitle>Dados do Cartão</SubCardTitle>

          <div className="space-y-4">
            <div>
              <Label>Número do Cartão</Label>
              <div className="relative">
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="0000000000000000"
                  defaultValue={'1234123412341234'}
                  maxLength={16}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <CreditCard />
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Data de Expiração</Label>
                <Input
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="MM/AA"
                  defaultValue={'12/25'}
                />
              </div>

              <div>
                <Label>CVV</Label>
                <Input
                  id="cvv"
                  name="cvv"
                  placeholder="123"
                  defaultValue={'123'}
                />
              </div>
            </div>

            <div>
              <Label>Nome no Cartão</Label>
              <Input
                id="cardholderName"
                name="cardholderName"
                placeholder="Como aparece no cartão"
                defaultValue={'John Doe'}
              />
            </div>
          </div>
        </SubCard>
      </div>

      <SubCard className="mt-8">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>
              R$ {value ? value.toFixed(2).replace('.', ',') : '0,00'}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Taxa de Processamento (2%)</span>
            <span>
              R$ {value ? processingFee.toFixed(2).replace('.', ',') : '0,00'}
            </span>
          </div>

          <div className="border-t border-slate-600 pt-2 mt-2 flex justify-between font-bold">
            <span>Total</span>
            <span>
              R$ {total ? total.toFixed(2).replace('.', ',') : '0,00'}
            </span>
          </div>
        </div>
      </SubCard>

      <div className="flex justify-end gap-4 mt-8">
        <Button type="button" variant={'secondary'}>
          <Link href="/invoices">Cancelar</Link>
        </Button>

        <Button type="submit" variant={'primary'}>
          <Lock size={16} />
          <span>Processar Pagamento</span>
        </Button>
      </div>
    </form>
  );
}
