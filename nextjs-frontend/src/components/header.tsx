import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { LogOut } from 'lucide-react';

interface HeaderProps {
  username?: string;
}

export async function logoutAction() {
  'use server';
  const cookiesStore = await cookies();
  cookiesStore.delete('apiKey');
  redirect('/login');
}

export default async function Header({ username = 'usuário' }: HeaderProps) {
  const cookiesStore = await cookies();
  const isAuthPage = cookiesStore.get('apiKey')?.value !== undefined;

  return (
    <header className="bg-slate-800 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Full Cycle Gateway
        </Link>

        {isAuthPage && (
          <div className="flex items-center gap-4">
            <span className="text-gray-300">Olá, {username}</span>

            <form action={logoutAction}>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded flex items-center gap-1 cursor-pointer transition-colors duration-200">
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
}
