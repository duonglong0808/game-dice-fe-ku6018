'use client';

import { HistoryOX } from '@/components/game-baccarat/HistoryOX';
import { TypeGameBaccarat } from '@/constants';
import { useAppDispatch } from '@/lib';
import { setGameBaccaratId } from '@/lib/redux/app/baccaratGame.slice';
import { useHandleMessageBaccaratWsk } from '@/ultils/handleDetailBaccarat';
import { useBaccaratGame, useInitDataBaccarat } from '@/ultils/handleHomeBaccarat';
import classNames from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export function BaccaratHomeMobile(): JSX.Element {
  const { data } = useBaccaratGame();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const initData = useInitDataBaccarat();
  const wsk = useHandleMessageBaccaratWsk();

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
          case 'tl':
            imageNational = "url('/Content/images/bg_anchor_02.png')";
            break;
          case 'ind':
            imageNational = "url('/Content/images/bg_anchor_06.png')";
            break;
          default:
            break;
        }

        return (
          <div
            key={index}
            onClick={() => {
              dispatch(
                setGameBaccaratId({ id: index < 2 ? item.id : data[index % 2 == 0 ? 0 : 1].id })
              );
              router.push(
                `/mobile/game/${
                  index < 2 ? item.id : data[index % 2 == 0 ? 0 : 1].id
                }?game=mc-baccarat`
              );
            }}
            className="w-full mb-1 rounded-sm border-[1px] border-[#484848] relative bg-gradient-to-b-[#2a2a2a_0%,#131313_100%]">
            <div className="flex justify-between bg-[#484647]">
              <div className="flex text-[12px] items-center px-1">
                <span
                  className={classNames('block', {
                    'text-[#33b5dd]': item.type == TypeGameBaccarat.flash,
                    'text-[#ff8a00]': item.type == TypeGameBaccarat.mi,
                    'text-[#e8be00]': item.type == TypeGameBaccarat.normal,
                  })}>
                  {item.typeText}
                </span>
                <span className="block text-white ml-1">{item.name}</span>
              </div>
              <div className="flex items-center py-1">
                <div className="flex items-center justify-center mr-2">
                  <span className="w-4 h-4 text-[11px] rounded-full text-white bg-[#dc0000] text-center flex items-center justify-center">
                    B
                  </span>
                  <span className="text-sm text-white ml-1">{item.valueB}</span>
                </div>
                <div className="flex items-center justify-center mr-2">
                  <span className="w-4 h-4 text-[11px] rounded-full text-white bg-[#0036ff] text-center relative flex items-center justify-center">
                    P
                  </span>
                  <span className="text-sm text-white ml-1">{item.valueP}</span>
                </div>
                <div className="flex items-center justify-center mr-2">
                  <span className="w-4 h-4 text-[11px] rounded-full text-white bg-[#3aaf00] text-center relative flex items-center justify-center">
                    T
                  </span>
                  <span className="text-sm text-white ml-1">{item.valueP}</span>
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
              <div className="flex-1 flex ml-1">
                <HistoryOX
                  isLive={false}
                  baccaratId={index < 2 ? item.id : data[index % 2 == 0 ? 0 : 1].id}
                  col={15}
                  row={6}
                />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
