import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Full Cycle Gateway',
  description: 'Payment gateway solution',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.className} bg-slate-900 text-white min-h-screen`}
      >
        <div className="min-h-screen flex flex-col">
          <Header />

          <main className="flex-1 container mx-auto px-4 py-8 flex">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
