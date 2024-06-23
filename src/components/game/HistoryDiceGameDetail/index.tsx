'use client';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { useAppSelector } from '@/lib';
import { useEffect, useRef, useState } from 'react';
import { DiceDetailDto } from '@/lib/redux/app/diceDetail.slice';

const cx = classNames.bind(styles);

export function HistoryDiceGameDetail({
  gameDiceId,
  initCol = 6,
}: {
  gameDiceId: number;
  initCol?: number;
}): JSX.Element {
  const dataRaw = useAppSelector((state) => state.diceDetail.dataDiceDetail);
  const lengthDataRowOld = useRef(0);
  const dataSort = [
    ...dataRaw.filter((i) => i.gameDiceId == gameDiceId && typeof i.totalRed === 'number'),
  ].sort((a, b) => b.diceDetailId - a.diceDetailId);

  // const dataPosition = useRef<any>({});
  const [dataPosition, setDataPosition] = useState<any>({});

  const getClassByTotalRed = (totalRed: number) => {
    switch (+totalRed) {
      case 0:
        return 'CD_White_ball';
      case 1:
        return 'CD_blue_ball';
      case 2:
        return 'CD_green_ball';
      case 3:
        return 'CD_yellow_ball';
      case 4:
        return 'CD_orange_ball';

      default:
        return '';
    }
  };

  useEffect(() => {
    if (lengthDataRowOld.current != dataSort.length) {
      const dataPositionCalc: any = {};

      let indexCurrent = 0;
      let col = initCol - 1;
      let row = 6;
      dataSort.forEach((item, index, arrThis) => {
        if (col > 0) {
          // console.log('🚀 ~ dataSort.forEach ~ col:', col);
          if (index == indexCurrent) {
            const type = item.totalRed;

            const lisTypeEquals: DiceDetailDto[] = [];
            const subArr = arrThis.slice(indexCurrent);
            for (let index = 0; index < subArr.length; index++) {
              const item2 = subArr[index];
              const type2 = item2.totalRed;
              if (type2 == type) {
                lisTypeEquals.push(item2);
              } else {
                break;
              }
            }
            // console.log('🚀 ~ dataSort.forEach ~ lisTypeEquals:', lisTypeEquals);
            if (lisTypeEquals.length >= 2) {
              if (lisTypeEquals.length > 6) {
                let colTg =
                  col + (lisTypeEquals.length - 6) > 6 ? 6 : col + (lisTypeEquals.length - 6);
                for (let i = 0; i < lisTypeEquals.length; i++) {
                  const element = lisTypeEquals[i];
                  indexCurrent++;
                  if (lisTypeEquals.length - i > 6) {
                    const position = `${colTg}6`;
                    dataPositionCalc[position] = { ...element, value: type };
                    colTg = colTg - 1;
                  } else {
                    const position = `${colTg}${lisTypeEquals.length - i}`;
                    dataPositionCalc[position] = { ...element, value: type };
                  }
                }
                // col = col - 1;
                col = colTg - 1;
              } else {
                for (let i = 0; i < lisTypeEquals.length; i++) {
                  const element = lisTypeEquals[i];
                  indexCurrent++;
                  const position = `${col}${lisTypeEquals.length - i}`;
                  dataPositionCalc[position] = { ...element, value: type };
                }
                col = col - 1;
              }
            } else {
              const position = `${col}1`;
              dataPositionCalc[position] = { ...item, value: type };
              col = col - 1;
              row = 1;
              indexCurrent++;
            }
          }
        }
      });

      lengthDataRowOld.current = dataSort.length;
      setDataPosition(dataPositionCalc);
    }
  }, [dataSort]);

  return (
    <div className={cx('wrapper')}>
      <table className={cx('wrapper-table')}>
        <tbody className={cx('wrapper-table__tbody')}>
          {Array.from({ length: 6 }, (v, k) => k + 1).map((rowIndex) => (
            <tr key={rowIndex} className={cx('wrapper-table__tr')}>
              {Array.from({ length: initCol }, (v, k) => k + 1).map((colIndex) => (
                <td key={`${rowIndex}${colIndex}`} className={cx('wrapper-table__td')}>
                  <div className={cx('wrapper-table__td--CD_ballBox')}>
                    <div
                      className={cx(
                        getClassByTotalRed(dataPosition[`${colIndex}${rowIndex}`]?.totalRed)
                      )}>
                      {dataPosition[`${colIndex}${rowIndex}`]?.value}
                    </div>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
