'use client';

import { useAppDispatch, useAppSelector } from '@/lib';
import XocDiaDetailsView from '@/components/game-desktop/DiceDetailView';
import { SliderHome } from '@/components/game-desktop/DiceSlider';
import { useSearchParams } from 'next/navigation';
import { DicesHome } from '@/components/game-desktop/DicesHome';
import { GameMainTain } from '@/components/game/GameMaintain';
import { BaccaratHome } from '@/components/game-desktop/BaccaratHome';
import { BaccaratDetailView } from '@/components/game-desktop/BaccaratDetailView';

export default function GamePage(): JSX.Element {
  const { gameDiceId } = useAppSelector((state) => state.diceGame);
  const { gameBaccaratId } = useAppSelector((state) => state.baccaratGame);
  console.log('🚀 ~ GamePage ~ gameBaccaratId:', gameBaccaratId);
  const searchParams = useSearchParams();
  const game = searchParams.get('game') || 'dice';

  return (
    <div className="w-full">
      {gameDiceId || gameBaccaratId ? (
        gameDiceId ? (
          <XocDiaDetailsView gameDiceId={gameDiceId} />
        ) : (
          <BaccaratDetailView />
        )
      ) : (
        <>
          <SliderHome />
          <div
            className="wrapper-games"
            style={{
              paddingTop: 10,
              paddingRight: 44,
              paddingLeft: 8,
            }}>
            <div className="grid grid-cols-3 gap-4">
              {game === 'dice' ? (
                <DicesHome />
              ) : game === 'mc-bacca' ? (
                <BaccaratHome />
              ) : (
                <GameMainTain />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
