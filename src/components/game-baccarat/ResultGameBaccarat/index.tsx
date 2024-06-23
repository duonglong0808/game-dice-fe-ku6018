'use client';

import { StatusBaccarat, pointPoker } from '@/constants';
import { useAppSelector } from '@/lib';
import classNames from 'classnames/bind';
import Image from 'next/image';

const cx = classNames.bind({});

export function ResultGameBaccarat(): JSX.Element {
  const { dataBaccaratDetailCurrent } = useAppSelector((state) => state.baccaratDetail);
  const { gameBaccaratId } = useAppSelector((state) => state.baccaratGame);
  const dataBaccaratDetailById = dataBaccaratDetailCurrent.find(
    (d) => d.gameBaccaratId == gameBaccaratId
  );
  const dataStatusBaccarat =
    typeof dataBaccaratDetailById?.status == 'string'
      ? dataBaccaratDetailById?.status?.split(':')
      : [dataBaccaratDetailById?.status];
  const statsBaccaratDetail = Number(dataStatusBaccarat[0]);

  if (
    statsBaccaratDetail == StatusBaccarat.showPoker ||
    statsBaccaratDetail == StatusBaccarat.check
  ) {
    const pointPlayer = dataBaccaratDetailById?.pokerPlayer
      ? dataBaccaratDetailById?.pokerPlayer.reduce(
          (pre, player) => (pre += pointPoker[player.split('_')[1].slice(1)]),
          0
        ) % 10
      : 0;

    const pointBanker = dataBaccaratDetailById?.pokerBanker
      ? dataBaccaratDetailById?.pokerBanker.reduce(
          (pre, banker) => (pre += pointPoker[banker.split('_')[1].slice(1)]),
          0
        ) % 10
      : 0;

    return (
      <div className="absolute bottom-0 left-0 right-0 z-10 lg:left-4 lg:right-0 lg:bottom-[calc(130px+23%)]">
        <div className="bg-[#000000b3] flex lg:bg-[#04030b] lg:w-[253px] lg:h-[168px]">
          <div
            className={cx(
              'flex justify-end lg:block flex-1 py-[6px] lg:py-2 lg:m-1 border-[1px] rounded-sm',
              {
                'bg-[#ffd9804d] lg:bg-[#ffd9804d] border-[#fed700]':
                  pointPlayer > pointBanker && statsBaccaratDetail == StatusBaccarat.check,
                'border-[transparent]':
                  statsBaccaratDetail != StatusBaccarat.check || pointPlayer < pointBanker,
              }
            )}>
            <div className="text-center text-xl mb-1 font-semibold hidden lg:block">
              <span className="text-[#0036ff]">Con</span>
              <span className="text-[#ffd800] ml-[6px]">{pointPlayer}</span>
            </div>
            {dataBaccaratDetailById?.pokerPlayer ? (
              <>
                {/* mobile */}
                <div className="flex lg:hidden justify-center mr-4">
                  {dataBaccaratDetailById?.pokerPlayer[2] ? (
                    <Image
                      alt="pocker"
                      src={`/Areas/Mobile/Images/poker/${dataBaccaratDetailById?.pokerPlayer[2]}.svg`}
                      width={28}
                      height={40}
                      className="rotate-90"
                    />
                  ) : (
                    <></>
                  )}
                </div>
                <div className="flex lg:hidden justify-center ">
                  {dataBaccaratDetailById?.pokerPlayer[1] ? (
                    <Image
                      alt="pocker"
                      src={`/Areas/Mobile/Images/poker/${dataBaccaratDetailById?.pokerPlayer[1]}.svg`}
                      width={28}
                      height={40}
                      className="ml-[2px]"
                    />
                  ) : (
                    <></>
                  )}
                  {dataBaccaratDetailById?.pokerPlayer[0] ? (
                    <Image
                      alt="pocker"
                      src={`/Areas/Mobile/Images/poker/${dataBaccaratDetailById?.pokerPlayer[0]}.svg`}
                      width={28}
                      height={40}
                      className="ml-1"
                    />
                  ) : (
                    <></>
                  )}
                </div>
                <div className="text-center text-[17px] px-2 font-semibold flex flex-col lg:hidden">
                  <span className="text-[#0036ff]">Con</span>
                  <span className="text-[#ffd800] ml-[6px]">{pointPlayer}</span>
                </div>

                {/* PC */}

                <div className="hidden lg:flex justify-center ">
                  {dataBaccaratDetailById?.pokerPlayer[1] ? (
                    <Image
                      alt="pocker"
                      src={`/Content/images/poker/${dataBaccaratDetailById?.pokerPlayer[1]}.png`}
                      width={40}
                      height={60}
                      className="ml-[2px]"
                    />
                  ) : (
                    <></>
                  )}
                  {dataBaccaratDetailById?.pokerPlayer[0] ? (
                    <Image
                      alt="pocker"
                      src={`/Content/images/poker/${dataBaccaratDetailById?.pokerPlayer[0]}.png`}
                      width={40}
                      height={60}
                      className="ml-1"
                    />
                  ) : (
                    <></>
                  )}
                </div>
                <div className="-mt-1 hidden lg:flex justify-center">
                  {dataBaccaratDetailById?.pokerPlayer[2] ? (
                    <Image
                      alt="pocker"
                      src={`/Content/images/poker/${dataBaccaratDetailById?.pokerPlayer[2]}.png`}
                      width={40}
                      height={60}
                      className="rotate-90"
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="hidden lg:block m-auto h-[95%] w-[1px] bg-[#e6e6e647]"></div>
          <div
            className={cx(
              'flex justify-start lg:block flex-1 py-[6px] lg:py-2 lg:m-1 border-[1px] rounded-sm',
              {
                'bg-[#ffd9804d] lg:bg-[#ffd9804d] border-[#fed700]':
                  pointPlayer < pointBanker && statsBaccaratDetail == StatusBaccarat.check,

                'border-[transparent]':
                  statsBaccaratDetail != StatusBaccarat.check || pointPlayer > pointBanker,
              }
            )}>
            <div className="text-center text-xl mb-1 font-semibold hidden lg:block">
              <span className="text-[#db1002]">Cái</span>
              <span className="text-[#ffd800] ml-[6px]">{pointBanker}</span>
            </div>
            {dataBaccaratDetailById?.pokerBanker ? (
              <>
                {/* Mobile */}
                <div className="text-center text-[17px] px-2 font-semibold flex flex-col lg:hidden">
                  <span className="text-[#f00]">Cái</span>
                  <span className="text-[#ffd800] ml-[6px]">{pointBanker}</span>
                </div>
                <div className="flex lg:hidden justify-center ">
                  {dataBaccaratDetailById?.pokerBanker[1] ? (
                    <Image
                      alt="pocker"
                      src={`/Areas/Mobile/Images/poker/${dataBaccaratDetailById?.pokerBanker[1]}.svg`}
                      width={28}
                      height={40}
                      className="ml-[2px]"
                    />
                  ) : (
                    <></>
                  )}
                  {dataBaccaratDetailById?.pokerBanker[0] ? (
                    <Image
                      alt="pocker"
                      src={`/Areas/Mobile/Images/poker/${dataBaccaratDetailById?.pokerBanker[0]}.svg`}
                      width={28}
                      height={40}
                      className="ml-1"
                    />
                  ) : (
                    <></>
                  )}
                </div>
                <div className=" flex lg:hidden justify-center ml-4">
                  {dataBaccaratDetailById?.pokerBanker[2] ? (
                    <Image
                      alt="pocker"
                      src={`/Areas/Mobile/Images/poker/${dataBaccaratDetailById?.pokerBanker[2]}.svg`}
                      width={28}
                      height={40}
                      className="rotate-90"
                    />
                  ) : (
                    <></>
                  )}
                </div>

                {/* PC */}
                <div className="hidden lg:flex justify-center">
                  {dataBaccaratDetailById?.pokerBanker[1] ? (
                    <Image
                      alt="pocker"
                      src={`/Content/images/poker/${dataBaccaratDetailById?.pokerBanker[1]}.png`}
                      width={40}
                      height={60}
                      className="ml-[2px]"
                    />
                  ) : (
                    <></>
                  )}
                  {dataBaccaratDetailById?.pokerBanker[0] ? (
                    <Image
                      alt="pocker"
                      src={`/Content/images/poker/${dataBaccaratDetailById?.pokerBanker[0]}.png`}
                      width={40}
                      height={60}
                      className="ml-1"
                    />
                  ) : (
                    <></>
                  )}
                </div>
                <div className="-mt-1 hidden lg:flex justify-center">
                  {dataBaccaratDetailById?.pokerBanker[2] ? (
                    <Image
                      alt="pocker"
                      src={`/Content/images/poker/${dataBaccaratDetailById?.pokerBanker[2]}.png`}
                      width={40}
                      height={60}
                      className="rotate-90"
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
  }
  return <></>;
}
