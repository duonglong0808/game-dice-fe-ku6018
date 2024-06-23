'use client';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib';
import { StatusDiceDetail } from '@/constants';
import { betDiceAndBaccarat } from '@/ultils/api';
import { resetDataBetDice } from '@/lib/redux/app/diceDetail.slice';
import { updatePointUser } from '@/lib/redux/app/userCurrent.slice';

const cx = classNames.bind(styles);

export default function CountDownBet({
  setTotalPointBet,
  dataBetConfirmOld,
  setDataBetConfirmOld,
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
  dataBetConfirmOld?: {
    point: number;
    answer: number;
  }[];
}) {
  const { dataDiceDetailCurrent, dataBetCurrent } = useAppSelector((state) => state.diceDetail);
  const { gameDiceId } = useAppSelector((state) => state.diceGame);
  let dataDiceDetailById = dataDiceDetailCurrent.find((d) => d.gameDiceId == gameDiceId);
  const dataStatusDice =
    typeof dataDiceDetailById?.status == 'string'
      ? dataDiceDetailById?.status?.split(':')
      : [dataDiceDetailById?.status];
  const statsDiceDetail = Number(dataStatusDice[0]);
  const timeStartBet = Number(dataStatusDice[1]);
  const timeStamp = new Date().getTime();
  const [count, setCountDown] = useState(0);

  useEffect(() => {
    if (statsDiceDetail == StatusDiceDetail.bet) {
      let countDown = timeStartBet > timeStamp && Math.ceil((timeStartBet - timeStamp) / 1000);
      if (typeof countDown == 'number' && countDown > 14) countDown = 14;
      setCountDown(Number(countDown));
    }
  }, [statsDiceDetail]);

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
    const transaction = dataDiceDetailById?.transaction || 1;
    const gameDiceId = dataDiceDetailById?.gameDiceId || 1;
    const diceDetailId = dataDiceDetailById?.diceDetailId || 1;
    const dataBetTg = [...dataBetCurrent];
    if (
      dataBetTg.length &&
      transaction &&
      gameDiceId &&
      Number(statsDiceDetail) == StatusDiceDetail.bet
    ) {
      dispatch(resetDataBetDice());
      const reqBets = await Promise.all(
        dataBetTg.map(async (bet) => {
          const data = {
            transaction,
            gameDiceId,
            diceDetailId,
            point: bet.point,
            answer: bet.answer,
            game: 'dice',
          };
          const req = await betDiceAndBaccarat(data);

          return {
            answer: bet.answer,
            point: req?.data ? bet.point : 0,
          };
        })
      );
      console.log('🚀 ~ handleConfirmBet ~ reqBets:', reqBets);

      // const newDataBetConfirm = [...dataBetConfirmOld.current];
      let totalBetSuc = 0;
      const newDataBetConfirmOld = dataBetConfirmOld ? [...dataBetConfirmOld] : [];
      reqBets.forEach((item) => {
        totalBetSuc += item.point;
        const checkExits = newDataBetConfirmOld.find((i) => i.answer == item.answer);
        if (checkExits) checkExits.point = item.point + checkExits.point;
        else newDataBetConfirmOld.push(item);
        console.log(
          '🚀 ~ reqBets.map ~ dataBetConfirmOld:',
          dataBetConfirmOld,
          newDataBetConfirmOld
        );
      });
      setDataBetConfirmOld && setDataBetConfirmOld(newDataBetConfirmOld);
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
            if (statsDiceDetail == StatusDiceDetail.bet) {
              dispatch(resetDataBetDice());
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
