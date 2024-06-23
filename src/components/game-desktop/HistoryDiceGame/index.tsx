'use client';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { useAppSelector } from '@/lib';

const cx = classNames.bind(styles);

export function HistoryDiceGame({ gameDiceId }: { gameDiceId: number }): JSX.Element {
  const { diceGame } = useAppSelector((state) => state.diceGame);
  const diceGameById = diceGame.find((d) => d.id === gameDiceId);
  const name = diceGameById?.name;
  console.log('🚀 ~ HistoryDiceGame ~ name:', name);

  return (
    <div className={cx('wrapper')}>
      <table className={cx('wrapper-table')}>
        <tbody className={cx('wrapper-table__tbody')}>
          <tr>
            <th className={cx('CD_w50')}>
              <span className={cx('CD_nameGray')}>Bàn</span>
              <span className={cx('CD_nameBlue')}>A</span>
            </th>
            <th className={cx('CD_w50')}>
              <span className={cx('CD_nameGray')}>Ván</span>
              <span className={cx('CD_nameBlue')}>800</span>
            </th>
          </tr>
          <tr className={cx('CD_Player')}>
            <td>
              <span className={cx('CD_nameRed')}>Lẻ</span>
              <span className={cx('CD_Num', 'SD_CD_Num')}>343</span>
            </td>
            <td>
              <span className={cx('CD_nameBlue2')}>Chẵn</span>
              <span className={cx('CD_Num', 'SD_CD_Num')}>457</span>
            </td>
          </tr>

          <tr className={cx('CD_Player')}>
            <td>
              <span className={cx('CD_nameRed', 'CD_nameRedDa')}>Tài</span>
              <span className={cx('CD_Num', 'SD_CD_Num')}>460</span>
            </td>
            <td>
              <span className={cx('CD_nameBlue2', 'CD_nameBlue2Xiu')}>Xỉu</span>
              <span className={cx('CD_Num', 'SD_CD_Num')}>236</span>
            </td>
          </tr>

          <tr className={cx('CD_Player', 'CD_Tdown')}>
            <td>
              <div className={cx('CD_White_ball')}>0</div>
              <span className={cx('CD_Num', 'SD_CD_Num')}>50</span>
            </td>
            <td>
              <div className={cx('CD_blue_ball')}>1</div>
              <span className={cx('CD_Num', 'SD_CD_Num')}>211</span>
            </td>
          </tr>

          <tr className={cx('CD_Player', 'CD_Tdown')}>
            <td>
              <div className={cx('CD_yellow_ball')}>3</div>
              <span className={cx('CD_Num', 'SD_CD_Num')}>312</span>
            </td>
            <td>
              <div className={cx('CD_orange_ball')}>4</div>
              <span className={cx('CD_Num', 'SD_CD_Num')}>58</span>
            </td>
          </tr>

          <tr className={cx('CD_Player', 'CD_Tdown')}>
            <td colSpan={2}>
              <span className={cx('CD_green_ball')}>2</span>
              <span className={cx('CD_Num', 'CD_alter')}>169</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
