import {
  EventSocket,
  StatusBaccarat,
  TypeEmitMessage,
  TypeUpdatePointUser,
  pointPoker,
} from '@/constants';
import { useAppDispatch } from '@/lib';
import {
  updateListDataBaccaratCurrent,
  updateListDataBaccaratDetail,
  updateOrAddDataBaccaratDetail,
  updateOrAddDataBaccaratDetailCurrent,
} from '@/lib/redux/app/baccaratDetail.slice';
import { updatePointUser } from '@/lib/redux/app/userCurrent.slice';
import WebSocketSingleton from '@/lib/ws/wskInstance';
import { useEffect } from 'react';

interface BaccaratWskDto {
  typeEmit: number;
  dataBaccaratDetail: any;
  type: number;
  points: number;
  gameBaccaratId: number;
  baccaratDetailId: number;
  transaction: number;
  mainTransaction: string;
  status: number | string;
  pointPlayer: number;
  pointBanker: number;
  pokerBanker: string[];
  pokerPlayer: string[];
  arrBetActive: string[];
}

export const useHandleMessageBaccaratWsk = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('Start detail baccarat');
    const wsk = WebSocketSingleton.getInstance();
    wsk.checkAndConnectSocket();

    wsk.joinRoom();

    wsk.listeningEvent(EventSocket.Data, (data: BaccaratWskDto) => {
      console.log('🚀 ~ wsk.listeningEvent ~ data:', data);
      const type = data?.typeEmit;
      switch (type) {
        case TypeEmitMessage.updateStatusBaccarat:
          if (data.status == StatusBaccarat.check) {
            const { pokerBanker, pokerPlayer } = data;
            const valuePokerPlayer: number[] = pokerPlayer?.map(
              (pk) => pointPoker[pk.split('_')[1].slice(1)]
            );
            const valuePokerBanker: number[] = pokerBanker?.map(
              (pk) => pointPoker[pk.split('_')[1].slice(1)]
            );
            const pointPlayer =
              pokerPlayer.reduce(
                (pre, player) => (pre += pointPoker[player.split('_')[1].slice(1)]),
                0
              ) % 10;
            const pointBanker =
              pokerBanker.reduce(
                (pre, player) => (pre += pointPoker[player.split('_')[1].slice(1)]),
                0
              ) % 10;
            const arrBetActive = [];
            // Con doi
            if (valuePokerPlayer[0] == valuePokerPlayer[1]) {
              arrBetActive.push('p_1');
            }
            // Con and con long bao
            if (pointPlayer > pointBanker) {
              arrBetActive.push('p_5');
              if (pointPlayer - pointBanker >= 4) {
                arrBetActive.push('p_2');
              }
            }
            // Hoa
            if (pointPlayer == pointBanker) {
              arrBetActive.push('p_3');
            }
            // Cai doi
            if (valuePokerBanker[0] == valuePokerBanker[1]) {
              arrBetActive.push('p_7');
            }
            // Cai and cai long bao
            if (pointBanker > pointPlayer) {
              arrBetActive.push('p_4');
              if (pointBanker - pointPlayer >= 4) {
                arrBetActive.push('p_8');
              }
            }
            // Super 6
            if (pointBanker == 6) {
              arrBetActive.push('p_6');
            }
            // Doi bat by
            if (
              valuePokerPlayer[0] == valuePokerPlayer[1] ||
              valuePokerBanker[0] == valuePokerBanker[1]
            ) {
              arrBetActive.push('p_9');
            }
            //  Doi hoan my
            if (pokerBanker[0] == pokerBanker[1] || pokerPlayer[0] == pokerPlayer[1]) {
              arrBetActive.push('p_11');
            }
            // Con bai chuan
            if (pokerPlayer.length == 2 && pointPlayer >= 8) {
              arrBetActive.push('p_10');
            }
            // Cai bai chuan
            if (pokerBanker.length == 2 && pointBanker >= 8) {
              arrBetActive.push('p_12');
            }

            dispatch(
              updateOrAddDataBaccaratDetailCurrent({
                ...data,
                pointBanker,
                pointPlayer,
                arrBetActive,
              })
            );
          } else {
            dispatch(updateOrAddDataBaccaratDetailCurrent({ ...data, arrBetActive: [] }));
          }
          if (data.status == StatusBaccarat.end) {
            const { pokerBanker, pokerPlayer } = data;
            const pointPlayer =
              pokerPlayer.reduce(
                (pre, player) => (pre += pointPoker[player.split('_')[1].slice(1)]),
                0
              ) % 10;
            const pointBanker =
              pokerBanker.reduce(
                (pre, player) => (pre += pointPoker[player.split('_')[1].slice(1)]),
                0
              ) % 10;
            dispatch(updateOrAddDataBaccaratDetail({ ...data, pointBanker, pointPlayer }));
          }
          break;
        case TypeEmitMessage.join:
          dispatch(
            updateListDataBaccaratDetail({ dataBaccaratDetail: data?.dataBaccaratDetail || [] })
          );
          dispatch(
            updateListDataBaccaratCurrent({ dataBaccaratDetail: data?.dataBaccaratDetail || [] })
          );
          break;
        case TypeEmitMessage.updatePoint:
          console.log('Update point', data);
          switch (data.type) {
            case TypeUpdatePointUser.up:
              dispatch(
                updatePointUser({
                  gamePoint: data.points,
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
      console.log('leave detail baccarat');

      wsk.disconnect();
    };
  }, []);
};
