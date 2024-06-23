'use client';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/lib';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { setGameDiceId } from '@/lib/redux/app/diceGame.slice';
import { setGameBaccaratId } from '@/lib/redux/app/baccaratGame.slice';

const cx = classNames.bind(styles);

export function SliderBarGame(): JSX.Element {
  const { name, userName, gamePoint } = useAppSelector((state) => state.userCurrent);
  const { gameDiceId } = useAppSelector((state) => state.diceGame);
  const { gameBaccaratId } = useAppSelector((state) => state.baccaratGame);
  const router = useRouter();
  const searchParams = useSearchParams();
  const game = searchParams.get('game');
  const dispatch = useAppDispatch();

  // TODO: unable  with prod
  // if (!userName) redirect('error');

  const clickAutoConfirm = (e: any) => {
    const element = e.target as HTMLElement;
    element.classList.toggle(cx('auto-confirm__check'));
  };

  const handleClickGame = (game: string) => {
    if (gameDiceId || gameBaccaratId) {
      dispatch(setGameDiceId({ id: undefined }));
      dispatch(setGameBaccaratId({ id: undefined }));
    }
    router.replace(`?game=${game}`);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('account-info')}>
        <p className={cx('account-info__rank')}>Đồng</p>
        <Image
          className={cx('account-info__avatar')}
          alt="Avatar"
          src={'/Content/images/vn/icon_level1.png'}
          width={21}
          height={21}
        />
        <div className={cx('account-info__body')}>
          <p className={cx('account-info__name')}>{userName?.toUpperCase()}</p>
          <p className={cx('account-info__username')}>PU</p>
        </div>
      </div>
      <div className={cx('balance-gift')}>
        <div className={cx('balance-gift__balance')}>
          <p className={cx('balance-gift__title')}>$</p>
          <p className={cx('balance-gift__value')}>
            {Math.ceil(gamePoint)?.toLocaleString('vi-VN')}
          </p>
        </div>
        <div className={cx('balance-gift__gift')}>
          <Image
            alt="Gift"
            src={'/Content/images/icon_gift.svg'}
            className={cx('balance-gift__title')}
            width={16}
            height={16}
          />
          <p className={cx('balance-gift__value')}>0</p>
          <div className={cx('balance-gift__help')}></div>
        </div>
        <button className={cx('history-bet')}>Lịch sử đặt cược</button>
        <div className={cx('auto-confirm__box')}>
          <span className={cx('auto-confirm__text')}>Auto xác nhận</span>
          <div className={cx('auto-confirm__input')} onClick={clickAutoConfirm}></div>
        </div>
      </div>

      <ul className={cx('list-game')}>
        <li
          onClick={() => handleClickGame('')}
          className={cx('item-game', { 'item-game-xd__active': !game })}>
          Xóc đĩa
        </li>
        <li
          onClick={() => handleClickGame('mc-bacca')}
          className={cx('item-game', 'item-game__mc', {
            'item-game__mc--active': game == 'mc-bacca',
          })}>
          MC Baccarat
        </li>
        <li
          onClick={() => handleClickGame('other')}
          className={cx('item-game', 'item-game__chinaBacca')}>
          China Baccarat
        </li>
        <li
          onClick={() => handleClickGame('other')}
          className={cx('item-game', 'item-game__blockchainBacca')}>
          Blockchain Baccarat
        </li>
        <li onClick={() => handleClickGame('other')} className={cx('item-game')}>
          Sic Bo
        </li>
        <li onClick={() => handleClickGame('other')} className={cx('item-game')}>
          Rồng hổ
        </li>
        <li onClick={() => handleClickGame('other')} className={cx('item-game')}>
          Trác Kim Hoa
        </li>
        <li onClick={() => handleClickGame('other')} className={cx('item-game')}>
          Roulette
        </li>
        <li onClick={() => handleClickGame('other')} className={cx('item-game')}>
          Blockchain Ba Tây
        </li>
        <li onClick={() => handleClickGame('other')} className={cx('item-game')}>
          Ngầu Hầm
        </li>
        <li onClick={() => handleClickGame('other')} className={cx('item-game')}>
          Blockchain Pokdeng
        </li>
        <li onClick={() => handleClickGame('other')} className={cx('item-game')}>
          Nhiều bản
        </li>
      </ul>
    </div>
  );
}
