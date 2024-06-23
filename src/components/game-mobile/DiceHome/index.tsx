'use client';

import { DiceResultTX } from '@/components/game/DiceResultTX';
import { EvenOddResult } from '@/components/game/EvenOddResult';
import { TypeGameDice } from '@/constants';
import { useAppDispatch } from '@/lib';
import { setGameDiceId } from '@/lib/redux/app/diceGame.slice';
import { useHandleMessageDiceWsk } from '@/ultils/handleDetail';
import { useDiceGame } from '@/ultils/handleGame';
import { useInitDataDice } from '@/ultils/handleHomeDice';
import classNames from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export function DiceHomeMobile(): JSX.Element {
  const { data } = useDiceGame();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const wsk = useHandleMessageDiceWsk();
  const initData = useInitDataDice();

  return (
    <>
      {data.map((item, index) => {
        let imageNational = '';
        switch (item.national?.toLowerCase()) {
          case 'vn':
            imageNational = "url('/Content/images/bg_anchor_04.png')";
            break;
          case 'phl':
            imageNational = "url('/Content/images/bg_anchor_03.png')";
            break;
          default:
            break;
        }

        return (
          <div
            key={index}
            onClick={() => {
              dispatch(setGameDiceId({ id: index < 3 ? item.id : data[index % 3].id }));
              router.push(`/mobile/game/${index < 3 ? item.id : data[index % 3].id}?game=dice`);
            }}
            className="w-full mb-1 rounded-sm border-[1px] border-[#484848] relative bg-gradient-to-b-[#2a2a2a_0%,#131313_100%]">
            <div className="flex justify-between bg-[#484647]">
              <div className="flex text-[12px] items-center px-1">
                <span
                  className={classNames('block', {
                    'text-[#49e5d6]': item.type == TypeGameDice.Blockchain,
                    'text-white': !(item.type == TypeGameDice.Blockchain),
                  })}>
                  {item.typeText}
                </span>
                <span className="block text-white ml-1">{item.name}</span>
              </div>
              <div className="flex items-center py-1">
                <div className="flex items-center justify-center mr-2">
                  <span className="w-4 h-4 text-[11px] rounded-full text-sm text-white bg-[#dc0000] text-center flex items-center justify-center">
                    L
                  </span>
                  <span className="text-sm text-white ml-1">{item.valueL}</span>
                </div>
                <div className="flex items-center justify-center mr-2">
                  <span className="w-4 h-4 text-[11px] rounded-full text-sm text-white bg-[#0036ff] text-center relative flex items-center justify-center">
                    C
                  </span>
                  <span className="text-sm text-white ml-1">{item.valueC}</span>
                </div>
              </div>
            </div>
            <div className="flex h-[94px] m-[3px]">
              <div className="relative w-[32%] ">
                <Image alt="avatar" src={item.image} fill />
                {imageNational && (
                  <div
                    className={`absolute bg-no-repeat w-full left-0 right-0 bottom-[2px]`}
                    style={{ background: `${imageNational} no-repeat` }}>
                    <span className="block text-end mr-7 text-white font-semibold text-sm">
                      {item.nameAuthor}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1 flex ml-1 l">
                <div className="basis-1/2">
                  <div className="border-r-[1px] border-[#979797]">
                    <EvenOddResult gameDiceId={index < 3 ? item.id : data[index % 3].id} />
                  </div>
                </div>

                <div className="basis-1/2">
                  <DiceResultTX gameDiceId={index < 3 ? item.id : data[index % 3].id} />
                </div>
                {/* <div className="basis-1/2">
                    <EvenOddResult gameDiceId={item.id} />
                  </div> */}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
