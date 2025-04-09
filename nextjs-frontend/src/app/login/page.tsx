import { Card } from '@/components/card';
import { SubCard } from '@/components/sub-card';
import { ArrowRight, Info } from 'lucide-react';

export default function LoginPage() {
  return (
    <Card className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-2">
        Autenticação Gateway
      </h1>
      <p className="text-gray-400 text-center mb-6">
        Insira sua API Key para acessar o sistema
      </p>

      <div className="space-y-4">
        <div>
          <label htmlFor="apiKey" className="block mb-2">
            API Key
          </label>

          <div className="flex">
            <input
              type="text"
              id="apiKey"
              placeholder="Digite sua API Key"
              className="flex-1 bg-slate-700 border border-slate-600 rounded-l-md p-2 pl-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button className="bg-indigo-600 hover:bg-indigo-700 rounded-r-md p-2">
              <ArrowRight size={24} />
            </button>
          </div>
        </div>

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
