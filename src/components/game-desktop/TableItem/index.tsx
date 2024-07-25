'use client';

import React, { forwardRef, HTMLAttributes, useCallback, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames/bind';
import { ICheckHover, StatusDiceDetail } from '@/constants';
import { useAppSelector } from '@/lib';

const cx = classNames.bind(styles);
interface TableItemProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactElement;
  ratio: number;
  isHighlight: boolean;
  curChip: number;
  positionAnswer: number;
  betConfirmOld: number;
  onBetPosition: (position: number) => void;
  onBetSuccess: () => void;
  onHover?: (iCheckHover: ICheckHover) => void;
  reversePoint?: boolean;
  points?: number;
  name?: string;
  numberPlayer?: number;
  isLeft?: boolean;
}

const getMaxValue = (level: number) => {
  switch (level) {
    case 4:
    case 6:
      return 9757153; // 10 triệu
    case 5:
    case 7:
      return 1467382; // 1.5 triệu

    default:
      return 935781;
  }
};

const getIncrementValue = (level: number) => {
  switch (level) {
    case 4:
      return Math.random() > 0.5
        ? Math.floor(Math.random() * 874231)
        : Math.floor(Math.random() * 707835);
    case 6:
      return Math.random() > 0.5
        ? Math.floor(Math.random() * 945371)
        : Math.floor(Math.random() * 674399); // Tăng ngẫu nhiên tới 100k
    case 5:
    case 7:
      return Math.floor(Math.random() * 13543); // Tăng ngẫu nhiên tới 15k

    default:
      return Math.floor(Math.random() * 8749);
  }
};

const TableItem = forwardRef<HTMLDivElement, TableItemProps>(
  (
    {
      children,
      name,
      className,
      points,
      ratio,
      betConfirmOld,
      onBetPosition,
      onHover,
      isLeft,
      isHighlight,
      curChip,
      onBetSuccess,
      positionAnswer,
      reversePoint,
      ...otherProps
    },
    ref
  ) => {
    // const [pointBetPosition, setPointBetPosition] = useState(0);
    const { dataBetCurrent } = useAppSelector((state) => state.diceDetail);
    const pointBetPosition =
      betConfirmOld + (dataBetCurrent.find((i) => i.answer == positionAnswer)?.point || 0);
    const { gameDiceId } = useAppSelector((state) => state.diceGame);
    const { dataDiceDetailCurrent } = useAppSelector((state) => state.diceDetail);
    let dataDiceDetailById = dataDiceDetailCurrent.find((d) => d.gameDiceId == gameDiceId);
    const statusDice =
      typeof dataDiceDetailById?.status == 'string'
        ? dataDiceDetailById?.status?.split(':')[0]
        : dataDiceDetailById?.status;

    const [totalBetServer, setTotalBetServer] = useState(0);

    const increaseTotalBetServer = () => {
      const maxValue = getMaxValue(positionAnswer);
      const increment = getIncrementValue(positionAnswer);
      setTotalBetServer((prevValue) => {
        const newValue = prevValue + increment;
        return newValue > maxValue ? maxValue : newValue;
      });
    };

    useEffect(() => {
      const interval =
        statusDice == StatusDiceDetail.bet &&
        setInterval(() => {
          increaseTotalBetServer();
        }, 1000);
      // const interval = setInterval(() => {
      //   increaseTotalBetServer();
      // }, 1000);

      return () => {
        if (interval) {
          clearInterval(interval);
        }
      };
    }, [statusDice, totalBetServer]);

    const handleHover = useCallback(
      (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onHover &&
          onHover({
            isHover: true,
            position: {
              x: event.clientX,
              y: event.clientY,
            },
          });
      },
      [onHover]
    );
    const handleHoverLeft = useCallback(
      (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onHover &&
          onHover({
            isHover: false,
            position: {
              x: 0,
              y: 0,
            },
          });
      },
      [onHover]
    );

    useEffect(() => {
      // if (Number(statusDice) > StatusDiceDetail.prepare) setPointBetPosition(0);
      if (Number(statusDice) == StatusDiceDetail.end) setTotalBetServer(0);
    }, [statusDice]);

    return (
      <div
        className={`${className} ${cx('table__item', {
          // 'table__item--active': true,
          'table__item--active': statusDice == StatusDiceDetail.bet,
          'table__item--correct': isHighlight,
        })}`}
        ref={ref}
        onClick={() => {
          if (statusDice == StatusDiceDetail.bet) {
            onBetPosition(positionAnswer);
          }
        }}
        {...otherProps}>
        {name === undefined && points !== undefined ? (
          <div className={cx('dots')}>
            {points !== -1 && !reversePoint ? (
              Array.from({ length: 4 }, (_, index) => index + 1).map((n) => (
                <span
                  key={n}
                  className={cx({
                    [`dots__item${n > 4 - points ? '--red' : ''}`]: !reversePoint,
                  })}>
                  {n == 4 && points}
                </span>
              ))
            ) : reversePoint ? (
              Array.from({ length: 4 }, (_, index) => index + 1).map((n) => (
                <span
                  key={n}
                  className={cx({
                    [`dots__item${n < 4 ? '--red' : ''}`]: reversePoint,
                  })}>
                  {n == 4 && points}
                </span>
              ))
            ) : (
              <div className="flex  gap-1 flex-row">
                <div className="flex">
                  {Array.from({ length: 4 }, (_, index) => index + 1).map((n) => (
                    <span key={n} className={cx('dots__item', 'dots__item--multi')} />
                  ))}
                </div>
                <div className="flex">
                  {Array.from({ length: 4 }, (_, index) => index + 1).map((n) => (
                    <span key={n} className={cx('dots__item--red', 'dots__item--multi')} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className={cx('table__item__name')}>{name}</p>
        )}
        <div
          className={cx('table__item__ratio', {
            'table__item__ratio-name': name,
          })}>
          1<span>:</span>
          {ratio}
        </div>
        <div className={cx('table__item__points')}>
          {children}
          {totalBetServer ? (
            <>
              <div className={cx('table__item__points--icon')}></div>
              <p className={cx('col__row--counter')}>{totalBetServer.toLocaleString('vi-VN')}</p>
            </>
          ) : (
            <></>
          )}
        </div>
        {pointBetPosition ? (
          <div className={cx('total__point-bet')}>
            <span className={cx({ 'total__point-bet__long': pointBetPosition >= 1000 })}>
              {/* {pointBetPosition < 1000
                ? pointBetPosition
                : `${(pointBetPosition / 1000).toFixed(2)}`} */}
              {pointBetPosition}
            </span>
          </div>
        ) : (
          <></>
        )}
        {/* <div className={cx('total__point-bet')}>
          <span className={cx({ 'total__point-bet__long': true })}>{`${(1230 / 1000).toFixed(
            2
          )}K`}</span>
        </div> */}
        {onHover &&
          (isLeft ? (
            <div
              className={cx('table__item__tool_tip')}
              style={{
                right: 0,

                borderLeftWidth: 30,
                borderLeftStyle: 'solid',
                borderLeftColor: 'transparent',
              }}>
              <button
                onMouseEnter={handleHover}
                onMouseLeave={handleHoverLeft}
                style={{
                  left: -20,
                }}>
                ?
              </button>
            </div>
          ) : (
            <div
              className={cx('table__item__tool_tip')}
              style={{
                left: 0,
                borderRightWidth: 30,
                borderRightStyle: 'solid',
                borderRightColor: 'transparent',
              }}>
              <button onMouseEnter={handleHover} onMouseLeave={handleHoverLeft}>
                ?
              </button>
            </div>
          ))}
      </div>
    );
  }
);

export default TableItem;

// const dispatch = useAppDispatch();
//     const chooseBet = async () => {
//       // console.log(position);
//       const axios = new BaseAxios();

//       const transaction = dataDiceDetailById?.transaction;
//       const gameDiceId = dataDiceDetailById?.gameDiceId;
//       const diceDetailId = dataDiceDetailById?.diceDetailId;

//       if (transaction && gameDiceId && Number(statusDice) == StatusDiceDetail.bet) {
//         try {
//           if (curChip && gamePoint) {
//             const pointBet = curChip < gamePoint ? curChip : gamePoint;
//             const requestBet = await axios.post('/history-play', {
//               transaction,
//               gameDiceId,
//               diceDetailId,
//               point: pointBet,
//               answer: positionAnswer,
//             });
//             if (requestBet?.data) {
//               onBetSuccess();
//               dispatch(updatePointUser({ gamePoint: -pointBet }));
//               setPointBetPosition((pre) => pre + pointBet);
//             }
//           }
//         } catch (error: any) {
//           alert(error.message);
//         }
//       }
//     };
