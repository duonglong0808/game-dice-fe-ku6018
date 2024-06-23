import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
import './globals.css';
import StoreProvider from './StoreProvider';
import { Suspense } from 'react';
import Head from 'next/head';
// import StoreProvider from './StoreProvider';

// const inter = Inter({ subsets: ['latin'] });

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <StoreProvider>
          <Suspense>{children}</Suspense>
        </StoreProvider>
      </body>
    </html>
  );
}
