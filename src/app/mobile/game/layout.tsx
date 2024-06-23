import { Metadata } from 'next';

// export const metadata: Metadata = {
//     title: 'KU Trò chơi Casino',
//     description: 'KU Trò chơi Casino top 1 ',
//     icons: [
//       {
//         media: '(prefers-color-scheme: light)',
//         url: '/images/favicon.ico',
//         href: '/images/favicon.ico',
//       },
//       {
//         media: '(prefers-color-scheme: dark)',
//         url: '/images/favicon.ico',
//         href: '/images/favicon.ico',
//       },
//     ],
//   };

export default function LayoutGameMobile({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="h-svh">{children}</main>;
}
