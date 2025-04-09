import Link from 'next/link';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/button';
import { Card, CardSubtitle, CardTitle } from '@/components/card';

export default function LoginErrorPage() {
  return (
    <Card className="max-w-2xl mx-auto">
      <div className="flex flex-col items-center">
        <AlertCircle size={50} className="text-red-500 mb-4" />
        <CardTitle className="text-center mb-2">Erro de Autenticação</CardTitle>
        <CardSubtitle className="text-center mb-6">
          Não foi possível realizar o login com a credencial fornecida
        </CardSubtitle>

        <Button>
          <Link href="/login">Voltar para o Login</Link>
        </Button>
      </div>
    </Card>
  );
}
