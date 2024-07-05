import { EventSocket, StatusDiceDetail, TypeEmitMessage, TypeUpdatePointUser } from '@/constants';
import { useAppDispatch } from '@/lib';
import {
  updateListDataDiceCurrent,
  updateListDataDiceDetail,
  updateOrAddDataDiceDetail,
  updateOrAddDataDiceDetailCurrent,
} from '@/lib/redux/app/diceDetail.slice';
import { updatePointUser } from '@/lib/redux/app/userCurrent.slice';
import WebSocketSingleton from '@/lib/ws/wskInstance';
import { useEffect } from 'react';

export const useHandleMessageDiceWsk = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('Start 2');
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
      console.log('leave 2');

      wsk.disconnect();
    };
  }, []);
};
