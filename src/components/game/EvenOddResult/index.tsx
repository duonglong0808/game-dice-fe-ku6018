'use client';

import classNames from 'classnames/bind';
import styles from './evenOdd.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '@/lib';
import { StatusDiceDetail } from '@/constants';

const cx = classNames.bind(styles);

interface DiceDetailDto {
  gameDiceId: number;
  status: string | number;
  totalRed: number;
  transaction: number;
  mainTransaction: number;
  diceDetailId: number;
  arrBetActive?: string[];
}
// const dataDemo: DiceDetailDto[] = [
//   {
//     transaction: 0,
//     diceDetailId: 0,
//     gameDiceId: 1,
//     mainTransaction: 1,
//     status: 5,
//     totalRed: 3,
//   },
//   {
//     transaction: 1,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     mainTransaction: 1,
//     status: 5,
//     totalRed: 2,
//   },
//   {
//     transaction: 2,
//     mainTransaction: 2,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     status: 5,
//     totalRed: 2,
//   },
//   {
//     transaction: 3,
//     mainTransaction: 3,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     status: 5,
//     totalRed: 2,
//   },
//   {
//     transaction: 4,
//     mainTransaction: 4,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     status: 5,
//     totalRed: 2,
//   },
//   {
//     transaction: 5,
//     mainTransaction: 5,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     status: 5,
//     totalRed: 2,
//   },
//   {
//     transaction: 6,
//     mainTransaction: 6,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     status: 5,
//     totalRed: 3,
//   },
//   {
//     transaction: 7,
//     mainTransaction: 7,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     status: 5,
//     totalRed: 2,
//   },
//   {
//     transaction: 8,
//     mainTransaction: 8,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     status: 5,
//     totalRed: 3,
//   },
//   {
//     transaction: 9,
//     mainTransaction: 9,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     status: 5,
//     totalRed: 3,
//   },
//   {
//     transaction: 10,
//     mainTransaction: 10,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     status: 5,
//     totalRed: 3,
//   },
//   {
//     transaction: 11,
//     mainTransaction: 11,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     status: 5,
//     totalRed: 3,
//   },
//   {
//     transaction: 12,
//     mainTransaction: 12,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     status: 5,
//     totalRed: 3,
//   },
//   {
//     transaction: 13,
//     mainTransaction: 13,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     status: 5,
//     totalRed: 3,
//   },
//   {
//     transaction: 14,
//     mainTransaction: 14,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     status: 5,
//     totalRed: 3,
//   },
//   {
//     transaction: 15,
//     mainTransaction: 15,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     status: 5,
//     totalRed: 3,
//   },
//   {
//     transaction: 16,
//     mainTransaction: 16,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     status: 5,
//     totalRed: 2,
//   },
//   {
//     transaction: 17,
//     mainTransaction: 17,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     status: 5,
//     totalRed: 2,
//   },
//   {
//     transaction: 18,
//     mainTransaction: 18,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     status: 5,
//     totalRed: 2,
//   },
//   {
//     transaction: 19,
//     mainTransaction: 19,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     status: 5,
//     totalRed: 3,
//   },
//   {
//     transaction: 20,
//     mainTransaction: 20,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     status: 5,
//     totalRed: 2,
//   },
//   {
//     transaction: 21,
//     mainTransaction: 21,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     status: 5,
//     totalRed: 3,
//   },
//   {
//     transaction: 22,
//     mainTransaction: 22,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     status: 5,
//     totalRed: 3,
//   },
//   {
//     transaction: 23,
//     mainTransaction: 23,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     status: 5,
//     totalRed: 3,
//   },
// ];

export function EvenOddResult({ gameDiceId }: { gameDiceId: number }): JSX.Element {
  const dataRaw = useAppSelector((state) => state.diceDetail.dataDiceDetail);
  const lengthDataRowOld = useRef(0);
  const dataSort = [
    ...dataRaw.filter((i) => i.gameDiceId == gameDiceId && typeof i.totalRed === 'number'),
  ].sort((a, b) => b.diceDetailId - a.diceDetailId);

  // const dataPosition = useRef<any>({});
  const [dataPosition, setDataPosition] = useState<any>({});
  // console.log('🚀 ~ EvenOddResult ~ dataSort:', gameDiceId, dataSort[0]);
  // console.log(
  //   '🚀 ~ useEffect ~ lengthDataRowOld.current:',
  //   gameDiceId,
  //   lengthDataRowOld.current,
  //   dataSort.length
  // );

  useEffect(() => {
    if (lengthDataRowOld.current != dataSort.length) {
      const dataPositionCalc: any = {};

      let indexCurrent = 0;
      let col = 8;
      let row = 6;
      dataSort.forEach((item, index, arrThis) => {
        if (col > 0) {
          // console.log('🚀 ~ dataSort.forEach ~ col:', col);
          if (index == indexCurrent) {
            const type = item.totalRed % 2 === 0 ? 'C' : 'L';

            const lisTypeEquals: DiceDetailDto[] = [];
            const subArr = arrThis.slice(indexCurrent);
            for (let index = 0; index < subArr.length; index++) {
              const item2 = subArr[index];
              const type2 = item2.totalRed % 2 == 0 ? 'C' : 'L';
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
                  col + (lisTypeEquals.length - 6) > 8 ? 8 : col + (lisTypeEquals.length - 6);
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
      <table className={cx('CD_dataInput')} cellSpacing={0} cellPadding={0}>
        <tbody className={cx('table__body')}>
          {Array.from({ length: 6 }, (v, k) => k + 1).map((rowIndex) => (
            <tr key={rowIndex} className={cx('table__tr')}>
              {Array.from({ length: 9 }, (v, k) => k + 1).map((colIndex) => (
                <td
                  key={`${rowIndex}${colIndex}`}
                  className={cx('table__td', 'dark:table__td--dark')}>
                  <div className={cx('ba_AT_box')}>
                    <div
                      className={
                        dataPosition[`${colIndex}${rowIndex}`]?.totalRed % 2 == 1
                          ? cx('ba_ATred_bigT')
                          : cx('ba_ATBall_bigT')
                      }>
                      {dataPosition[`${colIndex}${rowIndex}`]?.value || ''}
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
