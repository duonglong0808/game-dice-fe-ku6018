'use client';

import { useAppDispatch } from '@/lib';
import { BaccaratItem } from '../BaccaratItem';
import { useBaccaratGame, useInitDataBaccarat } from '@/ultils/handleHomeBaccarat';
import { setGameBaccaratId } from '@/lib/redux/app/baccaratGame.slice';
import { useHandleMessageBaccaratWsk } from '@/ultils/handleDetailBaccarat';

export function BaccaratHome(): JSX.Element {
  const initData = useInitDataBaccarat();
  const wsk = useHandleMessageBaccaratWsk();
  const dispatch = useAppDispatch();
  const { data } = useBaccaratGame();

  return (
    <>
      {data.map((baccarat, index) => {
        return (
          <div
            onClick={() =>
              dispatch(setGameBaccaratId({ id: index < 3 ? baccarat.id : data[index % 3].id }))
            }
            key={index}>
            <BaccaratItem
              key={index}
              {...baccarat}
              id={index < 3 ? baccarat.id : data[index % 3].id}
            />
          </div>
        );
      })}
    </>
  );
}
