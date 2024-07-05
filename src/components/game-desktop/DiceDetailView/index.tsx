'use client';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { useEffect, useRef } from 'react';
import LiveStream from '../Livestream';
import { HistoryDiceGame } from '../HistoryDiceGame';
import WebSocketSingleton from '@/lib/ws/wskInstance';
import { EventSocket, StatusDiceDetail, TypeEmitMessage, TypeUpdatePointUser } from '@/constants';
import { useAppDispatch } from '@/lib';
import {
  updateListDataDiceCurrent,
  updateListDataDiceDetail,
  updateOrAddDataDiceDetail,
  updateOrAddDataDiceDetailCurrent,
} from '@/lib/redux/app/diceDetail.slice';
import { updatePointUser } from '@/lib/redux/app/userCurrent.slice';
import { GoodRoad } from '../GoodRoad';
import { useAppSelector } from '@/lib';
import { HistoryDiceGameDetail } from '@/components/game/HistoryDiceGameDetail';
import { EvenOddResultLive } from '@/components/game/EvenOddResultLive';
import { DiceResultTXLive } from '@/components/game/DiceResultTXLive';
import { ChatLive } from '../ChatLive';

const cx = classNames.bind(styles);
type Props = {
  gameDiceId: number;
};

export default function XocDiaDetailsView({ gameDiceId }: Props) {
  const { diceGame } = useAppSelector((state) => state.diceGame);
  const diceGameById = diceGame.find((d) => d.id === gameDiceId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('Detail Game');
    const wsk = WebSocketSingleton.getInstance();
    wsk.checkAndConnectSocket();

    wsk.joinRoom();

    wsk.listeningEvent(EventSocket.Data, (data: any) => {
      console.log('🚀 ~ wsk.listeningEvent ~ data:', data);
      const type = data?.typeEmit;
      switch (type) {
        case TypeEmitMessage.updateStatusDice:
          if (typeof data.totalRed == 'number') {
            const result = data.totalRed;
            const arrBetActive = [];
            arrBetActive.push(`p_${result}`);
            switch (result) {
              case 0:
              case 4:
                arrBetActive.push(`p_${-1}`);
                break;
              default:
                break;
            }

            if (result % 2 == 0) {
              arrBetActive.push(`p_chan`);
            } else {
              arrBetActive.push(`p_le`);
            }
            if (result > 2) {
              arrBetActive.push(`p_tai`);
            } else if (result < 2) {
              arrBetActive.push(`p_xiu`);
            }

            dispatch(updateOrAddDataDiceDetailCurrent({ ...data, arrBetActive }));
          } else {
            dispatch(updateOrAddDataDiceDetailCurrent({ ...data, arrBetActive: [] }));
          }
          if (data.status == StatusDiceDetail.end) {
            dispatch(updateOrAddDataDiceDetail({ ...data }));
          }
          break;
        case TypeEmitMessage.join:
          dispatch(updateListDataDiceDetail({ dataDiceDetail: data?.dataDiceDetail || [] }));
          dispatch(updateListDataDiceCurrent({ dataDiceDetail: data?.dataDiceDetail || [] }));
          break;
        case TypeEmitMessage.updatePoint:
          console.log('Update point', data);
          switch (data.type) {
            case TypeUpdatePointUser.up:
              dispatch(
                updatePointUser({
                  gamePoint: data.points,
                  pointBetMain: data.pointBetMain,
                })
              );
              break;
            case TypeUpdatePointUser.down:
              // Xử lý khi thua
              // alert('Ván này bạn đã thua ');
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
    });

    return () => {
      console.log('Detail Game OUTTTTTTTTTTTTTTTTTTT');
      wsk.disconnect();
    };
  }, []);

  return (
    <div className={cx('wrapper', 'relative')}>
      <div className={cx('controller')}>
        <LiveStream src="https:live.vk169.net/hls/test1.m3u8" gameDiceId={gameDiceId} />
      </div>
      <div className={cx('result__list', 'flex')}>
        <HistoryDiceGameDetail gameDiceId={gameDiceId} />
        <HistoryDiceGame gameDiceId={gameDiceId} />
        <EvenOddResultLive gameDiceId={gameDiceId} />
        <DiceResultTXLive gameDiceId={gameDiceId} />
        <GoodRoad />
        <div className="flex-1">
          {/* <iframe src={diceGameById?.idChat} className="h-full w-full"></iframe> */}
          <ChatLive />
        </div>
      </div>
    </div>
  );
}
