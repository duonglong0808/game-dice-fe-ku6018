'use client';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

export function ShowResultDice({ totalRed }: { totalRed: number }): JSX.Element {
  const [countDown, setCountDown] = useState(6);

  // useEffect(() => {
  //   if (countDown >= 1) {
  //     setTimeout(() => {
  //       setCountDown((pre) => pre - 1);
  //     }, 1000);
  //   }
  // }, [countDown, totalRed]);

  return countDown ? (
    <div className={cx('wrapper')}>
      <div className={cx('wrapper__box')}>
        <div className={cx('wrapper__body')}>
          {Array.from({ length: 4 }).map((n, index) => (
            <Image
              key={index}
              alt="plate"
              src={
                index < totalRed
                  ? '/Content/images/img_PlateR.png'
                  : '/Content/images/img_PlateW.png'
              }
              height={36}
              width={36}
              className={cx('wrapper__body--image')}
            />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
