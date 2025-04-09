'use client';

import type React from 'react';

import { useState } from 'react';
import { CreditCard, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/button';
import Link from 'next/link';
import { Input } from '@/components/input';
import { TextArea } from '@/components/textarea';
import { Card } from '@/components/card';
import { SubCard } from '@/components/sub-card';

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
        <h1 className="text-2xl font-bold">Criar Nova Fatura</h1>
        <p className="text-gray-400">
          Preencha os dados abaixo para processar um novo pagamento
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Valor</label>
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
              <label className="block mb-2">Descrição</label>
              <TextArea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva o motivo do pagamento"
              />
            </div>
          </div>

          <SubCard>
            <h2 className="text-xl font-semibold mb-4">Dados do Cartão</h2>

            <div className="space-y-4">
              <div>
                <label className="block mb-2">Número do Cartão</label>
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
                  <label className="block mb-2">Data de Expiração</label>
                  <Input type="text" placeholder="MM/AA" />
                </div>

                <div>
                  <label className="block mb-2">CVV</label>
                  <Input type="text" placeholder="123" />
                </div>
              </div>

              <div>
                <label className="block mb-2">Nome no Cartão</label>
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
