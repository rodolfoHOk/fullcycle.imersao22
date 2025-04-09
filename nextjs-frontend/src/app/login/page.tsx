import { Card, CardSubtitle, CardTitle } from '@/components/card';
import { SubCard } from '@/components/sub-card';
import { Info } from 'lucide-react';
import { AuthForm } from './auth-form';

export default function LoginPage() {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardTitle className="text-center mb-2">Autenticação Gateway</CardTitle>
      <CardSubtitle className="text-center mb-6">
        Insira sua API Key para acessar o sistema
      </CardSubtitle>

      <div className="space-y-4">
        <AuthForm />

        <SubCard>
          <div className="flex gap-2 mb-2">
            <Info size={20} className="text-indigo-400" />
            <h3 className="font-medium">Como obter uma API Key?</h3>
          </div>

          <p className="text-gray-400 text-sm">
            Para obter sua API Key, você precisa criar uma conta de comerciante.
            Entre em contato com nosso suporte para mais informações.
          </p>
        </SubCard>
      </div>
    </Card>
  );
}
