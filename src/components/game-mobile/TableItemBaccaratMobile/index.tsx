'use client';

import classNames from 'classnames/bind';
import Image from 'next/image';
import { HTMLAttributes, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { StatusBaccarat } from '@/constants';
import { useAppSelector } from '@/lib';

const cx = classNames.bind(styles);

const getBackGroundImage = (point: number): string => {
  let bg = 'icon_MT_chip_tableGold.svg';
  if (point >= 50000) {
    bg = '/Areas/Mobile/Images/blingChip/icon_MT_chip_table50k.svg';
  } else if (point >= 10000) {
    bg = '/Areas/Mobile/Images/blingChip/icon_MT_chip_table10k.svg';
  } else if (point >= 5000) {
    bg = '/Areas/Mobile/Images/blingChip/icon_MT_chip_table5k.svg';
  } else if (point >= 2000) {
    bg = '/Areas/Mobile/Images/blingChip/icon_MT_chip_table2k.svg';
  } else if (point >= 1000) {
    bg = '/Areas/Mobile/Images/blingChip/icon_MT_chip_table1k.svg';
  } else if (point >= 500) {
    bg = '/Areas/Mobile/Images/blingChip/icon_MT_chip_table500.svg';
  } else if (point >= 200) {
    bg = '/Areas/Mobile/Images/blingChip/icon_MT_chip_table200.svg';
  } else if (point >= 50) {
    bg = '/Areas/Mobile/Images/blingChip/icon_MT_chip_table50.svg';
  } else if (point >= 10) {
    bg = '/Areas/Mobile/Images/blingChip/icon_MT_chip_table10.svg';
  }

  return bg;
};

interface TableItemProps extends HTMLAttributes<HTMLDivElement> {
  // curChip: number;
  // onBetSuccess: React.Dispatch<React.SetStateAction<number>>;
  ratio: string;
  isHighlight: boolean;
  positionAnswer: number;
  statusBaccarat: number;
  betConfirmOld: number;
  name?: string;
  onBetPosition: (position: number) => void;
  children?: React.ReactNode;
  image?: string;
  textColor?: string;
  fontSizeText?: string;
}

export function TableItemBaccaratMobile({
  // curChip,
  // onBetSuccess,
  betConfirmOld,
  isHighlight,
  onBetPosition,
  children,
  name,
  ratio,
  statusBaccarat,
  positionAnswer,
  image,
  textColor,
  fontSizeText,
  className,
}: TableItemProps): JSX.Element {
  // const [pointBetPosition, setPointBetPosition] = useState(0);
  const { dataBetCurrent } = useAppSelector((state) => state.diceDetail);
  const pointBetPosition =
    betConfirmOld + (dataBetCurrent.find((i) => i.answer == positionAnswer)?.point || 0);

  return (
    <div
      onClick={() => {
        if (statusBaccarat == StatusBaccarat.bet) {
          onBetPosition(positionAnswer);
        }
        // setPointBetNow(pre => pre + curChip)
      }}
      className={className}>
      <div
        className={cx('flex h-full border-r-[1px] border-b-[1px] border-[#bcbcbc] relative', {
          'table-item__correct': isHighlight,
        })}>
        {pointBetPosition ? (
          <div
            className="absolute top-2 h-7 z-[1] left-0 right-0 flex items-center justify-center bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${getBackGroundImage(pointBetPosition)})`,
              // backgroundSize: 'contain',
              // backgroundRepeat: 'no-repeat',
              // backgroundPosition: 'center',
            }}>
            <p className="text-white text-sm">{pointBetPosition.toLocaleString('vi-VN')}</p>
          </div>
        ) : (
          <></>
        )}
        <div className="flex-1 flex justify-center items-center relative">
          <div className="w-full relative text-center">
            {image ? (
              <Image
                alt="bet"
                src={image}
                height={24}
                width={80}
                className="h-[18px] object-contain mx-auto w-auto"
              />
            ) : (
              <h2
                className={cx(
                  'font-bold text-center',
                  textColor,
                  !fontSizeText ? 'text-[16px]' : fontSizeText
                )}>
                {name || children}
              </h2>
            )}
          </div>
          <span
            className={cx(
              'absolute bottom-3 left-0 right-0 text-center block font-bold text-sm text-[#4c8bd080]'
            )}>
            {ratio}
          </span>
        </div>
      </div>
    </div>
  );
}
