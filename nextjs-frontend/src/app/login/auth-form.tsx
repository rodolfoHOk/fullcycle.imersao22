import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { Label } from '@/components/label';

export async function loginAction(formData: FormData) {
  'use server';

  const apiKey = formData.get('apiKey');

  const response = await fetch('http://localhost:8080/accounts', {
    headers: {
      'X-API-KEY': apiKey as string,
    },
  });
  if (!response.ok) {
    redirect('/login/error');
  }

  const cookiesStore = await cookies();
  cookiesStore.set('apiKey', apiKey as string);

  redirect('/invoices');
}

export function AuthForm() {
  return (
    <form action={loginAction}>
      <Label htmlFor="apiKey">API Key</Label>

      <div className="flex">
        <input
          type="text"
          id="apiKey"
          name="apiKey"
          placeholder="Digite sua API Key"
          className="flex-1 bg-slate-700 border border-slate-600 rounded-l-md p-2 pl-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button className="bg-indigo-600 hover:bg-indigo-700 rounded-r-md p-2 transition-colors duration-200 cursor-pointer">
          <ArrowRight size={24} />
        </button>
      </div>
    </form>
  );
}
