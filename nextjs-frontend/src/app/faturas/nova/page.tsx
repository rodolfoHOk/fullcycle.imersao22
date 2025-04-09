'use client';

import type React from 'react';

import { useState } from 'react';
import { CreditCard, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/button';
import Link from 'next/link';
import { Input } from '@/components/input';
import { TextArea } from '@/components/textarea';
import { Card, CardSubtitle, CardTitle } from '@/components/card';
import { SubCard, SubCardTitle } from '@/components/sub-card';
import { Label } from '@/components/label';

export default function NewInvoicePage() {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');

  const numericValue =
    Number.parseFloat(value.replace(/[^\d]/g, '')) / 100 || 0;
  const formattedValue = numericValue.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
  });

  const processingFee = numericValue * 0.02;
  const total = numericValue + processingFee;

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const input = e.target.value.replace(/[^\d]/g, '');
    const numeric = Number.parseInt(input) / 100;
    setValue(numeric.toLocaleString('pt-BR', { minimumFractionDigits: 2 }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would submit the form data to your API
    router.push('/faturas');
  };

  return (
    <Card>
      <div className="mb-6">
        <CardTitle>Criar Nova Fatura</CardTitle>
        <CardSubtitle>
          Preencha os dados abaixo para processar um novo pagamento
        </CardSubtitle>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <Label>Valor</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  R$
                </span>
                <Input
                  type="text"
                  value={formattedValue}
                  onChange={handleValueChange}
                  className="pl-10"
                  placeholder="0,00"
                />
              </div>
            </div>

            <div>
              <Label>Descrição</Label>
              <TextArea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva o motivo do pagamento"
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
                    type="text"
                    className="pr-10"
                    placeholder="0000 0000 0000 0000"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <CreditCard />
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Data de Expiração</Label>
                  <Input type="text" placeholder="MM/AA" />
                </div>

                <div>
                  <Label>CVV</Label>
                  <Input type="text" placeholder="123" />
                </div>
              </div>

              <div>
                <Label>Nome no Cartão</Label>
                <Input type="text" placeholder="Como aparece no cartão" />
              </div>
            </div>
          </SubCard>
        </div>

        <SubCard className="mt-8">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>R$ {formattedValue}</span>
            </div>

            <div className="flex justify-between">
              <span>Taxa de Processamento (2%)</span>
              <span>
                R${' '}
                {processingFee.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>

            <div className="border-t border-slate-600 pt-2 mt-2 flex justify-between font-bold">
              <span>Total</span>
              <span>
                R${' '}
                {total.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
        </SubCard>

        <div className="flex justify-end gap-4 mt-8">
          <Button type="button" variant={'secondary'}>
            <Link href="/faturas">Cancelar</Link>
          </Button>

          <Button type="submit" variant={'primary'}>
            <Lock size={16} />
            <span>Processar Pagamento</span>
          </Button>
        </div>
      </form>
    </Card>
  );
}
