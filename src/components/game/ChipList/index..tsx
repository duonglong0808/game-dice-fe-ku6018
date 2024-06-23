'use client';

import { useState } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useAppSelector } from '@/lib';
import { StatusBaccarat, StatusDiceDetail, dataListChipsStatistics } from '@/constants';

const cx = classNames.bind(styles);

export default function ChipsList({
  setChips,
  curChip,
  alwayActive = false,
  game = 'dice',
}: {
  curChip: number;
  setChips: (num: number) => void;
  alwayActive?: boolean;
  game?: string;
}) {
  const { indexChips } = useAppSelector((state) => state.settingApp);
  const { dataDiceDetailCurrent } = useAppSelector((state) => state.diceDetail);
  const { gameDiceId } = useAppSelector((state) => state.diceGame);
  let dataDiceDetailById = dataDiceDetailCurrent.find((d) => d.gameDiceId == gameDiceId);

  const { dataBaccaratDetailCurrent } = useAppSelector((state) => state.baccaratDetail);
  const { gameBaccaratId } = useAppSelector((state) => state.baccaratGame);
  let dataBaccaratDetailById = dataBaccaratDetailCurrent.find(
    (d) => d.gameBaccaratId == gameBaccaratId
  );
  let statusGame;
  if (game == 'dice') {
    statusGame =
      typeof dataDiceDetailById?.status == 'string'
        ? dataDiceDetailById?.status?.split(':')[0]
        : dataDiceDetailById?.status;
  } else {
    statusGame =
      typeof dataBaccaratDetailById?.status == 'string'
        ? dataBaccaratDetailById?.status?.split(':')[0]
        : dataBaccaratDetailById?.status;
  }
  const chips = dataListChipsStatistics.filter((chip, index) => indexChips.includes(index));
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(5);

  const disableLeft = Boolean(left == 0);
  const disableRight = Boolean(right > indexChips.length - 1);

  const handleLeft = () => {
    if (!disableLeft) {
      setLeft((prev) => {
        return prev - 1;
      });
      setRight((prev) => {
        return prev - 1;
      });
    }
  };

  const handleRight = () => {
    if (!disableRight) {
      setLeft((prev) => {
        return prev + 1;
      });
      setRight((prev) => {
        return prev + 1;
      });
    }
  };

  return (
    <div className={cx('chips-list')}>
      <div
        className={cx('chips-list__control--left-active', {
          'chips-list__control--left': disableLeft,
        })}
        onClick={handleLeft}></div>
      <div className={cx('chips-list__chips')}>
        {chips.map((chip, index) => (
          <div
            key={index}
            className={cx(
              'chips-list__chip-item',
              {
                'chips-list__chip-item--active': index >= left && index < right,
              },
              {
                'chips-list__chip-item--select': curChip == chip.value,
              }
            )}>
            <Image
              alt="chip"
              width={50}
              height={50}
              src={
                alwayActive ||
                (game == 'dice'
                  ? statusGame == StatusDiceDetail.bet
                  : statusGame == StatusBaccarat.bet)
                  ? chip.on
                  : chip.off
              }
              className={cx('chips-list__chip-item--image', 'hidden lg:block')}
              onClick={() => {
                if (typeof chip.value == 'number') {
                  setChips(chip.value);
                }
              }}
            />
            <Image
              alt="chip"
              width={50}
              height={50}
              src={alwayActive || 2 == StatusDiceDetail.bet ? chip.select : chip.off}
              className={cx('chips-list__chip-item--image', 'block lg:hidden')}
              onClick={() => {
                if (typeof chip.value == 'number') {
                  setChips(chip.value);
                }
              }}
            />
          </div>
        ))}
      </div>
      <div
        className={cx('chips-list__control--right-active', {
          'chips-list__control--right': disableRight,
        })}
        onClick={handleRight}></div>
    </div>
  );

  // return (
  //   <div className={cx('chips-list')}>
  //     <img src="/game/chips/left_on.png" className={cx('chips-list__control')} />
  //     <div className={cx('chips-list__chips')}>
  //       <img src="/game/chips/chip_10.png" className={cx('chips-list__chip-item')} />
  //       <img src="/game/chips/chip_100.png" className={cx('chips-list__chip-item')} />
  //       <img src="/game/chips/chip_200.png" className={cx('chips-list__chip-item')} />
  //       <img src="/game/chips/chip_500.png" className={cx('chips-list__chip-item')} />
  //       <img src="/game/chips/chip_1k.png" className={cx('chips-list__chip-item')} />
  //       {/* <img src="/game/chips/chip_5k.png" />
  //       <img src="/game/chips/chip_10k.png" />
  //       <img src="/game/chips/chip_50k.png" /> */}
  //     </div>
  //     <img src="/game/chips/right_on.png" className={cx('chips-list__control')} />
  //   </div>
  // );
}
