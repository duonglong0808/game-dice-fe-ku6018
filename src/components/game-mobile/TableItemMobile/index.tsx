'use client';

import classNames from 'classnames/bind';
import Image from 'next/image';
import { HTMLAttributes, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { StatusDiceDetail } from '@/constants';
import { useAppSelector } from '@/lib';

const cx = classNames.bind(styles);

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
  statusDice: number;
  betConfirmOld: number;
  onBetPosition: (position: number) => void;
  name?: string;
  image?: string;
  textColor?: string;
}

export function TableItemMobile({
  // curChip,
  // onBetSuccess,
  betConfirmOld,
  isHighlight,
  onBetPosition,
  name,
  ratio,
  statusDice,
  positionAnswer,
  image,
  textColor,
}: TableItemProps): JSX.Element {
  // const [pointBetPosition, setPointBetPosition] = useState(0);
  const { dataBetCurrent } = useAppSelector((state) => state.diceDetail);
  const pointBetPosition =
    betConfirmOld + (dataBetCurrent.find((i) => i.answer == positionAnswer)?.point || 0);
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

  useEffect(() => {
    // if (Number(statusDice) > StatusDiceDetail.prepare) setPointBetPosition(0);
    if (Number(statusDice) == StatusDiceDetail.end) setTotalBetServer(0);
  }, [statusDice]);

  return (
    <div
      onClick={() => {
        if (statusDice == StatusDiceDetail.bet) {
          onBetPosition(positionAnswer);
        }
        // setPointBetNow(pre => pre + curChip)
      }}
      className="w-full h-full">
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
        <div className="flex-1 mx-2 m-auto relative">
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
              <h2 className={cx('text-[26px] font-bold text-center', textColor)}>{name}</h2>
            )}
          </div>
          {[StatusDiceDetail.prepare, StatusDiceDetail.shake].includes(statusDice) ? (
            <span
              className={cx(
                'block text-center text-[#4c8bd080] text-sm font-medium relative top-4'
              )}>
              {ratio}
            </span>
          ) : (
            <></>
          )}
        </div>
        {![StatusDiceDetail.prepare, StatusDiceDetail.shake].includes(statusDice) ? (
          <div className="absolute left-0 right-0 bottom-0 bg-white flex justify-center items-center">
            <Image
              alt="chip"
              src={'/Areas/Mobile/Images/blingChip/MT_chip_single.png'}
              width={10}
              height={10}
              className="mr-2"
            />
            <span className="text-[#18cb60] text-[13px]">
              {totalBetServer.toLocaleString('vi-VN')}
            </span>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
