import classNames from 'classnames/bind';
import { HTMLAttributes, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { StatusBaccarat } from '@/constants';
import { useAppSelector } from '@/lib';

const cx = classNames.bind(styles);

interface TableItemProps extends HTMLAttributes<HTMLDivElement> {
  isHighlight: boolean;
  statusBaccarat: number;
  curChip: number;
  positionAnswer: number;
  betConfirmOld: number;
  onBetPosition: (position: number) => void;
  isPlayer?: boolean;
  children?: React.ReactElement;
  points?: number;
  name?: string;
  numberPlayer?: number;
  isLeft?: boolean;
}

export function TableItemBaccarat({
  className,
  isPlayer = false,
  isHighlight,
  onBetPosition,
  statusBaccarat,
  betConfirmOld,
  positionAnswer,
}: TableItemProps): JSX.Element {
  const { dataBetCurrent, dataBaccaratDetailCurrent } = useAppSelector(
    (state) => state.baccaratDetail
  );
  const pointBetPosition =
    betConfirmOld + (dataBetCurrent.find((i) => i.answer == positionAnswer)?.point || 0);
  const { gameBaccaratId } = useAppSelector((state) => state.baccaratGame);
  let dataDiceDetailById = dataBaccaratDetailCurrent.find(
    (d) => d.gameBaccaratId == gameBaccaratId
  );
  const statusDice =
    typeof dataDiceDetailById?.status == 'string'
      ? dataDiceDetailById?.status?.split(':')[0]
      : dataDiceDetailById?.status;

  return (
    <div
      onClick={() => {
        if (statusDice == StatusBaccarat.bet) {
          onBetPosition(positionAnswer);
        }
      }}
      className={`${className} flex justify-center items-center mb-1 `}>
      {isPlayer ? (
        <div
          id="myDiv"
          className={cx('w-[100%] h-[100%] relative top-[0%]', 'parabol', {
            'hover:after:bg-[#5fa8df8e] hover:after:cursor-pointer':
              statusBaccarat == StatusBaccarat.bet,
            'item-table__active--player': isHighlight,
          })}>
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
        </div>
      ) : (
        <div
          className={`${cx(
            'border-[1px] border-[transparent] w-[calc(100%-2px)] h-[100%] relative top-[-0%] right-[1%] left-[0%]',
            {
              'hover:bg-[#5fa8df8e] hover:cursor-pointer': statusBaccarat == StatusBaccarat.bet,
              'item-table__active': isHighlight,
            }
          )}`}>
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
        </div>
      )}
    </div>
  );
}
