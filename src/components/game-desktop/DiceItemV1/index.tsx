import classNames from 'classnames/bind';
import styles from './diceItem.module.scss';
import Image from 'next/image';
import { TypeGameDice } from '@/constants';
import { EvenOddResult } from '@/components/game/EvenOddResult';
import { DiceResultTX } from '@/components/game/DiceResultTX';

const cx = classNames.bind(styles);

export function XocDiaItem({
  name,
  status,
  type,
  typeText,
  image,
  national,
  nameAuthor,
  valueL,
  valueC,
  id,
}: {
  id: number;
  name: string;
  status?: string;
  type: string;
  typeText: string;
  image: string;
  national: string;
  nameAuthor: string;
  valueL: number;
  valueC: number;
}): JSX.Element {
  let imageNational = '';
  switch (national?.toLowerCase()) {
    case 'vn':
      imageNational = "url('/Content/images/bg_anchor_04.png')";
      break;
    case 'phl':
      imageNational = "url('/Content/images/bg_anchor_03.png')";
      break;
    default:
      break;
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <div className="flex items-center">
          <span
            className={cx('header__type', {
              'header__type--blockChain': TypeGameDice.Blockchain == type,
            })}>
            {typeText}
          </span>
          <span className={cx('header__name')}>{name}</span>
        </div>
        <span className={cx('header__value')}>{9}</span>
      </div>
      <div className={cx('game-body')}>
        <div
          style={{
            position: 'relative',
            marginRight: '5px',
            overflow: 'hidden',
          }}>
          <Image
            alt="Image ido"
            src={image}
            loader={() => image}
            className={cx('game-body__image')}
            width={97}
            height={107}
            loading="lazy"
            unoptimized={true}
          />
          {imageNational && (
            <div
              className={cx('game-body__nation')}
              style={{ background: `${imageNational} no-repeat` }}>
              <span>{nameAuthor}</span>
            </div>
          )}
        </div>
        <div className={cx('list-result')}>
          <div
            style={{
              borderRight: '2px solid #3a3a3a',
              //   width: '162px',
              //   height: '100%',
            }}>
            <EvenOddResult gameDiceId={id} />
          </div>
          <DiceResultTX gameDiceId={id} />
          {/* <EvenOddResult gameDiceId={id} /> */}
        </div>
      </div>
      <div className={cx('game-footer')}>
        <div className={cx('total__play')}>
          <div className={cx('total__play__L')}>
            <span className={cx('total__play--text')}>L</span>
            <span className={cx('total__play--value')}>{valueL}</span>
          </div>
          <div className={cx('total__play__C')}>
            <span className={cx('total__play--text')}>C</span>
            <span className={cx('total__play--value')}>{valueC}</span>
          </div>
        </div>
        <button className={cx('play__game')}>Vào chơi</button>
      </div>
    </div>
  );
}
