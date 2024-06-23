'use client';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib';
import { updatePointUser } from '@/lib/redux/app/userCurrent.slice';
import { StatusBaccarat } from '@/constants';
import { resetDataBetBaccarat } from '@/lib/redux/app/baccaratDetail.slice';
import { betDiceAndBaccarat } from '@/ultils/api';

const cx = classNames.bind(styles);

export default function CountDownBetBaccarat({
  setTotalPointBet,
  dataBetConfirmOld,
  setDataBetConfirmOld,
  typePlay,
}: {
  setTotalPointBet?: React.Dispatch<React.SetStateAction<number>>;
  setDataBetConfirmOld?: React.Dispatch<
    React.SetStateAction<
      {
        point: number;
        answer: number;
      }[]
    >
  >;
  typePlay?: string;
  dataBetConfirmOld?: {
    point: number;
    answer: number;
  }[];
}) {
  const { dataBaccaratDetailCurrent, dataBetCurrent } = useAppSelector(
    (state) => state.baccaratDetail
  );
  const { gameBaccaratId } = useAppSelector((state) => state.baccaratGame);
  let dataBaccaratDetailById = dataBaccaratDetailCurrent.find(
    (d) => d.gameBaccaratId == gameBaccaratId
  );
  const dataStatusBaccarat =
    typeof dataBaccaratDetailById?.status == 'string'
      ? dataBaccaratDetailById?.status?.split(':')
      : [dataBaccaratDetailById?.status];
  const statsBaccaratDetail = Number(dataStatusBaccarat[0]);
  const timeStartBet = Number(dataStatusBaccarat[1]);
  const timeStamp = new Date().getTime();
  const [count, setCountDown] = useState(0);

  useEffect(() => {
    if (statsBaccaratDetail == StatusBaccarat.bet) {
      let countDown = timeStartBet > timeStamp && Math.ceil((timeStartBet - timeStamp) / 1000);
      console.log('🚀 ~ useEffect ~ countDown:', countDown);
      if (typeof countDown == 'number' && countDown > 19) countDown = 19;
      setCountDown(Number(countDown));
    }
  }, [statsBaccaratDetail]);

  useEffect(() => {
    if (count >= 1) {
      setTimeout(() => {
        setCountDown((pre) => pre - 1);
      }, 1000);
    }
  }, [count]);

  // Xác nhận, hủy đặt cược
  const dispatch = useAppDispatch();
  const handleConfirmBet = async () => {
    const transaction = dataBaccaratDetailById?.transaction || 1;
    const gameBaccaratId = dataBaccaratDetailById?.gameBaccaratId || 1;
    const baccaratDetailId = dataBaccaratDetailById?.baccaratDetailId || 1;
    const dataBetTg = [...dataBetCurrent];
    console.log('🚀 ~ handleConfirmBet ~ dataBetTg:', dataBetTg);
    if (
      dataBetTg.length &&
      transaction &&
      gameBaccaratId &&
      Number(statsBaccaratDetail) == StatusBaccarat.bet
    ) {
      dispatch(resetDataBetBaccarat());
      const reqBets = await Promise.all(
        dataBetTg.map(async (bet) => {
          const data = {
            transaction,
            gameBaccaratId,
            baccaratDetailId,
            point: bet.point,
            answer: bet.answer,
            game: 'mc-baccarat',
            type: typePlay,
          };
          const req = await betDiceAndBaccarat(data);

          return {
            answer: bet.answer,
            point: req?.data ? bet.point : 0,
          };
        })
      );

      // const newDataBetConfirm = [...dataBetConfirmOld.current];
      let totalBetSuc = 0;
      reqBets.map((item) => {
        totalBetSuc += item.point;
        const newDataBetConfirmOld = dataBetConfirmOld ? [...dataBetConfirmOld] : [];
        const checkExits = newDataBetConfirmOld.find((i) => i.answer == item.answer);
        if (checkExits) checkExits.point = item.point + checkExits.point;
        newDataBetConfirmOld.push(item);
        console.log(
          '🚀 ~ reqBets.map ~ dataBetConfirmOld:',
          dataBetConfirmOld,
          newDataBetConfirmOld
        );
        setDataBetConfirmOld && setDataBetConfirmOld(newDataBetConfirmOld);
      });
      setTotalPointBet && setTotalPointBet((pre) => pre + totalBetSuc);
      dispatch(updatePointUser({ gamePoint: -totalBetSuc }));
    }
  };

  return count ? (
    <>
      <div className={cx('wrapper', { sec10: count <= 10 })}>
        <div className={cx('countDNum')}>{count}</div>
        <div className={cx('icon_message_line')}></div>
        <div className={cx('loadingImg')}></div>
      </div>
      <div className={cx('wrapper-control')}>
        <div
          className={cx('wrapper-control__box')}
          onClick={() => {
            if (statsBaccaratDetail == StatusBaccarat.bet) {
              dispatch(resetDataBetBaccarat());
            }
          }}>
          <div className={cx('wrapper-control__box--bg')}></div>
          <div className={cx('wrapper-control__item', 'wrapper-control__rollback')}></div>
        </div>
        <div className={cx('wrapper-control__box')}>
          <div className={cx('wrapper-control__box--bg')}></div>
          <div className={cx('wrapper-control__item', 'wrapper-control__swapper')}></div>
        </div>
        <div className={cx('wrapper-control__box')} onClick={handleConfirmBet}>
          <div className={cx('wrapper-control__box--bg')}></div>
          <div className={cx('wrapper-control__item', 'wrapper-control__check')}></div>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}
