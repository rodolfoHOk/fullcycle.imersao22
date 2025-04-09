import Link from 'next/link';
import { LogOut } from 'lucide-react';

interface HeaderProps {
  username?: string;
}

export default function Header({ username = 'usuário' }: HeaderProps) {
  return (
    <header className="bg-slate-800 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Full Cycle Gateway
        </Link>

        <div className="flex items-center gap-4">
          <span className="text-gray-300">Olá, {username}</span>

          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded flex items-center gap-1">
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
