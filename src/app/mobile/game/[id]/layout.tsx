// pages/game/[id]/layout.tsx
'use client';

import { HeaderGameMobile } from '../../../../components/game-mobile/Header';

export default function LayoutDetailGameMobile({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-svh">
      <HeaderGameMobile isShowSlide={false} bg={'bg-[transparent]'} navigateToMain={false} />
      {children}
    </main>
  );
}
