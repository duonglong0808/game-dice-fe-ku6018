'use client';

import { BaccaratDetailViewMobile } from '@/components/game-mobile/BaccaratDetailView';
import { DetailDiceDetailMobile } from '@/components/game-mobile/DiceDetailView';
import { useSearchParams } from 'next/navigation';

export default function DetailLive() {
  const searchParams = useSearchParams();
  const game = searchParams.get('game');

  return game == 'dice' ? <DetailDiceDetailMobile /> : <BaccaratDetailViewMobile />;
}
