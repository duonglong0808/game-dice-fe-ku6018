'use client';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import ChipsList from '@/components/game/ChipList/index.';
import { useState } from 'react';
import { dataListChipsStatistics } from '@/constants';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/lib';
import { setIndexChipsRedux } from '@/lib/redux/system/settingSys';

const cx = classNames.bind(styles);

export function SelectChipsAndChosesChip({
  curChip,
  setCurChip,
  game = 'dice',
}: {
  game?: string;
  curChip: number;
  setCurChip: React.Dispatch<React.SetStateAction<number>>;
}): JSX.Element {
  const indexChipsRedux = useAppSelector((state) => state.settingApp.indexChips);
  const [openListPhinh, setOpenListPhinh] = useState(false);
  const [indexChips, setIndexChips] = useState<number[]>(indexChipsRedux);
  const dispatch = useAppDispatch();

  return (
    <div className={cx('live_action__control--right')}>
      <div className={cx('right__coins')}>
        <ChipsList setChips={setCurChip} curChip={curChip} game={game} />
      </div>
      <div className={cx('right__action')}>
        <div
          className={cx('right__action__phinh')}
          onClick={() => setOpenListPhinh((pre) => !pre)}></div>
        {openListPhinh && (
          <div className={cx('phing_wrapper')}>
            <div className={cx('body__chips', 'grid grid-cols-4')}>
              {dataListChipsStatistics.map((chip, index) => (
                <Image
                  alt="chip phinh"
                  src={indexChips.includes(index) ? chip.on : chip.off}
                  key={index}
                  width={68}
                  height={68}
                  className={cx('body__chips--item')}
                  onClick={() => {
                    if (indexChips.includes(index)) {
                      setIndexChips((pre) => pre.filter((c) => c !== index));
                    } else if (indexChips.length < 8) {
                      setIndexChips((pre) => [...pre, index]);
                    }
                  }}
                />
              ))}
            </div>
            <div className={cx('body__confirm')}>
              <div
                className={cx('body__confirm--cancel')}
                onClick={() => {
                  setIndexChips(indexChipsRedux);
                  setOpenListPhinh(false);
                }}></div>
              <span className={cx('body__confirm--text')}>
                Chọn tối đa
                <br></br>8 phỉnh
                <span className={cx('body__confirm--icon')}></span>
              </span>
              <button
                className={cx('body__confirm--btn')}
                onClick={() => {
                  dispatch(setIndexChipsRedux({ indexChips }));
                  setOpenListPhinh(false);
                }}>
                Xác nhận
              </button>
            </div>
          </div>
        )}
        <div className={cx('right__action__auto')} />
      </div>
    </div>
  );
}
