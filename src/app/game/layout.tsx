import GameLayout from '@/layouts/game/layout';
import type { Metadata } from 'next';
import StoreProvider from '../StoreProvider';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'KU Trò chơi Casino',
  description: 'KU Trò chơi Casino top 1 ',
  icons: [
    {
      media: '(prefers-color-scheme: light)',
      url: '/images/favicon.ico',
      href: '/images/favicon.ico',
    },
    {
      media: '(prefers-color-scheme: dark)',
      url: '/images/favicon.ico',
      href: '/images/favicon.ico',
    },
  ],
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GameLayout>
      <Suspense>{children}</Suspense>
    </GameLayout>
  );
}
