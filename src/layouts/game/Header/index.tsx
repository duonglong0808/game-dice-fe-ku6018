'use client';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib';
import { setGameDiceId } from '@/lib/redux/app/diceGame.slice';
import { setGameBaccaratId } from '@/lib/redux/app/baccaratGame.slice';

function formatNumber(number: number): string {
  number = +number.toFixed(1);
  const numberString = number.toString();

  // Tách phần nguyên và phần thập phân (nếu có)
  const [integerPart, decimalPart] = numberString.split('.');

  // Thêm dấu chấm sau mỗi ba chữ số trong phần nguyên
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Nếu có phần thập phân, kết hợp phần nguyên và phần thập phân với dấu phẩy
  if (decimalPart) {
    return `${formattedInteger},${decimalPart}`;
  } else {
    return formattedInteger;
  }
}

const cx = classNames.bind(styles);

export function HeaderGame(): JSX.Element {
  const numberBac = useRef(1934321.5);
  const numberCd = useRef(1534321.5);
  const [render, setRender] = useState(true);
  const { gameDiceId } = useAppSelector((state) => state.diceGame);
  const { gameBaccaratId } = useAppSelector((state) => state.baccaratGame);
  const dispatch = useAppDispatch();

  const mood = useRef('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      mood.current =
        localStorage.theme === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
          ? 'dark'
          : 'light';
    }

    const countNumber = setTimeout(() => {
      numberBac.current = +numberBac.current + Math.random() * 4;
      numberCd.current = +numberCd.current + Math.random() * 4;
      setRender(!render);
    }, 1000);

    return () => {
      clearTimeout(countNumber);
    };
  }, [render]);

  return (
    <header>
      <div className={cx('header__wrapper')}>
        <div className="flex flex-row items-center h-full">
          <div className={cx('header__logo')}></div>
          <div className={cx('header__content', 'h-full')}>
            <h3 className={cx('header__game')}>Xóc đĩa A</h3>
            <p className={cx('header__room')}>143</p>
            <p className={cx('header__bet')}>Mức cược:</p>
            <p className={cx('header__bet--value')}>10 - 50k</p>
          </div>
          <div className={cx('header-jackpot', 'flex-1 justify-center')}>
            <div
              className={cx('header-jackpot__image')}
              style={{
                backgroundImage: 'url(/Content/images/vn/img_bac_jackpot.png)',
              }}></div>
            <div className={cx('header-jackpot__number')}>{formatNumber(numberBac.current)}</div>
            <div className={cx('header-jackpot__image--center')}>
              <div className={cx('header-jackpot__crown')}></div>
              <div className={cx('header-jackpot__light')}></div>
            </div>
            <div
              className={cx('header-jackpot__image')}
              style={{
                backgroundImage: 'url(/Content/images/vn/img_cd_jackpot.png)',
              }}></div>
            <div className={cx('header-jackpot__number')}>{formatNumber(numberCd.current)}</div>
          </div>
          <div className={cx('header-control')}>
            <div className={cx('header-control__menu', 'header-control__item')}>
              <div className={cx('header-control__menu-box', 'flex flex-row flex-wrap')}>
                <div
                  className={cx('header--menu__item', 'header--menu__item--tranfer', 'basis-1/3')}>
                  <span>Chuyển khoản nhanh</span>
                </div>
                <div
                  className={cx('header--menu__item', 'header--menu__item--history', 'basis-1/3')}>
                  <span>Lịch sử đặt cược</span>
                </div>
                <div
                  className={cx('header--menu__item', 'header--menu__item--support', 'basis-1/3')}>
                  <span>Hỗ trợ</span>
                </div>
                <div className={cx('header--menu__item', 'header--menu__item--help', 'basis-1/3')}>
                  <span>Hướng dẫn trò chơi</span>
                </div>
                <div
                  className={cx('header--menu__item', 'header--menu__item--volume', 'basis-1/3')}>
                  <span>Cài đặt âm lượng</span>
                </div>
                <div className={cx('header--menu__item', 'header--menu__item--road', 'basis-1/3')}>
                  <span>Cài đặt Good Road</span>
                </div>
                <div className={cx('header--menu__item', 'header--menu__item--love', 'basis-1/3')}>
                  <span>Danh sách yêu thích</span>
                </div>
                <div className={cx('header--menu__item', 'header--menu__item--mc', 'basis-1/3')}>
                  <span>Xếp hạng MC</span>
                </div>
                <div className={cx('header--menu__item', 'header--menu__item--rank', 'basis-1/3')}>
                  <span>Xép hạng % thắng</span>
                </div>
                <div className={cx('header--menu__item', 'header--menu__item--chart', 'basis-1/3')}>
                  <span>Thống kê</span>
                </div>
                <div
                  onClick={(e) => {
                    const element = e.target as HTMLElement;
                    console.log(
                      "window.matchMedia('(prefers-color-scheme: dark)')",
                      window.matchMedia('(prefers-color-scheme: dark)')
                    );
                    console.log(
                      "window.matchMedia('(prefers-color-scheme: light)')",
                      window.matchMedia('(prefers-color-scheme: light)')
                    );
                    if (
                      localStorage.theme === 'dark' ||
                      (!('theme' in localStorage) &&
                        window.matchMedia('(prefers-color-scheme: dark)').matches)
                    ) {
                      console.log('Tối');
                      localStorage.theme = 'light';
                      localStorage.setItem('prefers-color-scheme', 'light');
                      element.classList.add(cx('header--menu__item--background--light'));
                    } else {
                      localStorage.theme = 'dark';
                      localStorage.removeItem('prefers-color-scheme');
                      element.classList.remove(cx('header--menu__item--background--light'));
                    }
                  }}
                  className={cx(
                    'header--menu__item',
                    'header--menu__item--background',
                    { 'header--menu__item--background--light': mood.current == 'light' },
                    'basis-1/3'
                  )}>
                  <span>Phông nền Road</span>
                </div>
              </div>
            </div>
            <div className={cx('header-control__zoom', 'header-control__item')}>
              <span className={cx('header-control__item--text')}>Phóng to</span>
            </div>
            <div
              className={cx('header-control__logout', 'header-control__item')}
              onClick={() => {
                if (gameDiceId || gameBaccaratId) {
                  dispatch(setGameDiceId({ id: undefined }));
                  dispatch(setGameBaccaratId({ id: undefined }));
                } else {
                  console.log('tắt');
                  window.close();
                }
              }}>
              <span className={cx('header-control__item--text')}>Thoát</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
