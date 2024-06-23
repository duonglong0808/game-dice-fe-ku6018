'use client';

import classNames from 'classnames/bind';
import { LiveStreamBaccarat } from '../LiveStreamBaccarat';
import { ChatLive } from '../ChatLive';
import { GoodRoad } from '../GoodRoad';
import { HistoryBPT } from '@/components/game-baccarat/HistoryBPT';
import { useAppSelector } from '@/lib';
import { HistoryOX } from '@/components/game-baccarat/HistoryOX';
import { HistoryDetailBaccarat } from '@/components/game-baccarat/HistoryDetail';
import { HistoryRingBaccarat } from '@/components/game-baccarat/HistoryRing';
import { HistoryDotBaccarat } from '@/components/game-baccarat/HistoryDot';
import { HistoryLineBaccarat } from '@/components/game-baccarat/HistoryLine';
import { useHandleMessageBaccaratWsk } from '@/ultils/handleDetailBaccarat';

const cx = classNames.bind({});

export function BaccaratDetailView(): JSX.Element {
  const { gameBaccaratId } = useAppSelector((state) => state.baccaratGame);
  const initWsk = useHandleMessageBaccaratWsk();

  return (
    <div className={cx('relative')}>
      <div className={cx('h-[calc(87vh-4px)]')}>
        <LiveStreamBaccarat />
      </div>
      <div className={cx('flex absolute left-0 right-0 bottom-[-58px]')}>
        <HistoryBPT
          baccaratId={Number(gameBaccaratId)}
          col={10}
          row={6}
          initType="number"
          showOption
          isLive
        />
        <div className="flex">
          <div>
            <HistoryOX baccaratId={Number(gameBaccaratId)} col={25} row={6} isLive />
            <div className="flex">
              <HistoryRingBaccarat key={1} col={9} row={3} baccaratId={Number(gameBaccaratId)} />
              <HistoryDotBaccarat key={2} col={9} row={3} baccaratId={Number(gameBaccaratId)} />
              <HistoryLineBaccarat key={3} col={9} row={3} baccaratId={Number(gameBaccaratId)} />
            </div>
          </div>
          <div className="w-[35px] bg-white">
            <div className="h-[50%] border-[1px] border-t-0 text-center border-[#979797]">
              <span className="block text-[#db1002] font-semibold text-sm py-2">Hỏi Cái</span>
              <div className="flex justify-center items-center mx-[1px] rounded-xl p-1 bg-[#dddddd] px-[2px]">
                <span className="block rounded-full w-[6px] h-[6px] mr-[3px] border-[2px] border-[#db1002]"></span>
                <span className="block rounded-full w-[6px] h-[6px] mr-[3px] bg-[#db1002]"></span>
                <span className=" block bg-[#db1002] w-[2px] h-[5px] rotate-[21deg] relative top-[0.5px]"></span>
              </div>
            </div>
            <div className="h-[50%] border-[1px] border-b-0 text-center border-[#979797]">
              <span className="block text-[#0403cb] font-semibold text-sm py-2">Hỏi Con</span>
              <div className="flex justify-center items-center mx-[1px] rounded-xl p-1 bg-[#dddddd] px-[2px]">
                <span className="block rounded-full w-[6px] h-[6px] mr-[3px] border-[2px] border-[#0403cb]"></span>
                <span className="block rounded-full w-[6px] h-[6px] mr-[3px] bg-[#0403cb]"></span>
                <span className=" block bg-[#0403cb] w-[2px] h-[5px] rotate-[21deg] relative top-[0.5px]"></span>
              </div>
            </div>
          </div>
          <HistoryDetailBaccarat baccaratId={Number(gameBaccaratId)} />
        </div>

        <GoodRoad />
        <div className="flex-1">
          {/* <iframe src={diceGameById?.idChat} className="h-full w-full"></iframe> */}
          <ChatLive />
        </div>
      </div>
    </div>
  );
}
