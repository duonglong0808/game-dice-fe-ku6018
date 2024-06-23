'use client';

import Image from 'next/image';
import classNames from 'classnames';
import { useState } from 'react';
import { HeaderGameMobile } from '../../../components/game-mobile/Header';
import { DiceHomeMobile } from '@/components/game-mobile/DiceHome';
import { BaccaratHomeMobile } from '@/components/game-mobile/BaccaratHome';

export default function PageGame(): JSX.Element {
  const [game, setGame] = useState('dice');

  return (
    <div>
      <HeaderGameMobile isShowSlide={true} />

      <div className="">
        <ul className="fixed z-[2] bottom-0 top-[84px] w-[64px] px-1 border-r-[1px] border-[#333] bg-[#000] py-2">
          <li className="mb-1 w-full h-fit flex justify-center items-center">
            <button
              onClick={() => setGame('dice')}
              className={classNames('p-1 w-full text-center rounded-lg border-[1px]', {
                'border-[#8099ff] shadow-[0_0_3px_#9e865e,0_0_3px_#9e865e_inset]': game == 'dice',
                'border-[transparent]': game != 'dice',
              })}>
              <Image
                alt=""
                src={
                  game == 'dice'
                    ? '/Areas/Mobile/Images/menuImg_cd_02.svg'
                    : '/Areas/Mobile/Images/btn_betRecord_black_B.svg'
                }
                width={28}
                height={28}
                className="mx-auto pb-[2px]"
              />
              <h4 className="text-[#b0c9ff] text-[10px]">Xóc đĩa</h4>
            </button>
          </li>
          <li className="mb-1 w-full h-fit flex justify-center items-center">
            <button
              onClick={() => setGame('mc-baccarat')}
              className={classNames('p-1 w-full text-center border-[1px]', {
                'border-[#ffd100] rounded-md': game == 'mc-baccarat',
                'border-[transparent]': game != 'mc-baccarat',
              })}>
              <Image
                alt=""
                src={'/Areas/Mobile/Images/menuImg_V_bac.svg'}
                width={28}
                height={28}
                className="mx-auto pb-[2px]"
              />
              <h4 className="text-[#ffd100] text-[10px]">
                MC <br></br> Baccarat
              </h4>
            </button>
          </li>
          <li className="mb-1 w-full h-fit flex justify-center items-center">
            <button className="p-1 w-full text-center">
              <Image
                alt=""
                src={'/Areas/Mobile/Images/menuImg_bac.svg'}
                width={28}
                height={28}
                className="mx-auto pb-[2px]"
              />
              <h4 className="text-[#6aff00] text-[10px]">
                China <br></br> Baccarat
              </h4>
            </button>
          </li>

          <li className="mb-1 w-full h-fit flex justify-center items-center">
            <button className="p-1 w-full text-center">
              <Image
                alt=""
                src={'/Areas/Mobile/Images/menuImg_bac.svg'}
                width={28}
                height={28}
                className="mx-auto pb-[2px]"
              />
              <h4 className="text-[#6aff00] text-[10px]">
                Blockchain <br></br>Baccarat
              </h4>
            </button>
          </li>
          <li className="mb-1 w-full h-fit flex justify-center items-center">
            <button className="p-1 w-full text-center">
              <Image
                alt=""
                src={'/Areas/Mobile/Images/menuImg_many_02.gif'}
                width={28}
                height={28}
                className="mx-auto pb-[2px]"
              />
              <h4 className="text-[#00a8ff] text-[10px]">Nhiều bàn</h4>
            </button>
          </li>
          <li className="mb-1 w-full h-fit flex justify-center items-center">
            <button className="p-1 w-full text-center">
              <Image
                alt=""
                src={'/Areas/Mobile/Images/menuImg_sb.svg'}
                width={28}
                height={28}
                className="mx-auto pb-[2px]"
              />
              <h4 className="text-white text-[10px]">Sic bo</h4>
            </button>
          </li>
          <li className="mb-1 w-full h-fit flex justify-center items-center">
            <button className="p-1 w-full text-center">
              <Image
                alt=""
                src={'/Areas/Mobile/Images/menuImg_dt.svg'}
                width={28}
                height={28}
                className="mx-auto pb-[2px]"
              />
              <h4 className="text-white text-[10px]">Rồng hổ</h4>
            </button>
          </li>
          <li className="mb-1 w-full h-fit flex justify-center items-center">
            <button className="p-1 w-full text-center">
              <Image
                alt=""
                src={'/Areas/Mobile/Images/menuImg_gf.svg'}
                width={28}
                height={28}
                className="mx-auto pb-[2px]"
              />
              <h4 className="text-white text-[10px]">Tr Kim Hoa</h4>
            </button>
          </li>
          <li className="mb-1 w-full h-fit flex justify-center items-center">
            <button className="p-1 w-full text-center">
              <Image
                alt=""
                src={'/Areas/Mobile/Images/menuImg_lp.gif'}
                width={28}
                height={28}
                className="mx-auto pb-[2px]"
              />
              <h4 className="text-[#b0c9ff] text-[10px]">Roulette</h4>
            </button>
          </li>
          <li className="mb-1 w-full h-fit flex justify-center items-center">
            <button className="p-1 w-full text-center">
              <Image
                alt=""
                src={'/Areas/Mobile/Images/menuImg_B_tk.svg'}
                width={28}
                height={28}
                className="mx-auto pb-[2px]"
              />
              <h4 className="text-white text-[10px]">
                Blockchain <br></br> Ba Tây
              </h4>
            </button>
          </li>
          <li className="mb-1 w-full h-fit flex justify-center items-center">
            <button className="p-1 w-full text-center">
              <Image
                alt=""
                src={'/Areas/Mobile/Images/menuImg_others.svg'}
                width={28}
                height={28}
                className="mx-auto pb-[2px]"
              />
              <h4 className="text-white text-[10px]">Khác</h4>
            </button>
          </li>
        </ul>
        <div className="w-[calc(100%-64px)]  h-[calc(100svh-84px)] fixed top-[84px] right-0 bottom-0 ml-auto overflow-y-scroll bg-black">
          <div className="flex-1 pt-1 px-1 flex flex-col ">
            {game == 'dice' ? (
              <DiceHomeMobile />
            ) : game == 'mc-baccarat' ? (
              <BaccaratHomeMobile />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
